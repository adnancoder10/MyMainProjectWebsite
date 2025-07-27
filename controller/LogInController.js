const Controller_Of_BusinessesMongoose = require("../model/Bussinesses_info")
// const LoginAttempt = require("../model/LoginAttempt")
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwtSecret = process.env.JWT_SECRET_KEY_FOR_LOGIN;
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const { LoginAttempt } = require("../model/SchemaForOtherConnection");

const { ObjectId } = require('mongoose').Types;


class Controller_Of_LogInController {
    static LogInGetRequest = async (req, res) => {
        let TheLoginFormValuesAndError = {
            UsernameORPhoneNumberError: [''],
            UsernameORPhoneNumberValue: '',
            PasswordError: [''],
            PasswordValue: '',
        }
        const multiALSTError = req.session?.multiALSTError ?? null;
        delete req.session?.multiALSTError;

        res.render('log_in.ejs', {
            TheLoginFormValuesAndError,
            multiALSTError: multiALSTError || null,
        })

    }
    static LogInPostRequest = async (req, res) => {
        const UsernameOrPhoneNumber = req.body.loginUsernameOrPhoneNumber
        const Password = req.body.LoginPassword
        let TheLoginFormValuesAndError = {
            UsernameORPhoneNumberError: [''],
            UsernameORPhoneNumberValue: `${UsernameOrPhoneNumber}`,
            PasswordError: [''],
            PasswordValue: '',
        }


        try {
            let BusinessAccount = await Controller_Of_BusinessesMongoose.BusinessesModel.find({
                $or: [
                    { Username: UsernameOrPhoneNumber },
                    { Phone_Number: UsernameOrPhoneNumber }
                ]
            });

            // Directly handle user not found or password mismatch
            if (BusinessAccount.length === 0) {
                const rateLimitError = "Incorrect phone number, username, or password."
                return res.render('log_in.ejs', { TheLoginFormValuesAndError, rateLimitError })
            } else {

                let findAccounts = []
                let failedfindAccounts = []
                let findeblockedAccount = false
                for (const UserBusinessAccount of BusinessAccount) {
                    const isBlocked = await this.isAccountBlocked(UserBusinessAccount._id);
                    if (isBlocked) {
                        findeblockedAccount = true;
                        continue; // Skip password check for this blocked account
                    }
                    const IsPasswordRight = await bcrypt.compare(Password, UserBusinessAccount.Password);
                    if (IsPasswordRight) {
                        findAccounts.push(UserBusinessAccount);
                    } else {
                        failedfindAccounts.push(UserBusinessAccount);
                    }
                }
                console.log('findAccounts', findAccounts);
                console.log('failedfindAccounts ', failedfindAccounts);
                if (findAccounts.length === 1) {

                    const token = jwt.sign({
                        userId: findAccounts[0]._id,
                        username: findAccounts[0].Username,
                        role: findAccounts[0].Role
                    }, jwtSecret)
                    // Set token as cookie:
                    res.cookie('authToken', token, {
                        httpOnly: true,      // Cannot access via JavaScript in browser (security)
                        // secure: false,        // Set true if using HTTPS
                        sameSite: 'lax',      // Protection against CSRF
                        // maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds (optional)
                    });
                    await LoginAttempt.deleteOne({ accountId:  findAccounts[0]._id });
                    return res.redirect('/');
                }
                if (findAccounts.length >= 2) {
                    req.session.multiALST = {
                        PhoneNumber: findAccounts[0].Phone_Number,
                        verified: true,
                        timestamp: Date.now()
                    };
                    const accountOptions = findAccounts.map(account => ({
                        userId: account._id,
                        username: account.Username,
                        // profile: account.Profile // adapt this field name to your schema
                        profile: account.Profile ? `/BusinessProfiles/${account.Profile}` : null
                    }));
                    return res.render('loginMultiAccountSelection.ejs', {
                        accounts: accountOptions

                    });
                }
                if (findeblockedAccount && failedfindAccounts.length > 0) {
                    // Case 1: Blocked + Wrong password accounts
                    for (const failedfindAccount of failedfindAccounts) {
                        await this.handleFailedLoginAttempt(failedfindAccount._id)
                    }
                    return res.render('log_in.ejs', { TheLoginFormValuesAndError, 
                        rateLimitError: "Invalid credentials or account temporarily locked." })
                }
                if (findeblockedAccount && failedfindAccounts.length === 0) {
                    // Case 2: All accounts are blocked
                    return res.render('log_in.ejs', { TheLoginFormValuesAndError, 
                        rateLimitError: "Too many login attempts. Please try again later." })
                } 
                if (!findeblockedAccount && failedfindAccounts.length > 0) {
                    // Case 3: Only wrong password accounts
                    for (const failedfindAccount of failedfindAccounts) {
                        await this.handleFailedLoginAttempt(failedfindAccount._id)
                    }
                    TheLoginFormValuesAndError.PasswordError = ["Incorrect phone number, username, or password."];
                    TheLoginFormValuesAndError.UsernameORPhoneNumberValue = UsernameOrPhoneNumber;
                    TheLoginFormValuesAndError.PasswordValue = '';
                    return res.render('log_in.ejs', { 
                        TheLoginFormValuesAndError, rateLimitError: null})
                }
            }
            return res.render('log_in.ejs', {
                TheLoginFormValuesAndError,
                rateLimitError: "Unexpected login error. Please try again."
            });
            
        } catch (err) {
            console.error('Error during login process:', err.message);
            const rateLimitError = "An unexpected server error occurred. Please try again.";
            return res.status(500).render('log_in.ejs', { TheLoginFormValuesAndError, rateLimitError });
        }

    }
    static isAccountBlocked = async (accountId) => {
        try {
            const loginAttempt = await LoginAttempt.findOne({ accountId: accountId });
            if (loginAttempt && loginAttempt.blockedUntil && loginAttempt.blockedUntil > new Date()) {
                return true; // Account is currently blocked
            }
            return false; // Not blocked
        } catch (err) {
            console.error('Error checking account block status:', err.message);
            return false; // Fail open on error
        }
    };

    static handleFailedLoginAttempt = async (accountId) => {
        const MAX_FAILED_LOGIN_ATTEMPTS = 10; // Your threshold from the code
        const ACCOUNT_BLOCK_DURATION_SECONDS = 5 * 60 * 60; // 5 hours in seconds, matches your code's 5 * 60 * 60 * 1000
        const now = new Date();
        const updatedAttempt = await LoginAttempt.findOneAndUpdate(
            { accountId: accountId },
            {
                $inc: { attemptCount: 1 },
                $set: { lastAttemptAt: now },
                $setOnInsert: { blockedUntil: null }
            },
            {
                upsert: true,// Create if not found
                new: true, // Return the updated document
            }
        );
    
        // If attempts reached threshold AND it's not currently blocked OR its block expired
        if (updatedAttempt.attemptCount >= MAX_FAILED_LOGIN_ATTEMPTS && (!updatedAttempt.blockedUntil || updatedAttempt.blockedUntil < now)) {
            const setUntilBlackTime = new Date(now.getTime() + ACCOUNT_BLOCK_DURATION_SECONDS * 1000);
            await LoginAttempt.updateOne(
                { _id: updatedAttempt._id },
                { $set: { blockedUntil: setUntilBlackTime } }
            );
        }
        return updatedAttempt;
    };  
    static multiAccountSelectionPostRequest = async (req, res) => {
        try {
            const sessionData = req.session.multiALST;
            const { userId } = req.body;
            // ✅ Step 1: Check session exists
            if (!sessionData || !sessionData.verified || !sessionData.PhoneNumber) {
                req.session.multiALSTError = "Unauthorized access or Session expired. Please restart login.";
                return res.redirect("/login");
            }


            // ✅ Step 2: Optional - Check timestamp (session expiry)
            const sessionAge = Date.now() - sessionData.timestamp;
            const maxSessionAge = 15 * 60 * 1000; // 15 minutes

            if (sessionAge > maxSessionAge) {
                req.session.multiALST = null; // Clear session
                req.session.multiALSTError = "Session expired. Please log in again.";
                return res.redirect("/login");
            }

            // ✅ Step 3: Validate submitted userId
            if (!userId || typeof userId !== 'string') {
                req.session.multiALSTError = "Invalid account selection.";
                return res.redirect("/login");
            }
            // ✅ Step 4: make sure the userId is valide for mongoose
            if (!ObjectId.isValid(userId)) {
                req.session.multiALSTError = "Something went wrong. Please try selecting your account again.";
                return res.redirect("/login");
            }

            // // ✅ Step 5: Find user by ID
            const selectedAccount = await Controller_Of_BusinessesMongoose.BusinessesModel.findById(userId);
            if (!selectedAccount) {
                req.session.multiALSTError = "Selected account not found.";
                return res.redirect("/login");
            }

            // // ✅ Step 6: Ensure the selected account matches the verified phone number
            if (selectedAccount.Phone_Number !== sessionData.PhoneNumber) {
                req.session.multiALSTError = "The account you selected doesn't match your session. Please try again.";
                return res.redirect("/login");

            }

            // ✅ Step 7: Create JWT payload and sign token
            const token = jwt.sign({
                userId: selectedAccount._id,
                username: selectedAccount.Username,
                role: selectedAccount.Role
            }, jwtSecret);

            res.cookie('authToken', token, {
                httpOnly: true,      // Cannot access via JavaScript in browser (security)
                // secure: false,        // Set true if using HTTPS
                sameSite: 'lax',      // Protection against CSRF
                // maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds (optional)
            });
            req.session.destroy(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    // session deleted, you can redirect or send a response
                    res.redirect('/'); // or wherever you want
                }
            });
            // return res.redirect("/"); // or wherever the user should land

        } catch (error) {
            console.error("Error in multiAccountSelectionPostRequest:", error);
            return res.status(500).send("Internal server error.");
        }

    }
}

module.exports = {
    Controller_Of_LogInController,
}
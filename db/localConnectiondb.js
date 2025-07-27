require('dotenv').config(); // at top
const mongoose = require('mongoose')

// create connection and db for failed login attempt
const FailedLoginAttemptDBConnection = mongoose.createConnection(process.env.FAILED_LOGIN_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false // ⚠️ don’t queue ops if disconnected

});

// i can skip the code but i just won’t see any console message telling you it’s connected.
FailedLoginAttemptDBConnection.on('connected', () => {
    console.log('LoginLogsDB connected');
});

// i can skip the code but i just won’t see any console message telling you if there is an error.
FailedLoginAttemptDBConnection.on('error', (err) => {
    console.error('LoginLogsDB connection error:', err);
});
FailedLoginAttemptDBConnection.on('disconnected', () => {
    console.warn('LoginLogsDB DB disconnected');
});
FailedLoginAttemptDBConnection.once('open', () => {
  console.log('MongoDB FailedLoginAttemptDB is fully open ✅');
});

process.on('SIGINT', async () => {
    await FailedLoginAttemptDBConnection.close();
    console.log('MongoDB FailedLoginAttemptDB disconnected on app termination');
    process.exit(0);
});


module.exports = {
    FailedLoginAttemptDBConnection
}
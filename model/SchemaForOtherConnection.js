const mongoose = require('mongoose');
const { FailedLoginAttemptDBConnection } = require('../db/localConnectiondb');

const failedLoginAttemptSchema = new mongoose.Schema({
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
        unique: true,
    },
    attemptCount: {
        type: Number,
        required: true,
        default: 1,
    },
    blockedUntil: {
        type: Date,
        default: null
    },
    lastAttemptAt: {
        type: Date,
        default: Date.now,
    } 
});

// ✅ Correct way to define TTL index
failedLoginAttemptSchema.index(
  { lastAttemptAt: 1 },
  { expireAfterSeconds: 12 * 60 * 60 } // 12 hours
);

const LoginAttempt = FailedLoginAttemptDBConnection.model('LoginAttempt', failedLoginAttemptSchema);

module.exports = {
    LoginAttempt
};

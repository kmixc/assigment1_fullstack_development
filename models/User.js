const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter username name'],
        trim: true,
        lowercase: true,
        unique: true
    },
    firstname: {
        type: String,
        required: [true, 'Please enter first name'],
        trim: true,
        lowercase: true
    },
    lastname: {
        type: String,
        alias: 'surname',
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        validate: function (value) {
            var passwordRegex = /^[A-Za-z0-9~#$%]+$/;
            return passwordRegex.test(value);
        },
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Duplicate Email"],
        trim: true,
        uppercase: true,
        //Custom validation
        validate: function (value) {
            var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test(value);
        }
    },
    type: {
        type: String,
        required: true,
        enum: ['admin', 'user']
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
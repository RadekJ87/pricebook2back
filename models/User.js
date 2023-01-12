import mongoose from 'mongoose';

const {Schema} = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    admin:{
        type: Boolean,
        default: false,
        required: true,
    },
    profilePic: {
        type: String,
        default: '',
    }
}, {timestamps: true});

export const User = mongoose.model('User', userSchema);
const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    },
    cedula: String,
    realm: String
},{collection : 'Usuarios', timestamps: true });

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};
  
userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}


module.exports = model('Usuario', userSchema);
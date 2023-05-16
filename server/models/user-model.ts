const {Schema, model} = require('mongoose');

const linkSchema = new Schema({
    name: String,
    url: String
});

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},

    name: {type: String},
    username: {type: String, unique: true, required: true},
    bio: {type: String},
    links: {type: [linkSchema]},
});

export default model('User', UserSchema);
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});

// The first argument is the name of the model (e.g., "User"), and the second argument is the schema.
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;

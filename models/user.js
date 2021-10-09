const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new Schema (
    {
        name: { type: String, required: true},
        email: { type: String, required: true, unqiue: true},
        password: { type: String, required: true },
        followers: [{ type: ObjectId, ref:"User" }],
        following: [{ type: ObjectId, ref:"User" }]

    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema);

module.exports = User;
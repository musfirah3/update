const { Schema, model, default: mongoose } = require('mongoose')

const userSchema = new Schema({
    role: {
        type: String,
        required: true,
        default: "user"
    }, username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profile: {
        type: String,
        default: "https://www.wolfhooker.com/wp-content/uploads/2019/02/293-2931307_account-avatar-male-man-person-profile-icon-profile-icons.png.jpeg"
    },
    joining: {
        type: Date,
        default: Date.now
    }
})

const user = model('user', userSchema)
module.exports = user
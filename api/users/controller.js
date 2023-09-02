const mongoose = require('mongoose')
require('dotenv').config()
const user = require('./model')
const { connect } = require('mongoose')
const { hash, compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')

// All user info
const UserInfo = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        const foundUser = await user.find()
        res.status(201).json(
            {
                Users:foundUser
            }
        )

    } catch (error) {
        res.status(500).json({
            message: "Error retrieving users information",
            error: error.message
        })

    }
}

// Login
const Login = async (req, res) => {
    const { email, password } = req.body

    try {
        await mongoose.connect(process.env.MONGO_URL)
        const CheckExistUser = await user.findOne({ email: email })
        if (!CheckExistUser) {
            res.status(404).json({
                message: "User not found"
            })
        }
        else {
            const decryptPassword = await compare(password, CheckExistUser.password)
            if (email == CheckExistUser.email && decryptPassword) {
                const token = sign(
                    {
                        id: CheckExistUser._id,
                        username: CheckExistUser.username,
                        email: CheckExistUser.email,
                        profile : CheckExistUser.profile,
                        role : CheckExistUser.role
                    }
                    ,
                    process.env.JWT_SECRET
                )

                res.json({
                    message: "Successfully Loggined",
                    token: token
                })
            }

            else {
                res.json({
                    message: "invalid Credentials"
                })
            }
        }

    }
    catch (error) {
        res.json({
            message: "Error Alert"
        })
    }
}

// SignUp
const SignUp = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        await mongoose.connect(process.env.MONGO_URL)
        // console.log("DB connected")

        const userExists = await user.exists({ email: email })
        if (userExists) {
            res.status(208).json({
                message: "User already exist"
            })
        }

        else {
           await user.create({username,email,password:await hash(password,12)})
        console.log("User Created")
        res.status(201).json({
            message:"Signup Successfully"
        })
        }


    }
    catch (error) {
        console.error("Error in SignUp:", error);
        res.status(500).json({
            message: "error"
        })
    }

}

// Get user information through user Email
const getUserByEmail = async (req, res) => {
    const {email}=req.params


    try {
        await mongoose.connect(process.env.MONGO_URL);
        const foundUserbyEmail = await user.findOne({ email: email })
      res.json({
        Users:foundUserbyEmail
      })

    } catch (error) {
        res.status(500).json({
            message: "Error retrieving users information",
        })

    }
}

// Get user information through user id
const getUserById = async (req, res) => {
    const _id = req.params.userid
    try {
        await connect(process.env.MONGO_URL);
        const foundUserbyId = await user.findById(_id)
        if (!foundUserbyId) {

            console.log(foundUserbyId)
            return res.status(404).json({
                message: "User not found"
            })
        } else {
            res.json({
                user: foundUserbyId
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Error retrieving users information",
            error: error.message
        })

    }
}

// Delete 
const deleteUser = async (req, res) => {
    const _id = req.params.userid;

    try {
        // Find the user and delete it
        const deletedUser = await user.findByIdAndRemove(_id);

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "User deleted successfully",
            user: deletedUser
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting user",
            error: error.message
        });
    }
};

// Update User
const updateUser = async (req, res) => {
    const _id = req.params.userid;
    const { profile, username } = req.body

    try {
        // Find the user and update it
        const updatedUser = await user.findOneAndUpdate({ _id }, {
            $set: {
                profile: profile,
                username: username

            }
        },
            { new: true } // This option returns the updated document instead of the original one
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }


        res.json({
            message: "User updated successfully",
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating user",
            error: error.message
        });
    }
}

module.exports = { UserInfo, Login, SignUp, getUserByEmail, getUserById, deleteUser, updateUser }
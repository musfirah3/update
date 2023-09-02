require('dotenv').config()
const nodemailer = require("nodemailer");
var Mailgen = require('mailgen');
const Orders = require('./model');
const { connect } = require("mongoose");

//demeMail
const placeOrder = async (req, res) => {
    const { email, customerName } = req.body;


    if (!email || !customerName) {
        res.status(403).json({ message: "Please Give your email" })
    }

    else {
        const config = {
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD
            }
        }
        try {
            const transporter = nodemailer.createTransport(config);


            var mailGenerator = new Mailgen({
                theme: 'default',
                product: {
                    // Appears in header & footer of e-mails
                    name: 'Mailgen Banoqabil',
                    link: 'https://mailgen.js/'
                }
            });

            var mailGenEmail = {
                body: {
                    name: customerName,
                    intro: 'Welcome to Mailgen! We\'re very excited to have you on board.',
                    table: {
                        data: [
                            {
                                name: customerName,
                                email: email,
                                token: "1234565"
                            }
                        ]
                    },
                    outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
                }
            };






            const response = {
                from: process.env.NODEMAILER_EMAIL, // sender address
                to: email, // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: mailGenerator.generate(mailGenEmail), // html body
            }




            await transporter.sendMail(response);
            res.json({ message: "Check your Email" })
        }

        catch (error) {
            res.status(500).json({ error })
        }
    }


}

// All order
const allOrders = async (req, res) => {
    try {
        await connect(process.env.MONGO_URL)
        const orders = await Orders.find()
        res.json({ orders })

    }

    catch (error) {
        res.json(500).json({ message: error.message })
    }

}

const trackOrder = async (req, res) => {
    const { _id } = req.params

    try {
        await connect(process.env.MONGO_URL)
        const order = await Orders.findOne({ _id })
        res.json({ order })
    }

    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//order placed
const addOrder = async (req, res) => {

    const { items, totalBill, customerAddress, customerContact, customerName, customerEmail,Status,Message } = req.body
    if (!items || !totalBill || !customerAddress || !customerContact || !customerName || !customerEmail) {
        res.status(403).json({ message: "Invalid Payload" })
    }

    else {
        try {
            await connect(process.env.MONGO_URL)
            const order = await Orders.create({ items, totalBill, customerAddress, customerContact, customerName, customerEmail,Status,Message })
            //Email
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.NODEMAILER_EMAIL,
                    pass: process.env.NODEMAILER_PASSWORD
                }
            });


            //Mail gen setup
            var mailGenerator = new Mailgen({
                theme: 'default',
                product: {
                    // Appears in header & footer of e-mails
                    name: 'Calzanda Shopping Mart',
                    link: 'https://mailgen.js/'
                }
            });




            await transporter.sendMail({
                from: process.env.NODEMAILER_EMAIL, // sender address
                to: customerEmail, // list of receivers
                subject: "Order Confirmation", // Subject line
                text: "Hello world?", // plain text body
                html: mailGenerator.generate({
                    body: {
                        name: customerName,
                        intro: 'Your Order is Confirmed! Thank You for Shopping with Calzanda! .Your One-Stop Shop for Groceries and More!',
                        table: {
                            data: [
                                {
                                    name: customerName,
                                    email: customerEmail,
                                    TrackingId: order._id,
                                    Address: customerAddress,
                                    Contact: customerContact
                                

                                }
                            ]
                        },
                        outro: 'Stay connected with us to receive updates on new arrivals, special promotions, and more. Until next time, happy shopping!'
                    }
                }), // html body
            });

            res.status(201).json({
                message: "Your order has been placed",
                TrackingId: order._id
            })
        }

        catch (error) {
            res.status(500).json((
                error.message
            ))
        }
    }
}

// update order
const UpdateOrder = async (req, res) => {
    const { _id, status } = req.body
    if (!_id) {
        res.status(403).json({
            message: "Missing Required Field"
        })
    }

    else {
        const filter = { _id };
        const update = { status };

        try {

            await connect(process.env.MONGO_URL)
            console.log(" UpdateOrder DB connected")

            await Orders.findOneAndUpdate(filter, update, {
                new: true
            });

            const updatestatus = await Orders.find()

            res.json({
                message: "Status Updated",
                Order: updatestatus
            })
        }
        catch (error) {
            res.status(404).json(
                {
                    message: error.messaage
                }
            )

        }
    }

}

module.exports = { placeOrder, allOrders, trackOrder, addOrder ,UpdateOrder}
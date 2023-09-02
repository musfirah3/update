const express = require('express')
const cors=require('cors')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const port = process.env.SERVER_PORT
const path = require('path')

const clientPath = path.join(__dirname, './client/dist')


app.use('/',express.static(clientPath))


app.use(express.json())
app.use(cors())
app.use('/api', require('./api/users/router'))
app.use('/api',require('./api/products/router'))
app.use('/api',require('./api/category/routes')) 
app.use('/api',require('./api/brands/router'))
app.use('/api', require('./api/orders/router'))

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/dist/index.html'))

})


mongoose.connect(process.env.MONGO_URL).then(() => console.log("DB Connected")).catch((err) => console.log("Something went wrong"))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

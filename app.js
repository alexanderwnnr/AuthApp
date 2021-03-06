const express = require('express')
const app = express()
const config = require('config')
const mongoose = require('mongoose')
const PORT = config.get('port') || 5000


app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/authRoute.js'))

async function start() {
try{
    await mongoose.connect(config.get('mongoDb'), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }) 
    app.listen(PORT, () => {console.log(`App has been started on port: ${PORT}...`)})
} 
catch (e) {
 console.log('Error', e.message)
 process.exit(1)
}
}
start()
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors');
const router = require('./routes');

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', router)

app.use((err, req, res, next) => {
    let code = 500
    let msg = `Internal Server Error`
    console.log(err);
    switch (err.name) {
        case `Email or Username and Password is Invalid`:
            code = 400
            msg = err.name
            break;
        case `Unathorized`:
            code = 401
            msg = err.name
            break;
        case `Invalid Input`:
            code = 401
            msg = err.name
            break;
        default:
            break;
    }

    res.status(code).json({
        msg
    })
})

app.listen(port, () => {
    console.log(`Bismillah lancar`, port)
})
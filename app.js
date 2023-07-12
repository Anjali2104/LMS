const express = require('express')
const cookieParser = require('cookie-parser');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTED_URL],
    credentials:true
}));
app.use(cookieParser());

app.use('/ping', (req,res) => {
    res.send('Pong');
})
app.all('*', (req,res) => {
    res.status(404).send('OOPS!! 404 page not found');
})

module.exports=app;
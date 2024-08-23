const express = require('express');
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser");


const app = express();
dotenv.config({
    path: '../.env'
})


// configuration
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())




// Routes register
const userRouter = require('../Server/routes/userRoutes');
const blogRouter = require('../Server/routes/blogRoutes');

app.get('/', (req, res) => {
    res.send("This is home page");
});

app.use('/api',userRouter);
app.use('/api',blogRouter );





app.listen( process.env.PORT, () => {
    console.log(`Server is running at port : ${process.env.PORT}`);
});
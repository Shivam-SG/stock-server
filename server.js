require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require('jsonwebtoken');
const authRoute = require("./router/auth");
const contactRoute = require("./router/contact");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middleware/error");
const contactForm = require("./controllers/contact");
const productRoutes = require("./router/productRoutes.js");
const userRoute = require('./router/userroutes.js')
const useContact = require('./router/contact.js')

const corsOptions = {
    origin:"http://localhost:5173",
    methods:"GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.post('/jwt', async(req, res) =>{
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '30d'
    })
    res.send({token});
})


app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/product", productRoutes);
app.use("/api/user", userRoute);
app.use("/api/contact", useContact);

app.use(errorMiddleware);

app.get("/", (req, res) =>{
    res.send("hello");
});

const PORT = 5000;

connectDb().then(() =>{
    app.listen(PORT, () => {
        console.log(`server is running: ${PORT}`);
    });
});

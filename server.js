const express = require("express");
const dovenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");

const app = express();
const port = process.env.PORT || 5555;
app.listen(port,()=>{
    console.log("Server is listening on port",port);
});
connectDb();
app.use(express.json());
app.get('/api',(req,res)=>{
    // api information here
    res.send("api route");
});

app.use("/api",require("./routes/urlRoutes"));
app.use(errorHandler);

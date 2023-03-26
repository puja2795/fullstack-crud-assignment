const express = require("express")
const {connection} = require("./db");
require("dotenv").config()
const {userRouter} = require("./routes/user.routes")
const {noteRouter} = require("./routes/notes.routes")
const {authMiddleware} = require("./middleware/auth.middleware")
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json())
app.use("/user",userRouter)
app.use(authMiddleware);
app.use("/notes",noteRouter)

app.listen(process.env.port, async() => {
    try{
        await connection
        console.log("connected to DB")
    }
    catch(err){
        console.log("Not able to connect to Mongo DB");
        console.log(err);
    }
    console.log(`Server is running at ${process.env.port}`);
})
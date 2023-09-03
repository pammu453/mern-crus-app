const express=require("express");
const mongoose=require("mongoose");
const cors=require('cors');
const app=express();

app.use(express.json());
app.use(cors());

const userRouter=require("./Routes/userRoutes.js")

mongoose.connect("mongodb+srv://javascript:javascript@cluster0.28csea6.mongodb.net/")
.then(()=>{
    console.log("Database connected succefully..!")
}).catch(()=>{
    console.log("Error whlie conneting to the database..!")
})

//Routes
app.use("/",userRouter)

app.listen(5000,()=>{
    console.log('Server is listing at port 5000!')
})
const express = require("express");
const User = require('../models/Users.js')

const userRouter = express.Router();

//CREATE USER
userRouter.post("/create", async (req, res) => {
    const { name, age, email } = req.body;
    const newUser = new User({ name, age, email });
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
})

//GET ALL USERS
userRouter.get("/read", async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

//GET ONE 
userRouter.get('/readOne/:userId', async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found with ID ' + req.params.userId });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  });

//UPDATE THE USER
userRouter.put("/update/:userId", async (req, res) => {
    const { userId } = req.params;
    const { name, age, email } = req.body
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { name, age, email },{new:true})
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

//DELETE THE USER
userRouter.delete("/delete/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        await User.findByIdAndDelete(userId)
        res.status(200).json({message:'Succefully deleted...!'});
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

module.exports = userRouter
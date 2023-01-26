const router = require("express").Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

//Register

router.post("/register", async(req,res) => {
    const { username, email, password } = req.body
    try {

    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
            username,
            email,
            password: hashedPassword
    })

    const user = await newUser.save();
    res.status(201).json(user._id);
      
    } catch (error) {
        res.status(500).json(error)
    }
})


//Login

router.post("/login", async(req,res) => {
    const { email, password } = req.body
    try {

        const user = await User.findOne({email: email})
        !user && res.status(400).json("Wrong username or password!")

        const validPassword = await bcrypt.compare(password, user.password)

        !validPassword && res.status(400).json("Wrong username or password!")

        res.status(200).json({_id:user._id, username: user.username});
        
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;
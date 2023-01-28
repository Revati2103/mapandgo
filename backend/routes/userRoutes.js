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

router.post("/login", async (req, res) => {
    try {
        //find user
        const foundUser = await User.findOne({ username: req.body.username });
        console.log({ foundUser })

        if (foundUser) {
            //if foundUser: compare entered password to stored/foundUser password.
            const validPassword = await bcrypt.compare(
                req.body.password,
                foundUser.password
            );
            if (validPassword) {
                //if both passwords match:
                res.status(200).json({ username: foundUser.username });
            } else {
                //if both passwords dont match:
                res.status(400).json({ err: "Incorrect username or password" });
            }
        } else {
            //if !foundUser:
            res.status(400).json({ err: "Incorrect username or password" });
        }

    } catch (error) {
        res.status(500).json({ error, test: 'test' });
    }
});

module.exports = router;
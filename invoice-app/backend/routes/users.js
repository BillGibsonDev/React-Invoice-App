const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { __RouterContext } = require('react-router');

// register
router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const { username, password, passwordConfirm} = req.body;

    if (!username || !password || !passwordConfirm)
    return res.status(400).json({errorMessasge: 'Please enter all fields!'});

    if (password.length < 6)
    return res.status(400).json({errorMessasge: 'Enter a password of atleast 6 characters!'});

    if (password !== passwordConfirm)
    return res.status(400).json({errorMessasge: 'Passwords do not match!'});


    // save a new user account
    const newUser = new User({
        username, password
    });

    const savedUser = newUser.save();

    // sign the toekn
    const token = jwt.sign (
        {
            username: savedUser._id,
        },
        process.env.JWT_SECRET
    );

    //send token in http cookie
    res.cookie("token", token, {
        httpOnly: true,
        
    })
    .send();
});

// log in
router.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // validate
      if (!username || !password)
        return res
          .status(400)
          .json({ errorMessage: "Please enter all required fields." });
  
      const existingUser = await User.findOne({ username });
      if (!existingUser)
        return res.status(401).json({ errorMessage: "Wrong username or password." });
  
      const passwordCorrect = existingUser.password;
      
      if (!passwordCorrect)
        return res.status(401).json({ errorMessage: "Wrong username or password." });
  
      //create the token
      const token = jwt.sign(
        {
          user: existingUser._id,
        },
        process.env.JWT_SECRET
      );
  
      // send the token in a HTTP-only cookie
  
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .send();
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  });
  //log out
  router.get("/logout", (req, res) => {
    res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
      })
      .send();
  });
  
  router.get("/loggedIn", (req, res) => {
    try {
      const token = req.cookies.token;
      if (!token) return res.json(false);
  
      jwt.verify(token, process.env.JWT_SECRET);
  
      res.send(true);
    } catch (err) {
      res.json(false);
    }
  });
module.exports = router;
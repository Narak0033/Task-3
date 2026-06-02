const express = require('express');
const app = express();

const jwt = require('jsonwebtoken')
require('dotenv').config();

app.use(express.json());

const JWT_SECRETE = process.env.JWT_SECRETE;

const PersonModel = require('./person_schema.js');
const dbconnect = require('./dbconnect.js');

// LOGIN API
app.post("/login", (req, res) => {
  console.log(req.body.email)
  console.log(req.body.password)
  console.log(req.body.role)

  PersonModel.find({ 
    "emailid": req.body.email, 
    "pass": req.body.password, 
    "role": req.body.role 
  })
    .then(getsearchdocument => {
      console.log(getsearchdocument)
      if (getsearchdocument.length > 0) {
        const token = jwt.sign(
          { email: req.body.email, role: req.body.role }, 
          JWT_SECRETE, 
          { expiresIn: '24h' }
        )
        return res.json({ token })
      }
      else {
        res.status(400).send("Invalid user")
      }
    })
});

app.listen(5003, () => {
    console.log('Authentication Service Server is running on PORT NO: 5003')
})
const express = require('express')
const app = express()

app.use(express.json())

// 1. STUDENT LOGIN - POST
app.post('/studentlogin', (req, res) => {
    res.send('Student login successful')
})

app.post('/submitassignment', (req, res) => {
    res.send('INSIDE STUDENT SUBMIT ASSIGNMENT API.');
});

// 2. VIEW ASSIGNMENT - GET
app.get('/viewassignment', (req, res) => {
    res.send('assignments 1')
})

// 3. STUDENT UPDATE PROFILE - PUT
app.put('/studentupdateprofile', (req, res) => {
    res.send('Student profile updated successfully')
})

app.listen(5001, () => {
    console.log('Student Microservice running on port 5001')
})
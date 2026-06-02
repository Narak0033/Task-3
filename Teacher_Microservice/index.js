const express = require('express')
const app = express()

app.use(express.json())

// 1. ADD ASSIGNMENT - POST
app.post('/addassignment', (req, res) => {
    res.send('Assignment added successfully')
})

// 2. SEARCH STUDENT - GET
app.get('/searchstudent', (req, res) => {
    res.send('Student found')
})

// 3. REMOVE ASSIGNMENT - DELETE
app.delete('/removeassignment', (req, res) => {
    res.send('Assignment 1 removed successfully')
})

app.listen(5002, () => {
    console.log('Teacher Microservice running on port 5002')
})

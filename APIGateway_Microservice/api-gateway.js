const express = require('express');
const app = express()
const httpProxy = require('http-proxy')
const proxy = httpProxy.createProxyServer();
const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRETE = process.env.JWT_SECRETE;

function authToken(req, res, next) {
    const header = req?.headers.authorization;
    const token = header && header.split(' ')[1];
    if (token == null) return res.status(401).json("Please send token");
    jwt.verify(token, JWT_SECRETE, (err, user) => {
        if (err) return res.status(403).json("Invalid token");
        req.user = user;
        next()
    })
}

function authRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json("Unauthorized");
        }
        next();
    }
}

// REPLACE with your actual EC2 Public IPs
const STUDENT_SERVICE  = 'http://STUDENT_EC2_PUBLIC_IP:5001';
const TEACHER_SERVICE  = 'http://TEACHER_EC2_PUBLIC_IP:5002';
const AUTH_SERVICE     = 'http://localhost:5003';
const REG_SERVICE = 'http://localhost:5004';

app.use('/student', authToken, authRole('student'), (req, res) => {
    console.log("INSIDE API GATEWAY STUDENT ROUTE")
    proxy.web(req, res, { target: STUDENT_SERVICE });
})

app.use('/teacher', authToken, authRole('teacher'), (req, res) => {
    console.log("INSIDE API GATEWAY TEACHER ROUTE")
    proxy.web(req, res, { target: TEACHER_SERVICE });
})

app.use('/auth', (req, res) => {
    proxy.web(req, res, { target: AUTH_SERVICE });
})

app.use('/regis', (req, res) => {
    proxy.web(req, res, { target: REG_SERVICE });
})

app.listen(4000, () => {
    console.log("API Gateway Service is running on PORT NO : 4000")
})

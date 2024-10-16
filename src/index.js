const express=require('express');
const bcrypt=require('bcrypt');
const app=express();
const path=require('path');
const collection=require('./config');
const { hash } = require('crypto');

app.use(express.json());

app.use(express.urlencoded({extended:false}));
app.set('view engine','ejs');

app.use(express.static("public"));

app.get('/',(req,res)=>{
    res.render("login");
});

app.get('/signup',(req,res)=>{
    res.render("signup");
});

app.post('/signup', async (req, res) => {
    const data = {
        name: req.body.username,
        email: req.body.email,
        password: req.body.password
    };
    try {
        const exist = await collection.findOne({ email: data.email });
        if (exist) {
            res.send("Email already exists. Please choose a different email.");
        } else {
            const saltRounds = 10;
            const hashPassword = await bcrypt.hash(data.password, saltRounds);
            data.password = hashPassword;
            const userdata = await collection.create(data);
            console.log("User registered:", userdata);
            res.redirect('/'); // Redirects to the login page after successful signup.
        }
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send("An error occurred during signup.");
    }
});


//login
app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const data = await collection.findOne({ email: email });
        console.log("Fetched user data:", data);
        if (data) {
            const isMatch = await bcrypt.compare(password, data.password);
            if (isMatch) {
                res.render("todo"); // Render the user's dashboard or a welcome page.
            } else {
                res.send("Invalid password");
            }
        } else {
            res.send("Invalid email");
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("An error occurred during login.");
    }
});

app.get('/login', (req, res) => {
    res.render('login'); // Make sure 'login' matches the name of the EJS file without the extension.
});


app.listen(3000,()=>{
    console.log("server is running on port 3000");
})
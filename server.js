const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB
const uri = 'mongodb+srv://chitikilamanikanta:82e1lvNxAAoZNfiy@cluster0.uywihhs.mongodb.net/mydb?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Define schema and model
const loginSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const Login = mongoose.model('Login', loginSchema);

// Handle form submission
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    console.log(`Received registration: Name: ${name}, Email: ${email}, Password: ${password}`);

    try {
        const newUser = new Login({ name, email, password });
        await newUser.save();
        res.send('Registration successful');
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send('Error saving user');
    }
});

// Render the index page
app.get('/', (req, res) => {
    res.render('index'); // This should match the file name in 'views'
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

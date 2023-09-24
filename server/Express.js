const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

// Configure session and cookie middleware
app.use(cookieParser());
app.use(
  session({
    secret: 'your-secret-key', // Replace with a secure secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set secure to true in production with HTTPS
  })
);

// ... other middleware and route handling ...

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

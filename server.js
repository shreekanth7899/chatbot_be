const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3001;

// Create a MySQL connection
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Test@123',
    database: 'dataset'
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Endpoint to get all books
app.get('/api', (req, res) => {
    // Perform a SELECT query to fetch all books from the database
    connection.query('SELECT * FROM books', (err, results) => {
        if (err) {
            console.error('Error fetching books from database:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});

// Endpoint to get a specific book by id
app.get('/books/:id', (req, res) => {
    const id = req.params.id;
    // Perform a SELECT query to fetch a specific book by its ID from the database
    connection.query('SELECT * FROM books WHERE id = ?', id, (err, results) => {
        if (err) {
            console.error('Error fetching book from database:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Book not found' });
            return;
        }
        res.json(results[0]);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
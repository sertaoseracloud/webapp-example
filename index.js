const express = require('express');
const sql = require('mssql');
const { DefaultAzureCredential } = require('@azure/identity');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Example route
app.get('/', (req, res) => {
    res.send('Hello, Azure Web App!');
});

// Example API route
app.get('/api/example', (req, res) => {
    res.json({ message: 'This is an example API endpoint.' });
});



// Update the query to access the "Products" table
app.get('/api/products', async (req, res) => {

    const server = process.env.AZURE_SQL_SERVER;
    const database = process.env.AZURE_SQL_DATABASE;
    const port = parseInt(process.env.AZURE_SQL_PORT);
    const authenticationType = process.env.AZURE_SQL_AUTHENTICATIONTYPE;

    const dbConfig = {
        server,
         port,
         database,
         authentication: {
             type: authenticationType
         },
         options: {
            encrypt: true
         }
    };
    
    try {
        // Connect to the database
        const pool = await sql.connect(dbConfig);

        // Query the "Products" table
        const result = await pool.request().query('SELECT * FROM Products');

        // Send the results as JSON
        res.json(result.recordset);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).send('Error querying the database');
    } finally {
        // Close the database connection
        sql.close();
    }
});
// Import the mssql package


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
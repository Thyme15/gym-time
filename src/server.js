import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

const app = express();

app.use(cors()); 
app.use(express.json()); 

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting to DB:', err);
        return;
    }
    console.log(`Connected DB: ${process.env.MYSQL_DATABASE}`);
});

// Testing Login - Success case
// method: post
// URL: http://localhost:3000/login
// body: raw JSON
// {
//   "email": "somchai@gymtime.com",
//   "password": "hashed_pw_001"
// }

// Testing Login - Failure case (Wrong password)
// method: post
// URL: http://localhost:3000/login
// body: raw JSON
// {
//   "email": "somchai@gymtime.com",
//   "password": "wrongpassword"
// }
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).send({ message: "Email and password are required" });
    }

    const query = `SELECT * FROM logInInformation WHERE login_email = ? AND login_password = ?`;
    connection.query(query, [email, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ message: "Internal Server Error" });
        }
        
        if (result.length > 0) {
            res.send({ status: "success", user: result[0] });
        } else {
            res.status(401).send({ status: "error", message: "Invalid credentials" });
        }
    });
});

// Testing Get All Products
// method: get
// URL: http://localhost:3000/products

// Testing Get All Products (Empty - if no products)
// method: get
// URL: http://localhost:3000/products
app.get('/products', (req, res) => {
    const query = `SELECT * FROM Product`;
    connection.query(query, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ message: "Internal Server Error" });
        }
        res.send(result);
    });
});


// Testing Search Products by Name
// method: get
// URL: http://localhost:3000/products/search?name=Whey

// Testing Search Products by Price Range
// method: get
// URL: http://localhost:3000/products/search?minPrice=500&maxPrice=1500
app.get('/products/search', (req, res) => {
    const { name, minPrice, maxPrice, desc } = req.query;

    let query = `SELECT * FROM Product WHERE 1=1`;
    const params = [];

    if (name) {
        query += ` AND product_name LIKE ?`;
        params.push(`%${name}%`);
    }
    if (minPrice) {
        query += ` AND product_price >= ?`;
        params.push(minPrice);
    }
    if (maxPrice) {
        query += ` AND product_price <= ?`;
        params.push(maxPrice);
    }
    if (desc) {
        query += ` AND product_desc LIKE ?`;
        params.push(`%${desc}%`);
    }

    connection.query(query, params, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ message: "Internal Server Error" });
        }
        res.send(result);
    });
});

// Testing Get Product by ID - Success
// method: get
// URL: http://localhost:3000/products/PRD001

// Testing Get Product by ID - Not Found
// method: get
// URL: http://localhost:3000/products/INVALID_ID
app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM Product WHERE product_ID = ?`;
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ message: "Internal Server Error" });
        }
        res.send(result);
    });
});

// Testing Insert a new Product - Case 1
// method: post
// URL: http://localhost:3000/products
// body: raw JSON
// {
//   "product_ID": "PRD011",
//   "product_name": "Test Product A",
//   "product_price": 100,
//   "product_desc": "Desc A",
//   "admin_ID": "ADM001"
// }

// Testing Insert a new Product - Case 2
// method: post
// URL: http://localhost:3000/products
// body: raw JSON
// {
//   "product_ID": "PRD012",
//   "product_name": "Test Product B",
//   "product_price": 200,
//   "product_desc": "Desc B",
//   "admin_ID": "ADM005"
// }
app.post('/products', (req, res) => {
    const { product_ID, product_name, product_price, product_desc, admin_ID } = req.body;
    const query = `INSERT INTO Product (product_ID, product_name, product_price, product_desc, admin_ID) 
                   VALUES (?, ?, ?, ?, ?)`;
    connection.query(query, [product_ID, product_name, product_price, product_desc, admin_ID], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ message: "Internal Server Error" });
        }
        res.send({ status: "success", message: "Product added successfully", details: result });
    });
});

// Testing Update Product Information - Case 1
// method: put
// URL: http://localhost:3000/products/PRD011
// body: raw JSON
// {
//   "product_name": "Updated Product A",
//   "product_price": 150,
//   "product_desc": "Updated Desc A"
// }

// Testing Update Product Information - Case 2
// method: put
// URL: http://localhost:3000/products/PRD012
// body: raw JSON
// {
//   "product_name": "Updated Product B",
//   "product_price": 250,
//   "product_desc": "Updated Desc B"
// }
app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { product_name, product_price, product_desc } = req.body;
    const query = `UPDATE Product SET product_name = ?, product_price = ?, product_desc = ? WHERE product_ID = ?`;
    connection.query(query, [product_name, product_price, product_desc, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ message: "Internal Server Error" });
        }
        res.send({ status: "success", message: "Product updated successfully" });
    });
});

// Testing Delete Product - Case 1
// method: delete
// URL: http://localhost:3000/products/PRD011

// Testing Delete Product - Case 2
// method: delete
// URL: http://localhost:3000/products/PRD012
app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Product WHERE product_ID = ?`;
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ message: "Internal Server Error" });
        }
        res.send({ status: "success", message: "Product deleted successfully" });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
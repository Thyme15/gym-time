import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import path from 'path';

const app = express();
app.use('/images', express.static('public/images'));

app.use(cors()); 
app.use(express.json()); 

app.use(express.static(path.join(process.cwd(), 'dist')));

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

// Testing Login
// method: POST
// URL: http://localhost:3000/login
// Success Response:
// { "status": "success", "user": { "email": "admin@gymtime.com", "role": "admin", ... } }
// Failure Response (Wrong password):
// { "status": "error", "message": "Invalid email or password" }
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).send({ message: "Email and password are required" });
    }

    const adminQuery = `
        SELECT l.login_email as email, l.role, l.admin_ID, 'admin' as type,
               a.admin_fname as f_name, a.admin_lname as l_name
        FROM logInInformation l
        JOIN AdminInfo a ON l.admin_ID = a.admin_ID
        WHERE l.login_email = ? AND l.admin_ID = ?`;
    
    connection.query(adminQuery, [email, password], (err, adminResult) => {
        if (err) {
            console.error(adminQuery, err);
            return res.status(500).send({ message: "Internal Server Error" });
        }
        
        if (adminResult.length > 0) {
            return res.send({ status: "success", user: adminResult[0] });
        } else {
            const userQuery = `SELECT user_email as email, 'user' as role, 'customer' as type, f_name, l_name FROM User WHERE user_email = ? AND password = ?`;
            
            connection.query(userQuery, [email, password], (err, userResult) => {
                if (err) {
                    console.error(userQuery, err);
                    return res.status(500).send({ message: "Internal Server Error" });
                }

                if (userResult.length > 0) {
                    res.send({ status: "success", user: userResult[0] });
                } else {
                    res.status(401).send({ status: "error", message: "Invalid email or password" });
                }
            });
        }
    });
});

// Testing Register
// method: POST
// URL: http://localhost:3000/register
// Success Response: { "status": "success", "message": "Registered successfully" }
// Failure Response: { "message": "Email or User ID already exists" }
app.post('/register', (req, res) => {
    const { firstname, lastname, address, email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).send({ message: "Required fields are missing" });
    }

    const userID = "USR" + Math.floor(Math.random() * 10000);
    const query = `INSERT INTO User (userID, f_name, l_name, user_email, password, house_number) VALUES (?, ?, ?, ?, ?, ?)`;
    
    connection.query(query, [userID, firstname, lastname, email, password, address], (err, result) => {
        if (err) {
            console.error("Register Error:", err);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).send({ message: "Email or User ID already exists" });
            }
            return res.status(500).send({ message: "Internal Server Error" });
        }
        
        if (result.affectedRows > 0) {
            res.send({ status: "success", message: "Registered successfully" });
        } else {
            res.status(400).send({ status: "error", message: "Registration failed" });
        }
    });
});

// Testing Get All Products
// method: GET
// URL: http://localhost:3000/products
// Success Response: [{ "product_ID": "PRD001", "product_name": "Raven Compression", ... }]
// Failure Response: { "message": "Internal Server Error" }
app.get('/products', (req, res) => {
    const query = `
        SELECT p.*, i.url AS product_image 
        FROM Product p
        LEFT JOIN Image i ON p.product_ID = i.product_ID
    `;
    connection.query(query, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ message: "Internal Server Error" });
        }
        res.send(result);
    });
});

// Testing Search Products
// method: GET
// URL: http://localhost:3000/products/search?name=Raven
// Success Response: [{ "product_ID": "PRD001", ... }]
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

// Testing Get Product by ID
// method: GET
// URL: http://localhost:3000/products/PRD001
app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT p.*, i.url AS product_image, s.quantity
        FROM Product p
        LEFT JOIN Image i ON p.product_ID = i.product_ID
        LEFT JOIN Stock s ON p.product_ID = s.product_ID
        WHERE p.product_ID = ?
    `;
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ message: "Internal Server Error" });
        }
        res.send(result);
    });
});

// Testing Admin Add Product
// method: POST
// URL: http://localhost:3000/admin/add
// Success Response: { "status": "success", "message": "Complete! ..." }
app.post('/admin/add', (req, res) => {
    const { productID, productName, price, description, quantity, image } = req.body;
    const adminID = 'ADM001'; 
    const productQuery = `INSERT INTO Product (product_ID, product_name, product_price, product_desc, admin_ID) 
                         VALUES (?, ?, ?, ?, ?)`;
    
    connection.query(productQuery, [productID, productName, price, description, adminID], (err, result) => {
        if (err) {
            console.error("Product Error:", err);
            return res.status(500).send({ message: "Error adding product basics" });
        }
        const stockID = ("S" + productID).substring(0, 10);
        const stockQuery = `INSERT INTO Stock (stock_ID, quantity, product_ID) VALUES (?, ?, ?)`;
        
        connection.query(stockQuery, [stockID, quantity, productID], (err) => {
            if (err) {
                console.error("Stock Error:", err);
            }
            const imageID = ("I" + productID).substring(0, 10);
            const imageQuery = `INSERT INTO Image (image_ID, description, url, product_ID) VALUES (?, ?, ?, ?)`;
            
            connection.query(imageQuery, [imageID, productName, image, productID], (err) => {
                if (err) {
                    console.error("Image Error:", err);
                    return res.status(500).send({ message: "Error adding product image" });
                }
                res.send({ status: "success", message: "Complete! Product, Stock, and Image recorded." });
            });
        });
    });
});

// Testing Admin Update Product
// method: PUT
// URL: http://localhost:3000/admin/mod/PRD001
app.put('/admin/mod/:id', (req, res) => {
    const { id } = req.params;
    const { product_name, product_price, product_desc, quantity, image_url } = req.body;
    const query = `UPDATE Product SET product_name = ?, product_price = ?, product_desc = ? WHERE product_ID = ?`;
    connection.query(query, [product_name, product_price, product_desc, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ message: "Error updating product" });
        }
        const stockQuery = `UPDATE Stock SET quantity = ? WHERE product_ID = ?`;
        connection.query(stockQuery, [quantity, id], (err) => {
            if (err) console.error("Stock update error:", err);
            const imgQuery = `UPDATE Image SET url = ? WHERE product_ID = ?`;
            connection.query(imgQuery, [image_url, id], (err) => {
                if (err) console.error("Image update error:", err);
                res.send({ status: "success", message: "Product updated completely!" });
            });
        });
    });
});

// Testing Delete Product
// method: DELETE
// URL: http://localhost:3000/products/PRD001
app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const deleteImage = `DELETE FROM Image WHERE product_ID = ?`;
    connection.query(deleteImage, [id], (err) => {
        if (err) console.error(err);
        const deleteStock = `DELETE FROM Stock WHERE product_ID = ?`;
        connection.query(deleteStock, [id], (err) => {
            if (err) console.error(err);
            const deleteProduct = `DELETE FROM Product WHERE product_ID = ?`;
            connection.query(deleteProduct, [id], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send({ message: "Error deleting product" });
                }
                res.send({ status: "success", message: "Deleted everything related to this product!" });
            });
        });
    });
});

// Catch-all handler: send back index.html for client-side routing
app.use((req, res) => {
    res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
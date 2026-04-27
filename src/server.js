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

    // 1. Check if user is an Admin using admin_ID as password
    //    Join logInInformation with AdminInfo so we can return name and admin_ID
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
            // Successfully logged in as Admin (password was admin_ID)
            return res.send({ status: "success", user: adminResult[0] });
        } else {
            // 2. Not an Admin? Check if user is a regular Customer (from User table)
            const userQuery = `SELECT user_email as email, 'user' as role, 'customer' as type, f_name, l_name FROM User WHERE user_email = ? AND password = ?`;
            
            connection.query(userQuery, [email, password], (err, userResult) => {
                if (err) {
                    console.error(userQuery, err);
                    return res.status(500).send({ message: "Internal Server Error" });
                }

                if (userResult.length > 0) {
                    // Successfully logged in as Customer
                    res.send({ status: "success", user: userResult[0] });
                } else {
                    // Not found in either table
                    res.status(401).send({ status: "error", message: "Invalid email or password" });
                }
            });
        }
    });
});

// Testing Register - Success case
// method: post
// URL: http://localhost:3000/register
// body: raw JSON
// {
//   "firstname": "John",
//   "lastname": "Doe",
//   "address": "123 Gym St.",
//   "email": "johndoe@example.com",
//   "password": "mypassword123"
// }

// Testing Register - Failure case (Email already exists)
// method: post
// URL: http://localhost:3000/register
// body: raw JSON
// {
//   "firstname": "Duplicate",
//   "lastname": "User",
//   "address": "456 Test Ave.",
//   "email": "somchai@gymtime.com", 
//   "password": "anypassword"
// }
app.post('/register', (req, res) => {
    const { firstname, lastname, address, email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).send({ message: "Required fields are missing" });
    }

    // Generate random userID (as it's NOT NULL in DB)
    const userID = "USR" + Math.floor(Math.random() * 10000);

    // Insert into User table (customers)
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

// Testing Admin Add Product - Success case
// method: post
// URL: http://localhost:3000/admin/add
// body: raw JSON
// {
//   "productID": "PRD999",
//   "productName": "Advanced Whey Protein",
//   "price": 1590,
//   "description": "Premium quality protein for rapid recovery.",
//   "quantity": 50,
//   "image": "https://images.example.com/whey.jpg"
// }

// Testing Admin Add Product - Failure case (Duplicate Product ID)
// method: post
// URL: http://localhost:3000/admin/add
// body: raw JSON
// {
//   "productID": "PRD001", 
//   "productName": "Duplicate Protein",
//   "price": 1200,
//   "description": "This will fail because PRD001 already exists.",
//   "quantity": 10,
//   "image": "https://images.example.com/fail.jpg"
// }
app.post('/admin/add', (req, res) => {
    // รับค่าจากหน้าบ้าน (ตัวแปรต้องตรงกับหน้า AdminAdd.jsx ของคุณ)
    const { productID, productName, price, description, quantity, image } = req.body;
    const adminID = 'ADM001'; // กำหนด Admin เบื้องต้นสั้นๆ
    // 1. บันทึกลงตาราง Product
    const productQuery = `INSERT INTO Product (product_ID, product_name, product_price, product_desc, admin_ID) 
                         VALUES (?, ?, ?, ?, ?)`;
    
    connection.query(productQuery, [productID, productName, price, description, adminID], (err, result) => {
        if (err) {
            console.error("Product Error:", err);
            return res.status(500).send({ message: "Error adding product basics" });
        }
        // 2. ถ้าบันทึกสินค้าสำเร็จ ให้บันทึกจำนวนสต็อกลงตาราง Stock
        const stockID = "STK_" + productID;
        const stockQuery = `INSERT INTO Stock (stock_ID, quantity, product_ID) VALUES (?, ?, ?)`;
        
        connection.query(stockQuery, [stockID, quantity, productID], (err) => {
            if (err) {
                console.error("Stock Error:", err);
                // เราไม่หยุดการทำงานที่นี่เผื่อจะไปต่อเรื่องรูปได้
            }
            // 3. บันทึกรูปภาพลงตาราง Image
            const imageID = "IMG_" + productID;
            const imageQuery = `INSERT INTO Image (image_ID, description, url, product_ID) VALUES (?, ?, ?, ?)`;
            
            connection.query(imageQuery, [imageID, productName, image, productID], (err) => {
                if (err) {
                    console.error("Image Error:", err);
                    return res.status(500).send({ message: "Error adding product image" });
                }
                
                // ถ้าสำเร็จทั้งหมด
                res.send({ status: "success", message: "Complete! Product, Stock, and Image recorded." });
            });
        });
    });
});


app.put('/admin/mod/:id', (req, res) => {
    const { id } = req.params;
    const { product_name, product_price, product_desc, quantity, image_url } = req.body;
    // 1. อัปเดตตาราง Product
    const query = `UPDATE Product SET product_name = ?, product_price = ?, product_desc = ? WHERE product_ID = ?`;
    connection.query(query, [product_name, product_price, product_desc, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ message: "Error updating product" });
        }
        // 2. อัปเดตจำนวนในตาราง Stock (ถ้ามีรหัสสินค้าในสต็อก)
        const stockQuery = `UPDATE Stock SET quantity = ? WHERE product_ID = ?`;
        connection.query(stockQuery, [quantity, id], (err) => {
            if (err) console.error("Stock update error:", err);
            
            // 3. อัปเดตรูปภาพในตาราง Image
            const imgQuery = `UPDATE Image SET url = ? WHERE product_ID = ?`;
            connection.query(imgQuery, [image_url, id], (err) => {
                if (err) console.error("Image update error:", err);
                
                res.send({ status: "success", message: "Product updated completely!" });
            });
        });
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

// Catch-all handler: send back index.html for client-side routing
app.use((req, res) => {
    res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import path from 'path';
import fs from 'fs';

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
// --- Success Case (User) ---
// method: POST | URL: http://localhost:3000/login
// body: { "email": "araya@gmail.com", "password": "hashed_u001" }

// --- Success Case (Admin) ---
// method: POST | URL: http://localhost:3000/login
// body: { "email": "somchai@gymtime.com", "password": "ADM001" }

// --- Fail Case (Wrong Password) ---
// method: POST | URL: http://localhost:3000/login
// body: { "email": "araya@gmail.com", "password": "wrongpassword" }
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
// --- Success Case ---
// method: POST | URL: http://localhost:3000/register
// body: { "firstname": "New", "lastname": "User", "address": "MUICT", "email": "new@test.com", "password": "pw123" }

// --- Fail Case (Duplicate Email) ---
// method: POST | URL: http://localhost:3000/register
// body: { "firstname": "Araya", "lastname": "Sombat", "address": "123", "email": "araya@gmail.com", "password": "any" }
app.post('/register', (req, res) => {
    const { firstname, lastname, address, email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).send({ message: "Required fields are missing" });
    }

    // 🕵️ เช็คก่อนว่า Email นี้มีคนใช้หรือยัง
    const checkQuery = `SELECT * FROM User WHERE user_email = ?`;
    connection.query(checkQuery, [email], (err, results) => {
        if (err) {
            console.error("Check Error:", err);
            return res.status(500).send({ message: "Internal Server Error" });
        }

        if (results.length > 0) {
            // ถ้าเจอ Email นี้แล้ว ให้บอกว่าซ้ำทันที
            return res.status(400).send({ status: "error", message: "This email is already in use!" });
        }

        // ✅ ถ้าไม่ซ้ำ ค่อยทำการบันทึก
        const userID = "USR" + Math.floor(Math.random() * 10000);
        const query = `INSERT INTO User (userID, f_name, l_name, user_email, password, house_number) VALUES (?, ?, ?, ?, ?, ?)`;
        
        connection.query(query, [userID, firstname, lastname, email, password, address], (err, result) => {
            if (err) {
                console.error("Register Error:", err);
                return res.status(500).send({ message: "Internal Server Error" });
            }
            
            if (result.affectedRows > 0) {
                res.send({ status: "success", message: "Registered successfully" });
            } else {
                res.status(400).send({ status: "error", message: "Registration failed" });
            }
        });
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
// Example params: ?name=Raven&minPrice=1000&maxPrice=5000
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
// --- Success Case ---
// method: POST | URL: http://localhost:3000/admin/add
// body: { "productID": "PRD555", "productName": "Super Gear", "price": 999, "quantity": 10, "description": "Cool item", "image": "http://link.com" }

// --- Fail Case (Duplicate ID) ---
// method: POST | URL: http://localhost:3000/admin/add
// body: { "productID": "PRD001", "productName": "Repeat", "price": 100, "quantity": 1, "description": "X", "image": "X" }
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
// --- Success Case ---
// method: PUT | URL: http://localhost:3000/admin/mod/PRD001
// body: { "product_name": "Raven V2", "product_price": 1350, "product_desc": "Better!", "quantity": 100, "image_url": "/images/new.png" }

// --- Fail Case (Non-existent ID) ---
// method: PUT | URL: http://localhost:3000/admin/mod/NONEXIST
// body: { "product_name": "Doesn't work" }
app.put('/admin/mod/:id', (req, res) => {
    const { id } = req.params;
    const { product_name, product_price, product_desc, quantity, image_url } = req.body;
    const query = `UPDATE Product SET product_name = ?, product_price = ?, product_desc = ? WHERE product_ID = ?`;
    connection.query(query, [product_name, product_price, product_desc, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ message: "Error updating product" });
        }

        // 🔍 เช็คว่ามีสินค้าถูกแก้ไขจริงไหม
        if (result.affectedRows === 0) {
            return res.status(404).send({ status: "error", message: "Product ID not found. No changes made." });
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
// --- Success Case ---
// method: DELETE | URL: http://localhost:3000/products/PRD001

// --- Fail Case (Invalid ID) ---
// method: DELETE | URL: http://localhost:3000/products/99999
app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    
    // Sequence of deletions to satisfy foreign key constraints:
    // 1. Image
    // 2. Stock
    // 3. Modify (History)
    // 4. Purchase (Transaction History)
    // 5. Finally, the Product itself
    
    const deleteImage = `DELETE FROM Image WHERE product_ID = ?`;
    connection.query(deleteImage, [id], (err) => {
        if (err) console.error("Image Delete Error:", err);
        
        const deleteStock = `DELETE FROM Stock WHERE product_ID = ?`;
        connection.query(deleteStock, [id], (err) => {
            if (err) console.error("Stock Delete Error:", err);
            
            const deleteModify = `DELETE FROM Modify WHERE product_ID = ?`;
            connection.query(deleteModify, [id], (err) => {
                if (err) console.error("Modify Delete Error:", err);
                
                const deletePurchase = `DELETE FROM Purchase WHERE product_ID = ?`;
                connection.query(deletePurchase, [id], (err) => {
                    if (err) console.error("Purchase Delete Error:", err);
                    
                    const deleteProduct = `DELETE FROM Product WHERE product_ID = ?`;
                    connection.query(deleteProduct, [id], (err, result) => {
                        if (err) {
                            console.error("Product Delete Error:", err);
                            return res.status(500).send({ message: "Error deleting product from database" });
                        }

                        if (result.affectedRows === 0) {
                            return res.status(404).send({ status: "error", message: "Product ID not found. No records deleted." });
                        }
                        
                        res.send({ status: "success", message: "Deleted all records related to this product!" });
                    });
                });
            });
        });
    });
});

// Catch-all handler:
app.use((req, res) => {
    const indexPath = path.join(process.cwd(), 'dist', 'index.html');
    
    // เช็คก่อนว่ามีไฟล์ใน dist ไหม (มีกรณีเดียวคือรันบน Production)
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        // ถ้าไม่มี (เช่นรันบน Dev mode) ให้บอกว่าหา API นี้ไม่เจอแทน
        res.status(404).send({ 
            status: "error", 
            message: `Route ${req.method} ${req.url} not found on this server.` 
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
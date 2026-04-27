import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus, Settings, Image as ImageIcon, Trash2 } from 'lucide-react';

export default function AdminMod() {
    const navigate = useNavigate();
    const { id } = useParams(); // รับ ID สินค้าจาก URL เช่น /admin/mod/PRD001

    const [productID, setProductID] = useState('');
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    // ดึงข้อมูลสินค้าเดิมมาแสดงตอนเปิดหน้า
    useEffect(() => {
        if (id) {
            fetch(`/api/products/${id}`)
                .then(res => res.json())
                .then(data => {
                    if (data && data.length > 0) {
                        const p = data[0];
                        setProductID(p.product_ID);
                        setProductName(p.product_name);
                        setPrice(p.product_price);
                        setDescription(p.product_desc);
                        // หมายเหตุ: สำหรับ quantity และ image อาจต้องเขียน API ดึงเพิ่มถ้าแยกตาราง
                    }
                });
        }
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/admin/mod/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    product_name: productName, 
                    product_price: price, 
                    product_desc: description 
                }),
            });
            const data = await response.json();
            if (data.status === 'success') {
                alert("Updated successfully!");
                navigate('/admin/mod/PRD-000');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
                const data = await response.json();
                if (data.status === 'success') {
                    alert("Deleted successfully!");
                    navigate('/admin/mod/PRD-000');
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    const sectionStyle = {
        backgroundColor: 'white',
        padding: '30px',
        marginBottom: '30px',
    };

    const labelStyle = {
        display: 'block',
        fontSize: '14px',
        color: '#666',
        marginBottom: '8px'
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '16px',
        boxSizing: 'border-box',
        marginBottom: '20px'
    };

    return (
        <div style={{ backgroundColor: '#c4bdb0', minHeight: '100vh', fontFamily: 'serif' }}>
            {/* Header */}
            <div style={{ backgroundColor: 'white', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd' }}>
                <h1 style={{ margin: 0, fontSize: '24px', letterSpacing: '1px' }}>HERCULES</h1>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <Plus size={24} style={{ cursor: 'pointer' }} onClick={() => navigate('/admin/add')} />
                    <Settings size={24} style={{ cursor: 'pointer' }} />
                </div>
            </div>

            {/* Content Area */}
            <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                    <h2 style={{ fontSize: '22px', margin: 0, fontWeight: 'normal' }}>
                        Modify product: {productName || id}
                    </h2>
                    <button 
                        onClick={handleDelete}
                        style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                    >
                        <Trash2 size={18} /> Delete Product
                    </button>
                </div>

                {/* Section 1: Product details */}
                <div style={sectionStyle}>
                    <label style={labelStyle}>Product ID:</label>
                    <input type="text" value={productID} disabled style={{ ...inputStyle, backgroundColor: '#f9f9f9', cursor: 'not-allowed' }} />

                    <label style={labelStyle}>Product Name:</label>
                    <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} style={inputStyle} />

                    <div style={{ display: 'flex', gap: '40px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={labelStyle}>Prices:</label>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} style={inputStyle} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={labelStyle}>Quantity:</label>
                            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} style={inputStyle} />
                        </div>
                    </div>

                    <label style={labelStyle}>Description:</label>
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        style={{ ...inputStyle, height: '150px', marginBottom: 0 }} 
                    />
                </div>

                {/* Section 2: Media */}
                <div style={sectionStyle}>
                    <h3 style={{ margin: '0 0 20px', fontWeight: 'normal', fontSize: '20px' }}>Media</h3>
                    <div 
                        style={{ 
                            border: '2px dashed #ccc', 
                            borderRadius: '8px', 
                            padding: '60px', 
                            textAlign: 'center',
                            cursor: 'pointer'
                        }}
                        onClick={() => {
                            const url = prompt("Enter new Image URL:", image);
                            if(url) setImage(url);
                        }}
                    >
                        {image ? (
                            <img src={image} style={{ maxWidth: '100%', maxHeight: '200px' }} alt="Preview" />
                        ) : (
                            <>
                                <ImageIcon size={48} color="#333" style={{ marginBottom: '10px' }} />
                                <div style={{ color: '#333', fontSize: '16px' }}>Change Image</div>
                            </>
                        )}
                    </div>
                </div>

                {/* Save Button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '40px' }}>
                    <button 
                        onClick={handleUpdate}
                        style={{ backgroundColor: '#56aced', color: 'white', padding: '12px 60px', border: 'none', borderRadius: '30px', fontSize: '18px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Update Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

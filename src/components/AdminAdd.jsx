import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Settings, Image as ImageIcon } from 'lucide-react';

export default function AdminAdd() {
    const navigate = useNavigate();
    const [productID, setProductID] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(''); // เก็บ URL รูปภาพ

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/admin/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    productID, 
                    productName: productID, // ใช้ ID เป็นชื่อชั่วคราว หรือเพิ่มช่องชื่อได้ครับ
                    price, 
                    quantity, 
                    description, 
                    image 
                }),
            });
            const data = await response.json();
            if (data.status === 'success') {
                alert("Saved successfully!");
                navigate('/admin');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const sectionStyle = {
        backgroundColor: 'white',
        padding: '30px',
        marginBottom: '30px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
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
                    <Plus size={24} style={{ cursor: 'pointer' }} />
                    <Settings size={24} style={{ cursor: 'pointer' }} />
                </div>
            </div>

            {/* Content Area */}
            <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
                
                <h2 style={{ fontSize: '22px', marginBottom: '25px', fontWeight: 'normal' }}>Add product</h2>

                {/* Section 1: Add product details */}
                <div style={sectionStyle}>
                    <label style={labelStyle}>Product ID:</label>
                    <input type="text" value={productID} onChange={(e) => setProductID(e.target.value)} style={inputStyle} />

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
                            const url = prompt("Enter Image URL:");
                            if(url) setImage(url);
                        }}
                    >
                        {image ? (
                            <img src={image} style={{ maxWidth: '100%', maxHeight: '200px' }} alt="Preview" />
                        ) : (
                            <>
                                <ImageIcon size={48} color="#333" style={{ marginBottom: '10px' }} />
                                <div style={{ color: '#333', fontSize: '16px' }}>Add File</div>
                            </>
                        )}
                    </div>
                </div>

                {/* Footer and Save Button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '40px' }}>
                    <button 
                        onClick={handleSubmit}
                        style={{
                            backgroundColor: '#56aced',
                            color: 'white',
                            padding: '12px 60px',
                            border: 'none',
                            borderRadius: '30px',
                            fontSize: '18px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

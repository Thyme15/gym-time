import { Settings, Plus, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminBar(prop) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user'); // ลบข้อมูลการ Login
        navigate('/login'); // กลับไปหน้า Login
    };

    return (
        <header style={{ width: '100%', fontFamily: 'sans-serif' }}>
            {/* --- 1. GREEN TOP BAR --- */}
            <div style={{ backgroundColor: 'rgba(121, 120, 70, 1)', height: '20px', width: '100%' }}></div>

            {/* --- 2. WHITE MAIN SECTION --- */}
            <div style={{ backgroundColor: 'white', padding: '20px 40px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>

                <h1 
                    onClick={() => navigate('/')}
                    style={{ margin: 0, color: 'black', fontSize: '32px', fontWeight: 'bold', letterSpacing: '2px', textAlign: 'left', flex: 1, textTransform: 'uppercase', cursor: 'pointer' }}>
                    {prop.title}
                </h1>

                <div style={{ display: 'flex', gap: '24px', cursor: 'pointer', flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Settings 
                        size={24} 
                        strokeWidth={1.5} 
                        onClick={() => navigate('/admin/mod/PRD001')} 
                    />
                    <Plus 
                        size={24} 
                        strokeWidth={1.5} 
                        onClick={() => navigate('/admin/add')} 
                    />
                    <LogOut 
                        size={24} 
                        strokeWidth={1.5} 
                        onClick={handleLogout} 
                        style={{ color: '#d9534f' }} // ใช้สีแดงเพื่อให้รู้ว่าเป็นปุ่มออก
                    />
                </div>

            </div>
        </header>
    )
}
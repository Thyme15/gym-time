import {Settings, Plus} from 'lucide-react';

export default function AdminBar(prop) {

    return(
        <header style={{ width: '100%', fontFamily: 'sans-serif'}}>
            {/* --- 1. GREEN TOP BAR --- */}
            <div style={{backgroundColor: 'rgba(121, 120, 70, 1)', height:'20px', width:'100%'}}></div>
            
            {/* --- 2. WHITE MAIN SECTION --- */}
            <div style={{ backgroundColor: 'white', padding: '20px 40px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px'}}>
                
                <h1 style={{margin: 0, color: 'black', fontSize: '32px', fontWeight: 'bold', letterSpacing: '2px', textAlign: 'left', flex: 1, textTransform: 'uppercase'}}>
                    {prop.title}
                </h1>

                <div style={{ display: 'flex', gap: '24px', cursor: 'pointer', flex: 1, justifyContent: 'flex-end'}}>
                    <Settings size={24} strokeWidth={1.5} />
                    <Plus size={24} strokeWidth={1.5} />
                </div>

            </div>
        </header>
    )
}
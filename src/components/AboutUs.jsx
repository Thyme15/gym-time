import Navbar from './ui/Nav-Bar';

export default function AboutUs() {
  const teamMembers = [
    {
      name: "Mr.Teethut Teerasathapornkul",
      nickname: "Thyme 6788235",
      role: "FOUNDER & CEO",
      email: "teethut.tee@student.mahidol.ac.th",
      image: "/images/Tam.jpg" 
    },
    {
      name: "Mr.Phoonyaphut Junsiri",
      nickname: "Shogun 6788063",
      role: "CO-FOUNDER & CTO",
      email: "phoonyaphat.jun@student.mahidol.ac.th",
      image: "/images/Shogun.jpg"
    },
    {
      name: "Ms.Pichayapa Jirapong",
      nickname: "Friend 6788028",
      role: "CO-FOUNDER & COO",
      email: "pichayapa.jir@student.mahidol.ac.th",
      image: "/images/Friend.jpg"
    },
    {
      name: "Ms.Barameeporn Niyomtrong",
      nickname: "Bam 6788072",
      role: "CO-FOUNDER & CFO",
      email: "barameeporn.niy@student.mahidol.ac.th",
      image: "/images/Bam.jpg"
    }
  ];

  return (
    <div style={{ 
      backgroundColor: '#cfccc2', 
      minHeight: '100vh', 
      position: 'relative', 
      overflow: 'hidden',
      paddingBottom: '100px' 
    }}>
      <Navbar title="HERCULES" />

      {/* --- REFRESHED UI/UX STYLING --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');

        .about-container {
          position: relative;
          z-index: 2;
          font-family: 'Inter', sans-serif;
        }

        .watermark {
          position: absolute;
          top: 55%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-10deg);
          font-size: 22vw;
          font-weight: 900;
          color: rgba(0, 0, 0, 0.03);
          white-space: nowrap;
          pointer-events: none;
          z-index: 1;
          user-select: none;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 80px 40px;
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
        }

        .team-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .image-wrapper {
          width: 280px;
          height: 350px;
          overflow: hidden;
          background-color: #a09c92;
          margin-bottom: 25px;
          position: relative;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transition: all 0.4s ease;
          /* This creates the 'Gold Frame' that starts invisible */
          outline: 0px solid #c9a22a;
          outline-offset: -15px;
        }

        .team-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.9); /* Starts slightly muted to make the hover 'pop' */
          transition: all 0.5s ease;
          cursor: pointer;
        }

        /* --- THE NEW INTERACTION IDEA --- */
        .team-card:hover .team-image {
          filter: brightness(1.1); /* Brightens up on hover */
          transform: scale(1.1);
        }
        
        .team-card:hover .image-wrapper {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          /* Shows a sharp gold frame inside the picture on hover */
          outline: 3px solid #c9a22a;
        }

        .member-role {
          font-size: 11px;
          font-weight: 800;
          color: #c9a22a; 
          letter-spacing: 2px;
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .interactive-text {
          color: #111;
          margin: 2px 0;
          transition: all 0.3s ease;
          cursor: pointer;
          text-decoration: none;
        }

        .interactive-text:hover {
          color: #c9a22a;
          transform: scale(1.05);
        }
      `}</style>

      <div className="watermark">HERCULES</div>

      <div className="about-container">
        <div style={{ textAlign: 'center', paddingTop: '80px', marginBottom: '60px' }}>
          <h1 style={{ 
            fontSize: '80px', 
            fontWeight: '900', 
            textTransform: 'uppercase', 
            margin: 0,
            letterSpacing: '-3px',
            lineHeight: '1'
          }}>
            About us
          </h1>
          <p style={{ fontSize: '14px', color: '#666', marginTop: '10px', letterSpacing: '2px', fontWeight: 'bold' }}>
            MAHIDOL UNIVERSITY • ICT • Web-Dev
          </p>
        </div>

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <div className="image-wrapper">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="team-image"
                  onError={(e) => {
                    e.target.src = `https://placehold.co/280x350/888/eee?text=${member.nickname.split(' ')[0]}`;
                  }}
                />
              </div>
              
              <span className="member-role">{member.role}</span>
              
              <h2 className="interactive-text" style={{ fontSize: '18px', fontWeight: '700' }}>
                {member.name}
              </h2>
              
              <p className="interactive-text" style={{ fontSize: '14px', opacity: 0.7, fontFamily: 'monospace' }}>
                {member.nickname}
              </p>

              <a href={`mailto:${member.email}`} className="interactive-text" style={{ fontSize: '12px', marginTop: '10px', textDecoration: 'underline' }}>
                {member.email}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
//END
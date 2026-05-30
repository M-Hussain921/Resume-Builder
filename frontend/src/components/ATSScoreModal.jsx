import './../styles/ATSScoreModal.css';

export default function ATSScoreModal({ data, onClose }) {
  
  const calculateATSScore = () => {
    let score = 0;
    let maxScore = 100;
    let details = [];
    
    const fullName = data.personal?.fullName || data.fullName;
    if (fullName && fullName !== 'YOUR NAME' && fullName !== '') {
      score += 5;
      details.push({ name: 'Full Name', status: '✅', points: 5, message: 'Name is present' });
    } else {
      details.push({ name: 'Full Name', status: '❌', points: 0, message: 'Please add your full name' });
    }
    
    const targetRole = data.personal?.targetJobRole || data.targetJobRole;
    if (targetRole && targetRole !== '' && targetRole !== 'Full Stack Developer') {
      score += 10;
      details.push({ name: 'Target Job Role', status: '✅', points: 10, message: 'Job role specified' });
    } else {
      details.push({ name: 'Target Job Role', status: '❌', points: 0, message: 'Add your target job role' });
    }
    
    const email = data.personal?.email || data.email;
    if (email && email !== '') {
      score += 5;
      details.push({ name: 'Email', status: '✅', points: 5, message: 'Email address added' });
    } else {
      details.push({ name: 'Email', status: '❌', points: 0, message: 'Add your email address' });
    }
    
    const phone = data.personal?.phone || data.phone;
    if (phone && phone !== '') {
      score += 5;
      details.push({ name: 'Phone', status: '✅', points: 5, message: 'Phone number added' });
    } else {
      details.push({ name: 'Phone', status: '❌', points: 0, message: 'Add your phone number' });
    }
    
    const location = data.personal?.location || data.location;
    if (location && location !== '') {
      score += 5;
      details.push({ name: 'Location', status: '✅', points: 5, message: 'Location added' });
    } else {
      details.push({ name: 'Location', status: '❌', points: 0, message: 'Add your location' });
    }
    
    const linkedin = data.personal?.linkedin || data.linkedin;
    if (linkedin && linkedin !== '') {
      score += 5;
      details.push({ name: 'LinkedIn', status: '✅', points: 5, message: 'LinkedIn profile added' });
    } else {
      details.push({ name: 'LinkedIn', status: '⚠️', points: 0, message: 'LinkedIn profile recommended' });
    }
    
    const github = data.personal?.github || data.github;
    if (github && github !== '') {
      score += 5;
      details.push({ name: 'GitHub', status: '✅', points: 5, message: 'GitHub profile added' });
    } else {
      details.push({ name: 'GitHub', status: '⚠️', points: 0, message: 'GitHub profile recommended' });
    }
    
    const summary = data.personal?.summary || data.summary;
    if (summary && summary !== '' && summary !== 'Briefly describe your professional background and key achievements...') {
      score += 10;
      details.push({ name: 'Professional Summary', status: '✅', points: 10, message: 'Summary added' });
    } else {
      details.push({ name: 'Professional Summary', status: '❌', points: 0, message: 'Add a professional summary' });
    }
    
    if (data.skills && data.skills.length > 0) {
      const points = Math.min(15, data.skills.length * 3);
      score += points;
      details.push({ name: 'Skills', status: '✅', points: points, message: `${data.skills.length} skills added` });
    } else {
      details.push({ name: 'Skills', status: '❌', points: 0, message: 'Add at least 3-5 skills' });
    }
    
    if (data.experience && data.experience.length > 0) {
      const completed = data.experience.filter(exp => exp.title && exp.company).length;
      const points = Math.min(15, completed * 5);
      score += points;
      details.push({ name: 'Work Experience', status: '✅', points: points, message: `${data.experience.length} experience(s) added` });
    } else {
      details.push({ name: 'Work Experience', status: '⚠️', points: 0, message: 'Add work experience (optional for freshers)' });
    }
    
    if (data.education && data.education.length > 0) {
      const completed = data.education.filter(edu => edu.degree && edu.institution).length;
      const points = Math.min(10, completed * 5);
      score += points;
      details.push({ name: 'Education', status: '✅', points: points, message: `${data.education.length} education(s) added` });
    } else {
      details.push({ name: 'Education', status: '❌', points: 0, message: 'Add your education details' });
    }
    
    if (data.projects && data.projects.length > 0) {
      const completed = data.projects.filter(proj => proj.name).length;
      const points = Math.min(10, completed * 3);
      score += points;
      details.push({ name: 'Projects', status: '✅', points: points, message: `${data.projects.length} project(s) added` });
    } else {
      details.push({ name: 'Projects', status: '⚠️', points: 0, message: 'Add projects (recommended)' });
    }
    
    return { score, maxScore, details };
  };
  
  const { score, maxScore, details } = calculateATSScore();
  const percentage = Math.round((score / maxScore) * 100);
  
  const getScoreColor = () => {
    if (percentage >= 80) return '#22c55e';
    if (percentage >= 60) return '#eab308';
    return '#ef4444';
  };
  
  const getSuggestion = () => {
    if (percentage >= 80) return 'Excellent! Your resume is ATS-friendly! 🎉';
    if (percentage >= 60) return 'Good! Just a few improvements needed. 👍';
    if (percentage >= 40) return 'Needs improvement. Add missing sections. 📝';
    return 'Please complete your resume for better ATS score. ⚠️';
  };
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📊 ATS Score Analysis</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        
        <div className="modal-body">
          <div className="score-circle-container">
            <div className="score-circle">
              <svg viewBox="0 0 100 100">
                <circle className="score-bg" cx="50" cy="50" r="45" />
                <circle 
                  className="score-fill" 
                  cx="50" cy="50" r="45"
                  style={{
                    strokeDasharray: 283,
                    strokeDashoffset: 283 - (percentage / 100) * 283,
                    stroke: getScoreColor()
                  }}
                />
              </svg>
              <div className="score-text">
                <span className="score-number">{percentage}%</span>
                <span className="score-label">ATS Score</span>
              </div>
            </div>
          </div>
          
          <div className="suggestion-box" style={{ background: `${getScoreColor()}10`, borderColor: getScoreColor() }}>
            <p>{getSuggestion()}</p>
          </div>
          
          <div className="score-details">
            <h3>Detailed Analysis</h3>
            {details.map((item, idx) => (
              <div key={idx} className="detail-item">
                <div className="detail-name">
                  <span className="detail-status">{item.status}</span>
                  <span>{item.name}</span>
                </div>
                <div className="detail-points">
                  <span className={`detail-points-value ${item.points > 0 ? 'positive' : 'negative'}`}>
                    {item.points > 0 ? `+${item.points}` : item.points}
                  </span>
                  <span className="detail-message">{item.message}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="tips-box">
            <h4>💡 Tips to Improve ATS Score:</h4>
            <ul>
              <li>Use standard section headings (Experience, Education, Skills)</li>
              <li>Include keywords from job description</li>
              <li>Use bullet points for achievements</li>
              <li>Avoid images, tables, and complex formatting</li>
              <li>Save your resume as a PDF for submission</li>
            </ul>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="btn-close-modal" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
import '../../styles/Sections/PersonalSection.css';

export default function PersonalSection({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  return (
    <div className="personal-section">
      <div className="form-group">
        <label className="form-label">
          Target Job Role <span className="required">*</span>
        </label>
        <input
          type="text"
          className="form-input"
          placeholder="e.g. Data Analyst, Full Stack Developer"
          value={data.targetJobRole || ''}
          onChange={(e) => handleChange('targetJobRole', e.target.value)}
          autoComplete="off"
          spellCheck={false}
        />
        <p className="form-hint">
          This is crucial for AI to optimize your resume keywords.
        </p>
      </div>

      <div className="form-group-checkbox">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={data.isFresher || false}
            onChange={(e) => handleChange('isFresher', e.target.checked)}
          />
          <span>I am a Student / Fresher looking for internship or first job</span>
        </label>
      </div>

      <div className="form-group">
        <label className="form-label">Full Name</label>
        <input
          type="text"
          className="form-input"
          placeholder="John Doe"
          value={data.fullName || ''}
          onChange={(e) => handleChange('fullName', e.target.value)}
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-input"
            placeholder="john@example.com"
            value={data.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Phone</label>
          <input
            type="tel"
            className="form-input"
            placeholder="+1 234 567 890"
            value={data.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-input"
            placeholder="City, Country"
            value={data.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <div className="form-group">
          <label className="form-label">LinkedIn Profile</label>
          <input
            type="text"
            className="form-input"
            placeholder="linkedin.com/in/john"
            value={data.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Github / Portfolio URL</label>
        <input
          type="text"
          className="form-input"
          placeholder="github.com/john or portfolio.com"
          value={data.github || ''}
          onChange={(e) => handleChange('github', e.target.value)}
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Professional Summary</label>
        <textarea
          className="form-textarea"
          rows="5"
          placeholder="Briefly describe your professional background and key achievements..."
          value={data.summary || ''}
          onChange={(e) => handleChange('summary', e.target.value)}
          autoComplete="off"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
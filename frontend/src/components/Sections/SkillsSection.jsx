import { useState } from 'react';
import { resumeApi } from '../../services/api';
import '../../styles/Sections/SkillsSection.css';

export default function SkillsSection({ skills, onAddSkill, onRemoveSkill }) {
  const [newSkill, setNewSkill] = useState('');
  const [apiLoading, setApiLoading] = useState(false);

  const addSkill = async () => {
    if (newSkill.trim()) {
      try {
        setApiLoading(true);
        await resumeApi.addSkill(newSkill.trim());
        onAddSkill(newSkill.trim());
        setNewSkill('');
      } catch (error) {
        console.error('Error adding skill to backend:', error);
        onAddSkill(newSkill.trim());
        setNewSkill('');
      } finally {
        setApiLoading(false);
      }
    }
  };

  const handleRemoveSkill = async (index) => {
    const skillToRemove = skills[index];
    try {
      setApiLoading(true);
      await resumeApi.removeSkill(skillToRemove);
      onRemoveSkill(index);
    } catch (error) {
      console.error('Error removing skill from backend:', error);
      onRemoveSkill(index);
    } finally {
      setApiLoading(false);
    }
  };

  return (
    <div className="skills-section">
      <h2 className="section-title">⚡ Technical Skills</h2>

      <div className="skills-input-group">
        <input
          type="text"
          className="form-input"
          placeholder="e.g., React.js, Python, Node.js..."
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addSkill()}
          disabled={apiLoading}
          autoComplete="off"
          spellCheck={false}
        />
        <button type="button" className="btn-add" onClick={addSkill} disabled={apiLoading}>
          {apiLoading ? '⏳ Adding...' : '+ Add Skill'}
        </button>
      </div>

      <div className="skills-list">
        {skills.map((skill, index) => (
          <div key={index} className="skill-tag">
            <span>{skill}</span>
            <button className="btn-remove-small" onClick={() => handleRemoveSkill(index)} disabled={apiLoading}>
              ×
            </button>
          </div>
        ))}
      </div>

      {skills.length === 0 && (
        <p className="empty-hint">No skills added. Click + Add Skill to add your skills.</p>
      )}
    </div>
  );
}
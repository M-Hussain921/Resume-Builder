import { useState } from 'react';
import { resumeApi } from '../../services/api';
import '../../styles/Sections/ProjectSection.css';

export default function ProjectSection({ projects = [], onAdd, onUpdate, onRemove }) {
  const [apiLoading, setApiLoading] = useState(false);

  if (!projects) {
    return <div className="empty-hint">Loading projects...</div>;
  }

  const handleAdd = async () => {
    const newProj = {
      name: '', description: '', technologies: '', link: ''
    };
    try {
      setApiLoading(true);
      const response = await resumeApi.addProject(newProj);
      console.log('Project added to backend:', response.data);
      onAdd();
    } catch (error) {
      console.error('Error adding project:', error);
      onAdd();
    } finally {
      setApiLoading(false);
    }
  };

  const handleUpdate = async (index, field, value) => {
    try {
      const currentProj = projects[index];

      const updatedProj = { ...currentProj, [field]: value };

      const projForBackend = {
        title: updatedProj.name,
        link: updatedProj.link,
        description: updatedProj.description
      };

      await resumeApi.updateProject(index, projForBackend);
      console.log('Project updated in backend');

      onUpdate(index, field, value);
    } catch (error) {
      console.error('Error updating project:', error);
      onUpdate(index, field, value);
    }
  };

  const handleRemove = async (index) => {
    if (!window.confirm('Remove this project?')) return;
    try {
      setApiLoading(true);
      await resumeApi.removeProject(index);
      console.log('Project removed from backend');
      onRemove(index);
    } catch (error) {
      console.error('Error removing project:', error);
      onRemove(index);
    } finally {
      setApiLoading(false);
    }
  };

  return (
    <div className="projects-section">
      <h2 className="section-title">🚀 Projects</h2>

      {projects.length === 0 && (
        <p className="empty-hint">No projects added yet. Click + Add Project to add your projects.</p>
      )}

      {projects.map((proj, index) => (
        <div key={index} className="form-card">
          <div className="card-header">
            <h3>Project #{index + 1}</h3>
            <button type="button" className="btn-remove" onClick={() => handleRemove(index)} disabled={apiLoading}>
              🗑 Remove
            </button>
          </div>

          <div className="form-group">
            <label className="form-label">Project Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., E-commerce Website"
              value={proj.name || ''}
              onChange={(e) => handleUpdate(index, 'name', e.target.value)}
              disabled={apiLoading}
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Technologies Used</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., React, Node.js, MongoDB"
              value={proj.technologies || ''}
              onChange={(e) => handleUpdate(index, 'technologies', e.target.value)}
              disabled={apiLoading}
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Project Link</label>
            <input
              type="text"
              className="form-input"
              placeholder="https://github.com/username/project"
              value={proj.link || ''}
              onChange={(e) => handleUpdate(index, 'link', e.target.value)}
              disabled={apiLoading}
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              rows="3"
              placeholder="Describe what the project does and your role..."
              value={proj.description || ''}
              onChange={(e) => handleUpdate(index, 'description', e.target.value)}
              disabled={apiLoading}
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        </div>
      ))}

      <button type="button" className="btn-add-section" onClick={handleAdd} disabled={apiLoading}>
        {apiLoading ? '⏳ Adding...' : '+ Add Project'}
      </button>
    </div>
  );
}
import { useState } from 'react';
import { resumeApi } from '../../services/api';
import '../../styles/Sections/ExperienceSection.css';

export default function ExperienceSection({
  experience,
  onAdd,
  onUpdate,
  onRemove
}) {
  const [apiLoading, setApiLoading] = useState(false);

  const handleAdd = async () => {
    const newExp = {
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
      isCurrentJob: false
    };

    try {
      setApiLoading(true);

      const response = await resumeApi.addExperience(newExp);

      console.log('Experience added to backend:', response.data);

      onAdd();
    } catch (error) {
      console.error('Error adding experience:', error);

      onAdd();
    } finally {
      setApiLoading(false);
    }
  };

  const handleUpdate = (index, field, value) => {
    onUpdate(index, field, value);

    resumeApi.updateExperience(index, {
      [field]: value
    }).catch(error => {
      console.error('Error updating experience:', error);
    });
  };

  const handleRemove = async (index) => {
    if (!window.confirm('Remove this experience?')) return;

    try {
      setApiLoading(true);

      await resumeApi.removeExperience(index);

      console.log('Experience removed from backend');

      onRemove(index);
    } catch (error) {
      console.error('Error removing experience:', error);

      onRemove(index);
    } finally {
      setApiLoading(false);
    }
  };

  const handleCurrentJobChange = (index, isChecked) => {
    handleUpdate(index, 'isCurrentJob', isChecked);

    if (isChecked) {
      handleUpdate(index, 'endDate', 'Present');
    } else {
      handleUpdate(index, 'endDate', '');
    }
  };

  return (
    <div className="experience-section">

      <h2 className="section-title">
        💼 Work Experience
      </h2>

      {experience.map((exp, index) => (
        <div key={index} className="form-card">

          <div className="card-header">
            <h3>
              Experience #{index + 1}
            </h3>

            <button
              type="button"
              className="btn-remove"
              onClick={() => handleRemove(index)}
              disabled={apiLoading}
            >
              🗑 Remove
            </button>
          </div>

          <div className="form-group">
            <label className="form-label">
              Job Title
            </label>

            <input
              type="text"
              className="form-input"
              placeholder="e.g., Senior Frontend Developer"
              value={exp.title || ''}
              onChange={(e) =>
                handleUpdate(index, 'title', e.target.value)
              }
              disabled={apiLoading}
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Company
            </label>

            <input
              type="text"
              className="form-input"
              placeholder="e.g., Google, Microsoft"
              value={exp.company || ''}
              onChange={(e) =>
                handleUpdate(index, 'company', e.target.value)
              }
              disabled={apiLoading}
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          <div className="form-row">

            <div className="form-group">
              <label className="form-label">
                Start Date
              </label>

              <input
                type="text"
                className="form-input"
                placeholder="e.g., Jan 2020 or 01/01/2020"
                value={exp.startDate || ''}
                onChange={(e) =>
                  handleUpdate(index, 'startDate', e.target.value)
                }
                disabled={apiLoading}
                autoComplete="off"
                spellCheck={false}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                End Date
              </label>

              <input
                type="text"
                className="form-input"
                placeholder="e.g., Dec 2022 or Present"
                value={exp.endDate || ''}
                onChange={(e) =>
                  handleUpdate(index, 'endDate', e.target.value)
                }
                disabled={apiLoading || exp.isCurrentJob}
                autoComplete="off"
                spellCheck={false}
              />
            </div>

          </div>

          <div className="form-group-checkbox">

            <label className="checkbox-label">

              <input
                type="checkbox"
                checked={exp.isCurrentJob || false}
                onChange={(e) =>
                  handleCurrentJobChange(index, e.target.checked)
                }
                disabled={apiLoading}
                autoComplete="off"
                spellCheck={false}
              />

              <span>
                I currently work here
              </span>

            </label>

          </div>

          <div className="form-group">

            <label className="form-label">
              Description
            </label>

            <textarea
              className="form-textarea"
              rows="3"
              placeholder="Describe your responsibilities and achievements..."
              value={exp.description || ''}
              onChange={(e) =>
                handleUpdate(index, 'description', e.target.value)
              }
              disabled={apiLoading}
              autoComplete="off"
              spellCheck={false}
            />

          </div>

        </div>
      ))}

      <button
        type="button"
        className="btn-add-section"
        onClick={handleAdd}
        disabled={apiLoading}
      >
        {apiLoading ? '⏳ Adding...' : '+ Add Experience'}
      </button>

      {experience.length === 0 && (
        <p className="empty-hint">
          No work experience added yet.
        </p>
      )}

    </div>
  );
}


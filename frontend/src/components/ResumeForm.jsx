import { useState } from 'react';
import { FaUser, FaBolt, FaBriefcase, FaGraduationCap, FaRocket } from "react-icons/fa";
import Disclaimer from './Disclaimer';
import PersonalSection from './sections/PersonalSection';
import SkillsSection from './sections/SkillsSection';
import ExperienceSection from './sections/ExperienceSection';
import EducationSection from './sections/EducationSection';
import ProjectSection from './sections/ProjectSection';
import '../styles/ResumeForm.css';

export default function ResumeForm({ data, onChange }) {
  const [activeSection, setActiveSection] = useState('personal');

  const personal = data.personal || {};
  const skills = data.skills || [];
  const experience = data.experience || [];
  const education = data.education || [];
  const projects = data.projects || [];

  const sections = [
    { id: 'personal', label: 'Personal', icon: <FaUser /> },
    { id: 'skills', label: 'Skills', icon: <FaBolt /> },
    { id: 'experience', label: 'Experience', icon: <FaBriefcase /> },
    { id: 'education', label: 'Education', icon: <FaGraduationCap /> },
    { id: 'projects', label: 'Projects', icon: <FaRocket /> }
  ];

  const handlePersonalChange = (field, value) => {
    onChange('personal', {
      ...personal,
      [field]: value
    });
  };

  const addSkill = (skill) => {
    onChange('skills', [...skills, skill]);
  };

  const removeSkill = (index) => {
    const updated = skills.filter((_, i) => i !== index);
    onChange('skills', updated);
  };

  const addExperience = () => {
    onChange('experience', [
      ...experience,
      {
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        description: '',
        isCurrentJob: false
      }
    ]);
  };

  const updateExperience = (index, field, value) => {
    const updated = experience.map((item, i) =>
      i === index
        ? {
            ...item,
            [field]: value
          }
        : item
    );

    onChange('experience', updated);
  };

  const removeExperience = (index) => {
    const updated = experience.filter((_, i) => i !== index);
    onChange('experience', updated);
  };

  const addEducation = () => {
    onChange('education', [
      ...education,
      {
        degree: '',
        institution: '',
        startYear: '',
        endYear: '',
        percentage: ''
      }
    ]);
  };

  const updateEducation = (index, field, value) => {
    const updated = education.map((item, i) =>
      i === index
        ? {
            ...item,
            [field]: value
          }
        : item
    );

    onChange('education', updated);
  };

  const removeEducation = (index) => {
    const updated = education.filter((_, i) => i !== index);
    onChange('education', updated);
  };

  const addProject = () => {
    onChange('projects', [
      ...projects,
      {
        name: '',
        description: '',
        technologies: '',
        link: ''
      }
    ]);
  };

  const updateProject = (index, field, value) => {
    const updated = projects.map((item, i) =>
      i === index
        ? {
            ...item,
            [field]: value
          }
        : item
    );

    onChange('projects', updated);
  };

  const removeProject = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    onChange('projects', updated);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <PersonalSection
            data={personal}
            onChange={handlePersonalChange}
          />
        );

      case 'skills':
        return (
          <SkillsSection
            skills={skills}
            onAddSkill={addSkill}
            onRemoveSkill={removeSkill}
          />
        );

      case 'experience':
        return (
          <ExperienceSection
            experience={experience}
            onAdd={addExperience}
            onUpdate={updateExperience}
            onRemove={removeExperience}
          />
        );

      case 'education':
        return (
          <EducationSection
            education={education}
            onAdd={addEducation}
            onUpdate={updateEducation}
            onRemove={removeEducation}
          />
        );

      case 'projects':
        return (
          <ProjectSection
            projects={projects}
            onAdd={addProject}
            onUpdate={updateProject}
            onRemove={removeProject}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="form-container">
      <div className="form-header-buttons">
        {sections.map(section => (
          <button
            key={section.id}
            className={`form-header-btn ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => setActiveSection(section.id)}
          >
            <span className="btn-icon">{section.icon}</span>
            <span className="btn-text">{section.label}</span>
          </button>
        ))}
      </div>

      <div className="form-content">
        {renderActiveSection()}
      </div>

      {activeSection === 'personal' && <Disclaimer />}
    </div>
  );
}

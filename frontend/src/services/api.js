import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

const RESUME_ID = 'my_resume_001';

export const resumeApi = {
  getResume: () => api.get(`/resumes/id/${RESUME_ID}`),
  
  createResume: (resumeData) => {
    let city = '', state = '';
    if (resumeData.personal?.location) {
      const parts = resumeData.personal.location.split(',');
      city = parts[0]?.trim() || '';
      state = parts[1]?.trim() || '';
    }

    const payload = {
      _id: RESUME_ID,
      resumeTitle: resumeData.personal?.fullName || 'My Resume',
      personalInfo: {
        phone: resumeData.personal?.phone || '',
        city: city,
        state: state,
        linkedInUrl: resumeData.personal?.linkedin || '',
        githubUrl: resumeData.personal?.github || '',
        summary: resumeData.personal?.summary || ''
      },
      skills: resumeData.skills || [],
      experience: (resumeData.experience || []).map(exp => ({
        company: exp.company,
        position: exp.title,
        startDate: exp.startDate,
        endDate: exp.endDate,
        isCurrentJob: exp.endDate === 'Present',
        description: exp.description
      })),
      education: (resumeData.education || []).map(edu => ({
        institution: edu.institution,
        degree: edu.degree,
        startDate: edu.startYear,
        endDate: edu.endYear
      })),
      projects: (resumeData.projects || []).map(proj => ({
        title: proj.name,
        link: proj.link,
        description: proj.description
      }))
    };
    
    return api.post('/resumes', payload);
  },
  
  updateResume: (resumeData) => {
    let city = '', state = '';
    if (resumeData.personal?.location) {
      const parts = resumeData.personal.location.split(',');
      city = parts[0]?.trim() || '';
      state = parts[1]?.trim() || '';
    }

    const payload = {
      personalInfo: {
        phone: resumeData.personal?.phone || '',
        city: city,
        state: state,
        linkedInUrl: resumeData.personal?.linkedin || '',
        githubUrl: resumeData.personal?.github || '',
        summary: resumeData.personal?.summary || ''
      },
      skills: resumeData.skills || [],
      experience: (resumeData.experience || []).map(exp => ({
        company: exp.company,
        position: exp.title,
        startDate: exp.startDate,
        endDate: exp.endDate,
        isCurrentJob: exp.endDate === 'Present',
        description: exp.description
      })),
      education: (resumeData.education || []).map(edu => ({
        institution: edu.institution,
        degree: edu.degree,
        startDate: edu.startYear,
        endDate: edu.endYear
      })),
      projects: (resumeData.projects || []).map(proj => ({
        title: proj.name,
        link: proj.link,
        description: proj.description
      }))
    };
    
    return api.put(`/resumes/id/${RESUME_ID}`, payload);
  },
  
  deleteResume: () => api.delete(`/resumes/id/${RESUME_ID}`),
  
  addSkill: (skill) => api.post(`/resumes/id/${RESUME_ID}/skills`, { skill }),
  removeSkill: (skill) => api.delete(`/resumes/id/${RESUME_ID}/skills`, { data: { skill } }),
  
  addExperience: (experience) => api.post(`/resumes/id/${RESUME_ID}/experience`, {
    company: experience.company,
    position: experience.title,
    startDate: experience.startDate,
    endDate: experience.endDate,
    description: experience.description
  }),
  updateExperience: (expIndex, experience) => api.put(`/resumes/id/${RESUME_ID}/experience/${expIndex}`, {
    company: experience.company,
    position: experience.position,
    startDate: experience.startDate,
    endDate: experience.endDate,
    description: experience.description
  }),
  removeExperience: (expIndex) => api.delete(`/resumes/id/${RESUME_ID}/experience/${expIndex}`),
  
  addEducation: (education) => api.post(`/resumes/id/${RESUME_ID}/education`, {
    institution: education.institution,
    degree: education.degree,
    startDate: education.startYear,
    endDate: education.endYear
  }),
  updateEducation: (eduIndex, education) => api.put(`/resumes/id/${RESUME_ID}/education/${eduIndex}`, {
    institution: education.institution,
    degree: education.degree,
    startDate: education.startDate,
    endDate: education.endDate
  }),
  removeEducation: (eduIndex) => api.delete(`/resumes/id/${RESUME_ID}/education/${eduIndex}`),
  
  addProject: (project) => api.post(`/resumes/id/${RESUME_ID}/projects`, {
    title: project.name,
    link: project.link,
    description: project.description
  }),
  updateProject: (projIndex, project) => api.put(`/resumes/id/${RESUME_ID}/projects/${projIndex}`, {
    title: project.title,
    link: project.link,
    description: project.description
  }),
  removeProject: (projIndex) => api.delete(`/resumes/id/${RESUME_ID}/projects/${projIndex}`),
};

export default api;
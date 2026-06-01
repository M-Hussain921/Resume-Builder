import express from 'express';
import {
  createResume,
  getResumeByUserId,
  getResumeById,
  getAllResumes,
  updateResume,
  updateResumeById,
  updatePersonalInfo,
  updateTemplateName,
  addSkill,
  removeSkill,
  addExperience,
  updateExperience,
  removeExperience,
  addEducation,
  updateEducation,
  removeEducation,
  addProject,
  updateProject,
  removeProject,
  deleteResume,
  deleteResumeById
} from '../controllers/resumeController.js';

const router = express.Router();

router.post('/', createResume);
router.get('/', getAllResumes);
router.get('/id/:id', getResumeById);
router.get('/user/:userId', getResumeByUserId);
router.put('/user/:userId', updateResume);
router.put('/id/:id', updateResumeById);
router.delete('/user/:userId', deleteResume);
router.delete('/id/:id', deleteResumeById);
router.patch('/user/:userId/personal-info', updatePersonalInfo);
router.patch('/user/:userId/template', updateTemplateName);
router.post('/user/:userId/skills', addSkill);
router.delete('/user/:userId/skills', removeSkill);
router.post('/user/:userId/experience', addExperience);
router.put('/user/:userId/experience/:expIndex', updateExperience);
router.delete('/user/:userId/experience/:expIndex', removeExperience);
router.post('/user/:userId/education', addEducation);
router.put('/user/:userId/education/:eduIndex', updateEducation);
router.delete('/user/:userId/education/:eduIndex', removeEducation);
router.post('/user/:userId/projects', addProject);
router.put('/user/:userId/projects/:projIndex', updateProject);
router.delete('/user/:userId/projects/:projIndex', removeProject);

export default router;
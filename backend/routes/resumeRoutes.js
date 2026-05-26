import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import * as resumeController from '../controllers/resumeController.js';

const router = express.Router();

router.use(protect);

router.post('/', resumeController.createResume);
router.get('/', resumeController.getAllResumes);
router.get('/user/:userId', resumeController.getResumeByUserId);
router.get('/id/:id', resumeController.getResumeById);
router.put('/user/:userId', resumeController.updateResume);
router.put('/id/:id', resumeController.updateResumeById);
router.delete('/user/:userId', resumeController.deleteResume);
router.delete('/id/:id', resumeController.deleteResumeById);

router.patch('/user/:userId/personal-info', resumeController.updatePersonalInfo);
router.patch('/user/:userId/template', resumeController.updateTemplateName);

router.post('/user/:userId/skills', resumeController.addSkill);
router.delete('/user/:userId/skills', resumeController.removeSkill);

router.post('/user/:userId/experience', resumeController.addExperience);
router.put('/user/:userId/experience/:expIndex', resumeController.updateExperience);
router.delete('/user/:userId/experience/:expIndex', resumeController.removeExperience);

router.post('/user/:userId/education', resumeController.addEducation);
router.put('/user/:userId/education/:eduIndex', resumeController.updateEducation);
router.delete('/user/:userId/education/:eduIndex', resumeController.removeEducation);

router.post('/user/:userId/projects', resumeController.addProject);
router.put('/user/:userId/projects/:projIndex', resumeController.updateProject);
router.delete('/user/:userId/projects/:projIndex', resumeController.removeProject);

export default router;
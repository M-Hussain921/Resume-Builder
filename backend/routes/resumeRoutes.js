import express from 'express';
import * as resumeController from '../controllers/resumeController.js';

const router = express.Router();

router.post('/', resumeController.createResume);
router.get('/id/:id', resumeController.getResumeById);
router.put('/id/:id', resumeController.updateResumeById);
router.delete('/id/:id', resumeController.deleteResumeById);

router.post('/id/:id/skills', resumeController.addSkill);
router.delete('/id/:id/skills', resumeController.removeSkill);

router.post('/id/:id/experience', resumeController.addExperience);
router.put('/id/:id/experience/:expIndex', resumeController.updateExperience);
router.delete('/id/:id/experience/:expIndex', resumeController.removeExperience);

router.post('/id/:id/education', resumeController.addEducation);
router.put('/id/:id/education/:eduIndex', resumeController.updateEducation);
router.delete('/id/:id/education/:eduIndex', resumeController.removeEducation);

router.post('/id/:id/projects', resumeController.addProject);
router.put('/id/:id/projects/:projIndex', resumeController.updateProject);
router.delete('/id/:id/projects/:projIndex', resumeController.removeProject);

export default router;
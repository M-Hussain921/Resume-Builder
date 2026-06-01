import mongoose from 'mongoose';
import Resume from '../models/Resume.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';

export const createResume = catchAsync(async (req, res, next) => {
  const { userId } = req.body;
  
  if (!userId) {
    return next(new AppError('UserId is required', 400));
  }

  const existingResume = await Resume.findOne({ userId });
  if (existingResume) {
    return next(new AppError('Resume already exists for this user! Use update instead.', 400));
  }

  const newResume = await Resume.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Resume created successfully!',
    data: newResume
  });
});

export const getResumeByUserId = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  
  if (!userId) {
    return next(new AppError('UserId is required', 400));
  }

  const resume = await Resume.findOne({ userId });
  
  if (!resume) {
    return next(new AppError('No resume found for this user. Create one first!', 404));
  }

  res.json({
    success: true,
    data: resume
  });
});

export const getResumeById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid resume ID', 400));
  }

  const resume = await Resume.findById(id);
  
  if (!resume) {
    return next(new AppError('Resume not found', 404));
  }

  res.json({
    success: true,
    data: resume
  });
});

export const getAllResumes = catchAsync(async (req, res, next) => {
  const resumes = await Resume.find().sort({ createdAt: -1 });
  
  res.json({
    success: true,
    count: resumes.length,
    data: resumes
  });
});

export const updateResume = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  
  if (!userId) {
    return next(new AppError('UserId is required', 400));
  }

  let resume = await Resume.findOne({ userId });
  
  if (!resume) {
    return next(new AppError('Resume not found for this user. Create one first!', 404));
  }

  resume = await Resume.findByIdAndUpdate(
    resume._id,
    req.body,
    { new: true, runValidators: true }
  );

  res.json({
    success: true,
    message: 'Resume updated successfully!',
    data: resume
  });
});

export const updateResumeById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid resume ID', 400));
  }

  const resume = await Resume.findByIdAndUpdate(
    id,
    req.body,
    { new: true, runValidators: true }
  );
  
  if (!resume) {
    return next(new AppError('Resume not found', 404));
  }

  res.json({
    success: true,
    message: 'Resume updated successfully!',
    data: resume
  });
});

export const updatePersonalInfo = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const { phone, city, state, linkedInUrl, githubUrl, summary } = req.body;
  
  const resume = await Resume.findOne({ userId });
  if (!resume) {
    return next(new AppError('Resume not found', 404));
  }

  if (phone) resume.personalInfo.phone = phone;
  if (city) resume.personalInfo.city = city;
  if (state) resume.personalInfo.state = state;
  if (linkedInUrl) resume.personalInfo.linkedInUrl = linkedInUrl;
  if (githubUrl) resume.personalInfo.githubUrl = githubUrl;
  if (summary) resume.personalInfo.summary = summary;
  
  await resume.save();

  res.json({
    success: true,
    message: 'Personal info updated!',
    data: resume.personalInfo
  });
});

export const updateTemplateName = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const { templateName } = req.body;
  
  if (!templateName) {
    return next(new AppError('Template name is required', 400));
  }

  const resume = await Resume.findOne({ userId });
  if (!resume) {
    return next(new AppError('Resume not found', 404));
  }

  resume.templateName = templateName;
  await resume.save();

  res.json({
    success: true,
    message: 'Template updated!',
    templateName: resume.templateName
  });
});

export const addSkill = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const { skill } = req.body;
  
  if (!skill) {
    return next(new AppError('Skill is required', 400));
  }

  const resume = await Resume.findOne({ userId });
  if (!resume) {
    return next(new AppError('Resume not found', 404));
  }

  if (!resume.skills.includes(skill)) {
    resume.skills.push(skill);
    await resume.save();
  }

  res.json({
    success: true,
    message: 'Skill added!',
    skills: resume.skills
  });
});

export const removeSkill = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const { skill } = req.body;
  
  const resume = await Resume.findOne({ userId });
  if (!resume) {
    return next(new AppError('Resume not found', 404));
  }

  resume.skills = resume.skills.filter(s => s !== skill);
  await resume.save();

  res.json({
    success: true,
    message: 'Skill removed!',
    skills: resume.skills
  });
});

export const addExperience = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const { company, position, startDate, endDate, isCurrentJob, description } = req.body;
  
  if (!company || !position || !startDate) {
    return next(new AppError('Company, position and start date are required', 400));
  }

  const resume = await Resume.findOne({ userId });
  if (!resume) {
    return next(new AppError('Resume not found', 404));
  }

  resume.experience.push({ company, position, startDate, endDate, isCurrentJob, description });
  await resume.save();

  res.json({
    success: true,
    message: 'Experience added!',
    experience: resume.experience
  });
});

export const updateExperience = catchAsync(async (req, res, next) => {
  const { userId, expIndex } = req.params;
  const { company, position, startDate, endDate, isCurrentJob, description } = req.body;
  
  const resume = await Resume.findOne({ userId });
  if (!resume) {
    return next(new AppError('Resume not found', 404));
  }

  const index = parseInt(expIndex);
  if (index < 0 || index >= resume.experience.length) {
    return next(new AppError('Invalid experience index', 400));
  }

  if (company) resume.experience[index].company = company;
  if (position) resume.experience[index].position = position;
  if (startDate) resume.experience[index].startDate = startDate;
  if (endDate) resume.experience[index].endDate = endDate;
  if (isCurrentJob !== undefined) resume.experience[index].isCurrentJob = isCurrentJob;
  if (description) resume.experience[index].description = description;
  
  await resume.save();

  res.json({
    success: true,
    message: 'Experience updated!',
    experience: resume.experience
  });
});

export const removeExperience = catchAsync(async (req, res, next) => {
  const { userId, expIndex } = req.params;
  
  const resume = await Resume.findOne({ userId });
  if (!resume) {
    return next(new AppError('Resume not found', 404));
  }

  const index = parseInt(expIndex);
  if (index < 0 || index >= resume.experience.length) {
    return next(new AppError('Invalid experience index', 400));
  }

  resume.experience.splice(index, 1);
  await resume.save();

  res.json({
    success: true,
    message: 'Experience removed!',
    experience: resume.experience
  });
});

export const addEducation = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const { institution, degree, startDate, endDate } = req.body;
  
  if (!institution || !degree) {
    return next(new AppError('Institution and degree are required', 400));
  }

  const resume = await Resume.findOne({ userId });
  if (!resume) {
    return next(new AppError('Resume not found', 404));
  }

  resume.education.push({ institution, degree, startDate, endDate });
  await resume.save();

  res.json({
    success: true,
    message: 'Education added!',
    education: resume.education
  });
});

export const updateEducation = catchAsync(async (req, res, next) => {
  const { userId, eduIndex } = req.params;
  const { institution, degree, startDate, endDate } = req.body;
  
  const resume = await Resume.findOne({ userId });
  if (!resume) {
    return next(new AppError('Resume not found', 404));
  }

  const index = parseInt(eduIndex);
  if (index < 0 || index >= resume.education.length) {
    return next(new AppError('Invalid education index', 400));
  }

  if (institution) resume.education[index].institution = institution;
  if (degree) resume.education[index].degree = degree;
  if (startDate) resume.education[index].startDate = startDate;
  if (endDate) resume.education[index].endDate = endDate;
  
  await resume.save();

  res.json({
    success: true,
    message: 'Education updated!',
    education: resume.education
  });
});

export const removeEducation = catchAsync(async (req, res, next) => {
  const { userId, eduIndex } = req.params;
  
  const resume = await Resume.findOne({ userId });
  if (!resume) {
    return next(new AppError('Resume not found', 404));
  }

  const index = parseInt(eduIndex);
  if (index < 0 || index >= resume.education.length) {
    return next(new AppError('Invalid education index', 400));
  }

  resume.education.splice(index, 1);
  await resume.save();

  res.json({
    success: true,
    message: 'Education removed!',
    education: resume.education
  });
});

export const addProject = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const { title, link, description } = req.body;
  
  if (!title) {
    return next(new AppError('Project title is required', 400));
  }

  const resume = await Resume.findOne({ userId });
  if (!resume) {
    return next(new AppError('Resume not found', 404));
  }

  resume.projects.push({ title, link, description });
  await resume.save();

  res.json({
    success: true,
    message: 'Project added!',
    projects: resume.projects
  });
});

export const updateProject = catchAsync(async (req, res, next) => {
  const { userId, projIndex } = req.params;
  const { title, link, description } = req.body;
  
  const resume = await Resume.findOne({ userId });
  if (!resume) {
    return next(new AppError('Resume not found', 404));
  }

  const index = parseInt(projIndex);
  if (index < 0 || index >= resume.projects.length) {
    return next(new AppError('Invalid project index', 400));
  }

  if (title) resume.projects[index].title = title;
  if (link !== undefined) resume.projects[index].link = link;
  if (description) resume.projects[index].description = description;
  
  await resume.save();

  res.json({
    success: true,
    message: 'Project updated!',
    projects: resume.projects
  });
});

export const removeProject = catchAsync(async (req, res, next) => {
  const { userId, projIndex } = req.params;
  
  const resume = await Resume.findOne({ userId });
  if (!resume) {
    return next(new AppError('Resume not found', 404));
  }

  const index = parseInt(projIndex);
  if (index < 0 || index >= resume.projects.length) {
    return next(new AppError('Invalid project index', 400));
  }

  resume.projects.splice(index, 1);
  await resume.save();

  res.json({
    success: true,
    message: 'Project removed!',
    projects: resume.projects
  });
});

export const deleteResume = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  
  const resume = await Resume.findOne({ userId });
  if (!resume) {
    return next(new AppError('Resume not found', 404));
  }

  await Resume.deleteOne({ _id: resume._id });

  res.json({
    success: true,
    message: 'Resume deleted successfully!'
  });
});

export const deleteResumeById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid resume ID', 400));
  }

  const resume = await Resume.findByIdAndDelete(id);
  
  if (!resume) {
    return next(new AppError('Resume not found', 404));
  }

  res.json({
    success: true,
    message: 'Resume deleted successfully!'
  });
});
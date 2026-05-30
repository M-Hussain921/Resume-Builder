import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  resumeTitle: {
    type: String,
    default: 'My Resume'
  },
  templateName: {
    type: String,
    default: "Modern"
  },
  personalInfo: {
    phone: String,
    city: String,
    state: String,
    linkedInUrl: String,
    githubUrl: String,
    summary: String
  },
  skills: [String],
  experience: [{
    company: String,
    position: String,
    startDate: String,
    endDate: String,
    isCurrentJob: Boolean,
    description: String
  }],
  education: [{
    institution: String,
    degree: String,
    startDate: String,
    endDate: String
  }],
  projects: [
    {
      title: String,
      link: String,
      description: String,
    },
  ],
}, { timestamps: true });

export default mongoose.model("Resume", resumeSchema);
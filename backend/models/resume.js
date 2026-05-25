import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true
  },
  resumeTitle: { 
    type: String, 
    required: true, 
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
    startDate: Date,
    endDate: Date,
    isCurrentJob: Boolean,
    description: String
  }],

  education: [{
    institution: String,
    degree: String,
    startDate: Date,
    endDate: Date
  }],
   projects: [
      {
        title: {
          type: String,
          required: true,
        },
        link: {
          type: String,
        },
        description: {
          type: String,
        },
      },
    ],
}, { timestamps: true });

export default mongoose.model("Resume", resumeSchema);
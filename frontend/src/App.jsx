import { useState, useEffect } from 'react';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import Navbar from './components/Navbar';
import { resumeApi } from './services/api';
import { downloadResumeAsPDF } from './utils/pdfGenerator';
import './styles/App.css';

function App() {
  const [resumeData, setResumeData] = useState({
    personal: {
      fullName: '',
      targetJobRole: '',
      isFresher: false,
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      summary: '',
    },
    skills: [],
    experience: [],
    education: [],
    projects: []
  });

  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [deleteStatus, setDeleteStatus] = useState('');

  useEffect(() => {
    loadResume();
  }, []);

  const loadResume = async () => {
    try {
      setLoading(true);

      const response = await resumeApi.getResume();

      if (response.data && response.data.data) {
        const backendData = response.data.data;

        setResumeData({
          personal: {
            fullName: backendData.resumeTitle?.replace(' - Resume', '') || '',
            targetJobRole: backendData.targetJobRole || '',
            isFresher: backendData.isFresher || false,
            email: backendData.personalInfo?.email || '',
            phone: backendData.personalInfo?.phone || '',
            location: [
              backendData.personalInfo?.city,
              backendData.personalInfo?.state
            ]
              .filter(Boolean)
              .join(', '),

            linkedin: backendData.personalInfo?.linkedInUrl || '',
            github: backendData.personalInfo?.githubUrl || '',
            summary: backendData.personalInfo?.summary || '',
          },

          skills: backendData.skills || [],

          experience: (backendData.experience || []).map(exp => ({
            title: exp.position || '',
            company: exp.company || '',
            startDate: exp.startDate || '',
            endDate: exp.endDate || '',
            description: exp.description || '',
            isCurrentJob: exp.isCurrentJob || false
          })),

          education: (backendData.education || []).map(edu => ({
            degree: edu.degree || '',
            institution: edu.institution || '',
            startYear: edu.startDate || '',
            endYear: edu.endDate || '',
            percentage: edu.percentage || ''
          })),

          projects: (backendData.projects || []).map(proj => ({
            name: proj.title || '',
            technologies: proj.technologies || '',
            description: proj.description || '',
            link: proj.link || ''
          }))
        });

        console.log('Resume loaded successfully');
      }
    } catch (error) {
      console.error('Error loading resume:', error);

      if (error.response?.status === 404) {
        await createNewResume();
      }
    } finally {
      setLoading(false);
    }
  };

  const createNewResume = async () => {
    try {
      const basicResumeData = {
        personal: {
          fullName: '',
          targetJobRole: '',
          isFresher: false,
          email: '',
          phone: '',
          location: '',
          linkedin: '',
          github: '',
          summary: '',
        },
        skills: [],
        experience: [],
        education: [],
        projects: []
      };

      await resumeApi.createResume(basicResumeData);

      console.log('New resume created');

      setTimeout(() => {
        loadResume();
      }, 500);

    } catch (error) {
      console.error('Error creating resume:', error.response?.data || error);
    }
  };

  // ✅ FIXED HANDLER
  const handleResumeChange = (section, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: value
    }));
  };

  const handleSave = async () => {
    try {
      setSaveStatus('saving');

      await resumeApi.updateResume(resumeData);

      setSaveStatus('success');

      setTimeout(() => {
        setSaveStatus('');
      }, 2000);

      console.log('Resume saved successfully');

    } catch (error) {
      console.error('Error saving resume:', error);

      setSaveStatus('error');

      setTimeout(() => {
        setSaveStatus('');
      }, 2000);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your resume? This action cannot be undone!'
    );

    if (!confirmDelete) return;

    try {
      setDeleteStatus('deleting');

      await resumeApi.deleteResume();

      setDeleteStatus('success');

      setResumeData({
        personal: {
          fullName: '',
          targetJobRole: '',
          isFresher: false,
          email: '',
          phone: '',
          location: '',
          linkedin: '',
          github: '',
          summary: '',
        },
        skills: [],
        experience: [],
        education: [],
        projects: []
      });

      setTimeout(() => {
        setDeleteStatus('');
      }, 2000);

      console.log('Resume deleted successfully');

    } catch (error) {
      console.error('Error deleting resume:', error);

      setDeleteStatus('error');

      setTimeout(() => {
        setDeleteStatus('');
      }, 2000);
    }
  };

  const handleDownloadPDF = () => {
    const fileName = resumeData.personal?.fullName || 'resume';

    downloadResumeAsPDF('resume-paper', fileName);
  };

  return (
    <div className="app-wrapper">

      <Navbar
        onSave={handleSave}
        onDelete={handleDelete}
        onDownloadPDF={handleDownloadPDF}
        saveStatus={saveStatus}
        deleteStatus={deleteStatus}
      />

      <div className="main-container">

        <div className="left-side">
          <div className="left-side-box">

            {loading ? (
              <div style={{ textAlign: 'center', padding: '50px' }}>
                Loading resume...
              </div>
            ) : (
              <ResumeForm
                data={resumeData}
                onChange={handleResumeChange}
              />
            )}

          </div>
        </div>

        <div className="right-side">
          <ResumePreview data={resumeData} />
        </div>

      </div>
    </div>
  );
}

export default App;
import { FaSave, FaTrash, FaFilePdf, FaRegSave, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { MdOutlineFormatAlignLeft } from 'react-icons/md';
import '../styles/Navbar.css';

export default function Navbar({ 
  onSave, 
  onDelete, 
  onDownloadPDF, 
  saveStatus, 
  deleteStatus 
}) {
  
  const getSaveButtonContent = () => {
    if (saveStatus === 'saving') {
      return (
        <>
          <FaSpinner className="icon-spinner" /> Saving...
        </>
      );
    }
    if (saveStatus === 'success') {
      return (
        <>
          <FaCheckCircle /> Saved!
        </>
      );
    }
    return (
      <>
        <FaSave /> Save
      </>
    );
  };

  const getDeleteButtonContent = () => {
    if (deleteStatus === 'deleting') {
      return (
        <>
          <FaSpinner className="icon-spinner" /> Deleting...
        </>
      );
    }
    if (deleteStatus === 'success') {
      return (
        <>
          <FaCheckCircle /> Deleted!
        </>
      );
    }
    return (
      <>
        <FaTrash /> Delete
      </>
    );
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <MdOutlineFormatAlignLeft className="logo-icon" />
          <span className="logo-text">Resume Builder</span>
        </div>
        
        <div className="nav-buttons">
          <button 
            className={`nav-btn save-btn ${saveStatus}`} 
            onClick={onSave} 
            disabled={saveStatus === 'saving'}
          >
            {getSaveButtonContent()}
          </button>
          
          <button 
            className={`nav-btn delete-btn ${deleteStatus}`} 
            onClick={onDelete} 
            disabled={deleteStatus === 'deleting'}
          >
            {getDeleteButtonContent()}
          </button>
          
          <button 
            className="nav-btn download-btn" 
            onClick={onDownloadPDF}
          >
            <FaFilePdf /> PDF
          </button>
        </div>
      </div>
    </nav>
  );
}
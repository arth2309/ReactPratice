import { useRef,useState } from "react";
import Header from "../analysis/header/Header";
import "./Resumeupload.css";
import { ReactComponent as Arrow } from "../../assests/img/arrow-dropdown.svg";

const Resumeupload = () => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the first selected file
    if (file) {
      // Handle the selected file here (e.g., upload to server, process, etc.)
      console.log('Selected file:', file);
      setSelectedFile(file);
    }
  };

  return (
    <>
      <Header />
      <div className="d-flex justify-content-between px-1 my-1 ">
        <div className="d-flex align-items-center text-orange">
          <Arrow height="12px" color="#F96332" style={{ rotate: "90deg" }} />
          <div> Back</div>
        </div>
        <div>
          <select>
            <option>Manage Resume For Your CV</option>
          </select>
        </div>
      </div>
      <div className="border-bottom"></div>
      <div className="d-flex  justify-content-center">
        {
            !selectedFile ?   <div className="upload-card d-flex flex-column align-items-center">
            <h4>Do you already have a Resume/CV?</h4>
            <div>If so please attach it and use our Resume Booster to identify missing skills based on your career preferences</div>
            <div className="mt-1">the file must be pdf and less than 10MB</div>
            <button className="mt-1" onClick={handleButtonClick}><strong>Upload Resume/CV</strong></button>
            <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }} // Hide the file input element
        onChange={handleFileChange}
      />
        </div> :

<div>
{selectedFile && (
  <embed
    src={URL.createObjectURL(selectedFile)}
    type="application/pdf"
    width="100%"
   
  />
)}
</div>

        }
       
        
      </div>
    </>
  );
};

export default Resumeupload;

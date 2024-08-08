import { useRef, useState, useEffect,useContext} from "react";
import Header from "../../components/layout/header/Header";
import "./Resumeupload.css";
import { ReactComponent as Arrow } from "../../assests/img/arrow-dropdown.svg";
import {
  uploadFile,
  fetchFile,
  deleteFile,
  updateFile,
} from "../../services/ResumeService";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/AuthContext";
import {ToastContainer} from 'react-toastify';

const Resumeupload = () => {


  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("manage");
  const authCtx = useContext(AuthContext);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
   // eslint-disable-next-line
  }, []);
  const fetchData = async () => {
    if(authCtx.userData)
    {
      const result = await fetchFile(authCtx.userData.Id);
      if (result) {
        setSelectedFileUrl(result);
      }
    }
    
  };

  const deleteResume = async () => {
    if(authCtx.userData)
      {
    const result = await deleteFile(authCtx.userData.Id);
    if (result) {
      setSelectedFileUrl(null);
    }
  }
  };

  const handleSelectOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);

    if (event.target.value === "delete") {
      deleteResume();
      setSelectedOption("manage");
    }

    if (event.target.value === "download" && selectedFileUrl !== null) {
      const link = document.createElement("a");
      link.href = selectedFileUrl;
      link.download = "Resume.pdf";
      link.click();
      setSelectedOption("manage");
    }

    if (event.target.value === "update") {
      updateResume();
      setSelectedOption("manage");
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      
        fileInputRef.current?.click();
      }
    
  };

  const updateResume = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file && authCtx.userData) {
      if (selectedFileUrl !== null) {
        const result = await updateFile(authCtx.userData.Id, { file });
        setSelectedFileUrl(result);
        
      }
       else 
      {
        await uploadFile({ file },authCtx.userData.Id);
        const url = URL.createObjectURL(file);
        setSelectedFileUrl(url);
        
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#DBEFFA",
        height: selectedFileUrl === null ? "100vh" : "100%",
      }}
    >
     <ToastContainer />
      <Header />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div className="d-flex justify-content-between px-1 my-1 ">
        <div
          className="d-flex align-items-center text-orange"
          onClick={() => navigate("/")}
        >
          <Arrow
            height="12px"
            color="#F96332"
            style={{ rotate: "90deg", marginRight: "5px" }}
          />
          <div>
            <strong>Back</strong>
          </div>
        </div>
        <div>
          <select value={selectedOption} onChange={handleSelectOption}>
            <option value="manage">Manage Your Resume/CV</option>
            {selectedFileUrl ? (
              <>
                <option value="update">Update</option>
                <option value="download">Download</option>
                <option value="delete">Delete</option>
              </>
            ) : null}
          </select>
        </div>
      </div>
      <div className="border-bottom"></div>
      <div className="d-flex  justify-content-center">
        {selectedFileUrl === null ? (
          <div className="upload-card d-flex flex-column align-items-center ">
            <h4>Do you already have a Resume/CV?</h4>
            <div>
              If so please attach it and use our Resume Booster to identify{" "}
            </div>
            <div>missing skills based on your career preferences</div>
            <div className="mt-1" style={{ fontSize: "14px" }}>
              the file must be pdf and less than 10MB
            </div>
            <button style={{ marginTop: "45px" }} onClick={handleButtonClick}>
              
                <strong>Upload Resume/CV</strong>
            </button>
          </div>
        ) : (
          <div
            className="text-align-center"
            style={
              selectedFileUrl === null
                ? { marginTop: "160px" }
                : { marginTop: "120px" }
            }
          >
            {selectedFileUrl !== null && (
              <div>
                {/* eslint-disable-next-line */}
                <a href={selectedFileUrl} target="_blank">
                  View PDF in another Tab
                </a>
                <embed
                  src={selectedFileUrl}
                  width="100%"
                  className="mt-1"
                  height="700px"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Resumeupload;

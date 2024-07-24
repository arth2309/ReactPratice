import { useRef, useState, useEffect, CSSProperties } from "react";
import Header from "../analysis/header/Header";
import "./Resumeupload.css";
import { ReactComponent as Arrow } from "../../assests/img/arrow-dropdown.svg";
import { uploadFile, fetchFile, deleteFile , updateFile } from "../../API/apiClient";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

const Resumeupload = () => {
  const override: CSSProperties = {
    borderWidth: "5px",
    width: "20px",
    height: "20px",
  };

  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("manage");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const result = await fetchFile(1);
    if (result) {
      setSelectedFileUrl(result);
      console.log(result);
    }
  };

  const deleteResume = async () => {
    const result = await deleteFile(1);
    if (result) {
      setSelectedFileUrl(null);
    }
  };


  const handleSelectOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);

    if (event.target.value === "delete") {
      deleteResume();
      setSelectedOption('manage')
    }

    if(event.target.value === "download" && selectedFileUrl !== null)
    {
        
        const link = document.createElement("a");
        link.href = selectedFileUrl;
        link.download = 'Resume.pdf';
        link.click();
        setSelectedOption('manage');
    }

    if(event.target.value === "update")
    {
        console.log('hii');
        updateResume();
        setSelectedOption('manage');
    }

  
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        fileInputRef.current?.click();
      }, 2000);
    }
  };

  const updateResume = () => {

    
        fileInputRef.current?.click();

  }



  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {

        if(selectedFileUrl !== null)
        {
            const result = await updateFile(1,{file});
            setSelectedFileUrl(result);
        }
        else
        {
            await uploadFile({ file });
            const url = URL.createObjectURL(file);
            setSelectedFileUrl(url);
        }
     
    }
  };

  

  return (
    <div style={{ backgroundColor: '#DBEFFA',height : selectedFileUrl === null ? '100vh' : '100%'}}>
      <Header />
      <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
      <div className="d-flex justify-content-between px-1 my-1 ">
        <div className="d-flex align-items-center text-orange" onClick={() => navigate("/")}>
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
            {selectedFileUrl ? (<>
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
              {loading ? (
                <ClipLoader color="white" cssOverride={override} />
              ) : (
                <strong>Upload Resume/CV</strong>
              )}
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

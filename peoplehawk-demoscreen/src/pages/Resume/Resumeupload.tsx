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
import { generatePath, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../store/AuthContext";
import { ToastComponent } from "../../components/layout/ToastComponent/Toastcomponent";
import {styled} from 'styled-components';
import { OptionTypes } from "../../interface/Interface";
import { ReactSelect } from "../../components/layout/form/Select";
import { ROUTES } from "../../constants/routes";


const Container = styled.div`
  background-color : #DBEFFA;
  height : 100%;
  min-height : 100vh;
`
const NavigateContainer = styled.div`
display : flex;
justify-content : space-between;
padding : 0px 12px;
margin : 20px 0px 0px 0px;`


const BackButton = styled.div`
display : flex;
align-items : center;
color : #F96332;
cursor : pointer;
svg{
    path {
      fill: #F96332! important;
    }
   
  }
`
const UploadButton = styled.button`
   background-color: #F96332;
    border: none;
    color: white;
    padding: 12px 33px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 4px 2px;
    width: -moz-fit-content;
    width: fit-content;
    cursor: pointer;
    border-radius: 16px;
    margin-top : 45px`

const Resumeupload = () => {

  const [isDisabled,setIsDisabled] = useState<boolean>(true);
  const option : OptionTypes[] = [{label : 'Update',value : 'update', isDisabled : isDisabled},{label :'Download', value :'download',isDisabled :isDisabled },{label : 'Delete',value : 'delete',isDisabled : isDisabled}]

  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<OptionTypes | null>(null);
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
        setIsDisabled(false);
      }
    }
    
  };

  const deleteResume = async () => {
    if(authCtx.userData)
      {
    const result = await deleteFile(authCtx.userData.Id);
    if (result) {
      setSelectedFileUrl(null);
      setIsDisabled(true);
    }
  }
  };

  const handleSelectOption = (field: string, value: any) => {
    if (value.value === "delete") {
      deleteResume();
      setSelectedOption(null);
    }

    if (value.value === "download" && selectedFileUrl !== null) {
      const link = document.createElement("a");
      link.href = selectedFileUrl;
      link.download = "Resume.pdf";
      link.click();
      setSelectedOption(null);
    }

    if (value.value === "update") {
      updateResume();
      setSelectedOption(null);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      
        fileInputRef.current?.click();
        setIsDisabled(false);
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
      if (selectedFileUrl) {
        const result = await updateFile(authCtx.userData.Id, { file });
        setSelectedFileUrl(result);
        setIsDisabled(false);
      }
       else 
      {
        await uploadFile({ file },authCtx.userData.Id);
        const url = URL.createObjectURL(file);
        setSelectedFileUrl(url);
        
      }
    }
  };
  const {userId} = useParams<{userId : string}>();
  return (
    <Container
    >
     <ToastComponent />
      <Header />
      <input
        type="file"
        ref={fileInputRef}
        className="d-none"
        onChange={handleFileChange}
      />
      <NavigateContainer>
        <BackButton onClick={() => navigate(generatePath(ROUTES.HOME,{userId: 2}))}>
          <Arrow
            className="arrow"
          />
          <div>
            <strong>Back</strong>
          </div>
        </BackButton>
        <div>

          <ReactSelect
              value={selectedOption}
              options={option}
              isSearchable = {false}
              name="test"
              placeholder="Manage Your Resume/CV"
              onChange={handleSelectOption}
          />
        </div>
      </NavigateContainer>
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
            <UploadButton onClick={handleButtonClick}>
                <strong>Upload Resume/CV</strong>
            </UploadButton>
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
                Problem in Viewing PDF ? View in another Tab
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
    </Container>
  );
};

export default Resumeupload;

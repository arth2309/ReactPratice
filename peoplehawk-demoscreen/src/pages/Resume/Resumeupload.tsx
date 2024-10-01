import { useRef, useState, useEffect, useContext } from "react";
import Header from "../../components/layout/header/Header";
import "./Resumeupload.css";
import { ReactComponent as Arrow } from "../../assests/img/arrow-dropdown.svg";
import {
  uploadFile,
  fetchFile,
  deleteFile,
  updateFile,
} from "../../services/ResumeService";
import { upsertRequest } from "../../services/RequestService";
import { generatePath, useNavigate } from "react-router-dom";
import AuthContext from "../../store/AuthContext";
import { ToastComponent } from "../../components/layout/ToastComponent/Toastcomponent";
import { styled } from "styled-components";
import { OptionTypes } from "../../interface/Interface";
import { ReactSelect } from "../../components/layout/form/Select";
import { ROUTES } from "../../constants/routes";
import { useApi } from "../../store/ReducerContext";

const Container = styled.div`
  background-color: #dbeffa;
  height: 100%;
  min-height: 100vh;
`;
const NavigateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 12px;
  margin: 20px 0px 0px 0px;
`;

const BackButton = styled.div`
  display: flex;
  align-items: center;
  color: #f96332;
  cursor: pointer;
  svg {
    path {
      fill: #f96332 !important;
    }
  }
`;
const UploadButton = styled.button`
  background-color: #f96332;
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
  margin-top: 45px;
`;

const Resumeupload = () => {
  const { state, dispatch } = useApi();
  const option: OptionTypes[] = [
    {
      label: "Update",
      value: "update",
      isDisabled: !state.userProgress.isResumeUpload,
    },
    {
      label: "Download",
      value: "download",
      isDisabled: !state.userProgress.isResumeUpload,
    },
    {
      label: "Delete",
      value: "delete",
      isDisabled: !state.userProgress.isResumeUpload,
    },
  ];
  const [selectedOption, setSelectedOption] = useState<OptionTypes | null>(
    null
  );
  const authCtx = useContext(AuthContext);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!state.navigate) {
      fetchData();
    }
    // eslint-disable-next-line
  }, []);
  const fetchData = async () => {
    if (authCtx.userData) {
      const result = await fetchFile(authCtx.userData.Id);
      if (result) {
        dispatch({ type: "GET_RESUME_DATA", payload: result });
      }
    }
  };

  const deleteResume = async () => {
    if (authCtx.userData) {
      const result = await deleteFile(authCtx.userData.Id);
      if (result) {
        dispatch({ type: "DELETE_RESUME_DATA" });
      }
    }
  };

  const handleSelectOption = (field: string, value: any) => {
    if (value.value === "delete") {
      deleteResume();
      setSelectedOption(null);
    }

    if (value.value === "download" && state.resume !== null) {
      const link = document.createElement("a");
      link.href = state.resume;
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
      if (state.resume) {
        const result = await updateFile(authCtx.userData.Id, { file });
        dispatch({ type: "UPDATE_RESUME_DATA", payload: result });
      } else {
        await uploadFile({ file }, authCtx.userData.Id);
        if (state.request && state.request.isResumeUploadRequest) {
          const response = await upsertRequest({
            ...state.request,
            isResumeUploadRequest: false,
          });
          response && dispatch({ type: "REQUEST", payload: response });
        }

        dispatch({
          type: "POST_RESUME_DATA",
          payload: URL.createObjectURL(file),
        });
      }
    }
  };

  return (
    <Container>
      <ToastComponent />
      <Header />
      <input
        type="file"
        ref={fileInputRef}
        className="d-none"
        onChange={handleFileChange}
      />
      <NavigateContainer>
        <BackButton
          onClick={() => navigate(generatePath(ROUTES.HOME, { userId: 2 }))}
        >
          <Arrow className="arrow" />
          <div>
            <strong>Back</strong>
          </div>
        </BackButton>
        <div>
          <ReactSelect
            value={selectedOption}
            options={option}
            isSearchable={false}
            name="test"
            placeholder="Manage Your Resume/CV"
            onChange={handleSelectOption}
          />
        </div>
      </NavigateContainer>
      <div className="border-bottom"></div>
      <div className="d-flex  justify-content-center">
        {state.resume === null ? (
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
              state.resume === null
                ? { marginTop: "160px" }
                : { marginTop: "120px" }
            }
          >
            {state.resume !== null && (
              <div>
                {/* eslint-disable-next-line */}
                <a
                  href={state.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Problem in Viewing PDF ? View in another Tab
                </a>
                <embed
                  src={state.resume}
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

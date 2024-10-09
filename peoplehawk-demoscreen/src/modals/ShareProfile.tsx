import styled, { css, keyframes } from "styled-components";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { ReactSelect } from "../components/layout/form/Select";
import { OptionTypes, ShareProfileProps } from "../interface/Interface";
import Input from "../components/layout/form/Input";
import { ErrorMessage, Formik, Form } from "formik";
import * as Yup from "yup";
import AuthContext from "../store/AuthContext";
import { useContext } from "react";
import { shareProfile } from "../services/HomeService";

interface ModalProps {
  onClose: () => void;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-50px);
  }
  to {
    transform: translateY(0);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
  animation: ${css`
    ${fadeIn} 0.3s ease-in-out
  `};
`;

const ModalContent = styled.div`
  background: #eef2f6;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 450px;
  padding: 10px 20px 20px 20px;
  position: relative;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  animation: ${css`
    ${slideIn} 0.3s ease-in-out
  `};
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalClose = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  cursor: pointer;
`;

const ModalBody = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  ".w-100": {
    width: "100%",
  },
  ".error": {
    color: "red",
    fontSize: "0.90rem",
    marginTop: "0px",
  },

  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
});

const Title = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const Heading = styled.div({
  fontSize: "22px",
  color: "black",
  fontWeight: 900,
});

const Description = styled.div({
  fontSize: "16.5px",
  color: "#6e798c",
});

const SearchLabel = styled.label({
  letterSpacing: 0.5,
  marginBottom: "3px",
});

const TextArea = styled.textarea({
  width: "99%",
  height: "100px",
  border: "1px solid #ced4da",

  "&::placeholder": {
    color: "grey",
    fontSize: "15px",
  },

  "&:focus": {
    border: "2px solid #72DBD0",
    outline: "none",
  },
});

const ShareButton = styled.button({
  backgroundColor: "#72DBD0",
  padding: "12px 26px",
  fontSize: "15px",
  fontWeight: 700,
  borderRadius: "10px",

  "&:hover": {
    backgroundColor: "#3CD0C3",
  },
});

const LinkExpirationOption: OptionTypes[] = [
  { value: 1, label: "1 day" },
  { value: 7, label: "1 week" },
  { value: 365, label: "1 month" },
];

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter email")
    .email("Please enter valid email"),
  message: Yup.string().required("Please enter message"),
});

const ShareProfile: React.FC<ModalProps> = ({ onClose }) => {
  const { userData } = useContext(AuthContext);

  const intialValues: ShareProfileProps = {
    id: 0,
    email: "",
    message: "",
    linkExpireDuration: 1,
    userId: userData ? userData.Id : 0,
  };

  return (
    <ModalOverlay>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalClose onClick={onClose}>
            <HighlightOffOutlinedIcon fontSize="large" />
          </ModalClose>
        </ModalHeader>
        <ModalBody>
          <Title>
            <Heading>Share your Profile</Heading>
            <Description>who are you sharing this profile with?</Description>
          </Title>
          <Formik
            initialValues={intialValues}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              const response = await shareProfile(values);
              response && onClose();
              console.log(values);
            }}
          >
            {({ setFieldValue }) => (
              <Form>
                <div className="w-100">
                  <Input
                    placeholder="Enter email address"
                    name="email"
                    onChange={(e) => {
                      setFieldValue("email", e.target.value);
                    }}
                  />
                  <div className="error">
                    <ErrorMessage name="email" />
                  </div>
                </div>
                <div className="w-100">
                  <TextArea
                    placeholder="Add a message"
                    name="message"
                    onChange={(e) => {
                      setFieldValue("message", e.target.value);
                    }}
                  />
                  <div className="error">
                    <ErrorMessage name="message" />
                  </div>
                </div>
                <div className="w-100">
                  <SearchLabel>Link expiration*</SearchLabel>
                  <ReactSelect
                    options={LinkExpirationOption}
                    placeholder=""
                    name="link-expire"
                    showDropdownIndicator
                    defaultValue={LinkExpirationOption.find(
                      (item) => item.value === 1
                    )}
                    onChange={(e, value) => {
                      setFieldValue("linkExpireDuration", value.value);
                    }}
                  />
                </div>
                <ShareButton type="submit">Share Profile</ShareButton>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ShareProfile;

import styled from "styled-components";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import BounceLoader from "react-spinners/BounceLoader";
import {
  OptionTypes,
  CountryList,
  AddClientProps,
  ViewClientProps,
} from "../../interface/Interface";
import { CountryList as CountryData } from "../../services/AuthService";
import Input from "../../components/layout/form/Input";
import { ReactSelect } from "../../components/layout/form/Select";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import { addClient, updateClient } from "../../services/AdminService";
import { useParams } from "react-router-dom";
import { getClientDetail } from "../../services/AdminService";

const Container = styled.div({
  display: "flex",
});

const SideBarContainer = styled.div({
  backgroundColor: "#F7F9FC",
  width: "400px",
  minHeight: "100vh",
});

const LoaderDiv = styled.div({
  height: "80vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const Title = styled.div({
  color: "#4D5767",
  backgroundColor: "#F7F9FC",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "70px",
  fontSize: "18px",
  padding: "0px 20px",
  fontWeight: 800,
  boxShadow:
    "0 .125rem .25rem rgba(0, 0, 0, .075), 0 .25rem .5rem rgba(0, 0, 0, .05)",
});

const SearchLabel = styled.label({
  letterSpacing: 0.5,
  marginBottom: "3px",
});

const MainContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  padding: "20px",

  ".input-div": {
    backgroundColor: "white",
  },

  ".error": {
    fontSize: "0.75rem",
    color: "rgb(255, 80, 23)",
    marginTop: "0.15rem",
  },
});

const BackArrowButton = styled.div({
  display: "flex",
  gap: "3px",
  alignItems: "center",
  color: "#008892",
  cursor: "pointer",
});

const SaveButton = styled.button({
  backgroundColor: "#72DBD0",
  padding: "12px 26px",
  fontSize: "15px",
  fontWeight: 700,
  borderRadius: "10px",

  "&:hover": {
    backgroundColor: "#3CD0C3",
  },
});

const DetailDiv = styled.div({
  display: "flex",
  width: "100%",
  height: "100vh",
  alignItems: "center",
  justifyContent: "center",
});

const DetailDec = styled.div({
  fontSize: "16px",
  color: "#5f6163ad",
});

const ClientCreate = () => {
  const [countryOptions, setCountryOptions] = useState<OptionTypes[] | null>(
    null
  );

  const navigate = useNavigate();
  const { id } = useParams();
  const [editClientData, setEditClientData] = useState<ViewClientProps | null>(
    null
  );

  const convertApiToOptions = (apiData: CountryList[]): OptionTypes[] => {
    return apiData.map((item) => ({
      value: item.id,
      label: item.countryName,
    }));
  };

  useEffect(() => {
    setTimeout(() => {
      fetchCountryList();
    }, 2000);
    // eslint-disable-next-line
  }, []);

  const fetchCountryList = async () => {
    const response = await CountryData();
    if (id) {
      const response = await getClientDetail(parseInt(id));
      response && setEditClientData(response);
    }
    if (response) {
      const transformedoptions = convertApiToOptions(response);
      setCountryOptions(transformedoptions);
    }
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Please enter client name"),
    lastName: Yup.string().required("Please enter client name"),
    email: Yup.string()
      .required("Please enter email")
      .email("Please enter a valid email"),
    countryId: Yup.number()
      .moreThan(0, "Please select a Country")
      .required("Please select a Country"),
    organisationCode: Yup.string().required("please enter organisation code"),
  });
  const countryIdFinder: () => number = () => {
    if (editClientData && countryOptions) {
      const item = countryOptions.find(
        (item) => item.label === editClientData.countryName
      );

      if (item) {
        return Number(item.value);
      }
    }

    // Return 0 if no valid item is found or if editClientData or countryOptions is falsy
    return 0;
  };

  const intialValues: AddClientProps = {
    firstName: editClientData ? editClientData.firstName : "",
    lastName: editClientData ? editClientData.lastName : "",
    adminId: 1,
    id: 0,
    email: editClientData ? editClientData.email : "",
    countryId: countryIdFinder(),
    organisationCode: editClientData ? editClientData.organisationCode : "",
    roleId: 3,
  };

  return (
    <Container>
      <div>
        <SideBarContainer>
          <Formik
            initialValues={intialValues}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              if (id) {
                const response = await updateClient(parseInt(id), values);
                response && navigate(`/client/${id}/profile`);
              } else {
                const response = await addClient(values);
                response && navigate(`/client/${response}/profile`);
              }
            }}
          >
            {({ setFieldValue }) => (
              <Form>
                <Title>
                  <BackArrowButton
                    onClick={() => {
                      navigate(ROUTES.CLIENT_LIST);
                    }}
                  >
                    <ArrowBackIosNewIcon />
                    Back
                  </BackArrowButton>
                  <SaveButton type="submit">{id ? "Edit" : "Save"}</SaveButton>
                </Title>
                {countryOptions ? (
                  <MainContainer>
                    <div>
                      <Input
                        className="input-div"
                        label="First Name"
                        defaultValue={
                          editClientData ? editClientData.firstName : ""
                        }
                        required
                        onChange={(e) => {
                          setFieldValue("firstName", e.target.value);
                        }}
                      />
                      <div className="error">
                        <ErrorMessage name="firstName" />
                      </div>
                    </div>
                    <div>
                      <Input
                        className="input-div"
                        label="Last Name"
                        defaultValue={
                          editClientData ? editClientData.lastName : ""
                        }
                        required
                        onChange={(e) => {
                          setFieldValue("lastName", e.target.value);
                        }}
                      />
                      <div className="error">
                        <ErrorMessage name="lastName" />
                      </div>
                    </div>
                    <div>
                      <Input
                        className="input-div"
                        label="Email (Username / Login)"
                        defaultValue={
                          editClientData ? editClientData.email : ""
                        }
                        required
                        onChange={(e) => {
                          setFieldValue("email", e.target.value);
                        }}
                      />
                      <div className="error">
                        <ErrorMessage name="email" />
                      </div>
                    </div>
                    <div>
                      <SearchLabel>Base Country</SearchLabel>
                      {countryOptions && (
                        <ReactSelect
                          options={countryOptions}
                          placeholder=""
                          isClearable
                          name="country"
                          defaultValue={countryOptions.filter(
                            (item) => item.label === editClientData?.countryName
                          )}
                          showDropdownIndicator
                          onChange={(e, value) => {
                            !!value
                              ? setFieldValue("countryId", value.value)
                              : setFieldValue("countryId", 0);
                          }}
                        />
                      )}
                      <div className="error">
                        <ErrorMessage name="countryId" />
                      </div>
                    </div>
                    <div>
                      <Input
                        className="input-div"
                        label="Member Registration Code"
                        defaultValue={
                          editClientData ? editClientData.organisationCode : ""
                        }
                        required
                        onChange={(e) => {
                          setFieldValue("organisationCode", e.target.value);
                        }}
                      />
                      <div className="error">
                        <ErrorMessage name="organisationCode" />
                      </div>
                    </div>
                  </MainContainer>
                ) : (
                  <LoaderDiv>
                    <BounceLoader color="#008892" size="72px" />
                  </LoaderDiv>
                )}
              </Form>
            )}
          </Formik>
        </SideBarContainer>
      </div>
      <DetailDiv>
        <DetailDec>
          Please provide the Client details in order to create the profile.
        </DetailDec>
      </DetailDiv>
    </Container>
  );
};

export default ClientCreate;

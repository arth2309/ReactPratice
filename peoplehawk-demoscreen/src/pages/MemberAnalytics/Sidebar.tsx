import styled from "styled-components";
import { ReactSelect } from "../../components/layout/form/Select";
import {
  OptionTypes,
  CountryList,
  ViewClientProps,
} from "../../interface/Interface";
import { useEffect, useState } from "react";
import Input from "../../components/layout/form/Input";
import { CountryList as CountryData } from "../../services/AuthService";
import BounceLoader from "react-spinners/BounceLoader";
import LogoutIcon from "@mui/icons-material/Logout";
import { getClientList } from "../../services/AdminService";

interface SideBarProps {
  onSearchHandler: (value: string) => void;
  onCandidateTypeHandler: (value: string) => void;
  onCountryTypeHandler: (value: number) => void;
  onNavigation: () => void;
  searchString: string;
  memberType: string;
  countryId: number;
}

const CandidateTypes: OptionTypes[] = [
  { value: 1, label: "High School/College Student" },
  { value: 2, label: "Undergraduate" },
  { value: 3, label: "Graduate" },
  { value: 4, label: "Experienced Hire" },
];

const Container = styled.div({
  backgroundColor: "#F7F9FC",
  width: "500px",
  minHeight: "100vh",

  ".flex-div": {
    display: "flex",
    justifyContent: "end",
    width: "100%",
  },
});

const SearchKeyword = styled.div({
  width: "215px",
});

const LoaderDiv = styled.div({
  height: "100%",
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

const SearchDiv = styled.div({
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

const GreenSearch = styled.div({
  color: "#0097A2",
  fontSize: "16px",
  fontWeight: 600,
});

const MainContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  padding: "20px",
});

const Sidebar: React.FC<SideBarProps> = (props) => {
  const [countryOptions, setCountryOptions] = useState<OptionTypes[] | null>(
    null
  );
  const [clientOptions, setClientOptions] = useState<OptionTypes[] | null>(
    null
  );

  const convertApiToOptions = (apiData: CountryList[]): OptionTypes[] => {
    return apiData.map((item) => ({
      value: item.id,
      label: item.countryName,
    }));
  };

  const convertClientApiToOptions = (
    apiData: ViewClientProps[]
  ): OptionTypes[] => {
    return apiData.map((item) => ({
      value: item.id,
      label: item.firstName + " " + item.lastName,
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
    if (response) {
      const transformedoptions = convertApiToOptions(response);
      setCountryOptions(transformedoptions);
    }

    const clientResponse = await getClientList(1);
    if (clientResponse) {
      const transformedOptions = convertClientApiToOptions(
        clientResponse.items
      );
      setClientOptions(transformedOptions);
    }
  };

  return (
    <div>
      <Container>
        <Title>
          Search All Members
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              props.onNavigation();
            }}
          >
            <LogoutIcon />
          </div>
        </Title>
        {countryOptions ? (
          <MainContainer>
            <div>
              <SearchLabel>Keyword</SearchLabel>

              <SearchDiv>
                <SearchKeyword>
                  <Input
                    placeholder="i.e: Member's Name"
                    defaultValue={props.searchString}
                    onChange={(e) => {
                      (e.target.value.trim().length > 2 ||
                        e.target.value.trim().length < 1) &&
                        props.onSearchHandler(e.target.value.trim());
                    }}
                  />
                </SearchKeyword>
                <GreenSearch>Search</GreenSearch>
              </SearchDiv>
            </div>
            <div>
              <SearchLabel>Member Type</SearchLabel>

              <ReactSelect
                options={CandidateTypes}
                placeholder=""
                isClearable
                defaultValue={CandidateTypes.find(
                  (item) => item.label === props.memberType
                )}
                name="countryId"
                showDropdownIndicator
                onChange={(e, value) => {
                  props.onCandidateTypeHandler(
                    value != null ? value.label : undefined
                  );
                }}
              />
            </div>
            <div>
              <SearchLabel>Base Country</SearchLabel>
              {countryOptions && (
                <ReactSelect
                  options={countryOptions}
                  placeholder=""
                  isClearable
                  name="country"
                  defaultValue={countryOptions.find(
                    (item) => item.value === props.countryId
                  )}
                  showDropdownIndicator
                  onChange={(e, value) => {
                    props.onCountryTypeHandler(value != null ? value.value : 0);
                  }}
                />
              )}
            </div>
            <div>
              <SearchLabel>Client Name</SearchLabel>
              {clientOptions && (
                <ReactSelect
                  options={clientOptions}
                  placeholder=""
                  isClearable
                  name="client"
                  // defaultValue={countryOptions.find(
                  //   (item) => item.value === props.countryId
                  // )}
                  showDropdownIndicator
                  // onChange={(e, value) => {
                  //   props.onCountryTypeHandler(value != null ? value.value : 0);
                  // }}
                />
              )}
            </div>
          </MainContainer>
        ) : (
          <LoaderDiv>
            <BounceLoader />
          </LoaderDiv>
        )}
      </Container>
    </div>
  );
};

export default Sidebar;

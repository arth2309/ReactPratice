import React,{useContext} from "react";
import Header from "../../components/layout/header/Header";
import { styled } from "styled-components";
import { Range, getTrackBackground } from "react-range";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import personalityBaneer from "../../assests/img/personality_test_banner.svg";
import Slider from "./Slider";
import { SubmitTest } from "../../interface/Interface";
import { getQuiz, QuizResponse, QuizEligible } from "../../API/apiClient";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/AuthContext";


const Container = styled.div({
  backgroundColor: "#DBEFFA",
  height: "calc(100vh + 150px)",
});

const BackButtonContainer = styled.div({
  display: "flex",
  justifyContent: "start",
});

const BackButton = styled.button({
  display: "flex",
  color: "#F96332",
  background: "transparent",
  cursor: "pointer",
  alignItems: "center",
  fontWeight: 700,
  fontSize: "18px",
});

const MainContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  gap: "15px",
});

const Container1 = styled.div({
  width: "90%",
  backgroundColor: "white",
  display: "flex",
  padding: "20px",
  gap: "20px",
  justifyContent: "space-between",
  borderRadius: "8px",
  marginTop: "15px",
});

const SubContainer1 = styled.div({
  display: "flex",
  justifyContent: "center",
  width: "50%",

  "@media (max-width : 840px)": {
    display: "none",
  },
});

const SubContainer2 = styled.div({
  paddingTop: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  width: "50%",

  "@media (max-width : 840px)": {
    width: "100%",
  },
});

const Heading = styled.div({
  fontSize: "30px",
  color: "#F96332",
  lineHeight: "30px",
  fontWeight: "700",
});

const OutlineButton = styled.button({
  cursor: "pointer",
  background: "transparent",
  border: "1.5px solid #F96332",
  width: "300px",
  maxWidth: "100%",
  display: "flex",
  justifyContent: "center",
  borderRadius: "20px",
  color: "black",
  fontWeight: "700",
  fontSize: "14px",
});

const Container1ButtonDiv = styled.div({
  display: "flex",
  gap: "10px",
});

const Paragraph = styled.p({
  fontSize: "15px",
  marginTop: "0px",
  marginBottom: "85px",
});

const Container2 = styled.div({
  width: "90%",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "white",
  borderRadius: "8px",
});

const Text = styled.div({
  fontSize: "20px",
  fontWeight: 600,
  margin: "20px 0px",
});

const PrimaryButton = styled.button({
  cursor: "pointer",
  backgroundColor: "#F96332",
  width: "fit-content",
  display: "flex",
  justifyContent: "center",
  borderRadius: "20px",
  padding: "10px 30px",
  boxShadow: "#F96332 0px 2px 4px 0px",
  fontWeight: "600",
});

const OutlineButton1 = styled.button({
  cursor: "pointer",
  background: "transparent",
  border: "1.5px solid #F96332",
  width: "fit-content",
  display: "flex",
  justifyContent: "center",
  borderRadius: "20px",
  color: "black",
  padding: "10px 30px",
  fontWeight: "700",
  fontSize: "14px",
});

interface Quiz1 {
  id: number;
  question: string;
  value: number;
}

const Personalitytest: React.FC = () => {
  React.useEffect(() => {
    Quizeligible();
    if (testCount < 3) {
      fetchQuizList();
    }
  }, []);

  const Quizeligible = async () => {

    if(authCtx.userData)
    {
      const result = await QuizEligible(authCtx.userData.Id);
    
      if (result) {
        setTestCount(4);
        console.log("here", testCount);
      }
    }
   
  };

  const fetchQuizList = async () => {
    const result = await getQuiz();

    if (result) {
      const response: Quiz1[] = result.map((item) => ({ ...item, value: 50 }));
      console.log(response);
      setQuizBank(response);
    }
  };

  const [values, setValues] = React.useState([0]);
  const [quizBank, setQuizBank] = React.useState<Quiz1[] | null>(null);
  const [isSubmit, SetisSubmit] = React.useState<boolean>(false);
  const [testCount, setTestCount] = React.useState<number>(0);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSlideChange = (value: number) => {
    if (quizBank) {
      const updatedItems = quizBank.map((item, index) =>
        values[0] === index ? { ...item, value: value } : item
      );
      setQuizBank(updatedItems);
    }
  };

  const submitHandler = async () => {
    setTestCount((c) => c + 1);
    if (quizBank) {
      const response: SubmitTest[] = quizBank.map((item) => ({
        quizId: item.id,
        userId: authCtx.userData?authCtx.userData.Id : 0,
        answer: item.value,
        testNo: testCount + 1,
      }));
      SetisSubmit(true);
      await QuizResponse(response);
      console.log(response);
    }
  };

  const reTestHandler = () => {
    SetisSubmit(false);
    setValues([0]);
    setQuizBank((currentItems) =>
      (currentItems || []).map((item) => ({
        ...item,
        value: 50,
      }))
    );
  };

  return (
    <Container>
      <Header />
      <BackButtonContainer>
        <BackButton onClick={() => {navigate('/home')}}>
          <ArrowBackIosIcon />
          Back
        </BackButton>
      </BackButtonContainer>
      <MainContainer>
        <Container1>
          <SubContainer2>
            <Heading>Personality Test</Heading>
            <h2 style={{ fontSize: "22px" }}>
              People don't buy what you do,
              <br />
              people buy why you do it
            </h2>
            <Paragraph>
              We scoured the ends of the earth to find the holy grail of
              personality profiling. Turns out it didn’t exist. That’s why we
              had to invent it ourselves. The reason? Because employers love to
              know what instincts you’ve got, and how your judgement and
              business radar has served you and your employers in the past.
            </Paragraph>
            <Container1ButtonDiv>
              <OutlineButton>Sample Personality Guide</OutlineButton>
              <OutlineButton>Famous Personalities</OutlineButton>
            </Container1ButtonDiv>
          </SubContainer2>

          <SubContainer1>
            <img
              src={personalityBaneer}
              alt="personality"
              style={{ maxWidth: "100%" }}
            />
          </SubContainer1>
        </Container1>
        <Container2>
          {testCount <= 3 && !isSubmit ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text>Take the test here,best 10 minutes you'll ever spend!</Text>
              <Text>Questions {values[0] + 1} of 10</Text>
              <div style={{ width: "25%" }}>
                <Range
                  step={1}
                  min={0}
                  max={9}
                  values={values}
                  onChange={() => {}}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "6px",
                        width: "100%",
                        cursor: "initial",
                        background: getTrackBackground({
                          values,
                          colors: ["#0097A2", "#E4ECF3"],
                          min: 0,
                          max: 9,
                        }),
                        borderRadius: "3px",
                      }}
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "0px", 
                        width: "0px",
                        backgroundColor: "transparent", 
                      }}
                    />
                  )}
                />
              </div>
              {quizBank && <Text>{quizBank[values[0]].question}</Text>}
              {quizBank && (
                <Slider
                  slideValues={quizBank[values[0]].value}
                  onSlideChange={handleSlideChange}
                />
              )}
              <div style={{ display: "flex", gap: "10px", marginTop: "60px" }}>
                {values[0] > 0 && (
                  <OutlineButton1
                    onClick={() => {
                      setValues((prevstate) => [prevstate[0] - 1]);
                    }}
                  >
                    Previous Question
                  </OutlineButton1>
                )}
                {values[0] < 9 && (
                  <PrimaryButton
                    onClick={() => {
                      setValues((prevstate) => [prevstate[0] + 1]);
                    }}
                  >
                    Next Question
                  </PrimaryButton>
                )}
                {values[0] === 9 && (
                  <PrimaryButton onClick={submitHandler}>Submit</PrimaryButton>
                )}
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              <div style={{ fontSize: "20px", fontFamily: "cursive" }}>
                <strong>Quiz Submitted Succesfully</strong>
              </div>
              <CheckCircleIcon
                htmlColor="#F96332"
                style={{ fontSize: "100px" }}
              />
              {testCount >= 3 && (
                <div style={{ fontSize: "20px", fontFamily: "cursive" }}>
                  <strong>
                    As you have re-attempted the quiz twice. re-test option is
                    not available
                  </strong>
                </div>
              )}
              {testCount < 3 && (
                <PrimaryButton onClick={reTestHandler}>Re-Test</PrimaryButton>
              )}
            </div>
          )}
        </Container2>
      </MainContainer>
    </Container>
  );
};

export default Personalitytest;

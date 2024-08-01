import  React,{Fragment} from "react";
import Header from "../../components/layout/header/Header";
import {styled} from 'styled-components';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import personalityBaneer from '../../assests/img/personality_test_banner.svg';
import Slider from "./Slider";

const Personalitytest: React.FC = () => {

    const Container = styled.div({
        backgroundColor : '#DBEFFA',
        height : '100vh'

    })

    const BackButtonContainer = styled.div({
        display : 'flex',
        justifyContent : 'start'
      
    })


    const BackButton = styled.button({
        display : 'flex',
        color : '#F96332',
        background : 'transparent',
        cursor : 'pointer',
        alignItems : 'center',
        fontWeight : 700,
        fontSize : '18px'
    })

    const MainContainer = styled.div({
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center',
        width : '100%',
        gap : '15px'
      
    })

    const Container1 = styled.div({
        width : '90%',
        backgroundColor : 'white',
        display : 'flex',
        padding : '20px',
        gap : '20px',
        justifyContent : 'space-between',
        borderRadius : '8px',
        marginTop : '15px'
    
    })


    const SubContainer1 = styled.div({
        display : 'flex',
        justifyContent : 'center',
        width : '50%',

        '@media (max-width : 840px)' : {
                display : 'none'
        }
    })

    const SubContainer2 = styled.div({

        paddingTop : '10px',
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'start',
         width : '50%',

         '@media (max-width : 840px)' : {
                width : '100%'
        }
    })

    const Heading = styled.div({
        fontSize : '30px',
        color : '#F96332',
        lineHeight : '30px',
        fontWeight : '700'
    })

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
        fontWeight : '700',
        fontSize : '14px'
      });

      const Container1ButtonDiv = styled.div({
        display : 'flex',
        gap : '10px'
      })

      const Paragraph = styled.p({
        fontSize : '15px',
        marginTop : '0px',
        marginBottom : '85px'
      })

      const Container2 = styled.div({
        width : '90%',
        padding : '20px',
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center',
        backgroundColor : 'white',
        borderRadius : '8px'
      })

      const Text = styled.div({
        fontSize : '20px',
        fontWeight : 600,
        margin : '20px 0px'
      })

    
const PrimaryButton = styled.button({
    cursor: "pointer",
    backgroundColor: "#F96332",
    width: "fit-content",
    display: "flex",
    justifyContent: "center",
    borderRadius: "20px",
    marginTop: "30px",
    padding : '10px 30px',
    boxShadow : "#F96332 0px 2px 4px 0px",
    fontWeight : '600'
  });
  

    

  return (
      <Container>
        <Header />
        <BackButtonContainer>
            <BackButton ><ArrowBackIosIcon />Back</BackButton>
        </BackButtonContainer>
        <MainContainer>
            <Container1>
                <SubContainer2>
                <Heading>
                    Personality Test
                    </Heading>
               <h2 style={{fontSize : '22px'}}>
                People don't buy what you do,
                <br />
                people buy why you do it
               </h2>
                 <Paragraph>
                 We scoured the ends of the earth to find the holy grail of personality profiling. Turns out it didn’t exist. That’s why we had to invent it ourselves. The reason? Because employers love to know what instincts you’ve got, and how your judgement and business radar has served you and your employers in the past.
                 </Paragraph>
                 <Container1ButtonDiv>
                    <OutlineButton>
                        Sample Personality Guide
                    </OutlineButton>
                    <OutlineButton>
                        Famous Personalities
                    </OutlineButton>
                 </Container1ButtonDiv>
                </SubContainer2>
                
                <SubContainer1>
                 <img src={personalityBaneer} alt ="personality" style={{maxWidth : '100%'}} />
                 </SubContainer1>
            </Container1>
            <Container2>
                <Text>Take the test here,best 10 minutes you'll ever spend!</Text>
                <Text>Questions 1 of 50</Text>
                <Text>I am bothered by unitidiness</Text>
                <Slider />
                <PrimaryButton>Next Question</PrimaryButton>
            </Container2>
        </MainContainer>
      </Container>
  );
};

export default Personalitytest;
import Header from "../../components/layout/header/Header";
import {Fragment,useContext} from "react";
import {styled} from "styled-components";
import '../../stylesheets/obviously-font.css';
import profile from '../../assests/img/profile_placeholder-3x.png';
import trophy from '../../assests/img/trophy-icon.svg';
import broker from '../../assests/img/broker.png';
import facebook from '../../assests/img/facebook-icon.svg';
import linkedin from '../../assests/img/linkedin-icon.svg';
import twitter from '../../assests/img/twitter-icon.svg';
import AuthContext from "../../store/AuthContext";

interface Card1ItemProps {
  bordercolor : string
}

interface TrophyProps {
  cHeight : string,
  cWidth : string 
}

interface BorderBottomProps {
  cWidth : string
}

const Container = styled.div({
  display : 'flex',
  width : '100%',
  height : `calc(100vh - 100px)`,
  
})

const LeftContainer = styled.div({
  display : 'flex',
  flexDirection : 'column',
  alignItems : 'center',
  width : '30%',
  backgroundColor : '#B8DFF5',
  height:'100%',

  '@media (max-width : 992px)' : {
    display : 'none'
  }
})

const LeftChildContainer = styled.div({
     width : '80%',
     
})

const LeftChildMainContainer = styled.div({
  display : 'flex',
  flexDirection : 'column',
  alignItems : 'center'
})

const Heading = styled.div({
  fontFamily : 'obviously',
  borderBottom : '5px solid #F96332',
  fontSize : '20px'
})

const Card1 = styled.div({
      width : 'fit-content',
      padding : '5px 10px 5px 10px',
      borderRadius : '8px',
      display : 'flex',
      gap : '10px',
      backgroundColor : '#DBEFFA',
      marginTop : '10px'

})

const Card1Item = styled.div<Card1ItemProps>( (props) => ({
      border : `1px solid ${props.bordercolor}`,
      borderRadius : '10px',
      display : 'flex',
      padding : '4px 8px 4px 8px',
      justifyContent : 'center',
      cursor :'pointer'
}))

const Card2 = styled.div({
      display : 'flex',
      gap : '10px',
     marginTop : '10px',
    
})

const Card2Item = styled.div({
     display : 'flex',
     flexDirection : 'column',
     alignItems : 'center',
     width : 'fit-content',
     backgroundColor : '#DBEFFA',
     padding : '5px 25px 5px 25px',
     gap : '5px',
     borderRadius : '8px',
     boxShadow : '0px 2px 2px 0px'
})

const Card2Sub = styled.div({
     display : 'flex',
     flexDirection : 'column',
     gap : '5px'
})

const Progress = styled.div({
  fontSize : '30px',
  color : '#F96332',
})

const Trophy = styled.div<TrophyProps>( (props) => ({
  width : props.cWidth,
  backgroundColor : '#F96332',
  borderRadius : '50%',
  display : 'flex',
  justifyContent : 'center',
  height : props.cHeight,
  padding : '2px',
  cursor : 'pointer' 

}))

const Card3 = styled.div({
  backgroundColor : '#DBEFFA',
   boxShadow : '0px 2px 2px 0px',
   display : 'flex',
   gap : '10px',
   marginTop : '20px',
   padding : '10px',
   borderRadius : '8px'
})

const Card3Item = styled.div({
  display : 'flex',
   gap : '5px',
  flexDirection : 'column'
}) 

const Broker = styled.div({
  color : '#F96332',
  fontSize : '28px',
  fontWeight : '700'
})

const Card3Img = styled.div({
  display : 'flex',
  gap : '20px',

})

const PrimaryButton = styled.button({
  cursor : 'pointer',
  backgroundColor : '#F96332',
  width : '300px',
  maxWidth : '100%',
  display : 'flex',
  justifyContent : 'center',
  borderRadius : '20px',
  marginTop : '10px',

})


const OutlineButton = styled.button({
  cursor : 'pointer',
  background : 'transparent',
  border : '1px solid #F96332',
  width : '300px',
  maxWidth : '100%',
  display : 'flex',
  justifyContent : 'center',
  borderRadius : '20px',
  color : 'black',
})

const BorderBottom = styled.div<BorderBottomProps>((props) => ({
  borderBottom : '3px solid #F96332',
  width : props.cWidth,
  maxWidth : '100%',
  marginTop : '10px'
}))

const MobileLeftContainer = styled.div({
  display : 'none',
  backgroundColor : 'white',
  gap : '20px',
  width : 'calc(100% - 15px)',
  paddingLeft : '15px',
 
  '@media (max-width : 992px)' : {
    display : 'flex'
  }
})

const MobileCard1 = styled.div({
   display : 'flex',
   flexDirection : 'column',
   gap : '10px',
   alignItems : 'center'
})

const MobileCard2 = styled.div({
   display : 'flex',
   flexDirection : 'column',
   justifyContent : 'start',
    width : '50%',

    '@media (max-width : 768px)' : {
           width : '70%'
    }
})

const Obviously = styled.div({
  fontFamily : 'obviously',
  fontSize : '20px',
  lineHeight : '25px',
})

const MobileCard2Item = styled.div({
  display : 'flex',
  justifyContent : "space-between",
  padding : '0px 10px 0px 10px',
 

 
})


const Dashboard = () => {

  const authctx = useContext(AuthContext);
     console.log(authctx.userData?.Id);
    return (
           <Fragment>
             <Header />
             <MobileLeftContainer>
                <MobileCard1>
                <img src={profile} alt = "profile" height={'100px'}/>
                <Trophy cHeight="22px" cWidth="22px">
                          <img src={trophy} alt = "trophy" />
                          </Trophy>
                </MobileCard1>
                <MobileCard2>
                  <Obviously>
                    Welcome
                  </Obviously>
                  <Obviously>
                    {authctx.userData?.FirstName}
                  </Obviously>
                  <BorderBottom cWidth="100%" />
                  <div>Build a Epic Career here</div>
                  <MobileCard2Item>
                    <Card1Item bordercolor="black">
                      What's Included
                    </Card1Item>
                    <Card1Item bordercolor="black">
                      View My Profile
                    </Card1Item>
                  </MobileCard2Item>
                </MobileCard2>
              </MobileLeftContainer>
             <Container>
              <LeftContainer>
                <LeftChildContainer>
                <Heading>
                  Welcome  {authctx.userData?.FirstName}
                </Heading>
                <LeftChildMainContainer>
                <Card1>
                  <Card1Item bordercolor="#F96332">
                    View My Profile
                  </Card1Item>
                  <Card1Item bordercolor="#F96332">
                    What's included
                  </Card1Item>
                </Card1>
                <Card2>
                  <Card2Item>
                    <div > {authctx.userData?.FirstName} {authctx.userData?.LastName}</div>
                    <img src={profile} alt = "profile" height={'75px'}/>
                  </Card2Item>
                  <Card2Sub>
                    <Card2Item>
                         Progress
                         <Progress>
                          51%
                          </Progress>
                    </Card2Item>
                    <Card2Item>
                          Trophies
                          <Trophy  cHeight="44px" cWidth="80%" >
                          <img src={trophy} alt = "trophy" />
                          </Trophy>
                    </Card2Item>
                  </Card2Sub>
                </Card2>
                <Card3>
                  <img src={broker} alt = "broker" />
                 <Card3Item>
                  <div>Your personality Type</div>
                  <Broker>Broker</Broker>
                  <div>
                    <div>Your key strengths</div>
                    <div>Unflappable</div>
                    <div>Concrete</div>
                    <div>Team-builder</div>
                  </div>
                  <div>Share your personality type</div>
                   <Card3Img>
                      <img src={facebook} alt="facebook" height='30px' />
                      <img src={twitter} alt = "twitter" height='30px' />
                      <img src = {linkedin} alt = "linkedin" height='30px' />
                   </Card3Img>
                 </Card3Item>
                </Card3>
                <PrimaryButton>Take Your Next Step</PrimaryButton>
                <OutlineButton>See My Job Opportunities</OutlineButton>
                <OutlineButton>See My Profile</OutlineButton>
                <BorderBottom cWidth="300px" />
                </LeftChildMainContainer>
                </LeftChildContainer>
              </LeftContainer>
             </Container>
           </Fragment>
    )
}

export default Dashboard
import React, {Fragment} from 'react';
import utility from "../../../assests/img/utility-page.svg";
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';


interface SubjectProps {
    title1 : string,
    title2 : string,
    text1 : string,
    text2 : string,
    navigateTo : string
  
}

 const BorderBottom = styled.div`
   border-bottom: 1px solid #F96332;
    margin-top: 40px;
    margin-bottom: 15px;`

  const Sub = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `  
  const Right = styled.div`
   background-color: #DBEFFA;
    width: 70%;
    height: 100vh;

     @media (max-width :1298px)
    {
        width : 60%;
    }

    @media (max-width : 992px)
    {
        display: none;
    }
  `
export const Subject : React.FC<SubjectProps> = ({title1,title2,text1,text2,navigateTo}) => {

    const navigate = useNavigate();

    return(
          <Sub>
            <div className="obviously text-darkblue">{title1}</div>
            <div className="obviously text-orange">{title2}</div>
            <div style={{ marginTop: "40px", marginBottom: "30px" }}>
              {text1}
              <span
                className="text-orange"
                onClick={() => {
                    navigate(navigateTo);
                  }}
              >
               {text2}
              </span>
            </div>
            </Sub>
    )
}

export const Bottom = () => {

    return (
         <Fragment>
        <BorderBottom />
         <Sub>
            <div>
              All use of PeopleHawk is subject to our{" "}
              <span className="text-lightblue">Terms and Conditions</span>
            </div>
            <div className="text-aliceblue">What is PeopleHawk?</div>
            </Sub>
          </Fragment>
    )
}

export const RightContainer = () => {
    
    return (

        <Right>
        <div className="empty"></div>
        <div className="card12">
          <img src={utility} alt="utility" />
          <div className="obviously text-darkblue">
            Prepare for an <span className="text-orange">Epic</span> Career
          </div>
          <div style={{ marginTop: "10px" }}>
            <div className="card13-container">
              <div className="card13">Explore</div>
              <div className="card13">Prepare</div>
            </div>
            <div className="card13-container">
              <div className="card13">Inspire</div>
              <div className="card13">Connect</div>
            </div>
          </div>
        </div>
        </Right>
    );
}



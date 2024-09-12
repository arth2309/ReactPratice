import {Fragment,useContext} from 'react';
import Carrerbanner from '../../assests/img/CareerBanner.png'
import './Banner.css'
import "../../stylesheets/obviously-font.css";
import {styled} from 'styled-components';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';


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

  const BannerImage = styled.img`
  height: 400px;
    width: 100%;
    opacity: 0.7;
    object-fit: cover;`

  const BannerContent = styled.div`
   position: absolute;
   z-index: 2;
    margin-top: -350px;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    
    @media (max-width: 992px) {
       margin-top: -325px;
    }
       
     @media (max-width: 660px) {
       margin-top: -310px;
    }
      @media (max-width: 490px) {
       margin-top: -292px;
    }`

  const BannerText = styled.h1`
    font-size: 80px;
    font-family: obviously;
    padding-bottom: 15px;
    border-bottom-style: solid;
    border-bottom-color: #F96332;
    border-bottom-width: 8.1px;
    width: fit-content;
    margin-bottom: 10px;
    
     @media (max-width: 992px) {
      font-size: 60px;
    }
      
    @media (max-width: 660px) {
      font-size: 45px;
    }
      
    @media (max-width: 490px) {
      font-size: 32px;
    }`
  

const  Banner = () => {

    const navigate = useNavigate();
    const {userId} = useParams<{userId : string}>();
    return (
        <Fragment>
        <div className='background-black'>
        <BannerImage src = {Carrerbanner} alt='banner' />
        <BannerContent>
            <BannerText><strong><span className='text-orange'>Explore</span> <span className='text-white'>Courses .</span> </strong> </BannerText>
            <div className='text-white'><strong>Explore courses that are Ideal for you </strong></div>
        </BannerContent>
        </div>
        <BackButtonContainer>
        <BackButton onClick={() =>{navigate(generatePath(ROUTES.HOME, { userId: userId}))}}>
          <ArrowBackIosIcon />
          Back
        </BackButton>
      </BackButtonContainer>
        </Fragment>
    )


}

export default Banner;
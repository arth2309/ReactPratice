import {Fragment} from 'react';
import Carrerbanner from '../../assests/img/CareerBanner.png'
import './Banner.css'
import "../../stylesheets/obviously-font.css";
import {styled} from 'styled-components';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from 'react-router-dom';

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
  

const  Banner = () => {

    const navigate = useNavigate();
    
    return (
        <Fragment>
        <div style={{backgroundColor : 'black'}}>
        <img src = {Carrerbanner} alt='banner' className='banner' />
        <div className='banner-content'>
            <h1 className='text-banner line'><strong><span className='text-orange'>Explore</span> <span className='text-white'>Courses .</span> </strong> </h1>
            <div className='text-white'><strong>Explore courses that are Ideal for you </strong></div>
        </div>
        </div>
        <BackButtonContainer>
        <BackButton onClick={() => {navigate('/home')}}>
          <ArrowBackIosIcon />
          Back
        </BackButton>
      </BackButtonContainer>
        </Fragment>
    )


}

export default Banner;
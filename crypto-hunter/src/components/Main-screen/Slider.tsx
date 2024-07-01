import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { get } from "../../API/apiClient";
import { useEffect, useState } from "react";
import { coindetails } from "../../Type";
import { CarouselProvider, Slider as Sl, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const Slider = () => {
  const [list, setList] = useState<coindetails[]>([
    {
      id: "1",
      symbol: "good",
      image:
        "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
      current_price: 1,
      ath_change_percentage: 1,
    },
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await get<any>("/coins/markets?vs_currency=INR"); // Replace with your actual endpoint
      result && setList(result);
    } catch (error) {
      console.log(error);
    }
  };

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
          bgcolor: "background.default",
        }}
      ></Paper>
    
      <Box sx={{ height: 325, maxWidth: 400, width: "100%", p: 2 }}>

        {/* {list[activeStep] !== null ?  <div className=" d-flex flex-column align-items-center">
          { <img src={list[activeStep].image} />}
          <div>{list[activeStep].symbol.toUpperCase()}   <span style={{color : list[activeStep].ath_change_percentage < 0 ? 'red' : 'green'}}>{list[activeStep].ath_change_percentage} </span> </div>
          <div> $ {list[activeStep].current_price}</div>
          </div>: null } */}
         
       
      </Box>
      <MobileStepper
        variant="text"
        steps={list.length}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === list.length - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />

<CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={3}
      >
        <Sl>
          <Slide index={1}>I am the first Slide.</Slide>
          <Slide index={0}>I am the second Slide.</Slide>
          <Slide index={2}>I am the third Slide.</Slide>
        </Sl>
      </CarouselProvider>
    </Box>


  );
};

export default Slider;

import * as React from "react";
import { Range } from "react-range";
import barsEmpty from '../../assests/img/bars-empty.png';
import {styled} from 'styled-components';
import barsFull from '../../assests/img/bars-full.png';
import barsFull2 from '../../assests/img/bars-full2.jpg';

const Container = styled.div({
    position : 'relative',
    maxWidth : '100%'
})

interface imgProps {
    percentage : number
}

const RightBar = styled.div<imgProps>`
   
    position: absolute;
    height: 100%;
    bottom: 0px;
   background-image : url(${barsFull2});
   width :  ${(props) => props.percentage}%;
   z-index : ${(props) => props.percentage<=51?2:1};
`

const LeftBar = styled.div<imgProps>`
   
    position: absolute;
    height: 100%;
    bottom: 0px;
   background-image : url(${barsFull});
   width :  ${(props) => props.percentage}%;
   z-index : ${(props) => props.percentage>51?2:1};
   
`

const Slider: React.FC = () => {
  const [values, setValues] = React.useState([50]);
  return (

  <Container>
    
   <img src={barsEmpty} alt="barsempty"  />
   
   <RightBar percentage={values[0]}>

   </RightBar>
   <LeftBar percentage={values[0]} />
    <Range
      step={0.1}
      min={0}
      max={100}
      values={values}
      onChange={(values) => setValues(values)}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "5px",
            width: "100%",
            backgroundColor: 'transparent',
            position : 'absolute',
            bottom : '0px',
            zIndex : 2
          }}
        >
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          key={props.key}
          style={{
            ...props.style,
            height: "26px",
            width: "26px",
            borderRadius : '50%',
            backgroundColor: "#003B4A",
            border : '13px solid #0097A2'
          }}
        />
      )}
    />
   

   </Container>
    
  );
};

export default Slider;
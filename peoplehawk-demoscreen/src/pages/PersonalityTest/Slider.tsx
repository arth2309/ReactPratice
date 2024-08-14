import * as React from "react";
import { Range } from "react-range";
import barsEmpty from "../../assests/img/bars-empty.png";
import { styled } from "styled-components";
import barsFull from "../../assests/img/bars-full.png";

interface ImgProps {
  percentage: number;
}

interface SliderProps {
  slideValues: number;
  onSlideChange: (value: number) => void;
  onTouch: () => void;
}

const Container = styled.div({
  position: "relative",
  maxWidth:
    window.screen.width > 605
      ? "551px"
      : `calc(${window.screen.width}px - 144px)`,
});

const RightBar = styled.div.withConfig({
  shouldForwardProp: (prop) => !['percentage'].includes(prop),
})<ImgProps>`
  position: absolute;
  height: 100%;
  bottom: 2px;
  background-image: url(${barsFull});
  transform: scaleX(-1);
  left: 50%;
  background-size: ${window.screen.width > 605
    ? '551px'
    : `calc(${window.screen.width}px - 144px)`};
  background-position: ${window.screen.width > 605
    ? '-275.5px'
    : `calc((144px - ${window.screen.width}px)/2)`};
  background-repeat: no-repeat;
  transform-origin: left center;
  width: ${({ percentage }) => 50 - percentage}%;
  z-index: ${({ percentage }) => (percentage <= 50 ? 2 : 1)};
  display: ${({ percentage }) => (percentage >= 50 ? 'none' : 'block')};
`;
const LeftBar = styled.div.withConfig({
  shouldForwardProp: (prop) => !['percentage'].includes(prop),
})<ImgProps>`
  position: absolute;
  height: 100%;
  bottom: 1px;
  background-image: url(${barsFull});
  left: 50%;
  background-size: ${window.screen.width > 605
    ? "551px"
    : `calc(${window.screen.width}px - 144px)`};
  background-position: ${window.screen.width > 605
    ? "-275.5px"
    : `calc((144px - ${window.screen.width}px)/2)`};
  background-repeat: no-repeat;
  transform-origin: left center;
  width: ${({percentage}) => percentage - 50}%;
  z-index: ${({percentage}) => (percentage > 51 ? 2 : 1)};
  display: ${({percentage}) => (percentage <= 50 ? "none" : "block")};
`;
const Label = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top: 27px;
`;
const LabelLeft = styled.div`
  text-align: left;
  font-weight: 500;
  line-height: 1;
`;
const LabelCenter = styled.div`
  color: #59bbbd;
  font-weight: 500;
`;
const LabelRight = styled.div`
  text-align: right;
  font-weight: 500;
  line-height: 1;
`;
const Slider: React.FC<SliderProps> = (props) => {
  const [values, setValues] = React.useState([50]);

  React.useEffect(() => {
    setValues([props.slideValues]);
  }, [props.slideValues]);

  return (
    <Container>
      <img
        src={barsEmpty}
        alt="barsempty"
        style={{
          maxWidth:
            window.screen.width > 605
              ? "551px"
              : `calc(${window.screen.width}px - 144px)`,
        }}
      />

      <RightBar percentage={values[0]}></RightBar>
      <LeftBar percentage={values[0]} />
      <Label style={{ fontSize: window.screen.width > 650 ? "16px" : "10px" }}>
        <LabelLeft>
          Strongly <br /> disagree
        </LabelLeft>
        <LabelCenter>Drag the slider to decide</LabelCenter>
        <LabelRight>
          Strongly <br /> agree
        </LabelRight>
      </Label>
      <Range
        step={0.1}
        min={0}
        max={100}
        values={values}
        onChange={(values) => {
          setValues(values);
          props.onSlideChange(values[0]);
          props.onTouch();
        }}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "5px",
              width: "100%",
              backgroundColor: "transparent",
              position: "absolute",
              bottom: "0px",
              zIndex: 2,
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
              height: window.screen.width > 650 ? "26px" : "13px",
              width: window.screen.width > 650 ? "26px" : "13px",
              borderRadius: "50%",
              backgroundColor: "#003B4A",
              border: `${
                window.screen.width > 650 ? "13px" : "6.5px"
              } solid #0097A2`,
            }}
          />
        )}
      />
    </Container>
  );
};

export default Slider;

import * as React from "react";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.css";
import Slider from "./Slider";
import Cryptotable from "./Cryptotable";



const Dashboard: React.FC = () => {
  return (
    <>
      <Header  />

      <div className="d-flex flex-column align-items-center mt-5">
        <h1 className=" text-success">
          <strong>Crypto Hunter</strong>
        </h1>
        <span className="text-success">
          Get All The Info Regarding Your Favourite Crypto Currency{" "}
        </span>
      
      </div>
      <Slider />
      <Cryptotable />
      
    </>
  );
};

export default Dashboard;

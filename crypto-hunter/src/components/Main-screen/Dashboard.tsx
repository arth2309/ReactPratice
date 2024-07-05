import React, { useEffect, useState } from "react";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.css";
import Slider from "./Slider";
import { coindetails } from "../../Type";
import Cryptotable from "./Cryptotable";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { get } from "../../API/apiClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
  const [list, setList] = useState<coindetails[]>([]);

  const api = useSelector((state: RootState) => state.api);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [api]);

  const fetchData = async () => {
    try {
      const result = await get<coindetails[]>(`/${api}`);
      result && setList(result);
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  return (
    <>
      <Header />

      <div className="d-flex flex-column align-items-center mt-5">
        <h1 className=" text-success">
          <strong>Crypto Hunter</strong>
        </h1>
        <span className="text-success subtitle">
          Get All The Info Regarding Your Favourite Crypto Currency{" "}
        </span>
      </div>
      <Slider list={list} />
      <Cryptotable list={list} />
      <ToastContainer />
    </>
  );
};

export default Dashboard;

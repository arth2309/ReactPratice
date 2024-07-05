import Header from "../Main-screen/Header";
import Detail from "./Detail";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { get } from "../../API/apiClient";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { coindetails } from "../../Type";
import Grid from "@mui/material/Grid";
import Coinchart from "./Coinchart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Coindetails = () => {
  let { id } = useParams();

  // eslint-disable-next-line
  const data = useLocation();

  const api = useSelector((state: RootState) => state.api);
  const [item, setItem] = useState<coindetails>({
    id: "1",
    symbol: "good",
    image:
      "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
    current_price: 1,
    ath_change_percentage: 1,
    market_cap: 1,
    price_change_percentage_24h: 1,
    name: "bitcoin",
    market_cap_rank: 1,
  });

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [api]);

  const fetchData = async () => {
    try {
      const result = await get<coindetails[]>(`/${api}`);
      const item = result.find((item) => item.id === id);
      if (item) {
        setItem(item);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <>
      <Header />
      <Grid container className="mt-5" paddingLeft={2}>
        <Grid item xs={12} md={4} lg={3}>
          <Detail item={item} />
        </Grid>

        <Grid item xs={12} md={7} lg={8} paddingLeft={3}>
          <Coinchart id={id} />
        </Grid>
      </Grid>
      <ToastContainer />
    </>
  );
};

export default Coindetails;

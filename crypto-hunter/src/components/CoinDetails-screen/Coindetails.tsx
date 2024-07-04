import Header from "../Main-screen/Header";
import Detail from "./Detail";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { get } from "../../API/apiClient";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { coindetails } from "../../Type";
import  Grid  from "@mui/material/Grid";
import Coinchart from "./Coinchart";



const Coindetails = () => {

    let {id} = useParams();
   

    const api = useSelector((state: RootState) => state.api);
     const [item,setItem] = useState<coindetails>({
        id: "1",
        symbol: "good",
        image:
          "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
        current_price: 1,
        ath_change_percentage: 1,
        market_cap : 1,
        price_change_percentage_24h : 1,
        name : 'bitcoin',
        market_cap_rank : 1
      });
      

     
  useEffect(() => {
    fetchData();
// eslint-disable-next-line
  }, [api]);



  const fetchData = async () => {
    try {
      const result = await get<coindetails[]>(`/${api}`);
      const item = result.find((item) => item.id === id)
      if(item)
        {
            setItem(item);
        }
    
    } catch (error) {
      console.log(error);
    }
  };

  console.log(item);

    return(
        <>
        <Header />
        <Grid container className="mt-5" paddingLeft={2}>
          <Grid item xs = {12}  md = {4} lg = {3}>
        <Detail item = {item} />
        </Grid> 
  
        {/* <div className="d-grid">
       
        <div className="vr" style={{height : '600px'}}></div>
             
        </div> */}

        <Grid item xs = {12} md = {7} lg = {8} paddingLeft={3}>
        <Coinchart id = {id} />
        </Grid>
        </Grid >
       
        </>
    )

} 

export default Coindetails
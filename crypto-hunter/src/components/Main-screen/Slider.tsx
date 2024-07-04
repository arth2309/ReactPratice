import * as React from "react";
import { get } from "../../API/apiClient";
import { useEffect, useState } from "react";
import { coindetails } from "../../Type";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import  Container  from "react-bootstrap/Container";
import { RootState } from "../../store";
import { useSelector } from "react-redux";


const Slider = () => {

  const api = useSelector((state : RootState) => state.api)
  const [list, setList] = useState<coindetails[]>([
    {
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
    },
  ]);


  useEffect(() => {
    fetchData();

    // eslint-disable-next-line
  }, [api]);

// eslint-disable-next-line 

  const fetchData = async () => {
    try {
      const result = await get<coindetails[]>(`/${api}`); 
      result && setList(result);
    } catch (error) {
      console.log(error);
    }
  };


  const[slidesPerPage,setSLidesPerPage] = useState<number>(4);

  useEffect(() => {

    setSLidesPerPage(window.innerWidth < 768 ? 2 : 4)
    console.log('here');

  },[])
  

  return (


<Container className="mt-5">

         <Carousel autoPlay = {true} infiniteLoop showArrows={true} showIndicators = {false} showStatus={false} showThumbs = {false}  interval={3000}>
            {Array.from({ length: Math.ceil(list.length / slidesPerPage) }, (_, slideIndex) => (
                <div key={slideIndex} className="d-flex align-items-center">
                    {list.slice(slideIndex * slidesPerPage, slideIndex * slidesPerPage + slidesPerPage).map(item => (
                        <div key={item.id} className="d-flex flex-column align-items-center mx-5 justify-content-between">
                            <img src={item.image} alt={item.symbol} style={{maxWidth : '100%'}} />
                            <div>
                            <div>{item.symbol.toUpperCase()} <span className= {item.ath_change_percentage < 0 ? 'text-danger' : 'text-success'} >{item.ath_change_percentage} </span> </div>
                            <div>$ {item.current_price}</div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </Carousel>
       
     
    
    </Container>


  );
};

export default Slider;

import * as React from "react";
import { useEffect, useState } from "react";
import { coindetails } from "../../Type";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Container from "react-bootstrap/Container";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

const Slider = (props: any) => {
  const api = useSelector((state: RootState) => state.api);
  const { list } = props;
  const [slidesPerPage, setSLidesPerPage] = useState<number>(4);

  useEffect(() => {
    setSLidesPerPage(window.innerWidth < 768 ? 2 : 4);
  }, []);

  return (
    <Container className="mt-5">
      <Carousel
        autoPlay={true}
        infiniteLoop
        showArrows={true}
        showIndicators={false}
        showStatus={false}
        showThumbs={false}
        interval={3000}
      >
        {Array.from(
          { length: Math.ceil(list.length / slidesPerPage) },
          (_, slideIndex) => (
            <div key={slideIndex} className="d-flex align-items-center">
              {list
                .slice(
                  slideIndex * slidesPerPage,
                  slideIndex * slidesPerPage + slidesPerPage
                )
                .map((item: coindetails) => (
                  <div
                    key={item.id}
                    className="d-flex flex-column align-items-center mx-5 justify-content-between"
                  >
                    <img
                      src={item.image}
                      alt={item.symbol}
                      style={{ maxWidth: "100%" }}
                    />
                    <div>
                      <div>
                        {item.symbol.toUpperCase()}{" "}
                        <span
                          className={
                            item.ath_change_percentage < 0
                              ? "text-danger"
                              : "text-success"
                          }
                        >
                          {item.ath_change_percentage}{" "}
                        </span>{" "}
                      </div>
                      <div>
                        {api === "0458d638-790d-43c8-856b-ff407a26090b"
                          ? "$"
                          : "INR"}{" "}
                        {item.current_price}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )
        )}
      </Carousel>
    </Container>
  );
};

export default Slider;

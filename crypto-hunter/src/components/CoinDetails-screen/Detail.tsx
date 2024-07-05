import "bootstrap/dist/css/bootstrap.css";

const Detail = (props: any) => {
  const { item } = props;

  return (
    <>
      <div className=" d-flex flex-column align-items-center">
        <img src={item.image} style={{ width: "10pc" }} alt={item.name}></img>
        <h1 className="text-success">
          <strong>{item.name}</strong>
        </h1>
      </div>
      <div className="my-1">
        {item.name} is a{" "}
        <span className="text-success">
          {" "}
          <b>smart contract platform</b>{" "}
        </span>{" "}
        that enables developers to build tokens and decentralized applications
        (dapps)
      </div>
      <div className="my-1">
        <strong className="text-success">Rank :</strong> {item.market_cap_rank}
      </div>
      <div className="my-1">
        <strong className="text-success">Current price :</strong>{" "}
        {item.current_price}
      </div>
      <div className="my-1">
        <strong className="text-success">Market Cap :</strong> {item.market_cap}
      </div>
    </>
  );
};

export default Detail;

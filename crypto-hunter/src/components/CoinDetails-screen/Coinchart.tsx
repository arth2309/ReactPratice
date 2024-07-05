import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { Chart } from "chart.js/auto";
import { useEffect, useState } from "react";
import { getChartData } from "../../API/apiClient";
import { coinChartDetails, timeSlot } from "../../Type";
import moment from "moment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

Chart.register(CategoryScale);

const Coinchart = (props: any) => {
  const api = useSelector((state: RootState) => state.api);

  const { id } = props;

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [api]);

  const [label, setLabel] = useState<number[]>([]);
  const [price, setPrice] = useState<number[]>([]);
  const [position, setPosition] = useState<number>(0);

  const fetchData = async () => {
    try {
      const result: coinChartDetails = await getChartData<coinChartDetails>(
        `/${id}/market_chart?vs_currency=${
          api === "0458d638-790d-43c8-856b-ff407a26090b" ? "USD" : "INR"
        }&days=1`
      );
      setLabel(result.prices.map((item) => item[0]));
      setPrice(result.prices.map((item) => item[1]));
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const changeHandler = (event: any) => {
    setPosition(event.target.value);
  };

  const data = {
    labels: label
      .slice(position, position + 12)
      .map((item) => moment(item).format("hh:mm:a")),
    datasets: [
      {
        label: "Second dataset",
        data: price.slice(position, position + 12).map((item) => item),
        fill: false,
        borderColor: "#198754",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const items: timeSlot[] = label.reduce(
    (acc: timeSlot[], num: number, index: number) => {
      if (index % 12 === 0) {
        acc.push({
          time: num,
          position: index,
        });
      }
      return acc;
    },
    []
  );

  return label.length > 0 ? (
    <div
      className="w-75 d-flex align-items-center flex-column"
      style={{ height: "90%" }}
    >
      <Line data={data} options={options} />

      <div>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            TimeSlot
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            autoWidth
            value={position}
            onChange={changeHandler}
            label="TimeSlot"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {items.map((item) => (
              <MenuItem key={item.position} value={item.position}>
                {moment(new Date(item.time)).format("hh:mm:a")}{" "}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <ToastContainer />
      </div>
    </div>
  ) : (
    <div className="d-flex align-items-center w-100">
      <CircularProgress />
    </div>
  );
};

export default Coinchart;

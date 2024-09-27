import { Tooltip as ReactTooltip } from "react-tooltip";

type PlacesType =
  | "top"
  | "top-start"
  | "top-end"
  | "right"
  | "right-start"
  | "right-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end";

type VariantType = "dark" | "light" | "success" | "warning" | "error" | "info";

interface CustomTooltipProps {
  id: string;
  place?: PlacesType;
  variant?: VariantType;
  color?: string;
  backgroundColor?: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<CustomTooltipProps> = ({
  id,
  place = "bottom",
  color = "white",
  variant = "light",
  backgroundColor = "black",
  children,
}) => {
  return (
    <>
      <ReactTooltip id={id} place={place} variant={variant}>
        <div
          style={{
            color,
            backgroundColor,
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {children}
        </div>
      </ReactTooltip>
    </>
  );
};

export default Tooltip;

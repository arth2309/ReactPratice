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
  className?: string;
}

const Tooltip: React.FC<CustomTooltipProps> = ({
  id,
  place = "bottom",
  children,
}) => {
  return (
    <>
      <ReactTooltip
        id={id}
        place={place}
        variant="light"
        style={{
          backgroundColor: "#E4ECF3",
          color: "#394456",
        }}
      >
        <div>{children}</div>
      </ReactTooltip>
    </>
  );
};

export default Tooltip;

import {createContext} from "react";
import { Count } from "../Type";

const CountContext = createContext<Count>({
    count : 0
});

export default CountContext;
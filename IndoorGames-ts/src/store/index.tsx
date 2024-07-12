import {
  createSlice,
  configureStore,
  PayloadAction,
  combineReducers,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import {
  RegistrationDetails,
  RegistrationDetailsArray,
  Counter,
} from "../Type";
import { getParticipantsDetails,postParticipantsDetail,deleteParticipant } from "../API/apiClient";

const intialState: RegistrationDetailsArray = {
  items: JSON.parse(localStorage.getItem("participantsarray") || "[]"),
};

export const fetchParticipants = createAsyncThunk(
  "participants/fetchParticipants",
  async () => {
    try {
      const data = await getParticipantsDetails(""); // Adjust endpoint as per your API
      return data;
    } catch (error) {
      console.log(error);
      throw error
    }
  }
);

const intialcount: Counter = {
  count: JSON.parse(localStorage.getItem("participantsarray") || "[]").length,
};
const countslice = createSlice({
  name: "counter",
  initialState: intialcount,
  reducers: {
    increment(state) {
      state.count++;
    },

    decrement(state) {
      state.count--;
    },
  },
});

const itemSlice = createSlice({
  name: "details",
  initialState: intialState,
  reducers: {
      addItem(state, action: PayloadAction<RegistrationDetails>) {
      state.items.push(action.payload);
      localStorage.setItem("participantsarray", JSON.stringify(state.items));
      // eslint-disable-next-line
      const data =  postParticipantsDetail('',action.payload);
     
    },

    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("participantsarray", JSON.stringify(state.items));
      // eslint-disable-next-line
      const data = deleteParticipant(`/${action.payload}`);
    },

    updateItem(state, action: PayloadAction<number>) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );

      if (existingItem) {
        existingItem.name = "Arth";
        existingItem.email = "arth@gmail.com";
        existingItem.interested = "yes";
        existingItem.number = 2;
        existingItem.check = ["chess", "ludo"];
        existingItem.tableTennisType = "Not Participated";

        localStorage.setItem("participantsarray", JSON.stringify(state.items));
      }
    },
    getitems(state,action : PayloadAction<RegistrationDetails[]>) 
    {
        state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchParticipants.fulfilled, (state, action) => {
      state.items = action.payload;
    })
    .addCase(fetchParticipants.pending, (state, action) => {
          console.log('hii');
      })
      .addCase(fetchParticipants.rejected, (state, action) => {
        console.log('hii 2');
    });
  },
});

const rootreducer = combineReducers({
  item: itemSlice.reducer,
  count: countslice.reducer,
});

const store = configureStore({
  reducer: rootreducer,
});

export const itemActions = itemSlice.actions;
export const countActions = countslice.actions;
export type RootState = ReturnType<typeof store.getState>;
export default store;

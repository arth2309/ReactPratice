import { createSlice,configureStore, PayloadAction} from "@reduxjs/toolkit";
import { selectChange,detailId } from "../Type";




const intialType : selectChange = {

    api : 'ddf333d1-ea20-441d-ab4c-bf56bc7641a6'
}

const intialId : detailId = {

    id : 'bitcoin'
}



const selectSlice = createSlice({
    name : 'select currency type',
    initialState : intialType,
    reducers : {
        changeType(state,action : PayloadAction<string>)
        {
            
                state.api = action.payload
        }
    }
});

const idSlice = createSlice({
    name : 'coin detail',
    initialState : intialId,
    reducers :{

        changeId(state,action : PayloadAction<string>)
        {
            state.id = action.payload
        }
    }
})



const store = configureStore({
    reducer : selectSlice.reducer
})

export const selectActions = selectSlice.actions;
export const idActions = idSlice.actions
export type RootState = ReturnType<typeof store.getState>;
export default store

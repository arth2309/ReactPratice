import { createSlice,configureStore,PayloadAction, combineReducers } from "@reduxjs/toolkit";
import { RegistrationDetails,RegistrationDetailsArray, Counter } from "../Type";



const intialState : RegistrationDetailsArray = {
    items : JSON.parse(localStorage.getItem('participantsarray') || '[]')

}


const intialcount : Counter = {
    count :  JSON.parse(localStorage.getItem('participantsarray') || '[]').length
}
const countslice = createSlice({

    name : 'counter',
    initialState : intialcount,
    reducers : {
        increment(state) {

            state.count++;

        },

        decrement(state) {

            state.count--;

        }
    }

})

const itemSlice = createSlice({
    name : 'details',
    initialState : intialState,
    reducers : {

       


        addItem(state,action:PayloadAction<RegistrationDetails>) 
        {
            state.items.push(action.payload)
            localStorage.setItem('participantsarray',JSON.stringify(state.items));
        },

        removeItem(state,action : PayloadAction<number>) 
        {
                state.items = state.items.filter((item) => item.id !== action.payload)
                localStorage.setItem('participantsarray',JSON.stringify(state.items));
        },

        updateItem(state,action : PayloadAction<number>)
        {
           

            const existingItem = state.items.find((item) => item.id === action.payload)
               
            if(existingItem)

                {
                    existingItem.name = 'Arth';
                    existingItem.email = 'arth@gmail.com';
                    existingItem.interested = 'yes';
                    existingItem.number = 2;
                    existingItem.checked = ['chess','ludo'];
                    existingItem.type = 'Not Participated';

                    localStorage.setItem('participantsarray',JSON.stringify(state.items));

                }

                
            
        }

    }

});

const rootreducer = combineReducers({

    item : itemSlice.reducer,
    count : countslice.reducer

})

const store = configureStore({
    reducer : rootreducer,
})

export const itemActions = itemSlice.actions;
export const countActions = countslice.actions;
export type RootState = ReturnType<typeof store.getState>;
export default store






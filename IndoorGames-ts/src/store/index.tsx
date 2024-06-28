import { createSlice,configureStore,PayloadAction } from "@reduxjs/toolkit";
import { RegistrationDetails,RegistrationDetailsArray } from "../Type";



const intialState : RegistrationDetailsArray = {
    items : JSON.parse(localStorage.getItem('participantsarray') || '[]')
}



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


const store = configureStore({
    reducer : itemSlice.reducer
})

export const itemActions = itemSlice.actions;
export type RootState = ReturnType<typeof store.getState>;
export default store






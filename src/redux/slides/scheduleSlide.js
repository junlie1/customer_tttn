import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: []
};

const schedulesSlice = createSlice({
    name: "schedules",
    initialState,
    reducers: {
        setSchedules(state, action) {
            state.data = action.payload;
        }
    }
});

export const { setSchedules } = schedulesSlice.actions;
export default schedulesSlice.reducer;

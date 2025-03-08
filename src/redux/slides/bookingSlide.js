import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedFrom: "",
  selectedTo: "",
};

// Nếu có dữ liệu từ localStorage, cập nhật vào initialState
const storedBooking = JSON.parse(localStorage.getItem("booking"));
if (storedBooking) {
  initialState.selectedFrom = storedBooking.selectedFrom || "";
  initialState.selectedTo = storedBooking.selectedTo || "";
}

const bookingSlide = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setFrom(state, action) {
      state.selectedFrom = action.payload;
      localStorage.setItem("booking", JSON.stringify(state)); // Lưu vào localStorage
    },
    setTo(state, action) {
      state.selectedTo = action.payload;
      localStorage.setItem("booking", JSON.stringify(state)); // Lưu vào localStorage
    },
  },
});

export const { setFrom, setTo } = bookingSlide.actions;
export default bookingSlide.reducer;

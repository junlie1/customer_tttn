import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, // Lấy thông tin từ localStorage
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); 
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    updateUser: (state, action) => {
      if(state.user) {
        state.user = { ...state.user, ...action.payload }; // Chỉ cập nhật những thông tin thay đổi
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    }
  },
});

export const { setUser, clearUser, updateUser } = userSlice.actions;

export default userSlice.reducer;

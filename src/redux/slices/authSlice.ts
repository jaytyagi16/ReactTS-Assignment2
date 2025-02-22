import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInitialState {
    emailId: string;
    isLoggedIn: boolean;
}

const initialState: UserInitialState = {
    emailId: "",
    isLoggedIn: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<UserInitialState>) => {
            state.emailId = action.payload.emailId;
            state.isLoggedIn = true
        }
    }
})

export const { setIsLoggedIn } = authSlice.actions;
export default authSlice.reducer;
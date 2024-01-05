import {PayloadAction, createSlice} from "@reduxjs/toolkit"

const initialState = {
   username: ""
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        resetUsername: (state) => {
            state.username = ""
        }
    }
})

export const {setUsername, resetUsername} = authSlice.actions

export default authSlice.reducer


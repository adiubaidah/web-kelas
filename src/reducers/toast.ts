import {PayloadAction, createSlice} from "@reduxjs/toolkit"

const initialState = {
    isActive: false,
    type: "success",
    message: ""
}

export type Toast = {
    isActive: boolean,
    type: "success" | "error",
    message: string,
}

export const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        openToast: (state, action: PayloadAction<Toast>) => {
            const {payload: {isActive, type, message}} = action
            state.isActive = isActive
            state.type = type
            state.message = message
        },
        resetToast: (state)=> {
            state.isActive = false
            state.type = "success"
            state.message = ""
        }
    }

})

export const {openToast, resetToast} = toastSlice.actions
export default toastSlice.reducer
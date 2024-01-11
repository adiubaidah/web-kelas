import {PayloadAction, createSlice} from "@reduxjs/toolkit"
import { Chat } from "@/types"

type InitialStateType = Chat[]

export const chatSlice = createSlice({
    name: "chat",
    initialState: [] as InitialStateType,
    reducers: {
        add: (state, action: PayloadAction<Chat>) => {
            state.push(action.payload)
        }
    }   
})

export const {add} = chatSlice.actions
export default chatSlice.reducer

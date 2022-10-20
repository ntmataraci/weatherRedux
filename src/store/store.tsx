import { configureStore } from "@reduxjs/toolkit";
import weatherReduce from "./slice"
export const store =configureStore({
    reducer:{
weatherReduce
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
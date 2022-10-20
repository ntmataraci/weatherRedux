import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'




const myApi=process.env.REACT_APP_API_KEY
console.log(process.env)
export interface weatherState{
    geo:any[],
    name:string,
    data:any,

}

const initialState:weatherState ={
    geo:[],
    name:"London",
    data:"",

}


export const locationFetcher:any=createAsyncThunk("cityfetcher/name",async(name)=>{
    const data=await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${myApi}`)
    const result=await data.json()
    return [result[0].lat,result[0].lon,result[0].name]
})

export const weatherFetcher:any=createAsyncThunk("weatherfetcher/name",async(x:any[])=>{
    const data=await fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?lat=${x[0]}&lon=${x[1]}&appid=${myApi}`)
    const result=await data.json()
    console.log(result)
    return result
})

export const weatherSlice = createSlice({
    name:"weatherslice",
    initialState,
    reducers:{
        changeCity:(state,action)=>{
            state.name=action.payload
        }
    },
    extraReducers:{
        [locationFetcher.fulfilled]:(state,action)=>{
            state.geo=action.payload
        },

        [weatherFetcher.fulfilled]:(state,action)=>{
            state.data=action.payload
        }

    }
})

export const {changeCity}  = weatherSlice.actions
export default weatherSlice.reducer
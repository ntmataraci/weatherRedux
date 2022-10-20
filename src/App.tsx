import React, { Fragment, useEffect} from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './store/store';
import {locationFetcher,weatherFetcher,changeCity} from "./store/slice"

function App() {
  const geo=useSelector((state:RootState)=>state.weatherReduce.geo)
  const {list}:any=useSelector((state:RootState)=>state.weatherReduce.data)
  const cityName=useSelector((state:RootState)=>state.weatherReduce.name)

  const weather:[{dt:number,temp:{day:number,night:number},weather:[{icon:string}]}]=list
  const dispatch=useDispatch()
const IconAdress =`http://openweathermap.org/img/w/`


useEffect(()=>{
  dispatch(locationFetcher(cityName))
  if(geo.length>1){
  getWeather([geo[0],geo[1]])
  }
},[geo[0],geo[1]])

const getWeather=([x,y]:any)=>{
  console.log(x,y)
  dispatch(weatherFetcher([x,y]))
}

const selectCountry = (e:any) => {
dispatch(changeCity(e.target.value))
console.log(e.target.value)
dispatch(locationFetcher(e.target.value))
}

const dateConvert=(x:number)=>new Date(x*1000).toDateString()

const styleShadow = {
  color: "white",
letterSpacing:"0.2rem",
textShadow: "1px 3px 0 #969696, 1px 13px 5px #aba8a8"
}

  return (
    <div className="App">
<div style={{marginTop:"5rem"}}>Please Enter a city <input type="text" onChange={selectCountry} placeholder="London"></input></div>
<div>Do you want looking for city ?</div>
{/* {geo&&<p>{geo[0]} and {geo[1]}</p>} */}

<h2>I find this ? {geo[2]}</h2>

<div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around",marginTop:"5rem",fontSize:"1.2rem",...styleShadow}}>
{weather&&weather.map((item,idx)=>
<Fragment key={idx}>
  <div style={{display:"flex",flexDirection:"column",gap:"0.5rem"}}>
  <div>{dateConvert(item.dt)}</div>
  <div>Day: {Math.floor((item.temp.day-273)*100)/100} C</div>
  <div>Night:{Math.floor((item.temp.night-273)*100)/100} C</div>
  <div><img src={IconAdress+item.weather[0].icon+".png"} alt="hede"></img></div>
  </div>
  </Fragment>
  )}
  </div>
    </div>
  );
}

export default App;

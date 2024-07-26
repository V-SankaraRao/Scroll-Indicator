
import './App.css';
import { useEffect, useState } from 'react';
const url = "https://dummyjson.com/products?limit=50";
function App() {
const[data,setdata]=useState([]);
const[percentage,setPercentage]=useState(0);

async function fetchData(){
  const res= await fetch(url);
  const d=await res.json();
  
  d&&setdata(prev=>[...d.products]);console.log(data)

}
const handleScroll = () => {
  // Logic to handle scroll event
  console.log(
    document.body.scrollTop, // body percentage
    document.documentElement.scrollTop, // how much we are scrolled as of now
    document.documentElement.scrollHeight, // total scrollable pixels percentage
    document.documentElement.clientHeight // our browser height in pixels
  );

  const howMuchScrolled = document.documentElement.scrollTop;  // to know how many pixels user has scrolled as of now
  const height =                                           //  difference height total pixels (present body height)- current browser pixels(browser height)
    document.documentElement.scrollHeight -              // we have to done this because client height may change i.e laptop or tablet or mobile
    document.documentElement.clientHeight;
    
  let hei = Math.round((howMuchScrolled / height) * 100);
  setPercentage(hei);
  
};
useEffect(() => {
  

  // Add scroll event listener when component mounts
  window.addEventListener('scroll', handleScroll);

  // Remove scroll event listener when component unmounts
  // return () => {
  //   window.removeEventListener('scroll', handleScroll);
  // };
}, []); // Empty dependency array ensures this effect runs only once








useEffect(()=>{
  fetchData();
},[url]);

console.log(percentage)
  return (
    <div className="App">
      <div className='container'>
        <h1>Scoll Indicator</h1>
        <div className='bar' style={{width:`${percentage}%`}}></div>
      </div>
      <div className='data'>{
        data.map((i)=> <h3>{i.title}</h3>)
      }</div>
      
    </div>
  );
}

export default App;

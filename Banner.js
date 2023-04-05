import React,{useEffect,useState} from 'react'
import axios from './axios'
import requests from './requests';

function Banner ()  {
const[movies,setmovies]=useState([])
useEffect(()=>{
    async function fetchdata(){
        const request= await axios.get(requests.requestPopular);
        setmovies(
            request.data.results[
                Math.floor(Math.random()*request.data.results.length)
            ]
        );
        return request;
    }
    fetchdata();
},[]);
console.log(movies);
function truncate(str,n){
    return str?.length>n ? str.substr(0,n-1)+".....":str;
}
  return (
    <header className="banner"
    style ={{
          backgroundSize:"cover",
          backgroundImage:`url(
            "https://image.tmdb.org/t/p/original/${movies?.backdrop_path}"
          )`,
          backgroundPosition:"",
        }}
       > 
    <div className="banner_first ml-[30px] pt-[80px] h-[490px]">
     <h1 className="text-[3rem] pb-[0.3rem] font-bold">
        {movies?.title || movies?.name || movies?.original_name}
     </h1>
     <div className="buttons space-x-4">
        <button className="pl-[2rem] pr-[2rem] pt-[0.5rem] pb-[0.5rem] bg-[#666262] hover:bg-red-500 text-white rounded-md">Play</button>
        <button className="pl-[2rem] pr-[2rem] pt-[0.5rem] pb-[0.5rem] bg-[#666262] text-white hover:bg-red-500 rounded-md">Watch Later</button>
     </div>
     <h1 className="description w-[45rem] pt-[1rem] max-w-[360px] text-[1 rem] [400px]:hidden ">{movies?.overview}
     {truncate(movies?.overview,5)}
     </h1>
     <div className="fader bg-gradient-to-r from-black ml-0 "/>
     </div>
    </header>
  )
}

export default Banner

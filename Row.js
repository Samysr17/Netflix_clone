import React,{useState,useEffect} from 'react'
import axios from './axios'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer' ;
const base_url="https://image.tmdb.org/t/p/original/";
function Row  ({title,fetchUrl,isLargeRow}) {
    const[movies,setmovies]=useState([]);
    const[trailerUrl,settrailerUrl]=useState("");

    useEffect(() =>{
     async function fetchdata(){
      const request= await axios.get(fetchUrl);
      setmovies(request.data.results)
      return request;
     }
     fetchdata();
    },[fetchUrl]);
    const opts = {
      height: "390",
      width: "100%",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },};
      const handleclick=(movie)=>{
        if(trailerUrl){
          settrailerUrl("")
        }else{
          movieTrailer(movie?.name || "")
          .then(url=>{
            const urlParams=new URLSearchParams(new URL(url).search);
            settrailerUrl(urlParams.get("v"));

          }).catch(error =>console.log(error))
        }
     }
    console.log(movies);
  return (
    
    <div className="row">
   <h2>{title}</h2>
   <div className="row_posters flex overflow-y-hidden overflow-x-scroll p-[20px]">
     {movies.map(movie =>(
      <img key={movie.id} onClick={()=>handleclick(movie)} className=" rows h-[100px] object-contain w-full mr-10  cursor-pointer" src={`${base_url}${ movie.backdrop_path}`} alt={movie.name}/>
     ))}
   </div>
   {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}'
    </div>
    
    
  )
}

export default Row
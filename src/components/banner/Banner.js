import React,{useEffect, useState} from 'react'
import './Banner.css'
import {API_KEY,ImgURl} from '../../constents/Constence'
import axios from '../../Axios'

function Banner() {
  const [movie,setMovie] = useState();
  useEffect(() => {
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28&with_watch_monetization_types=flatrate`).then((response=>{
      console.log(response.data.results[2]);
      setMovie(response.data.results[0])
    }))
  }, []);
  return (
    <div style={{backgroundImage:`url(${movie ? ImgURl+movie.backdrop_path :''})`}} className='banner'>

      <div className='content'>
        <h1 className='title'>{ movie ? movie.title || movie.name :"" }</h1>
        <div className='banner_buttons'>
            <button className='button'>play</button>
            <button className='button'>My List</button>
        </div>
        <h1 className='description'>{movie ? movie.overview :''}</h1>
      </div>
      <div className="fade_button">
        
      </div>
    </div>
  )
}

export default Banner

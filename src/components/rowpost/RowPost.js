import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import './RowPost.css'
import {ImgURl,API_KEY} from '../../constents/Constence'
import axios from '../../Axios'
function RowPost(props) {
  const [movies,setMovies] = useState([]);
  const [urlId , seturlId] = useState('')
  useEffect(() => {
    axios.get(props.url).then((respone)=>{
      // console.log(respone.data);
      setMovies(respone.data.results)
    }).catch(err=>{
      alert('Network Error')
    })
    
  },);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay:1,
    },
  };
  const  handleMovie = (id)=>{
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response)=>{
      console.log(response.data);
      if (response.data.results.lenght !== 0) {
        seturlId(response.data.results[0])
      }
    })
  }
  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((obj)=>
          <img onClick={()=>handleMovie(obj.id)} className={props.isSmall ? 'smallPoster':'poster'} src={`${ImgURl+obj.backdrop_path}`} alt="poster" />
        )}
      </div> 
      { urlId && <YouTube videoId={urlId.key} opts={opts} /> }
    </div>
  )
}

export default RowPost

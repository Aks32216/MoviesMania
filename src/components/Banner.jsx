import React from 'react';
import "../Styling/Banner.css";

function Banner(props){
    let [firstMovie,setFirstMovie]=React.useState("");

    React.useEffect(()=>{
        async function fetchData(){
            let response=await fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=07612816c08d16628dd9ccc67e83beab&page="+props.pageNo);
            let data=await response.json();
            // console.log(data);
            let movie=data.results;
            setFirstMovie(movie[0]);
    
        }
        fetchData();
    },[props.pageNo]);

    return(
        <>
            {firstMovie==""?<>Loading...</>:
            <div className="banner">
                <img className='banner_img' src={"https://image.tmdb.org/t/p/original/"+firstMovie.backdrop_path} alt="" />
                <div className='banner_text'><h1>{firstMovie.title}</h1></div>
            </div>
            }
        </>
    )
}

export default Banner
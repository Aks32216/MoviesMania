import React from 'react';
import "../Styling/MovieList.css";
import funcObj from "../Functions/functions"


let api=process.env.REACT_APP_API;

function MovieList(props){
    let [movies,setMovie]=React.useState("");
    let [value,setValue]=React.useState("");
    let [favourites,setFavourites]=React.useState([]);
    React.useEffect(()=>{
        async function fetchData(){
            let response=await fetch("https://api.themoviedb.org/3/trending/movie/week?api_key="+api+"&page="+props.pageNo);
            let data=await response.json();
            let movies=data.results;
            setMovie(movies);
        }
        fetchData();
    },[props.pageNo]);

    React.useEffect(()=>{
        let tempNewFavourite=localStorage.getItem("favourites") || "[]";
        let newFavourite=JSON.parse(tempNewFavourite);
        setFavourites(newFavourite);
    },[]);


    function setText(e){
        let value=e.target.value;
        setValue(value);
    }

    function containsFavouriteHandler(movieId){
        for(let i=0;i<favourites.length;++i)
        {
            if(favourites[i].id==movieId){
                return true;
            }
        }
        return false;
    }

    function deleteFavouriteHandler(movieId){
        let newFavourite=[];
        newFavourite=favourites.filter((moviesObj)=>{
            return moviesObj.id!=movieId;
        });
        let prevStrArray = localStorage.getItem("favourites") || "[]";
        let prevArray = JSON.parse(prevStrArray);
        prevArray = prevArray.filter((movieObj) => {
            return movieObj.id != movieId;
        })
        prevArray = JSON.stringify(prevArray);
        localStorage.setItem("favourites", prevArray);
        setFavourites(newFavourite);
    }

    function setFavouriteHandler(movieId){
        let newFavourite=[...favourites];
        for(let i=0;i<movies.length;++i){
            if(movies[i].id==movieId){
                newFavourite.push(movies[i]);
                let prevStrArray=localStorage.getItem("favourites") || "[]";
                let prevArray=JSON.parse(prevStrArray);
                if(prevArray.includes(movies[i])==false)
                {
                    prevArray.push(movies[i]);
                    let newStrArray=JSON.stringify(prevArray);
                    localStorage.setItem("favourites",newStrArray);
                }
                break;
            }
        }
        setFavourites(newFavourite);
    }

    let searchedMovies=funcObj.filterMovies(value,movies);
    return(
        <div className='movie_list'>
            <h1>Trending Movies</h1>
            <input value={value} onChange={setText} placeholder="Search Movies"></input>
            {movies==""?<h2>Loading Movies...</h2>:
                <div className='trending_box'>
                    {searchedMovies.map((moviesObj,id)=>{
                        return(
                            <div key={id} className="poster_box">
                                <div className="like_dislike">
                                {
                                    containsFavouriteHandler(moviesObj.id)?
                                    <i className="fa-solid fa-thumbs-down" onClick={()=>{
                                        deleteFavouriteHandler(moviesObj.id);
                                    }}></i>:
                                    <i className="fa-solid fa-thumbs-up" onClick={()=>{
                                        setFavouriteHandler(moviesObj.id);
                                    }}></i>
                                }
                                </div>
                                <img className='poster_img' src={"https://image.tmdb.org/t/p/original/"+moviesObj.poster_path} alt="" />
                                
                                <h2>{moviesObj.title}</h2>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}


export default MovieList
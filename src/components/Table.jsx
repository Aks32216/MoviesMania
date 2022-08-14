import React from 'react';
import "../Styling/Table.css";
import funcObj from "../Functions/functions";
import {genreids} from "../Functions/genreids";


function Table(props){
    let [ratingOrder,setRatingOrder]=React.useState(null);
    let [popularityOrder,setPopularityOrder]=React.useState(null);
    
    function sortRatingHandler(order){
        setRatingOrder(order);
        setPopularityOrder(null);
    }
    
    function sortPopularityHandler(order){
        setPopularityOrder(order);
        setRatingOrder(null);
    }

    function deleteMovieHandler(movieId){
        let newFavourite=[];
        newFavourite=props.favourites.filter((moviesObj)=>{
            return moviesObj.id!=movieId;
        });
        let prevStrArray = localStorage.getItem("favourites") || "[]";
        let prevArray = JSON.parse(prevStrArray);
        prevArray = prevArray.filter((movieObj) => {
            return movieObj.id != movieId;
        })
        prevArray = JSON.stringify(prevArray);
        localStorage.setItem("favourites", prevArray);
        props.setFavourite(newFavourite);
    }

    // console.log("receved before grouping ",props.curGenre);    
    // Group by genre
    let groupByGenre=props.curGenre=="All Genre" ? props.favourites: getByGenre(props.curGenre,props.favourites);
    
    // searching
    let searchedMovies= props.searchText=="" ? groupByGenre : funcObj.filterMovies(props.searchText,groupByGenre);
    // sorting
    let finalArrangement= ratingOrder===null ? searchedMovies : funcObj.sortByRating(ratingOrder,searchedMovies);
    let sortByRatingAndOrder=popularityOrder===null ? finalArrangement : funcObj.sortByPopularity(popularityOrder,finalArrangement);

    // pagination
    let sIdx=(Number(props.pageNo-1))*(Number(props.noOfElems));
    let eIdx=Number(sIdx)+Number(props.noOfElems);
    let finalDisplay=sortByRatingAndOrder.slice(sIdx,eIdx);
    // console.log("received in tables",props.curGenre);
    return(
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th><i onClick={()=>{sortRatingHandler(true)}} className="favour fa-solid fa-arrow-down-1-9"></i>Rating<i onClick={()=>{sortRatingHandler(false)}} className="favour fa-solid fa-arrow-down-9-1"></i></th>
                    <th><i onClick={()=>{sortPopularityHandler(true)}} className="favour fa-solid fa-arrow-down-1-9"></i>Popularity<i onClick={()=>{sortPopularityHandler(false)}} className="favour fa-solid fa-arrow-down-9-1"></i></th>
                    <th>Genre</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {finalDisplay.map((movieObj)=>{
                    return(
                        <>
                            <tr>
                                <td><div className='img_section'><img className='table_img' src={"https://image.tmdb.org/t/p/original/"+movieObj.poster_path} alt="" /><h3>{movieObj.title}</h3></div></td>
                                <td className='data'>{movieObj.vote_average}</td>
                                <td className='data'>{movieObj.popularity}</td>
                                <td className='data'>{props.genreids[movieObj.genre_ids[0]]}</td>
                                <td className='trash'><i onClick={()=>{
                                    deleteMovieHandler(movieObj.id);
                                }} className="fa-solid fa-trash trash_logo"></i></td>
                            </tr>
                        </>
                    )
                })}
            </tbody>
        </table>
    )
}

function getByGenre(curGenre,movies){
    let newFavourites=[];
    newFavourites=movies.filter((movieObj)=>{
        return curGenre==genreids[movieObj.genre_ids[0]];
    });
    return newFavourites;
}


export default Table
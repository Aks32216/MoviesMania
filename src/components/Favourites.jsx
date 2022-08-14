import React from 'react'
import Header from "./Header";
import Genre from "./Genre"
import Table from "./Table"
import "../Styling/Favourites.css";
import {genreids} from "../Functions/genreids";


function Favourites() {
    let [favourites,setFavourite]=React.useState([]);
    let [searchText,setSearchText]=React.useState("");
    let [pageNo,setPageNo]=React.useState(1);
    let [noOfElems,setNoOfElems]=React.useState(5);
    let [genre,setGenres]=React.useState([]);
    let [curGenre,setCurGenre]=React.useState("All Genre");
    
    React.useEffect(()=>{
        let tempNewFavourite=localStorage.getItem("favourites") || "[]";
        let newFavourite=JSON.parse(tempNewFavourite);
        setFavourite(newFavourite);
    },[]);

    React.useEffect(()=>{
        let tempFavourite=localStorage.getItem("favourites") || "[]";
        tempFavourite=JSON.parse(tempFavourite);
        let temp = tempFavourite.map((movie) => genreids[movie.genre_ids[0]])
        // unique value hold
        temp = new Set(temp);
        setGenres((prevGenre)=>{
            let newGenre=["All Genre",...temp];
            return newGenre;
        });
    },[]);

    function setText(e){
        let value=e.target.value;
        setSearchText(value);
        setPageNo(1);
    }


    function incPageNo(){
        // Handle overflow
        if((pageNo*noOfElems)>=favourites.length)
            return;
        setPageNo((pageNo)=>{
            return pageNo+1;
        })
    }

    function descPageNo(){
        // Handle Underflow
        if(pageNo==1)
            return;
        setPageNo((pageNo)=>{
            return pageNo-1;
        })
    }

    function noOfElemsHandler(e){
        let newValue = e.target.value;
        setNoOfElems(newValue);
        setPageNo(1);
    }
    // console.log("genre length",genre.length);
    // console.log(curGenre);
  return (
    <>
      <Header></Header>
      <Genre genres={genre} curGenre={curGenre} setCurGenre={setCurGenre}></Genre>
      <div className='input_section'>
        <input type="text" placeholder='Search' value={searchText} onChange={setText}/>
        <input type="Number" min={1} value={noOfElems} onChange={noOfElemsHandler}/>
      </div>
      <Table setFavourite={setFavourite} favourites={favourites} searchText={searchText} noOfElems={noOfElems} pageNo={pageNo} genreids={genreids} curGenre={curGenre}></Table>
      <div className='pagination'>
            <div className='pagination_btn' onClick={descPageNo}><i className="fa-solid fa-arrow-left-long"></i></div>
            <div className='page_no'>{pageNo}</div>
            <div className='pagination_btn' onClick={incPageNo}><i className="fa-solid fa-arrow-right-long"></i></div>
        </div>
    </>
  )
}

export default Favourites
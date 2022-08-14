import React from 'react';
import "../Styling/Pagination.css";
import Header from "./Header";
import Banner from "./Banner";
import MovieList from "./MovieList";

function Home() {
    let [pageNo,setPageNo]=React.useState(1);

    function incPageNo(){
        setPageNo((pageNo)=>{
            return pageNo+1;
        })
    }

    function descPageNo(){
        if(pageNo==1)
            return;
        setPageNo((pageNo)=>{
            return pageNo-1;
        })
    }
  return (
    <>
        <Header></Header>
        <Banner pageNo={pageNo}></Banner>
        <MovieList pageNo={pageNo}></MovieList>
        <div className='pagination'>
            <div className='pagination_btn' onClick={descPageNo}><i className="fa-solid fa-arrow-left-long"></i></div>
            <div className='page_no'>{pageNo}</div>
            <div className='pagination_btn' onClick={incPageNo}><i className="fa-solid fa-arrow-right-long"></i></div>
        </div>
    </>
  )
}

export default Home
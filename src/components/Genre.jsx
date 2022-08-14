import React from 'react';
import "../Styling/Genre.css";

function Genre(props){

  React.useEffect(()=>{
    let allGenresClass=document.querySelector(".genre_class").getElementsByTagName('h2');;
    // console.log("all h2 length",allGenresClass);
    for(let i=0;i<allGenresClass.length;++i)
    {
      allGenresClass[i].classList.remove("selected");
    }
    for(let i=0;i<allGenresClass.length;++i){
      if(allGenresClass[i].innerText==props.curGenre){
        allGenresClass[i].classList.add("selected");
      }
    }
  });


  function curGenreHandler(clickedGenre){
    props.setCurGenre(clickedGenre);
  }

    return(
      <div className='flex genre_class'>
        {props.genres.map((genere)=>{
          return (<h2 className="genre_title" onClick={()=>{
            curGenreHandler(genere);
          }}>{genere}</h2>)
        })}
      </div>
    )
  }

export default Genre
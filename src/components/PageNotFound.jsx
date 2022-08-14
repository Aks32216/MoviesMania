import React from 'react'
import Error from "../Images/Error.png";
import "../Styling/PageNotFound.css";


function PageNotFound() {
  return (
    <div className='page_not_found'>
      <img src={Error}/>
      <div>
        <h2>Page Not Found</h2>
        <h4>Sorry, but we can't find the page you are looking for...</h4>
      </div>  
    </div>
  )
}

export default PageNotFound
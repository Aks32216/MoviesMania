import React from 'react';
import logo from "../Images/logo.png";
import "../Styling/Header.css";
import {Link} from "react-router-dom";

function Header(){
    return (
        <div className="flex">
            <img src={logo} alt={logo} className="logo"></img>
            <Link to="/home">
                <h1>Movies</h1>
            </Link>
            <Link to="/favourites">
                <h1>Favourites</h1>
            </Link>
        </div>
    )
};

export default Header
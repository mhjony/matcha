import React from 'react';
import './css/Nav.css';

const Nav = () => {
    function navFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
          x.className += " responsive";
        } else {
          x.className = "topnav";
        }
    }
    return (
        <div>
            <div class="topnav" id="myTopnav">
                <a href="# " class="active">Matcha</a>
                <a href="/login">Log in</a>
                <a href="/signup">Sign up</a> 
                <a href="javascript:void(0);" class="icon" onclick={navFunction}>
                    <i class="fa fa-bars"></i>
                </a>
            </div>
        </div>
    )
}
export default Nav;
import React, {useEffect, useState} from "react";
import { Link, useLocation } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";
import { useAuth } from "../contexts/AuthContext"
import DB from '../utils/DB';

function Header() {
  // We'll go into the Hooks API later, for now, we are just using some code
  // from the react-router docs (https://reacttraining.com/react-router/web/api/Hooks/uselocation)
  // This allows the component to check the route any time the user uses a link to navigate.
  const location = useLocation();
  const { currentUser, logout } = useAuth()
  const [user, setUser] = useState({id:0, username: ""});

  useEffect(() => {
    let sidenav = document.querySelector('#slide-out');
    M.Sidenav.init(sidenav, {});
    DB.getUser(currentUser.email)
      .then(user => setUser(user));
  }, []);


  return (
    <div className="App">
       <nav>
         <div className="container-xl">
            <a href="#" data-target="slide-out" class="sidenav-trigger show-on-large"><i class="material-icons">menu</i></a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
               <li>
                  <Link to="/">{user.username}</Link>
                </li>
            </ul>
         </div>
       </nav>
        <ul id="slide-out" class="sidenav">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Teams">Teams</Link></li>
        <li><Link to="/Play">Play</Link></li>
        <li><Link to="/History">History</Link></li>
        </ul>
    </div>
  );
}

export default Header;

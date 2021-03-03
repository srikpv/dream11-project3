import {useEffect} from "react";
import './App.css';
import Players from "./components/Players";
import Play from "./components/Play";
import M from "materialize-css/dist/js/materialize.min.js";


function App() {

  useEffect(() => {
      let sidenav = document.querySelector('#slide-out');
      M.Sidenav.init(sidenav, {});
  }, []);

  return (
    <div className="App">
       <nav>
         <div className="container-xl">
            <a href="#" data-target="slide-out" class="sidenav-trigger show-on-large"><i class="material-icons">menu</i></a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
               <li><a href="#">Home</a></li>
               <li><a href="#">About</a></li>
            </ul>
         </div>
       </nav>
        <ul id="slide-out" class="sidenav">
        <li><a href="#Teams">Teams</a></li>
        <li><a href="#Play">Play</a></li>
        <li><a href="#Wins">Wins</a></li>
        </ul>
        <Play />
    </div>
    );
}

export default App;

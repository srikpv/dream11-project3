import './App.css';
import Teams from "./components/Teams";
import Play from "./components/Play";
import History from "./components/History";
import Home from "./components/Home";
import Header from "./components/Header";
import { Route, HashRouter } from "react-router-dom";

function App() {

   return (
     <HashRouter basename='/'>
     <div>
       <Header />
       <Route exact path="/" component={Home} />
       <Route exact path="/Teams" component={Teams} />
       <Route exact path="/Play" component={Play} />
       <Route exact path="/History" component={History} />
     </div>
   </HashRouter>
     );
 }

export default App;

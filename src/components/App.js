import './styles/App.css';
import Teams from "./Teams";
import Play from "./Play";
import History from "./History";
import Home from "./Home";
import Header from "./Header";
import Signup from "./SignUp";
import Login from "./Login";
import { Route, Switch, HashRouter } from "react-router-dom";
import { AuthProvider }  from "../contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";

function App() {

   return (
     <HashRouter basename='/'>
       <AuthProvider>
         <Switch>
            <div>
              <Header />
              <PrivateRoute exact path="/" component={Home} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <PrivateRoute exact path="/Teams" component={Teams} />
              <PrivateRoute exact path="/Play" component={Play} />
              <PrivateRoute exact path="/History" component={History} />
            </div>
          </Switch>
     </AuthProvider>
   </HashRouter>
     );
 }

export default App;

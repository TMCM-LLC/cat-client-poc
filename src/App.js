import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './App.css';
import CatDetail from "./components/CatDetail";
import CatEdit from "./components/CatEdit";
import Cats from './components/Cats';
import Login from './components/Login';
import NewCat from "./components/NewCat";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                        <Link to="/">Home</Link>
                        </li>
                        <li>
                        <Link to="/login">Login</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <PrivateRoute path="/new" component={ NewCat } />
                    <PrivateRoute path="/:catId/edit" component={ CatEdit } />
                    <Route path="/:catId">
                        <CatDetail />
                    </Route>
                    <Route path="/">
                        <Cats />
                    </Route>
                </Switch>
            </div>
        </Router>
    </div>
  );
}

export default App;

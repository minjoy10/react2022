import logo from './logo.svg';
import './App.css';
import { Routes, Route, NavLink } from 'react-router-dom';

import Home from './components/Home';
import RecipesContainer from './containers/recipes/App';
import StarRatingContainer from './containers/starrating/App';
import CrudContainer from './containers/crud/App';

function App() {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/">home</NavLink>
        </li>
        <li>
          <NavLink to="/service">service</NavLink>
        </li>
        <li>
          <NavLink to="/recipes">Recipes 예제</NavLink>
        </li>
        <li>
          <NavLink to="/starrating">StarRating 예제</NavLink>
        </li>
        <li>
          <NavLink to="/crud">CRUD 예제</NavLink>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<RecipesContainer />} />
        <Route path="/starrating" element={<StarRatingContainer />} />
        <Route path="/crud" element={<CrudContainer />} />
        {/*<Route path="/service" element={<Service />} />*/}
      </Routes>
    </div>
  );
}

export default App;

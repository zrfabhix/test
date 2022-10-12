import './App.css';
import Home from './components/Home';


import {
  BrowserRouter as Router,

  Route,
  Link,
  Routes
} from "react-router-dom";
import Get from './components/Get';


function App() {
  return (

    <Router>


      <Routes>
      <Route exact path='/' element={< Home />}></Route>
      <Route exact path='/get' element={< Get />}></Route>


      </Routes>

      {/* <Routes>
        <Route path="/get">
          <Get />
        </Route>



      </Routes> */}

    </Router>
  );
}

export default App;

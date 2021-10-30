import React,{useState}  from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
  
} from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NoteState from "./context/NoteState";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Alerts from "./components/Alerts";

 
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message,type)=>{
       setAlert({
         msg:message,
         type:type
       })
       setTimeout(()=>{
         setAlert(null);
       },3000);
  }
  return (

    <>
    <NoteState>
    <Router>
    <div className="App">
      <Navbar/>
      <Alerts alert={alert}/>
      <div className="container">
      <Switch>
          <Route exact path="/">
            <Home showAlert={showAlert}/>
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/signup">
            <Signup showAlert={showAlert}/>
          </Route>
          <Route exact path="/login">
            <Login showAlert={showAlert}/>
          </Route>
        </Switch>
        </div>
    </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;

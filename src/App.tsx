import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

//MUI Imports
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import deepOrange from '@material-ui/core/colors/deepOrange';
import blue from '@material-ui/core/colors/blue';

//Components
import NavBar from './components/NavBar';

//Pages
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';

const theme= createMuiTheme({
  
    palette: {
      primary: blue,
      secondary: deepOrange,
    },
  
})

const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
      <Router>
        <NavBar />
        <div className="container">
        <Switch>
          
          <Route exact path='/'  component={Home} />
          <Route path='/login'  component={Login} />
          <Route path='/signup'  component={Signup} />

        </Switch>

        </div>
        
      </Router>
    </div>

    </MuiThemeProvider>
    
  );
}

export default App;

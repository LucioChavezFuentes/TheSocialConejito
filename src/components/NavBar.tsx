import React, { Component } from 'react';
//CSS
import './NavBar.css';

//React-Router-Dom
import {Link} from 'react-router-dom';



//Material  Ui Imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

export class NavBar extends Component {
    render() {
        return (
            <AppBar>
                <Toolbar className='nav-container'>
                    <Button color="inherit" component={Link} to='/'>
                         Home 
                    </Button>

                    <Button color="inherit" component={Link} to='/login'>
                         Login 
                    </Button>

                    <Button color="inherit" component={Link} to='/signup'>
                         Signup 
                    </Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default NavBar

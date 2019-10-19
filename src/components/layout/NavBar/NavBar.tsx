import React, { Component, Fragment } from 'react';
import MyButton from '../../../util/MyButton';
import PostScream from '../../scream/PostScream';
//CSS
//The margin 'auto' keeps the Buttons Elements at the center of ToolBar
import './NavBar.css';

//React-Router-Dom
import {Link} from 'react-router-dom';

//Material  Ui Imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

//Material Ui Icons
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';

//Redux imports
import {connect} from 'react-redux';
import { AppState } from '../../../redux/store';




interface Props {
    authenticated: boolean
}

export class NavBar extends Component<Props> {
    render() {
        const {authenticated} = this.props;
        return (
            <AppBar>
                <Toolbar className='nav-container'>
                    {authenticated ? ( 
                        <Fragment>
                            <PostScream />

                            <Link to='/'>
                                <MyButton tipTitle={'Home'} onClick={() => {}} tipClassName={'TobeDeclared'} btnClassName={'TobeDeclared'}  >
                                    <HomeIcon color='primary' />
                                </MyButton>
                            </Link>

                            <MyButton tipTitle='notifications' onClick={() => {}} tipClassName={'TobeDeclared'} btnClassName={'TobeDeclared'}  >
                                <Notifications color='primary' />
                            </MyButton>
                            

                        </Fragment>) : (
                        <Fragment>
                            <Button color="inherit" component={Link} to='/'>
                                Home 
                            </Button>

                            <Button color="inherit" component={Link} to='/login'>
                                Login 
                            </Button>

                            <Button color="inherit" component={Link} to='/signup'>
                                Signup 
                            </Button>
                        </Fragment>
                    )}
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = (globalState: AppState) => ({
    authenticated: globalState.user.authenticated
})

export default connect(mapStateToProps)(NavBar);

import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { createStyles } from '@material-ui/core';
import { WithStyles } from '@material-ui/styles';


//Redux Imports
import {connect} from 'react-redux';
import {editUserDetails} from '../redux/actions/userActions';
import { AppState } from '../redux/types';

//MUI Imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

//EditIcon from yarn add @material-ui/icons
import EditIcon from '@material-ui/icons/Edit';


const styles = createStyles({
    buttons: {
        textAlign: 'center',
        '& a': {
          margin: '20px 10px'
        }
      }
})

interface Props extends WithStyles<typeof styles> {
    editUserDetails: (userDetails: any) => void
    credentials : any
}

interface State {
    bio: string;
    website: string;
    location: string;
    open: boolean;
}

class EditDetails extends Component<Props, State> {
    state : State = {
        bio: '',
        website: '',
        location: '',
        open: false
    }

    mapUserCredentialsToProps = (credentials : any) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : ''
        })
    }

    handleOpen = () => {
        this.setState({ open: true })
        this.mapUserCredentialsToProps(this.props.credentials)
    }

    handleClose = () => {
        this.setState({ open: false})
    }

    componentDidMount() {
        const {credentials} = this.props;
        this.mapUserCredentialsToProps(credentials)
    }

    

    render() {
        const {classes} = this.props;
        return ( 
            <Fragment>
                <Tooltip title='Edit details' placement='top'>
                    <IconButton onClick={this.handleOpen} className={classes.buttons} >
                        <EditIcon color='primary' />
                    </IconButton>   
                </Tooltip>

            </Fragment>

            //TODO: Implemet Dialog
        )
    }
}

const mapStateToProps = (appState : AppState) => ({
    credentials : appState.user.credentials
})



export default  connect(mapStateToProps, {editUserDetails})(withStyles(styles)(EditDetails)); 

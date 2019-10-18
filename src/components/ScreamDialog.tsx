import React, { Component, Fragment } from 'react';
import {withStyles, WithStyles,  createStyles } from '@material-ui/core';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs'; 
import relativeTime from 'dayjs/plugin/relativeTime'; 
import MyButton from '../util/MyButton';

//MUI Imports
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

//MUI Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';

//Redux Imports
import {connect} from 'react-redux';
import {getScream} from '../redux/actions/dataActions';
import { AppState } from '../redux/types';

const styles = createStyles({
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '3%'
    },
    expandButton: {

    },
    profileImage: {
        maxWidth: '10rem',
        height: '10rem',
        borderRadius: '50%',
        objectFit: 'cover'
    }, 
    invisibleSeparator: {
        border: 'none',
        margin: '0.3rem' 
    },
    dialogContent: {
        padding: '1.5rem'
    }
})

interface Props extends WithStyles<typeof styles>{
    scream: any;
    ui: AppState['ui'];
    screamId: string;
    userHandle: string;
    getScream: (screamId: string) => void;
}

interface State {
    open: boolean
}

class ScreamDialog extends Component<Props, State> {

    state: State = {
        open: false
    }
    
    handleOpen = () => {
        this.setState({open: true});
        this.props.getScream(this.props.screamId);
    }

    handleClose = () => {
        this.setState({open: false})
    }

    render() {
        const {classes, scream: {
            screamId, 
            createdAt, 
            body, 
            commentCount, 
            likeCount, 
            userImage, 
            userHandle
        }, 
            ui : {
                loading
            }
        } = this.props;

        const dialogMarkUp = loading ? (
            <CircularProgress color='primary' size={100} /> 
        ) : (
            <Grid container spacing={6}> 
                <Grid item sm={5}>
                    <img src={userImage} alt='Profile' className={classes.profileImage} />  
                </Grid>
                <Grid item sm={7}>
                        {/* 
                             // @ts-ignore */}
                    <Typography component={Link} to={`/users/${userHandle}`} variant='h5' color='primary' >
                             @{userHandle}
                    </Typography>

                    <hr className={classes.invisibleSeparator} />

                    <Typography variant='body2' color='textSecondary'>
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>

                    <hr className={classes.invisibleSeparator} />

                    <Typography variant='body1'>
                        {body}
                    </Typography>

                </Grid>
            </Grid>
        )

        return (
            <Fragment>
                <MyButton tipTitle='Ver más de este Scream' onClick={this.handleOpen} tipClassName={classes.expandButton}>
                    <UnfoldMore color='primary' />
                </MyButton>

                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>

                    <MyButton tipTitle='Cancel' onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>

                    <DialogContent className={classes.dialogContent}>
                       {dialogMarkUp} 
                    </DialogContent> 

                </Dialog>

            </Fragment>
        )
    }
}

const mapStateToProps = (appState: AppState) => ({
    scream: appState.data.scream,
    ui: appState.ui
})


export default connect(mapStateToProps, {getScream})(withStyles(styles)(ScreamDialog))

import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux';
import { AppState } from '../redux/types';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';

//MUI Imports
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import { createStyles } from '@material-ui/core';
import { WithStyles } from '@material-ui/styles';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

// MUI Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';


interface Props extends WithStyles<typeof styles> {
    user: AppState['user'];
}


const styles = createStyles({

    paper: {
        padding: 20
      },
      profile: {
        '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative',
          '& button': {
            position: 'absolute',
            top: '80%',
            left: '70%'
          }
        },
        '& .profile-image': {
          width: 200,
          height: 200,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%'
        },
        '& .profile-details': {
          textAlign: 'center',
          '& span, svg': {
            verticalAlign: 'middle'
          },
          '& a': {
            color: '#00bcd4'
          }
        },
        '& hr': {
          border: 'none',
          margin: '0 0 10px 0'
        },
        '& svg.button': {
          '&:hover': {
            cursor: 'pointer'
          }
        }
      },
      buttons: {
        textAlign: 'center',
        '& a': {
          margin: '20px 10px'
        }
      }
})

class Profile extends Component<Props> {
  render() {
    const {
      classes,
      user: {
        credentials: {
          handle,
          createdAt,
          bio,
          email,
          userId,
          imageUrl,
          location,
          website
        },
        loading,
        authenticated
      }
    } = this.props;
    const profileMarkUp = loading ? (<p>Loading...</p>) : ( 
        authenticated ? (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={imageUrl} alt="profile" className='profile-image' />
                </div>
                <hr />
                <div className='profile-details' >
                    <MuiLink component={Link} to={`/users/${handle}`} color='primary' variant='h5' >
                        @{handle}
                    </MuiLink>
                    <hr />
                    {bio && <Typography variant="body2"> {bio}</Typography>}
                    <hr />
                    {location && (
                        <Fragment>
                            <LocationOn color='primary'/> 
                            <span>{location}</span>
                            <hr />
                        </Fragment>
                    )}

                    {website && (
                        <Fragment>
                            <LinkIcon color='primary'/> 
                            <a href={website} target='_blank' rel='noopener noreferrer'>
                                {' '}{website}
                            </a> 
                            <hr />
                        </Fragment>
                    )}
                    <CalendarToday color='primary'/>{' '}
                    <span>Joined {dayjs(createdAt).format('MMM YYYY')} </span>
                    

                </div>
            </div>
        </Paper> ) : (

            <Paper className={classes.paper} >
                <Typography variant='body2' align='center'>
                    No profile found, please login again
                </Typography>
                <div className={classes.buttons}>
                    <Button variant='contained' color='primary' component={Link} to='/login'>
                        Login
                    </Button>
                    <Button variant='contained' color='secondary' component={Link} to='/signup'>
                        Signup
                    </Button>
                </div>
            </Paper>
        ))
    
    return  profileMarkUp;
  }
}

const mapStateToProps = (appState: AppState) => ({
  user: appState.user
});

export default connect(mapStateToProps)(withStyles(styles)(Profile));

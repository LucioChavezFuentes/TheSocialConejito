import React, { Component } from 'react'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs'; 
import relativeTime from 'dayjs/plugin/relativeTime'; 
import MyButton from '../util/MyButton';

//Material UI Cards
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

//Redux Imports
import {connect} from 'react-redux';
import {likeScream, unlikeScream} from '../redux/actions/dataActions';
import { AppState } from '../redux/store';

//Icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const styles = {
    card : {
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 25,
        objectFit: ("cover" as any) 
    }
}

interface ScreamProps extends WithStyles<typeof styles>  {
    scream: any;
    likeScream: (screamId: string) => void;
    unlikeScream: (screamId: string) => void;
    user: AppState['user'];
    
}

class Scream extends Component<ScreamProps> {
    likedScream = () => {
        if(this.props.user.likes && this.props.user.likes.find((like) => like.screamId === this.props.scream.screamId)){
            return true;
        } else {
            return false;
        }
    };

    likeScream = () => {
        this.props.likeScream(this.props.scream.screamId)
    };

    unlikeScream = () => {
        this.props.unlikeScream(this.props.scream.screamId)
    };

    render() {
        const {classes, scream : {userImage, body, createdAt, userHandle, screamId, likeCount, commentCount}, user: {authenticated}} = this.props
        
        const likeButton = !authenticated ? (
            <MyButton tipTitle='Like'>
                <Link to='/login'>
                    <FavoriteBorder color='primary' />
                </Link>
            </MyButton>) : (
                this.likedScream() ? (
                    <MyButton tipTitle='Unlike' onClick={this.unlikeScream}>
                        <FavoriteIcon color='primary' />
                    </MyButton> ) : (
                    
                    <MyButton tipTitle='Like' onClick={this.likeScream}>
                        <FavoriteBorder color='primary' />
                    </MyButton>

                )
            )

        dayjs.extend(relativeTime);

        

        return (
            
            <div > 
                <Card className={classes.card}>
                    <CardMedia image={userImage} title={'Profile Image'} className={classes.image} /> 
                    
                    <CardContent className={classes.content}> 
                        {/* 
                             // @ts-ignore */}
                        <Typography variant='h5' color='primary' component={Link} to={`/users/${userHandle}`}>
                                {userHandle} 
                        </Typography>

                        <Typography variant='body2' color='textSecondary'>{dayjs(createdAt).fromNow()}</Typography>

                        <Typography variant='body1' >{body}</Typography> 

                        {likeButton}
                        <span>{likeCount}  Likes</span>
                        <MyButton  tipTitle='Comment' >
                             <ChatIcon color='primary' />
                        </MyButton>
                        <span>{commentCount} Comments</span>

                    </CardContent>
                </Card>  
            </div>
        ) 
    }
}

const mapStateToProps = (appState: AppState) => ({
    user: appState.user
});

const mapActionsToProps = {
    likeScream,
    unlikeScream
}
 
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream));

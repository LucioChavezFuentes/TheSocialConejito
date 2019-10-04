import React, { Component } from 'react'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';

//Material UI Cards
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
    card : {
        display: 'flex'
    }
}

interface ScreamProps extends WithStyles<typeof styles>  {
    scream: any;
    
}

class Scream extends Component<ScreamProps> {
    render() {
        const {classes, scream : {userImage, body, createdAt, userHandle, screamId, likeCount, commentCount}} = this.props
        return (
            <div>
                <Card>
                    <CardMedia image= {userImage} title={'Profile Image'}>
                    </CardMedia>
                    <CardContent>
                        <Typography variant='h5' color='primary'  >
                            <Link to={`/users/${userHandle}`} >
                                {userHandle} 
                            </Link>
                        </Typography>
                        <Typography variant='body2' color='textSecondary'>{createdAt}</Typography>
                        <Typography variant='body1' >{body}</Typography>
                    </CardContent>
                </Card> 
            </div>
        ) 
    }
}

export default withStyles(styles)(Scream)

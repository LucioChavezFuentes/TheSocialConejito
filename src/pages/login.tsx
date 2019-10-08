import React, { Component } from 'react'
import {withStyles, WithStyles,  createStyles } from '@material-ui/core';
import AppIcon from '../images/icon.png';
import axios from 'axios';
import {Link} from 'react-router-dom';

//MUI Imports
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'; 
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

interface LoginProps extends WithStyles<typeof styles> {
   history: any
}

//The Dynamic Key Type Index for setState aparently works if State properties are set as optional
//More info in: https://stackoverflow.com/questions/42090191/picks-k-type-with-dynamic-computed-keys
interface LoginState {
    email : string ;
    password: string;
    loading: boolean;
    errors: any;
}

const styles = createStyles({
    form :{
        textAlign: "center"
    },
    image: {
        margin: "20px auto",
        width: '100px',
        height: '100px'
    },
    pageTitle: {
        margin: "0.2rem auto"

    },
    textField : {
        margin: "0.8rem auto"
    },
    button: {
        margin: "0.8rem auto",
        position: 'relative'
    },
    customError: {
        margin: "0.8rem auto",
        color: 'red',
        fontSize: '0.8rem'
    },
    progress : {
        position: 'absolute'
    }
}) 

class Login extends Component<LoginProps, LoginState> {

    state:LoginState = {
        email: '',
        password: '',
        loading: false,
        errors: {}
    }

    handleSubmit = (event : React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()
        this.setState({
            loading: true
        });

        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('/login', userData)
            .then(res => {
                this.setState({
                    loading: false
                })

                this.props.history.push('/')
            })
            .catch((err) => {
                this.setState({
                    errors : err.response.data,
                    loading: false
                })
            })

    }
    handleChange = (event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const key = event.currentTarget.name as keyof LoginState;
        const value =  event.currentTarget.value; 
        //@ts-ignore
        //The error is the following: https://stackoverflow.com/questions/42090191/picks-k-type-with-dynamic-computed-keys
        this.setState({
            [key]: value
        })    
    }  

    render() {
        const {classes} = this.props;
        const {errors, loading} = this.state;
        return (
            <Grid container className= {classes.form}>

                <Grid item sm />

                <Grid item sm>
                   <img  src={AppIcon} alt='Mono Cocol Inicios' className={classes.image} />
                   <Typography variant='h2' className={classes.pageTitle}>
                        Login
                   </Typography>
                   <form  noValidate onSubmit={this.handleSubmit}> 

                    <TextField id='email' name='email' type='email' label='Email' helperText={errors.email} error={errors.email ? true : false} 
                        className={classes.textField} value={this.state.email} onChange={this.handleChange} fullWidth/> 
                    
                    <TextField id='password' name='password' type='password' label='Password' helperText={errors.password} error={errors.password ? true : false}
                        className={classes.textField} value={this.state.password} onChange={this.handleChange} fullWidth/> 

                    {errors.general &&
                        <Typography variant='body2' className={classes.customError} >
                            {errors.general}
                        </Typography> }
                    
                    <Button type='submit' variant='contained' color='primary' className={classes.button} disabled={loading}>
                        Sign Up
                        {loading && (
                            <CircularProgress size={30} className={classes.progress} />)}
                    </Button>

                   </form>
                   
                   <small>
                       Don't have an account? Sign up <Link to='/signup'>here</Link> 
                   </small>
                </Grid>
 
                <Grid item sm />

                
            </Grid>
        )
    }
}

export default withStyles(styles)(Login)
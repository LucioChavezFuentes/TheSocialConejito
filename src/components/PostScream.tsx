import React, { Component, Fragment } from 'react';
import MyButton from '../util/MyButton';
import {withStyles, WithStyles,  createStyles } from '@material-ui/core';
import _ from 'lodash';

//Redux Imports
import {connect} from 'react-redux';
import {postScream} from '../redux/actions/dataActions';
import {clearErrors, openWindowPostScream, closeWindowPostScream} from '../redux/actions/uiActions';
import { AppState } from '../redux/types';


//MUI Imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

//MUI Icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';



const styles= createStyles({
    progress : {
        position: 'absolute'
      },

    textField: {
        margin: "0.8rem auto"
    },

    submitButton : {
        position: 'relative',
        float: 'right',
        marginBottom: '1%' 
    }, 

   
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '3%'
    }
    
})

interface Props extends WithStyles<typeof styles> {
    postScream: (newScream: any) => void;
    clearErrors: () => void;
    ui: AppState['ui'];
}

interface State {
    open: boolean;
    body: string;
}

export class PostScream extends Component<Props, State> {
    state: State = {
        open: false,
        body: '',
    }
    
    handleOpen = () => {
        
        this.setState({open: true});
    }

    handleClose = () => {
        
        this.setState({open: false, body: ''});
    }

    handleSubmit = (event : React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()

        const newScream = {
            body: this.state.body 
        };
        //postScream on Sucess will set erros to {}, on Fail will fill Errors Redux State object with the corresponding errors
        this.props.postScream(newScream);

    }
    handleChange = (event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const key = event.currentTarget.name as keyof State;
        const value =  event.currentTarget.value; 
        //@ts-ignore
        //The error is the following: https://stackoverflow.com/questions/42090191/picks-k-type-with-dynamic-computed-keys
        this.setState({
            [key]: value
        })    
    };  

    componentDidUpdate(prevProps: Props){
        //Manage logic and redux state after handleSubmit and Dispatch.
        const{ui : {errors, loading}} = this.props
        if((errors !== prevProps.ui.errors) ){
            if(_.isEmpty(errors) && !loading){
                this.handleClose()
            }  
        }
    };


    render() {
        const {classes, ui: { loading, errors, isWindowPostScreamOpen }} = this.props; 
        
        
        return (
            <Fragment>
                <MyButton tipTitle={'Post a Scream'} onClick={this.handleOpen} tipClassName={'TobeDeclared'} btnClassName={'TobeDeclared'}  >
                    <AddIcon color='primary' />
                </MyButton> 
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>
                    <MyButton tipTitle='Cancel' onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton> 

                    <DialogTitle> Post a Scream </DialogTitle>

                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name='body'
                                type='text'
                                label='Scream'
                                value={this.state.body}
                                multiline
                                rows='3'
                                placeholder='Hechate un gritito'
                                error= {errors.body ? true: false}
                                helperText={errors.body} 
                                className={classes.textField}
                                onChange={this.handleChange}
                                //fullWidth is important, make sure its available to  better style on textField in a Dialog
                                fullWidth
                                
                                /> 
                            
                            <Button type='submit' variant='contained' color='primary' className={classes.submitButton} disabled={loading}>
                                    
                                    Submit
                                    {loading && (<CircularProgress size={30} className={classes.progress} />)}

                            </Button>

                        </form>
                    </DialogContent>
                </Dialog>


            </Fragment>
            
        )
    }
}
const mapStateToProps = (appState: AppState) => ({
    ui: appState.ui
})

const mapActionsToProps = () => ({
    postScream, 
    clearErrors,
    openWindowPostScream,
    closeWindowPostScream})

export default connect(mapStateToProps, mapActionsToProps )(withStyles(styles)(PostScream))
 
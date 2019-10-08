import React, { Component } from 'react'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

import Scream from '../components/Scream';

//Types Interfaces
interface HomeState {
    screams: string[] | null 
}

interface HomeProps {

}

class Home extends Component<HomeProps, HomeState> {
    state: HomeState = {
        screams: null
    }

    componentDidMount(){
        axios.get('/screams')
            .then( res => {
                this.setState({
                    screams: res.data
                })  
            })
            .catch( error => {
                console.error(error) 
            })
    }


    render() {
        let recentScreamsMarkUp : any = this.state.screams ? (
            this.state.screams.map( (scream : any) => ( 
            <Scream key={scream.screamId}  scream={scream} />))
            ) : (
            <p>Loading...</p>
            );

        return (
            <Grid container spacing={3}>
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkUp} 
                </Grid>

                <Grid item sm={4} xs={12}>
                    <p>Profile...</p>
                </Grid>          
            </Grid>
        )
    } 
}

export default Home

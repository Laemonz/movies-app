import React, { Component } from 'react';
import axios from 'axios'
import Grid from '../Grid/Grid'
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn'

class Browse extends Component{

    constructor(props){
        super(props)
        this.state={
            loading: true,
            movies: [],
            pageNum: 1
        }
    }

    getPopular = () =>{
        const URL = `${process.env.REACT_APP_SERVER_URL}/movies/getpopular/${this.state.pageNum}`
        
        axios.get(URL)
        .then((response) => {
            response.data.forEach(element => {
                this.setState( prevState => ({
                    movies: [...prevState.movies, element]
                }))
            })
            this.setState({
                pageNum: this.state.pageNum+1,
                loading: false
            })
        })
        .catch(err =>{
            console.log(err)
        });
    }

    componentDidMount() {
        this.getPopular()
    }

    render() {
        if (this.state.loading){
            return(
                <div class='container text-center'>
                    <div class="spinner-border text-center" role="status">
                        <span class="sr-only"></span>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div class='container-lg'>
                    <Grid movies={this.state.movies}/>
                    <LoadMoreBtn text='Load More' onClick={this.getPopular}/>
                </div>
            );
        } 
    }
}

export default Browse
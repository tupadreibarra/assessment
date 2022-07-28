import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Movie from "./data/type/Movie";

class MovieView extends React.Component{
    constructor(props){
        super(props);
        
        this.id = parseInt(props.id || 0);
    }

    render(){
        return (
            <React.Fragment>
                <Header />
                <div className="container">
                    <Movie id={this.id} />
                </div>
                <Footer />
            </React.Fragment>
        )
    }
};

export default MovieView;
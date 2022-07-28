import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Posts from "./data/Posts";

class PostsList extends React.Component{
    constructor(props){
        super(props);
        
        this.pageNumber = parseInt(props.page || 1);
    }

    render(){
        return (
            <React.Fragment>
                <Header />
                <div className="container">
                    <Posts pageNumber={this.pageNumber} />
                </div>
                <Footer />
            </React.Fragment>
        )
    }
};

export default PostsList;
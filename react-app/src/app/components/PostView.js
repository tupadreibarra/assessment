import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Post from "./data/type/Post";

class PostView extends React.Component{
    constructor(props){
        super(props);
        
        this.id = parseInt(props.id || 0);
    }

    render(){
        return (
            <React.Fragment>
                <Header />
                <div className="container">
                    <Post id={this.id} />
                </div>
                <Footer />
            </React.Fragment>
        )
    }
};

export default PostView;
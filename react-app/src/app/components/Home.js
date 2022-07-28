import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Movies from "./data/Movies";

class Home extends React.Component{
    constructor(props){
        super(props);
        
        this.pageNumber = parseInt(props.page || 1);
    }

    render(){
        return (
            <React.Fragment>
                <Header />
                <div className="container">
                    <Movies pageNumber={this.pageNumber} />
                </div>
                <Footer />
            </React.Fragment>
        )
    }
};

export default Home;
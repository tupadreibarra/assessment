import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Pages from "./data/Pages";

class PagesList extends React.Component{
    constructor(props){
        super(props);
        
        this.pageNumber = parseInt(props.page || 1);
    }

    render(){
        return (
            <React.Fragment>
                <Header />
                <div className="container">
                    <Pages pageNumber={this.pageNumber} />
                </div>
                <Footer />
            </React.Fragment>
        )
    }
};

export default PagesList;
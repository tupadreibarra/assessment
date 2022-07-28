import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Page from "./data/type/Page";

class PageView extends React.Component{
    constructor(props){
        super(props);
        
        this.id = parseInt(props.id || 0);
    }

    render(){
        return (
            <React.Fragment>
                <Header />
                <div className="container">
                    <Page id={this.id} />
                </div>
                <Footer />
            </React.Fragment>
        )
    }
};

export default PageView;
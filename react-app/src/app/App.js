import React from "react";
import {Router} from "@reach/router";
import AppProvider from "./util/AppProvider";
import Home from "./components/Home";
import MovieView from "./components/MovieView";
import PostsList from "./components/PostsList";
import PostView from "./components/PostView";
import PagesList from "./components/PagesList";
import PageView from "./components/PageView";

class App extends React.Component{

    render(){
        return (
            <AppProvider>
                <Router>
                    <Home path="/" />
                    <Home path="/:page" />
                    <MovieView path="/movie/:id" />
                    <PostsList path="/posts/" />
                    <PostsList path="/posts/:page" />
                    <PostView path="/post/:id" />
                    <PagesList path="/pages/" />
                    <PagesList path="/pages/:page" />
                    <PageView path="/page/:id" />
                </Router>
            </AppProvider>
        );
    }
}

export default App;
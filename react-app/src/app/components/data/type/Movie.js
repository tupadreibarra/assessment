import React, {useState, useEffect} from "react";
import {Link} from "@reach/router"
import WPConfig from "../../../settings/wp-config";
import axios from "axios";

const Movie = (props) => {

    const {post} = props;

    const processGenres = (genres) => {
        return genres.map(gender => <span className="genre-item" key={gender.id}>{gender.name}</span>);
    };

    /*
     * Single movie
     */
    if ("id" in props){

        const iPostID = ((typeof props.id == "number") && (parseInt(props.id, 10) > 0)) ? props.id : 0;
        const [sMessage, setMessage] = useState("");
        const [bLoading, setLoading] = useState(false);
        const [oPost, setPost] = useState(null);
        const [oImage, setImage] = useState(null);
        const [arGenres, setGenres] = useState([]);

        useEffect(() => {
            if (!bLoading && (iPostID != 0)){
                setLoading(true);
    
                /* Get data from wordpress */
                if (WPConfig.wordpress_url.trim() == ""){
                    setMessage("No post found");
                    setLoading(false);
                } else {
                    axios.get(WPConfig.wordpress_url + "/wp-json/wp/v2/movie/" + iPostID + "/?_embed=true").then(result => {
                        setLoading(false);
    
                        if (typeof result == "object"){
                            if (("data" in result) && (typeof result.data == "object") && ("id" in result.data) && (result.data.id == iPostID)){
                                setPost(result.data);

                                const oEmbedded = (("_embedded" in result.data) && (typeof result.data._embedded == "object")) ? result.data._embedded : {};
                                if (("wp:featuredmedia" in oEmbedded) && Array.isArray(oEmbedded["wp:featuredmedia"]) && (oEmbedded["wp:featuredmedia"].length > 0)){
                                    setImage(oEmbedded["wp:featuredmedia"][0]);
                                }
                                if (("wp:term" in oEmbedded) && Array.isArray(oEmbedded["wp:term"]) && (oEmbedded["wp:term"].length > 0) && Array.isArray(oEmbedded["wp:term"][0]) && (oEmbedded["wp:term"][0].length > 0)){
                                    const arGenres = [];
                                    for(var index in oEmbedded["wp:term"][0]){
                                        if (oEmbedded["wp:term"][0][index].taxonomy == "genre") arGenres.push(oEmbedded["wp:term"][0][index]);
                                    }
                                    setGenres(arGenres);
                                }
                                
                            } else {
                                setMessage("No post found");
                            }
                        } else {
                            setMessage("No post found");
                        }
    
                    }).catch(error => {
                        setMessage("No post found");
                        setLoading(false);
                    });
                }
            }
        }, [iPostID]);

        return (
            <React.Fragment>
                { bLoading ? 
                    <div className="loading-content">
                        <img src="/public/img/loading.gif" />
                    </div>
                    :
                    <React.Fragment>
                        <button className="btn btn-danger btn-sm back-button" onClick={() => history.back()}>{"<< Back"}</button>
                        <div className="post-info">
                            { (!bLoading && (oPost != null)) ? 
                                <React.Fragment>
                                { (oImage != null) && 
                                    <div className="featured-image">
                                        <img 
                                            src={oImage.source_url}
                                            alt={(oPost.title && oPost.title.rendered) ? oPost.title.rendered : ""}
                                        />
                                    </div>
                                }
                                
                                    <div className="title">
                                        { (oPost.title && oPost.title.rendered) ?
                                            oPost.title.rendered
                                            :
                                            " "
                                        }
                                    </div>

                                { oPost.content && oPost.content.rendered && 
                                    <div className="content" dangerouslySetInnerHTML={{__html: oPost.content.rendered}}></div>
                                }

                                { (arGenres.length > 0) &&
                                    <div className="genres-list">
                                        {processGenres(arGenres)}
                                    </div>
                                }
                                </React.Fragment>
                                :
                                <div className="post-message">{sMessage}</div>
                            }
                        </div>
                    </React.Fragment>
                }
            </React.Fragment>
        );
    
    /*
     * Movies list 
     */
    } else {
        const oEmbedded = (("_embedded" in post) && (typeof post._embedded == "object")) ? post._embedded : {};
        const oImage = (("wp:featuredmedia" in oEmbedded) && Array.isArray(oEmbedded["wp:featuredmedia"]) && (oEmbedded["wp:featuredmedia"].length > 0)) ? oEmbedded["wp:featuredmedia"][0] : null;
        const arTerms = (("wp:term" in oEmbedded) && Array.isArray(oEmbedded["wp:term"]) && (oEmbedded["wp:term"].length > 0) && Array.isArray(oEmbedded["wp:term"][0]) && (oEmbedded["wp:term"][0].length > 0)) ? oEmbedded["wp:term"][0] : [];

        const arGenres = [];
        for(var index in arTerms){
            if (arTerms[index].taxonomy == "genre") arGenres.push(arTerms[index]);
        }

        return (
            <div className="post-item">
                <div className="title">
                    { (post.title && post.title.rendered) ?
                        <Link to={"/movie/" + post.id}>{post.title.rendered}</Link>
                        :
                        " "
                    }
                </div>
                
            { (oImage != null) && 
                <div className="featured-image">
                    <img 
                        src={oImage.source_url}
                        alt={(post.title && post.title.rendered) ? post.title.rendered : ""}
                    />
                </div>
            }

            { post.excerpt && post.excerpt.rendered && 
                <div className="excerpt" dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}></div>
            }

                <div className="readmore-button">
                    <Link className="btn btn-danger btn-sm read-more" to={"/movie/" + post.id}>Read more</Link>
                </div>

            { (arGenres.length > 0) &&
                <div className="genres-list">
                    {processGenres(arGenres)}
                </div>
            }
            </div>
        );
    }
};

export default Movie;
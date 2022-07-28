import React, {useState, useEffect} from "react";
import WPConfig from "../../settings/wp-config";
import axios from "axios";
import Pagination from "../layout/Pagination";
import Movie from "./type/Movie";

const Movies = (props) => {

    const iTotalPerPage = 5;
    const iPagesInNavigationBar = 5;
    const iPageNumber = parseInt(props.pageNumber || 1);

    const [sMessage, setMessage] = useState("");
    const [iCurrentPage, setCurrentPage] = useState(iPageNumber);
    const [bLoading, setLoading] = useState(false);
    const [arPosts, setPosts] = useState(null);
    const [iTotalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (!bLoading){
            setLoading(true);

            /* Get data from wordpress */
            if (WPConfig.wordpress_url.trim() == ""){
                setMessage("No posts found");
                setLoading(false);
            } else {
                axios.get(WPConfig.wordpress_url + "/wp-json/wp/v2/movie/?page=" + iCurrentPage + "&per_page=" + iTotalPerPage + "&_embed=true").then(result => {
                    setLoading(false);

                    if (typeof result == "object"){
                        if (("data" in result) && Array.isArray(result.data) && (result.data.length > 0)){
                            setPosts(result.data);
                            setTotalPages(result.headers["x-wp-totalpages"] || 1);
                        } else {
                            setMessage("No posts found");
                        }
                    } else {
                        setMessage("No posts found");
                    }

                }).catch(error => {
                    setMessage("No posts found");
                    setLoading(false);
                });
            }
        }
    }, [iCurrentPage]);

    const processPost = (posts) => {
        return posts.map(post => <Movie key={post.id} post={post} />);
    };

    return (
        <React.Fragment>
            { bLoading ?
                <div className="loading-content">
                    <img src="/public/img/loading.gif" />
                </div>
                :
                <div className="posts-list">
                    { (!bLoading && (arPosts != null) && (arPosts.length > 0)) ? 
                        <React.Fragment>
                            {processPost(arPosts)}
                            <Pagination
                                currentPage={iCurrentPage}
                                totalPages={iTotalPages}
                                pagesInNavigationBar={iPagesInNavigationBar}
                                onClick={(pageNumber) => setCurrentPage(pageNumber)}
                            />
                        </React.Fragment>
                        :
                        <div className="post-message">{sMessage}</div>
                    }
                </div>
            }
            
        </React.Fragment>
    );
};

export default Movies;
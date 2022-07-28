import React from "react";
import {Link} from "@reach/router"

const Pagination = (props) => {

    const {currentPage, totalPages, pagesInNavigationBar, onClick, urlPath} = props;

    var onClickPage = ((typeof onClick == "function")) ? onClick : (pageNumber) => {};
    var sURLPath = ((typeof urlPath == "string") && (urlPath.trim() != "")) ? urlPath.trim() : "/";

    var iPages = totalPages;
    var iPagesInNavigationBar = (typeof pagesInNavigationBar == "number") ? pagesInNavigationBar : 5;
    var iCurrentPage = currentPage;
    if (iCurrentPage > totalPages) iCurrentPage = iPages;
    if (iPagesInNavigationBar > iPages) iPagesInNavigationBar = iPages;
    var iMiddlePage = parseInt(iPagesInNavigationBar / 2, 10);
    var iStartPage = 0;
    var iEndPage = 0;

    if (iPagesInNavigationBar == iPages){
        iStartPage = 1;
        iEndPage = iPages;
    } else {
        if ((iStartPage = ((iCurrentPage - iMiddlePage) >= 1) ? (iCurrentPage - iMiddlePage) : 1) == 1){
            if ((iStartPage + (iMiddlePage * 2)) <= iPages) iEndPage = iStartPage + (iMiddlePage * 2);
        } else {
            if ((iEndPage = ((iCurrentPage + iMiddlePage) <= iPages) ? (iCurrentPage + iMiddlePage) : iPages) == iPages){
                if ((iEndPage - (iMiddlePage * 2)) >= 1) iStartPage = iEndPage - (iMiddlePage * 2);
            }
        }
    }

    const createPageLink = (number, disabled, title, key) => {
        title = (typeof title == "string") ? title.trim() : "";
        if ((typeof disabled == "boolean") && disabled){
            return (
                <a
                    className="page-link"
                    key={key}
                    href="#"
                >
                    {(title != "") ? title : number}
                </a>
            );
        } else {
            return (
                <Link
                    className="page-link"
                    key={key}
                    to={sURLPath + number} 
                    onClick={() => onClickPage(number)}
                >
                    {(title != "") ? title : number}
                </Link>
            );
        }
    };

    const createPages = (currentPage, startPage, endPage, totalPages) => {
        var arPages = [];
        if (totalPages > 1){
            for(var page=startPage; page<=endPage; page++){
                arPages.push(
                    <li key={"c" + page} className={"page-item" + ((currentPage == page) ? " active" : "")}>
                        {createPageLink(page, false, "", page)}
                    </li>
                );
            }
        }
        return arPages;
    };

    if (iPages > 1){
        return (
            <nav className="pagination-container">
                <ul className="pagination justify-content-center">
                    <li key={"c01"} className={"page-item" + ((iCurrentPage == 1) ? " disabled" : "")}>
                        {createPageLink(1, (iCurrentPage == 1), "<<", "c01")}
                    </li>
                    <li key={"c02"} className={"page-item" + ((iCurrentPage == 1) ? " disabled" : "")}>
                        {createPageLink((iCurrentPage > 0) ? (iCurrentPage - 1) : 1, (iCurrentPage == 1), "Previous", "c02")}
                    </li>
                    {createPages(iCurrentPage, iStartPage, iEndPage, iPages)}
                    <li key={"c0" + (iPages+1)} className={"page-item" + ((iCurrentPage == iPages) ? " disabled" : "")}>
                        {createPageLink((iCurrentPage < iPages) ? (iCurrentPage + 1) : iPages, (iCurrentPage == iPages), "Next", "c0" + (iPages+1))}
                    </li>
                    <li key={"c0" + (iPages+2)} className={"page-item" + ((iCurrentPage == iPages) ? " disabled" : "")}>
                        {createPageLink(iPages, (iCurrentPage == iPages), ">>", "c0" + (iPages+2))}
                    </li>
                </ul>
            </nav>
        );
    } else {
        return "";
    }
};

export default Pagination;
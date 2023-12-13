import React, { useState } from "react";
import Header from "../../Common/Header/Header";
import MainSection from "./MainSection/MainSection";
import Tabs from "./TabsSection/Tabs";
import Pagination from "../../Common/Pagination/Pagination";
import "./Home.css";
import LoadingSpinner from "../../Common/Loader/Loader";

const Home = () => {
    const [tab, setTab] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [maxCount] = useState(5);
    const [isLoading, setIsLoading] = useState(false);
    console.log(isLoading);

    return (
        <div className="home">
            <Header currentPage={currentPage} maxCount={maxCount} />
            <Tabs setTab={setTab} />
            {isLoading ? <LoadingSpinner /> : ''}
            <MainSection
                tab={tab}
                currentPage={currentPage}
                maxCount={maxCount}
                setIsLoading={setIsLoading}
            />
            <Pagination setCurrentPage={setCurrentPage} maxCount={maxCount} />
        </div>
    );
};

export default Home;

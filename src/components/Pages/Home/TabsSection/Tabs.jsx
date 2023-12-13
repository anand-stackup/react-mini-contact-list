import React from "react";
import "./Tabs.css";

const Tabs = ({ setTab }) => {
    return (
        <div className="tabs">
            <div className="tab">
                <span
                    onClick={() => {
                        setTab("");
                    }}
                >
                    All
                </span>
            </div>
            <div className="tab">
                <span
                    onClick={() => {
                        setTab("blocked");
                    }}
                >
                    Blocked
                </span>
            </div>
            <div className="tab">
                <span
                    onClick={() => {
                        setTab("deleted");
                    }}
                >
                    Deleted
                </span>
            </div>
        </div>
    );
};

export default Tabs;

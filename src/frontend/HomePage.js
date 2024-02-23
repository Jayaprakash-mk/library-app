import React from "react";
import classes from "./css/HomePage.module.css"

const HomePage = (props) => {

    const AddData = () => {
        props.choice1(true);
    }
    const ViewData = () => {
        props.choice2(true);
    }
    return(
        <div className={classes.content}>
            <div className={classes.Choice}>
                <h2>Choose</h2>
                <div className={classes.options}>
                    <button className={classes.AddBtn} onClick={AddData}>Admin</button>
                    <button className={classes.AddBtn} onClick={ViewData}>Books</button>
                </div>
            </div>
        </div>
    )
}

export default HomePage;
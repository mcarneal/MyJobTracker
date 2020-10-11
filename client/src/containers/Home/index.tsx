import React from "react";
import { connect, useSelector } from "react-redux";
import {createStructuredSelector} from "reselect";
import * as selectors from "./selectors";
import {compose} from "redux";

const Home = (props: any) => {
    const selector = useSelector(state => state)
    console.log(`this is the selector`, selector)
    return(
        <button onClick={()=> console.log(props)}>click me </button>
    )
}

const mapStateToProps = createStructuredSelector<any , any>({
    user: selectors.makeUserEmail(),
});

const withConnect = connect(
    mapStateToProps,
)

export default compose(
    withConnect,
)(Home)


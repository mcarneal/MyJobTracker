import React from "react";
import { connect, useSelector } from "react-redux";
import {createStructuredSelector} from "reselect";
import * as selectors from "./selectors";
import {compose} from "redux";
import ProgressBar from "../../components/ProgressBar";

const Home = (props: any) => {
    return(
        <div>
            <ProgressBar />
        </div>
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


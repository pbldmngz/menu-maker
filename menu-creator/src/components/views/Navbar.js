import React from 'react'

import { withRouter } from "react-router";
import { connect } from 'react-redux'

function Navbar(props) {
    const { data, navbar } = props;
    

    return (
        <div className="navbar" style={navbar}>
            <img src={data ? data.logoURL : ""} alt="Logo" className="logo" />
            {data ? (
                data.name.length > 0 ? (
                    <h1 className="logo-tipo">{data ? data.name : ""}</h1>
                ) : null
            ) : null}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
}

export default connect(mapStateToProps)(withRouter(Navbar))

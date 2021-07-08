import React from 'react'

import { getByUser, getIdByName } from '../../store/actions/menuActions'

import { withRouter } from "react-router";
import { connect } from 'react-redux'

function Navbar(props) {
    const { data, style } = props;
    

    return (
        <div className="navbar" style={style}>
            <img src={data ? data.logoURL : ""} alt="Logo" className="logo"/>
            <h1 className="logo-tipo">{data ? data.name : ""}</h1>
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

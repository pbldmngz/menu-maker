import React from 'react'

import { signOut } from '../../store/actions/authActions'
import { withRouter } from "react-router";
import { connect } from 'react-redux'

function Footer(props) {
    const { auth } = props;

    return (
        <div className="">
            <footer className="footer">
                {auth.uid ? (
                    <div>
                        <div className="material-icons button" onClick={() => {
                            props.history.push("/cpanel")
                        }}>
                            tune
                        </div>
                        <div className="material-icons button" onClick={() => {
                            props.signOut()
                        }}>
                            logout
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="material-icons button" onClick={() => {
                            props.history.push("/auth/register")
                        }}>
                            person_add
                        </div>
                        <div className="material-icons button" onClick={() => {
                            props.history.push("/auth/login")
                        }}>
                            home
                        </div>
                    </div>
                )}
            </footer>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Footer))

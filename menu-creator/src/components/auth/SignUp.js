import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router';
import {signUp} from '../../store/actions/authActions'

import { withRouter } from "react-router";
// import Swal from "sweetalert2";

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        nombre: '',
        lang: "english",
    }
    handleChange = (e) => {
        // console.log(e)
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state)
        // this.props.history.push("/home")
    }

    render() {
        const { auth, authError } = this.props;
        
        if (auth.uid) return <Redirect to={"/menu/" + auth.uid} />

        return (
            <div className="center-box">
                <div className="category-container category-padding-full">
                    <form className="" onSubmit={this.handleSubmit}>

                        <center>
                            <div className="popup-input panel-nav panel-section-border letter-spacing force-white-text">
                                REGISTER
                            </div>
                            <input
                                autoComplete="off"
                                autoCorrect="off"
                                spellCheck="off"
                                type="text"
                                id='nombre'
                                placeholder="Nombre"
                                onChange={this.handleChange}
                                className="popup-input"
                            />

                            <input
                                autoComplete="off"
                                autoCorrect="off"
                                spellCheck="off"
                                type="email"
                                id='email'
                                placeholder="Correo"
                                onChange={this.handleChange}
                                className="popup-input"
                            />

                            <input
                                autoComplete="off"
                                autoCorrect="off"
                                spellCheck="off"
                                type="password"
                                id='password'
                                placeholder="Contraseña"
                                onChange={this.handleChange}
                                className="popup-input"
                            />

                            <button className="popup-input action-button button">Sign Up</button>

                            <div className="">
                                {authError ? <p>{authError}</p> : null}
                            </div>
                        </center>

                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        // userLevel: state.firebase.profile.userLevel,
        // authError: state.auth.authError,
        // lang: state.firebase.profile.lang,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp))

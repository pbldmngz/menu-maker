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
        const { auth, authError, profile, lang, userLevel } = this.props;
        

        if (auth.uid) return <Redirect to={"/menu/" + auth.uid} />

        // if (!profile.canSee) return null;

        // if (!profile.isAdmin) return null;
        // if (userLevel && userLevel !==0) return <Redirect to="/" />

        // const bText = require('../../config/language');

        // if (!lang) return null;

        return (
            <div className="">
                <div className="padre-titulo mobile">
                    <div className="titulo destroy-on-mobile">
                    </div>
                    <div className="titulo">
                        <h2 className="titulo">Registrar</h2>
                    </div>

                </div>
                <div className="form-1">
                    <div className="form-2">
                        <form className="" onSubmit={this.handleSubmit}>
                            <div className="input-field">
                                <label htmlFor="nombre"></label>
                                <input
                                    autoComplete="off"
                                    autoCorrect="off"
                                    spellCheck="off"
                                    type="email"
                                    id='nombre'
                                    placeholder="Nombre"
                                    onChange={this.handleChange}
                                />
                            </div>
                            
                            <div className="input-field">
                                <label htmlFor="email"></label>
                                <input
                                    autoComplete="off"
                                    autoCorrect="off"
                                    spellCheck="off"
                                    type="email"
                                    id='email'
                                    placeholder="Correo"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="input-field">
                                <label htmlFor="password"></label>
                                <input 
                                    autoComplete="off"
                                    autoCorrect="off"
                                    spellCheck="off"
                                    type="password"
                                    id='password'
                                    placeholder="Contraseña"
                                    onChange={this.handleChange} 
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="footer-single margin-top">
                    <button 
                        onClick={this.handleSubmit}
                        className="add-question">Registrar</button>
                </div>
                <div className="footer-single">
                    {authError ? <p>{authError}</p> : null}
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

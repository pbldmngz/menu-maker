import React, { Component } from 'react'
import {connect} from 'react-redux'
import {signIn} from '../../store/actions/authActions'
import { Redirect } from 'react-router';
// import ReactDOM from 'react-dom'




class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state)
    }

    listenEnter = (event) => {
        if (event.keyCode === 13) {
            this.handleSubmit(event)
        }
    }
    
    render() {
        const {authError, auth} = this.props;

        // const bText = require('../../config/language');

        if (auth.uid) return <Redirect to="/cpanel" />
        
        return (
            <div className="center-box">
                <div className="category-container category-padding-full">

                        <form className="" onSubmit={this.handleSubmit}>
                            <center>
                                <div className="popup-input panel-nav panel-section-border letter-spacing force-white-text">
                                    LOGIN
                                </div>

                                <input
                                    onKeyDown={(e) => this.listenEnter(e)}
                                    type="email"
                                    id='email'
                                    placeholder="Correo"
                                    onChange={this.handleChange}
                                    className="popup-input"
                                />

                                <input
                                    onKeyDown={(e) => this.listenEnter(e)}
                                    type="password"
                                    id='password'
                                    placeholder="Contraseña"
                                    onChange={this.handleChange}
                                    className="popup-input"
                                />

                                <button className="popup-input action-button button">Sign In</button>

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
        authError: state.auth.authError,
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
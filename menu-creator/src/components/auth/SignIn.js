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

        const lang = "spanish"

        // const bText = require('../../config/language');

        if (auth.uid) return <Redirect to="/cpanel" />
        
        return (
            <div className="center-box xpand white">
                <div className="">
                    <div className="padre-titulo">
                        <div className="titulo">
                            {/* <Volver /> */}
                        </div>
                        <div className="titulo">
                            {/* <h2 className="titulo">##########</h2> */}
                            {/* <img className="logo" src={Logo} alt="gst logo"></img> */}
                        </div>

                    </div>

                    <form className="" onSubmit={this.handleSubmit}>
                        <div className="form-1 white">
                            <div className="form-2">


                                <div className="input-field">
                                    <label className="uname" htmlFor="email"></label>
                                    <input onKeyDown={(e) => this.listenEnter(e)} type="email" id='email' placeholder="Correo" onChange={this.handleChange} />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="password"></label>
                                    <input onKeyDown={(e) => this.listenEnter(e)} type="password" id='password' placeholder="Contraseña" onChange={this.handleChange} />
                                </div>



                            </div>
                            <div className="footer-single">
                                {authError ? <p>{authError}</p> : null}
                            </div>
                            <div className="footer-single">
                                <button
                                    className="add-question"
                                >Iniciar sesión</button>
                            </div>

                        </div>
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
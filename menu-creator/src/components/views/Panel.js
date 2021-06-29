import React, { Component } from 'react'
import { signOut } from '../../store/actions/authActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router';

import { getMenuConfig } from '../../store/actions/menuActions'


class Panel extends Component {

    componentDidMount() {
        const { authError, auth } = this.props;
        if (auth.uid) {
            this.props.getMenuConfig(auth.uid).then((res) => {
                this.setState({
                    menuLink: "/menu/" + res.path,
                    config: res,
                })
            })
        }
    }


    render() {

        const { authError, auth } = this.props;

        if (!auth.uid) return <Redirect to="/auth/login" />

        return (
            <div>
                <div className="panel-nav">
                    <h2>CONTROL PANEL</h2>
                </div>

                <div className="as-footer">
                    <div className=" panel-section-border button" onClick={() => {
                        this.props.history.push(this.state.menuLink)
                    }}>
                        Go to your menu
                    </div>
                </div>

                <div className="panel-grid">
                    <div className="panel-section">
                        <div className="panel-nav panel-section-border letter-spacing">
                            MENU
                        </div>
                        <div className="panel-section-border button" onClick={() => {
                            this.props.history.push("cpanel/categories")
                        }}>
                            Categories
                        </div>
                        <div className="panel-section-border button" onClick={() => {
                            this.props.history.push("cpanel/items")
                        }}>
                            Items
                        </div>
                    </div>
                    
                    <div className="panel-section">
                        <div className="panel-nav panel-section-border letter-spacing">
                            SETTINGS
                        </div>

                        <div className="panel-section-border disabled">
                            Change display name
                        </div>
                        <div className="panel-section-border disabled">
                            Change web address
                        </div>
                        <div className="panel-section-border disabled">
                            Change color palette
                        </div>
                        <div className="panel-section-border disabled">
                            Change brand logo
                        </div>
                    </div>

                    <div className="panel-section">
                        <div className="panel-nav panel-section-border letter-spacing">
                            USER
                        </div>
                        <div className="panel-section-border disabled">
                            Share link
                        </div>
                        <div className="panel-section-border disabled delete">
                            Disable ads
                        </div>
                        <div className="panel-section-border disabled">
                            Change language
                        </div>
                        <div className="panel-section-border button" onClick={() => {
                            this.props.signOut();
                        }}>
                            Log out
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
        getMenuConfig: (id) => dispatch(getMenuConfig(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel)
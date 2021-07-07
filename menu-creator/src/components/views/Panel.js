import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { signOut } from '../../store/actions/authActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router';
import Swal from "sweetalert2";

import { getMenuConfig, editMenuConfig } from '../../store/actions/menuActions'


class Panel extends Component {

    componentDidMount() {
        this.fetchData()
    }

    fetchData = () => {
        const { auth } = this.props;
        if (auth.uid) {
            this.props.getMenuConfig(auth.uid).then((res) => {
                this.setState({
                    menuLink: "/menu/" + res.path,
                    config: res,
                })
            })
        }
    }

    // Works for path, name & logoURL
    simpleImputSwal = (param) => {

        const { auth, editMenuConfig } = this.props;

        const vals = {
            name: {
                title: "display name",
                id: "name",
                placeholder: "Name",
                value: this.state.config ? this.state.config.name : "",
            },
            address: {
                title: "web address",
                id: "path",
                placeholder: "web address",
                value: this.state.config ? this.state.config.path : "",
            },
            logo: {
                title: "logo image",
                id: "logoURL",
                placeholder: "Insert image URL",
                value: this.state.config ? this.state.config.logoURL : "",
            },
        }

        Swal.fire({
            title: 'Change ' + vals[param].title,

            html: `<input type="text" id="${vals[param].id}" class="popup-input" placeholder="${vals[param].placeholder}" value="${vals[param].value}" />`,
            showCancelButton: true,
            confirmButtonText: 'Change',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                const v = Swal.getPopup().querySelector('#' + vals[param].id).value

                return { [vals[param].id]: v };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                if (result.value[vals[param].id]) {
                    editMenuConfig(auth.uid, result.value);
                    this.fetchData()
                }
                Swal.fire({
                    title: `Name changed to "${result.value[vals[param].id]}"`,
                })
            }
        });
    }


    render() {

        const { auth } = this.props;

        if (!this.state) return null

        const { colorPalette } = this.state.config;

        if (!auth.uid) return <Redirect to="/auth/login" />

        const styles = {
            title: {
                backgroundColor: colorPalette.header,
                color: colorPalette.text,
            },
            header: {
                backgroundColor: colorPalette.header,
                borderColor: colorPalette.header,
                color: colorPalette.text,
            },
            button: {
                borderColor: colorPalette.header,
                backgroundColor: colorPalette.category,
                color: colorPalette.text,
            },
            fill: {
                backgroundColor: colorPalette.background,
            },
            category: {
                backgroundColor: colorPalette.category,
            },
            background: {
                backgroundColor: colorPalette.background,
                overflow: "scroll",
            }
        }

        return (
            <div className="overall animation" style={styles.background}>
                <div className="panel-nav" style={styles.title}>
                    <h2>CONTROL PANEL</h2>
                </div>

                <div className="as-footer">
                    <Link className="panel-section-border button" 
                        style={styles.button}
                        to={this.state.menuLink}
                    >
                        Go to your menu
                    </Link>
                </div>

                <div className="panel-grid">
                    <div className="panel-section" style={styles.category}>
                        <div className="panel-nav panel-section-border letter-spacing" style={styles.header}>
                            MENU
                        </div>
                        <Link className="panel-section-border button"
                            style={styles.button}
                            to={"/cpanel/categories"}
                        >
                            Categories
                        </Link>
                        <Link className="panel-section-border button"
                            style={styles.button}
                            to={"/cpanel/items"}
                        >
                            Items
                        </Link>
                    </div>
                    
                    <div className="panel-section" style={styles.category}>
                        <div className="panel-nav panel-section-border letter-spacing" style={styles.header}>
                            SETTINGS
                        </div>

                        <div className="panel-section-border button"
                            style={styles.button}
                            onClick={() => {
                            this.simpleImputSwal("name");
                        }}>
                            Change display name
                        </div>

                        {/* Need to check if the name is taken */}
                        <div className="panel-section-border button"
                            style={styles.button}
                            onClick={() => {
                            this.simpleImputSwal("address");
                        }}>
                            Change web address
                        </div>

                        <div className="panel-section-border button"
                            style={styles.button}
                            onClick={() => {
                            this.simpleImputSwal("logo");
                        }}>
                            Change brand logo
                        </div>
                        {/* This should be done in a separate page */}
                        <div className="panel-section-border disabled"
                            style={styles.button}
                        >
                            Change color palette
                        </div>
                    </div>

                    <div className="panel-section" style={styles.category}>
                        <div className="panel-nav panel-section-border letter-spacing" style={styles.header}>
                            USER
                        </div>
                        {/* Maybe done using swal2 with an image (QR Code Generator) and 
                            an imput field with an auto-copy function with the default value of the link */}
                        <div className="panel-section-border disabled"
                            style={styles.button}
                        >
                            Share link
                        </div>
                        <div className="panel-section-border disabled delete"
                            style={styles.button}
                        >
                            Disable ads
                        </div>
                        <div className="panel-section-border disabled"
                            style={styles.button}
                        >
                            Change language
                        </div>
                        <div className="panel-section-border button"
                            style={styles.button}
                            onClick={() => {
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
        editMenuConfig: (id, obj) => dispatch(editMenuConfig(id, obj)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel)
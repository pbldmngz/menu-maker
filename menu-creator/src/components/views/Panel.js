import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { signOut } from '../../store/actions/authActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router';
import Swal from "sweetalert2";
import { HexColorPicker, HexColorInput } from "react-colorful";
import Modal from 'react-modal';

import { getMenuConfig, editMenuConfig } from '../../store/actions/menuActions'

Modal.setAppElement('#root');

class Panel extends Component {

    constructor() {
        super();
        this.state = {
            modal: false,
            mode: "background",
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

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

    openModal(mode) {
        this.setState({
            modal: true,
            mode: mode
        })
    }


    closeModal() {
        this.setState({
            modal: false,
        })
    }


    render() {

        const { auth } = this.props;

        if (!this.state) return null
        if (!this.state.config) return null

        const { colorPalette } = this.state.config;

        if (!auth.uid) return <Redirect to="/auth/login" />

        const styles = {
            title: {
                backgroundColor: colorPalette.highlight,
                color: colorPalette.text,
            },
            header: {
                backgroundColor: colorPalette.highlight,
                borderColor: colorPalette.highlight,
                color: colorPalette.text,
            },
            button: {
                borderColor: colorPalette.highlight,
                backgroundColor: colorPalette.container,
                color: colorPalette.text,
            },
            fill: {
                backgroundColor: colorPalette.background,
            },
            category: {
                backgroundColor: colorPalette.container,
            },
            background: {
                backgroundColor: colorPalette.background,
                overflow: "scroll",
            },
            all: {
                highlight: colorPalette.highlight,
                text: colorPalette.text,
                container: colorPalette.container,
                background: colorPalette.background,
            }
        }

        var colorPicker = {
            highlight: colorPalette.highlight,
            text: colorPalette.text,
            container: colorPalette.container,
            background: colorPalette.background,
        }

        const handleChangeModal = (color) => {
            colorPicker[this.state.mode] = color
        }

        const closeModalOK = () => {
            this.setState({
                modal: false,
            });

            this.props.editMenuConfig(auth.uid, {
                colorPalette: {
                    ...this.state.config.colorPalette,
                    [this.state.mode]: colorPicker[this.state.mode]
                }
            });

            this.fetchData();
        }

        const resetColors = () => {
            this.props.editMenuConfig(auth.uid, {
                colorPalette: {
                    highlight: "#e2b22b",
                    background: "#1b1b1b",
                    container: "#262626",
                    text: "beige",
                }
            });
            
            this.fetchData();
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

                    <div className="panel-section" style={styles.category}>
                        <div className="panel-nav panel-section-border letter-spacing" style={styles.header}>
                            COLORS
                        </div>
                        <div className="panel-grid">
                            <div className="panel-section-border button"
                                style={{ backgroundColor: styles.all.background, border: "1px dashed #eeeeee25" }}
                                onClick={() => this.openModal("background")}
                            >
                                <div style={{ mixBlendMode: "difference" }}>Background</div>
                            </div>
                            <div className="panel-section-border button"
                                style={{ backgroundColor: styles.all.container, border: "1px dashed #eeeeee25" }}
                                onClick={() => this.openModal("container")}
                            >
                                <div style={{ mixBlendMode: "difference" }}>Container</div>
                            </div>
                            <div className="panel-section-border button"
                                style={{ backgroundColor: styles.all.highlight, border: "1px dashed #eeeeee25" }}
                                onClick={() => this.openModal("highlight")}
                            >
                                <div style={{ mixBlendMode: "difference" }}>Highlight</div>
                            </div>
                            <div className="panel-section-border button"
                                style={{ backgroundColor: styles.all.text, border: "1px dashed #eeeeee25" }}
                                onClick={() => this.openModal("text")}
                            >
                                <div style={{ mixBlendMode: "difference" }}>Text</div>
                            </div>
                        </div>
                        <div className="panel-section-border button"
                            style={styles.button}
                            onClick={resetColors}>
                            Reset colors
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={this.state.modal}
                    onRequestClose={() => this.closeModal()}
                    contentLabel="Color Picker"
                    className="Modal"
                    overlayClassName="Overlay"
                >
                    <center>
                        <HexColorInput className="popup-input" color={colorPicker[this.state.mode]} onChange={handleChangeModal} />
                        <div className="marginator">
                            <HexColorPicker color={colorPicker[this.state.mode]} onChange={handleChangeModal} />
                        </div>
                        <div className="panel-grid">
                            <button className="popup-input" onClick={closeModalOK}>OK</button>
                            <button className="popup-input cancel" onClick={this.closeModal}>Cancel</button>
                        </div>
                    </center>
                </Modal>
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
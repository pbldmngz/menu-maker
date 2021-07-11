import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signOut } from "../../store/actions/authActions";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Swal from "sweetalert2";
import { HexColorPicker, HexColorInput } from "react-colorful";
import QRCode from 'qrcode.react';
import Modal from "react-modal";
import { NotificationContainer, NotificationManager } from 'react-notifications';

import {
	getMenuConfig,
	editMenuConfig,
	getLanguage,
	editLanguage,
	getIdByName,
} from "../../store/actions/menuActions";
import { dText } from '../../config/language'

Modal.setAppElement("#root");

class Panel extends Component {
	constructor() {
		super();
		this.state = {
			modal: false,
			modal_lang: false,
			modal_share: false,
			mode: "background",
		};

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.openModalShare = this.openModalShare.bind(this);
		this.closeModalShare = this.closeModalShare.bind(this);
		this.openModalLang = this.openModalLang.bind(this);
		this.closeModalLang = this.closeModalLang.bind(this);
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData = () => {
		const { auth, getLanguage, getMenuConfig } = this.props;
		if (auth.uid) {
			getMenuConfig(auth.uid).then((res) => {
				this.setState({
					menuLink: "/menu/" + res.path,
					config: res,
				});
			});
			getLanguage(auth.uid).then((res) => {
				this.setState({
					...res
				})
			});
		}
	};

	// Works for path, name & logoURL
	simpleInputSwal = (param) => {
		const { auth, editMenuConfig, getIdByName } = this.props;

		const { lang } = this.state;
		if (!lang) return null;
		const dT = dText[lang].simple_input;

		const vals = {
			name: {
				title: dT.display_name.toLowerCase(),
				id: "name",
				placeholder: dT.display_name,
				value: this.state.config ? this.state.config.name : "",
			},
			address: {
				title: dT.web_address.toLowerCase(),
				id: "path",
				placeholder: dT.web_address,
				value: this.state.config ? this.state.config.path : "",
			},
			logo: {
				title: dT.image_url.toLowerCase(),
				id: "logoURL",
				placeholder: dT.image_url,
				value: this.state.config ? this.state.config.logoURL : "",
			},
		};

		Swal.fire({
			title: dT.change + " " + vals[param].title,

			html: `<input type="text" id="${vals[param].id}" class="popup-input" placeholder="${vals[param].placeholder}" value="${vals[param].value}" />`,
			showCancelButton: true,
			confirmButtonText: dT.change,
			showLoaderOnConfirm: true,
			preConfirm: () => {
				const v = Swal.getPopup().querySelector("#" + vals[param].id).value;

				return { [vals[param].id]: v };
			},
		}).then((result) => {
			if (result.isConfirmed) {
				if (param === 'address') {
					getIdByName(result.value.path).then((res) => {
						if (res.length === 0) {
							editMenuConfig(auth.uid, result.value);
							Swal.fire({
								title: dT.change_success,
							});
							// As I don't know how to handle this righ now i'll just fetch twice
							this.fetchData();
						} else {
							Swal.fire({
								icon: 'error',
								title: dT.error,
								text: dT.text,
							});
						}
					})
				} else {
					editMenuConfig(auth.uid, result.value);
					Swal.fire({
						title: dT.change_success,
					});
				}

				this.fetchData();
			}
		}).catch((error) => {
			console.log(error)
		});
	};

	openModal(mode) {
		this.setState({
			modal: true,
			mode: mode,
		});
	}

	closeModal() {
		this.setState({
			modal: false,
		});
	}

	openModalShare() {
		this.setState({
			modal_share: true,
		});
	}

	closeModalShare() {
		this.setState({
			modal_share: false,
		});
	}

	openModalLang() {
		this.setState({
			modal_lang: true,
		});
	}

	closeModalLang() {
		this.setState({
			modal_lang: false,
		});
	}

	render() {
		const { auth } = this.props;

		if (!this.state) return null;
		if (!this.state.config) return null;

		const { colorPalette } = this.state.config;
		const { lang } = this.state;
		if (!lang) return null;

		if (!auth.uid) return <Redirect to="/auth/login" />;

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
			},
		};

		var colorPicker = {
			highlight: colorPalette.highlight,
			text: colorPalette.text,
			container: colorPalette.container,
			background: colorPalette.background,
		};

		const handleChangeModal = (color) => {
			colorPicker[this.state.mode] = color;
		};

		const closeModalOK = () => {
			this.setState({
				modal: false,
			});

			this.props.editMenuConfig(auth.uid, {
				colorPalette: {
					...this.state.config.colorPalette,
					[this.state.mode]: colorPicker[this.state.mode],
				},
			});

			this.fetchData();
		};

		const resetColors = () => {
			this.props.editMenuConfig(auth.uid, {
				colorPalette: {
					highlight: "#e2b22b",
					background: "#1b1b1b",
					container: "#262626",
					text: "beige",
				},
			});

			this.fetchData();
		};

		const dT = dText[lang];

		return (
			<div className="overall animation" style={styles.background}>
				<div className="big-guy-padding">
					<div className="panel-nav" style={styles.title}>
						<h2>{dT.control_panel}</h2>
					</div>

					<div className="as-footer">
						<Link
							className="panel-section-border button"
							style={styles.button}
							to={this.state.menuLink}
						>
							{ dT.go_menu }
						</Link>
					</div>

					<div className="panel-grid">
						{/* Menu, Categories & Items */}
						<div className="panel-section" style={styles.category}>
							<div
								className="panel-nav panel-section-border letter-spacing"
								style={styles.header}
							>
								{ dT.menu }
							</div>
							<Link
								className="panel-section-border button"
								style={styles.button}
								to={"/cpanel/categories"}
							>
								{ dT.categories }
							</Link>
							<Link
								className="panel-section-border button"
								style={styles.button}
								to={"/cpanel/items"}
							>
								{dT.items}
							</Link>
						</div>
						{/* Settings, Display name, web address, brand logo */}
						<div className="panel-section" style={styles.category}>
							<div
								className="panel-nav panel-section-border letter-spacing"
								style={styles.header}
							>
								{dT.settings}
							</div>

							<div
								className="panel-section-border button"
								style={styles.button}
								onClick={() => {
									this.simpleInputSwal("name");
								}}
							>
								{dT.display_name}
							</div>

							{/* Need to check if the name is taken */}
							<div
								className="panel-section-border button"
								style={styles.button}
								onClick={() => {
									this.simpleInputSwal("address");
								}}
							>
								{dT.web_address}
							</div>

							<div
								className="panel-section-border button"
								style={styles.button}
								onClick={() => {
									this.simpleInputSwal("logo");
								}}
							>
								{dT.brand_logo}
							</div>
							{/* This should be done in a separate page */}
						</div>
						{/* User, Share link, change language, log out */}
						<div className="panel-section" style={styles.category}>
							<div
								className="panel-nav panel-section-border letter-spacing"
								style={styles.header}
							>
								{dT.user}
							</div>
							{/* Maybe done using swal2 with an image (QR Code Generator) and 
							an imput field with an auto-copy function with the default value of the link */}
							<div
								className="panel-section-border button"
								style={styles.button}
								onClick={() => this.openModalShare()}
							>
								{dT.share_link}
							</div>
							<div
								className="panel-section-border delete"
								style={styles.button}
							>
								Disable ads
							</div>
							<div
								className="panel-section-border button"
								style={styles.button}
								onClick={() => this.openModalLang()}
							>
								{dT.language}
							</div>
							<div
								className="panel-section-border button"
								style={styles.button}
								onClick={() => {
									this.props.signOut();
								}}
							>
								{dT.logout}
							</div>
						</div>
						{/* Colors */}
						<div className="panel-section" style={styles.category}>
							<div
								className="panel-nav panel-section-border letter-spacing"
								style={styles.header}
							>
								{dT.colors}
							</div>
							<div className="panel-grid">
								<div
									className="panel-section-border button"
									style={{
										backgroundColor: styles.all.background,
										border: "1px dashed #eeeeee25",
									}}
									onClick={() => this.openModal("background")}
								>
									<div style={{ mixBlendMode: "difference" }}>
										{dT.background}
									</div>
								</div>
								<div
									className="panel-section-border button"
									style={{
										backgroundColor: styles.all.container,
										border: "1px dashed #eeeeee25",
									}}
									onClick={() => this.openModal("container")}
								>
									<div style={{ mixBlendMode: "difference" }}>
										{dT.container}
									</div>
								</div>
								<div
									className="panel-section-border button"
									style={{
										backgroundColor: styles.all.highlight,
										border: "1px dashed #eeeeee25",
									}}
									onClick={() => this.openModal("highlight")}
								>
									<div style={{ mixBlendMode: "difference" }}>
										{dT.highlight}
									</div>
								</div>
								<div
									className="panel-section-border button"
									style={{
										backgroundColor: styles.all.text,
										border: "1px dashed #eeeeee25",
									}}
									onClick={() => this.openModal("text")}
								>
									<div style={{ mixBlendMode: "difference" }}>
										{dT.text}
									</div>
								</div>
							</div>
							<div
								className="panel-section-border button"
								style={styles.button}
								onClick={resetColors}
							>
								{dT.reset}
							</div>
						</div>
					</div>
					{/* ColorPicker modal */}
					<Modal
						isOpen={this.state.modal}
						onRequestClose={() => this.closeModal()}
						contentLabel="Color Picker"
						className="Modal"
						overlayClassName="Overlay"
					>
						<center>
							<HexColorInput
								className="popup-input"
								color={colorPicker[this.state.mode]}
								onChange={handleChangeModal}
							/>
							<div className="marginator">
								<HexColorPicker
									color={colorPicker[this.state.mode]}
									onChange={handleChangeModal}
								/>
							</div>
							<div className="panel-grid">
								<button className="popup-input button" onClick={closeModalOK}>
									OK
								</button>
								<button
									className="popup-input cancel button"
									onClick={this.closeModal}
								>
									Cancel
								</button>
							</div>
						</center>
					</Modal>
					{/* Share link modal (QR & CopyLink) */}
					<Modal
						isOpen={this.state.modal_share}
						onRequestClose={() => this.closeModalShare()}
						contentLabel="Share link"
						className="Modal"
						overlayClassName="Overlay"
					>
						<center>
							<div className="marginator">
								<QRCode
									value={"https://menu-maker.com" + this.state.menuLink}
									size={256}
								/>
								<p>To save this QR:</p>
								<p>Right click --> Save image as...</p>
							</div>
							<div className="panel-grid">
								<button
									className="popup-input button"
									onClick={() => {
										navigator.clipboard.writeText(
											"https://menu-maker.com" + this.state.menuLink
										);
										NotificationManager.success('Copied to clipboard', "", 1500);
									}}
								>
									Copy link
								</button>
								<button className="popup-input button" onClick={this.closeModalShare}>
									Close
								</button>
							</div>
						</center>
					</Modal>
					{/* Change language modal */}
					<Modal
						isOpen={this.state.modal_lang}
						onRequestClose={() => this.closeModalLang()}
						contentLabel="Language Picker"
						className="Modal"
						overlayClassName="Overlay"
					>
						<center>
							<div className="panel-grid marginator">
								<div className="marginator">
									<button
										className="popup-input button"
										onClick={() => {
											this.props.editLanguage(auth.uid, "en");
											this.closeModalLang();
											this.fetchData();
										}}
									>
										English
									</button>
								</div>
								<div className="marginator">
									<button className="popup-input button"
										onClick={() => {
											this.props.editLanguage(auth.uid, "es");
											this.closeModalLang();
											this.fetchData();
										}}
									>
										Español
									</button>
								</div>
							</div>
						</center>
					</Modal>
					<NotificationContainer />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(signOut()),
		getMenuConfig: (id) => dispatch(getMenuConfig(id)),
		editMenuConfig: (id, obj) => dispatch(editMenuConfig(id, obj)),
		getLanguage: (id) => dispatch(getLanguage(id)),
		editLanguage: (id, lang) => dispatch(editLanguage(id, lang)),
		getIdByName: (name) => dispatch(getIdByName(name)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Panel);

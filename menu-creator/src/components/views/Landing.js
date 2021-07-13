import React, { Component } from 'react'
import Footer from './Footer';
import { Link } from 'react-router-dom';

import Image1 from '../../images/signup.png'
import Image2 from '../../images/categories.png'
import Image3 from '../../images/config1.png'
import Image4 from '../../images/config2.png'
import Image5 from '../../images/config3.png'
import Image6 from '../../images/config4.png'
import Image7 from '../../images/config5.png'
import Image8 from '../../images/config6.png'
import Image9 from '../../images/config7.png'
import Image10 from '../../images/config8.png'
import Image11 from '../../images/items.png'
import Image12 from '../../images/share0.png'
import Image13 from '../../images/share1.png'
import Image14 from '../../images/share2.png'
import Image15 from '../../images/share3.png'


export default class Landing extends Component {
    render() {
        return (
            <div className="">
                <div className="navbar">
                    <h1 className="big-title">{"Menu-Maker.com"}</h1>
                </div>
                <div className="panel-grid">
                    <div>
                        <div className="category-container category-padding-full">
                            <div className="marginator">
                                <div>The objective of this page is to provide small businesses with the possibility to create a free digital version of their menu in a matter of minutes and share it in the form of a link or QR code with their clients.</div>
                                <center className="marginator"><cite>Pablo Domínguez (developer)</cite></center>
                            </div>
                        </div>
                        <div className="category-container panel-grid">
                            <Link
                                className="panel-section-border button color-white"
                                to={"/auth/login"}
                            >
                                Sign In
                            </Link>
                            <Link
                                className="panel-section-border button color-white"
                                to={"/auth/register"}
                            >
                                Sign Up
                            </Link>
                        </div>
                        <div className="category-container category-padding-full">
                            <center><h2>Caracteristics</h2></center>
                            <ul class="">
                                <li>Simple to use</li>
                                <li>Color customization</li>
                                <li>Once set, no maintenance is needed</li>
                                <li>Supports English and Spanish</li>
                                <li>Edit, delete or even temporally dissable products & categories</li>
                                <li>Changes available in real time</li>
                                <li>QR Code generator</li>
                            </ul>
                        </div>
                    </div>
                    <div className="category-container">
                        <div className="panel-nav">
                            <h2>Instructions</h2>
                        </div>
                        <div
                            className="panel-section-border letter-spacing"
                        >
                            <div>
                                <center className="marginator">1. Create an account</center>
                                <img src={Image1} alt="SignUp Image" className="image-100" />
                            </div>
                        </div>
                        <div
                            className="panel-section-border letter-spacing"
                        >
                            <div>
                                <center className="marginator">2. Create categories & products</center>
                                <div className="panel-grid small-padding">
                                    <img src={Image2} alt="SignUp Image" className="image-100" />
                                    <img src={Image11} alt="SignUp Image" className="image-100" />
                                </div>
                            </div>
                        </div>
                        <div
                            className="panel-section-border letter-spacing"
                        >
                            <div>
                                <center className="marginator">3. Edit your settings</center>
                                <div className="panel-grid small-padding">
                                    <img src={Image3} alt="SignUp Image" className="image-100" />
                                    <img src={Image4} alt="SignUp Image" className="image-100" />
                                    <img src={Image5} alt="SignUp Image" className="image-100" />
                                    <img src={Image6} alt="SignUp Image" className="image-100" />
                                    <div>
                                        <a href="https://imgbb.com" className="color-white">Use a free image upload service (using IMGBB.COM)</a>
                                        <img src={Image7} alt="SignUp Image" className="image-100" />
                                    </div>
                                    <img src={Image8} alt="SignUp Image" className="image-100" />
                                    <img src={Image9} alt="SignUp Image" className="image-100" />
                                    <img src={Image10} alt="SignUp Image" className="image-100" />
                                </div>
                            </div>
                        </div>
                        <div
                            className="panel-section-border letter-spacing"
                        >
                            <div>
                                <center className="marginator">4. Share your menu</center>
                                <div className="panel-grid small-padding">
                                    <img src={Image12} alt="SignUp Image" className="image-100" />
                                    <img src={Image13} alt="SignUp Image" className="image-100" />
                                    <img src={Image14} alt="SignUp Image" className="image-100" />
                                    <img src={Image15} alt="SignUp Image" className="image-100" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <Footer/>
            </div>
        )
    }
}

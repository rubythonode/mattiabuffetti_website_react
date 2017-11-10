import React, { Component } from 'react'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'

export default class Catalogue extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loaded: false
		};
	}
	componentDidMount() {
		var _this = this;
	}
	render () {
		var height = window.innerHeight - 200;
		var urlImg = require('../..//Img/logo-luigi-mattia-buffetti-web-developer.png');
		return (
			<div id="navbar">
				<img src={urlImg} alt="Logo Luigi Mattia Buffetti - Web Developer" width={80} height={123} />
			<nav>
				<ul>
					<li>
						<Link to={this.props.url}>
							<i className="fa fa-desktop" aria-hidden="true" />
							<span>Projects</span>
						</Link>
					</li>
					<li>
						<Link to={this.props.url+"about"}>
							<i className="fa fa-address-card-o" aria-hidden="true" />
							<span>About</span>
						</Link>
					</li>
					<li>
						<Link to={this.props.url+"contact"}>
							<i className="fa fa-envelope-o" aria-hidden="true" />
							<span>Contact</span>
						</Link>
					</li>
				</ul>
			</nav>
			</div>
		)
	}
}

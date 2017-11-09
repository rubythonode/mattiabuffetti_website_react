import React, { Component } from 'react'
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import { BrowserRouter } from 'react-g-analytics';

import Menu from './Section/Menu'
import About from './Section/About'
import Contact from './Section/Contact'
import Project from './Section/Project'
import Home from './Home'
import axios from 'axios';

const urlSite = '/';
export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: true,
			project: []
		};
	}
	updateDimensions() {
		if(window.innerWidth < 500) {
			this.setState({ width: 450, height: 102 });
		} else {
			let update_width  = window.innerWidth-100;
			let update_height = Math.round(update_width/4.4);
			this.setState({ width: update_width, height: update_height });
		}
		var _this = this;
		this.serverRequestCatMerc =
			axios
			.get(urlSite+"dist/db/project.json")
			.then(function(result) {
				_this.setState({
					project: result.data.project,
					loaded: true
				});
			}).catch(function (error) {
				console.log(error);
			});
	}
	componentDidMount () {
		this.setState({
			authed: false,
			loading: false
		});
		this.updateDimensions();
		window.addEventListener("resize", this.updateDimensions.bind(this));
	}
	componentWillUnmount () {
		this.removeListener();
		window.removeEventListener("resize", this.updateDimensions.bind(this));
	}
	render() {
		document.getElementById("root").className = 'img1';
		var minHeight = (window.innerWidth > 767) ? window.innerHeight - 89 : window.innerHeight - 171;
		return this.state.loading === true ? <h1>Loading</h1> : (
			<BrowserRouter id="UA-36210943-1">
				<div>
					<header>
						<Menu url={urlSite} />
					</header>
					<div id="contentSite" style={{minHeight: minHeight}}>
						<Switch>
							<Route path={urlSite} exact render={(props) => ( <Home url={urlSite}/> )} />
							<Route path={urlSite+'home'} exact render={(props) => ( <Home url={urlSite}/> )} />
							<Route path={urlSite+'projects/:number'} component={Project} />
							<Route path={urlSite+'about'} component={About} />
							<Route path={urlSite+'contact'} render={(props) => ( <Contact url={urlSite}/> )} />
						</Switch>
					</div>
					<footer>
						<div>
							<p>VAT: IT03253260545 <span>·</span> <a href="mailto:mattia.buffetti@gmail.com">mattia.buffetti@gmail.com</a> <span>·</span> <a href="skype:mattia.buffetti">mattia.buffetti</a> <span>·</span> <a href="tel:+393286930881">+39 328.6930881</a></p>
						</div>
					</footer>
				</div>
			</BrowserRouter>
		);
	}
}

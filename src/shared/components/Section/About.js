import React, { Component } from 'react'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import TabItemProfile from './TabItemProfile'
import Helmet from 'react-helmet'
export default class About extends Component {
	constructor(props) {
		super(props);
		this.state = {
			project: [],
			screen: 'mac'
		}
	}
	componentDidMount() {
		var _this = this;
	}
	render () {
		var _this = this;
		var curTask = this.props.location.pathname.replace(this.props.match.url, '').replace('/', '');
		var url = this.props.match.url.replace('about', '');
		return (
			<div>
				<Helmet
					title={'Luigi Mattia Buffetti - Web Developer'}
					meta={[
						{ name: 'description', content: 'I developed a lot of site so I know the PHP and MySql, HTML, CSS, Javascript, Jquery and Ajax and I created for a client a plugin for wordpress to get the image from Instagram using hashtag and from the wordpress admin panel it is possibile to manage the image. I developed it using jQuery, Ajax and I use the REST API of Instagram.' },
						{ name: 'keywords', content: 'Web Developer' },
						{ property: 'og:title', content: 'Luigi Mattia Buffetti - Web Developer' },
					]}
				/>
				<h1>About</h1>
				<div id="about">
					<div className="row">
						<div className="col-md-5">
							<img src={url+"gallery/luigi-mattia-buffetti.jpg"} alt="Luigi Mattia Buffetti" />
						</div>
						<div className="col-md-7">
							<nav id="navTab">
								<ul>
									<li>
										<Link
											className={curTask === '' ? 'active' : ''}
											to={url+'about'}>
											Profile
										</Link>
									</li>
									<li>
										<Link
											className={curTask === 'skills' ? 'active' : ''}
											to={url+'about/skills'}>
											skills
										</Link>
									</li>
									<li>
										<Link
											className={curTask === 'experience' ? 'active' : ''}
											to={url+'about/experience'}
										>
											Experience
										</Link>
									</li>
								</ul>
							</nav>
							<div id="contentTab">
								<BrowserRouter>
									<Switch>
										<Route
											path={url+'about'}
											render={(props) => (
												<TabItemProfile
													active={curTask}
													url={url}
												/>
											)}
										/>
									</Switch>
								</BrowserRouter>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
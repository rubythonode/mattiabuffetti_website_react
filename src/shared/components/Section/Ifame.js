import React, { Component } from 'react'
export default class Ifame extends Component {
	constructor(props) {
		super(props);
		this.state = {
			project: []
		}
	}
	componentDidMount() {
		var _this = this;
	}
	render () {
		var _this = this;
		var classMob = !this.state.screen ? 'mac' : this.state.screen;
		if (this.props.type === 'website') {
			return (
				<div>

					<div id="navTabIframe">
						<nav>
							<ul>
								<li>
									<button
										className={this.state.screen === 'mac' ? 'active' : ''}
										onClick={() => this.setState({screen: 'mac'})}
									>
										Desktop
									</button>
								</li>
								<li>
									<button
										className={this.state.screen === 'mobile' ? 'active' : ''}
										onClick={() => this.setState({screen: 'mobile'})}
									>
										Mobile
									</button>
								</li>
							</ul>
						</nav>
					</div>
					<div id="contentTabIframe">
						<div className={classMob}>
							<div>
								<iframe src={this.props.src}/>
							</div>
						</div>
					</div>
				</div>
			)
		} else {
			return (
				<div id="btnStore">
					<a href={this.props.src} target="_blank">
						<img src={this.props.url+'/gallery/app_store_button.png'} alt="App Store Button" />
					</a>
				</div>
			)
		}
	}
}
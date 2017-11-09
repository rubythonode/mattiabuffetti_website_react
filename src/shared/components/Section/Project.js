import React, { Component } from 'react'
import axios from 'axios';
import Tab from './Tab'
import Ifame from './Ifame'
const url = '/';
export default class Project extends Component {
	constructor(props) {
		super(props);
		this.state = {
			project: []
		}
	}
	componentDidMount() {
		var _this = this;
		this.serverRequestCatMerc =
			axios
			.get(url+"dist/db/project.json")
			.then(function(result) {
				_this.setState({
					project: result.data.project,
					loaded: true
				});
			}).catch(function (error) {
				console.log(error);
			});
	}
	render () {
		var curEl = this.props.match.params.number;
		var _this = this;
		var curTask = this.props.location.pathname.replace(this.props.match.url, '').replace('/', '');
		return (
			<div>
				{this.state.project.reverse().map(function (item, i) {
					if (item.url === curEl) {
						return (
							<div key={i}>
								<h1>{item.title}</h1>
								<div id="projectDetail">
									<div className="row">
										<div className="col-md-6">
											<Tab
												curTask={curTask}
												skills={item.skills}
												tasks={item.tasks}
												text={item.description}
												url={_this.props.match.url}
											/>
										</div>
										<div className="col-md-6">
											<Ifame
												url={_this.props.match.url.replace('/projects/'+item.url, '')}
												src={item.link}
												type={item.type}
											/>
										</div>
									</div>
								</div>
							</div>
						)
					}
				})}
			</div>
		)
	}
}
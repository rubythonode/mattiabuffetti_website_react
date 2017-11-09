import React, { Component } from 'react'
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom'
import TabItem from './TabItem'
export default class Tab extends Component {
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
		var curTask = this.props.curTask;
		return (
			<div>
				<nav id="navTab">
					<ul>
						<li>
							<Link
								className={curTask === '' ? 'active' : ''}
								to={this.props.url}
							>
								Project
							</Link>
						</li>
						<li>
							<Link
								className={curTask === 'tasks' ? 'active' : ''}
								to={this.props.url+'/tasks'}
							>
								Tasks
							</Link>
						</li>
						<li>
							<Link
								className={curTask === 'skills' ? 'active' : ''}
								to={this.props.url+'/skills'}
							>
								Skills
							</Link>
						</li>
					</ul>
				</nav>
				<div id="contentTab">
					<BrowserRouter>
						<Switch>
							<Route
								path={this.props.url}
								render={(props) => (
									<TabItem
										skills={this.props.skills}
										tasks={this.props.tasks}
										text={this.props.text}
										task={this.props.curTask}
										url={this.props.url}
									/>
								)}
							/>
						</Switch>
					</BrowserRouter>
				</div>
			</div>
		)
	}
}
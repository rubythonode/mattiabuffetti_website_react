import React, { Component } from 'react'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
const url = '/Siti_Web/Sito_Personale/';
export default class TabItem extends Component {
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
		switch(this.props.task) {
			case 'skills':
				return (
					<div>
						<ul dangerouslySetInnerHTML={{__html: this.props.skills}} />
					</div>
				)
				break;
			case 'tasks':
				return (
					<div>
						<div dangerouslySetInnerHTML={{__html: this.props.tasks}} />
					</div>
				)
				break;
			default:
				return (
					<div>
						<div dangerouslySetInnerHTML={{__html: this.props.text}} />
					</div>
				)
				break;
		}
	}
}
import React, { Component } from 'react'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import axios from 'axios';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			project: []
		}
	}
	componentDidMount() {
		var _this = this;
		var projectList =
			axios
			.get("https://jacopobuffetti.com/project.json")
			.then(function(result) {
				_this.setState({
					project: result.data.project,
					loaded: true
				});
			}).catch(function (error) {
				console.log(error);
			});

	}
	componentWillUnmount() {
		//this.projectList();
	}
	render () {
	  var url = this.props.url;
		return (
            <div>
              <h1>Project</h1>
              <ul id="projectList" className="clearfix">
				  {this.state.project.reverse().map(function (item, i) {
					  var img = (window.innerWidth !== 1024) ? item.image : item.image.replace('.jpg', '-1024.jpg');
					  var urlImg = require('./gallery/'+img);
					  return (
                          <li key={i}>
                            <Link to={url+'projects/'+item.url}>
                              <img src={urlImg} alt={item.title} width={500} height={333} />
								<div className="hoverText">
									<h3>{item.title}</h3>
								</div>
                            </Link>
                          </li>
					  )
				  })}
              </ul>
            </div>
		)
	}
}
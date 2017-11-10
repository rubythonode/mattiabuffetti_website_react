import React, { Component } from 'react'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import axios from 'axios';
import Helmet from 'react-helmet'

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
				<Helmet
					title={'Luigi Mattia Buffetti - Web Developer'}
					meta={[
						{ name: 'description', content: 'I developed a lot of site so I know the PHP and MySql, HTML, CSS, Javascript, Jquery and Ajax and I created for a client a plugin for wordpress to get the image from Instagram using hashtag and from the wordpress admin panel it is possibile to manage the image. I developed it using jQuery, Ajax and I use the REST API of Instagram.' },
						{ name: 'keywords', content: 'Web Developer' },
						{ property: 'og:title', content: 'Luigi Mattia Buffetti - Web Developer' },
					]}
				/>
              <h1>Project</h1>
              <ul id="projectList" className="clearfix">
				  {this.state.project.reverse().map(function (item, i) {
					  var img = (window.innerWidth !== 1024) ? item.image : item.image.replace('.jpg', '-1024.jpg');
					  var urlImg = require('../gallery/'+item.image);
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

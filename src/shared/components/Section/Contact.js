import React, { Component } from 'react'
import axios from 'axios';
import Helmet from 'react-helmet'
function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}
export default class Contact extends Component {
	constructor(props) {
		super(props);
		this.state = {
			project: [],
			screen: 'mac',
			error_name: '',
			error_mail: '',
			error_message: '',
			result: ''
		}
	}
	componentDidMount() {
		var _this = this;
	}
	handleInputChange(e) {
		var name, val;
		if (typeof e.name !== 'undefined') {
			name = e.name;
			val = e.value;
		} else if (typeof e.target !== 'undefined') {
			name = e.target.name;
			val = e.target.value;
		} else {
			name = Object.keys(this.refs)[0];
		}
		this.setState({[name]: val});
	}
	sendForm(e) {
		e.preventDefault();
		var flag = true;
		if (!this.state.name) {
			this.setState({error_name: 'Please insert valid name'})
		} else {
			this.setState({error_name: ''})
		}
		if (!this.state.email) {
			this.setState({error_mail: 'Please insert valid email'})
		} else if (!validateEmail(this.state.email)) {
			this.setState({error_name: 'Email address is not valid. Example: address@domain.com'})
		} else {
			this.setState({error_name: ''})
		}
		if (!this.state.message) {
			this.setState({error_message: 'Please insert valid message'})
		} else {
			this.setState({error_message: ''})
		}
		if (flag) {
			var _this = this;
			axios.post(_this.props.url+'/SendMail/index.php', {
				name: this.state.name,
				email: this.state.email,
				message: this.state.message,
			})
			.then(function (response) {
				_this.setState({result: response.data.result})
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	}
	render () {
		var imgShare = require('../../Img/social_graph.jpg');
		return (
			<div>
				<Helmet
					title={'Luigi Mattia Buffetti - Get In Touch'}
					meta={[
						{ name: 'description', content: 'I developed a lot of site so I know the PHP and MySql, HTML, CSS, Javascript, Jquery and Ajax and I created for a client a plugin for wordpress to get the image from Instagram using hashtag and from the wordpress admin panel it is possibile to manage the image. I developed it using jQuery, Ajax and I use the REST API of Instagram.' },
						{ name: 'keywords', content: 'Web Developer' },
						{ property: 'og:title', content: 'Luigi Mattia Buffetti - Get In Touch' },
						{ property: 'og:description', content: 'I developed a lot of site so I know the PHP and MySql, HTML, CSS, Javascript, Jquery and Ajax and I created for a client a plugin for wordpress to get the image from Instagram using hashtag and from the wordpress admin panel it is possibile to manage the image. I developed it using jQuery, Ajax and I use the REST API of Instagram.' },
						{ property: 'og:url', content: 'Luigi Mattia Buffetti - Web Developer' },
						{ property: 'og:image', content: imgShare },
					]}
				/>
				<h1>Contact</h1>
				<div id="contact">
					<div className="row">
						<div className="col-md-6">
							<h2>Luigi Mattia Buffetti</h2>
							<p>VAT: IT03253260545</p>
							<p>Mail: <a href="mailto:mattia.buffetti@gmail.com">mattia.buffetti@gmail.com</a></p>
							<p>Skype: <a href="skype:mattia.buffetti">mattia.buffetti</a></p>
							<p>Telefono: <a href="tel:+393286930881">+39 328.6930881</a></p>
							<p>Linkedin: <a href="https://www.linkedin.com/in/mattiabuffetti/" target="_blank">Linkedin</a></p>
						</div>
						<div className="col-md-6">
							<h2>Get In Touch!</h2>
							<form method="post" action="http://santa.agency/support/">
								<p>
									<label htmlFor="name">Name</label>
									<input
										type="text"
										name="name"
										value={this.state.name}
										className="input"
										placeholder="Name"
										onChange={this.handleInputChange.bind(this)}
									/>
									{this.state.error_name &&
									<span className="error">{this.state.error_name}</span>
									}
								</p>
								<p>
									<label htmlFor="mail">Email address</label>
									<input
										type="email"
										name="email"
										value={this.state.email}
										className="input"
										placeholder="Email"
										onChange={this.handleInputChange.bind(this)}
									/>
									{this.state.error_mail &&
									<span className="error">{this.state.error_mail}</span>
									}
								</p>
								<p>
									<label htmlFor="masseage">Message</label>
									<textarea
										type="text"
										name="message"
										value={this.state.message}
										className="input"
										placeholder="Message"
										onChange={this.handleInputChange.bind(this)}
									>{this.state.message}</textarea>
									{this.state.error_message &&
									<span className="error">{this.state.error_message}</span>
									}
								</p>
								<div className="sendForm">
									{this.state.result === 'success' ?
										<div className="success">
											Message sent with success, I will respond you as soon as possible.
										</div>
										:
										<div>
											<button
												onClick={(e) => this.sendForm(e)}
												type="submit"
												className="et_pb_contact_submit et_pb_button"
											>
												Invia
											</button>
											{this.state.result === 'error' &&
											<div className="error">
												Message doesn't send, pease try again
											</div>
											}
										</div>
									}
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
import React, { Component } from 'react';

import SubscriberAuthor from './../Author/Subscribers';

export default class CustomInput extends Component {
	
	subscriberAuthor = new SubscriberAuthor();

	constructor() {
		super();
		this.state = { msgError: '' };
	}

	componentWillMount() {
		this.registerSubscribers();
	}

	registerSubscribers() {
		this.subscriberAuthor.onFormError('subscribe', (topic, error) => {
			let fieldErr = error.errors.find(err => err.field === this.props.name);
			if(fieldErr) {
				this.setState({ msgError: fieldErr.defaultMessage });
			}
		});

		this.subscriberAuthor.onClearForm('subscribe', (topic, error) => {
			this.setState({ msgError: '' });
		});
	}

	render() {
			return (
					<div className="pure-control-group">
							<label htmlFor={this.props.id}>{this.props.label}</label> 
							<input id={this.props.id} type={this.props.type} name={this.props.name} value={this.props.value} onChange={this.props.onChange}/>                  
							<label> { this.state.msgError } </label>		
					</div>
			)
	}
} 

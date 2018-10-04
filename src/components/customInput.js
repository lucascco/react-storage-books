import React, { Component } from 'react';

import Subscribers from './../common/Subscribers';

export default class CustomInput extends Component {
	
	subscriberAuthor = new Subscribers();
	subFormError;
	subOnClearForm;

	constructor() {
		super();
		this.state = { msgError: '' };
	}

	componentWillMount() {
		this.registerSubscribers();
	}

	componentWillUnmount() {
		this.subscriberAuthor.onPubSub(undefined, 'unsubscribe', this.subFormError);
		this.subscriberAuthor.onPubSub(undefined, 'unsubscribe', this.subOnClearForm);
	}

	registerSubscribers() {
		this.subFormError = this.subscriberAuthor.onFormError('subscribe', (topic, error) => {
			let fieldErr = error.errors.find(err => err.field === this.props.name);
			if(fieldErr) {
				this.setState({ msgError: fieldErr.defaultMessage });
			}
		});

		this.subOnClearForm = this.subscriberAuthor.onClearForm('subscribe', (topic, error) => {
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

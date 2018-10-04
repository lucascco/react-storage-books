import React, { Component } from 'react';
import { FormBook } from './FormBook';
import { ListBook } from './ListBook';
import $ from 'jquery';
import { API_URL_BOOK } from '../common/ApiUrl';
import Subscribers from '../common/Subscribers';

export default class BookBox extends Component {
	subscriberBook = new Subscribers();
	subUpdateList;
	constructor() {
		super();
		this.state = { listBook: [] };
	}
	
	componentDidMount() {
		this.registerSubscribes();
		this.loadListBook();
	}

	componentWillUnmount() {
		this.subscriberBook.onPubSub(undefined, 'unsubscribe', this.subUpdateList);
	}

	registerSubscribes() {
		this.subUpdateList = this.subscriberBook.onUpdateList('subscribe', (topic, data) => {
			this.setState({listBook: data.listBook});
		});
	}
	
	loadListBook() {
		$.ajax({
			url: API_URL_BOOK,
			dataType: 'json',
			success: res => this.setState({listBook: res}),
			error: error => console.error(error)
		});
	}

	render() {
		return (
			<div className="content">
				<div className="header">
					<h1>Cadastro de livros</h1>
				</div>
				<FormBook />
				<ListBook listBook={this.state.listBook} />
			</div>
		)
	}
}

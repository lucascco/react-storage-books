import React, { Component } from 'react';
import { FormBook } from './FormBook';
import { ListBook } from './ListBook';
import $ from 'jquery';
import { API_URL_BOOK } from '../common/ApiUrl';

export default class BookBox extends Component {
	constructor() {
		super();
		this.state = { listBook: [] };
	}
	
	componentDidMount() {
		this.loadListBook();
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

import React, { Component } from 'react';
import { FormBook } from './FormBook';
import { ListBook } from './ListBook';

export default class BookBox extends Component {
	render() {
		return (
			<div>
				<div className="header">
					<h1>Cadastro de livros</h1>
				</div>
				<FormBook />
				<ListBook />
			</div>
		)
	}
}

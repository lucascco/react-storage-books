import React, { Component } from 'react';
import $ from 'jquery';
import CustomInput from '../components/customInput';
import CustomSelect from '../components/customSelect';
import { API_URL_BOOK, API_URL_AUTHOR } from './../common/ApiUrl';
import Subscribers from '../common/Subscribers';

export class FormBook extends Component {

	subscriberBook = new Subscribers();

	constructor() {
		super();
		this.setTitle = this.setTitle.bind(this);
		this.setPrice = this.setPrice.bind(this);
		this.setAuthor = this.setAuthor.bind(this);
		this.postBook = this.postBook.bind(this);
		this.state = {
			listAuthors: [],
			book: {}
		};
		this.initBook();
		this.loadAuthors();
	}

	initBook() {
		this.setState({book: {titulo: '', preco: '', autorId: ''}});
	}

	postBook(event) {
		event.preventDefault();
		$.ajax({
			url: API_URL_BOOK,
			contentType:'application/json',
			dataType: 'json',
			type: 'post',
			data: JSON.stringify(this.state.book),
			success: res => this.subscriberBook.onUpdateList('publish', undefined, {listBook: res}),
			error: error => {
				if(error.status === 400) {
					this.subscriberBook.onFormError('publish', undefined, error.responseJSON);
				}
			},
			beforeSend: () => {
				this.subscriberBook.onClearForm('publish', undefined, {});
				this.initBook();
			}
		})

	}

	loadAuthors() {
		$.ajax({
			url: API_URL_AUTHOR,
      dataType: 'json',
      success: res => {
        this.setState({listAuthors: res.map(author => ({ name: author.nome, value: author.id }))});
      }
		});
	}

	setTitle(event) {
		this.setState({book: { ...this.state.book, titulo: event.target.value }});
	}

	setPrice(event) {
		this.setState({book: { ...this.state.book, preco: Number.parseFloat(event.target.value) }});
	}

	setAuthor(event) {
		this.setState({book: { ...this.state.book, autorId: Number.parseInt(event.target.value) }});
	}

	render() {
		return (
			<form className="pure-form pure-form-aligned" method="post" onSubmit={this.postBook}>
				<CustomInput id="titulo" name="titulo" type="text" label="Titulo" value={this.state.book.titulo} onChange={this.setTitle}/>
				<CustomInput id="preco" name="preco" type="number" label="Preço" value={this.state.book.preco} onChange={this.setPrice}/>
				<CustomSelect id="autorId" name="autorId" listOptions={this.state.listAuthors} label="Selecione o Autor" value={this.state.book.autorId} onChange={this.setAuthor}/>
				<div className="pure-control-group">                                  
					<label></label> 
					<button type="submit" className="pure-button pure-button-primary">Cadastrar Livro</button>                                    
				</div>
			</form>
		)
	}
}

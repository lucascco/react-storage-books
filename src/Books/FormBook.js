import React, { Component } from 'react';
import $ from 'jquery';
import CustomInput from '../components/customInput';
import CustomSelect from '../components/customSelect';
import { API_URL_BOOK } from './../common/ApiUrl';

export class FormBook extends Component {
	constructor() {
		super();
		this.setTitle = this.setTitle.bind(this);
		this.setPrice = this.setPrice.bind(this);
		this.setAuthor = this.setAuthor.bind(this);
		this.postBook = this.postBook.bind(this);
		this.state = {
			listAuthors: [],
			book: {titulo: '', preco: '', autorId: ''}
		};
		this.loadAuthors();
	}

	postBook(event) {
		event.preventDefault();
		$.ajax({
			url: API_URL_BOOK,
			contentType:'application/json',
			dataType: 'json',
			type: 'post',
			data: JSON.stringify(this.state.book),
			success: res => console.log(res),
			error: error => console.log(error)
		})

	}

	loadAuthors() {
		$.ajax({
			url: API_URL_BOOK,
      dataType: 'json',
      success: res => {
        this.setState({listAuthors: res.map(author => ({ name: author.titulo, value: author.id }))});
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
				<CustomInput id="titulo" name="titulo" type="text" label="Titulo" onChange={this.setTitle}/>
				<CustomInput id="preco" name="preco" type="number" label="Preço" onChange={this.setPrice}/>
				<CustomSelect id="autorId" name="autorId" listOptions={this.state.listAuthors} label="Selecione o Autor" onChange={this.setAuthor}/>
				<div className="pure-control-group">                                  
					<label></label> 
					<button type="submit" className="pure-button pure-button-primary">Cadastrar Livro</button>                                    
				</div>
			</form>
		)
	}
}

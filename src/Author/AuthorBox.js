import React, { Component } from 'react';

import $ from 'jquery';
import CustomInput from '../components/customInput';
import SubscribersAuthor from './Subscribers';
import { API_URL_AUTHOR } from './../common/ApiUrl';

class FormAuthor extends Component {

	subscribersAuthor = new SubscribersAuthor();

  constructor() {
    super();
    this.sendForm = this.sendForm.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setName = this.setName.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.state = { nome: '', senha: '', email: '' };
	}

	sendForm(event) {
		event.preventDefault();
		$.ajax({
			url: this.props.apiurl,
			contentType:'application/json',
			dataType: 'json',
			type: 'post',
			data: JSON.stringify({nome: this.state.nome, senha: this.state.senha, email: this.state.email}),
			success: res => this.subscribersAuthor.onUpdateList('publish', undefined, {listAuthor: res}),
			error: error => {
				if(error.status === 400) {
					this.subscribersAuthor.onFormError('publish', undefined, error.responseJSON);
				}
			},
			beforeSend: () => {
				this.subscribersAuthor.onClearForm('publish', undefined, {});
				this.setState({nome: '', senha: '', email: ''});
			}
		});
}


setPassword(event) {
	this.setState({ senha: event.target.value });
}

setName(event) {
	this.setState({ nome: event.target.value });
}

setEmail(event) {
	this.setState({ email: event.target.value });
}

render() {
	return (
		<form className="pure-form pure-form-aligned" onSubmit={this.sendForm} method="post">
			<CustomInput id="nome" type="text" name="nome" label="Nome" value={this.state.nome} onChange={this.setName}/>
			<CustomInput id="email" type="email" name="email" label="E-mail" value={this.state.email} onChange={this.setEmail}/>
			<CustomInput id="senha" type="password" name="senha" label="Senha" value={this.state.senha} onChange={this.setPassword}/>
			<div className="pure-control-group">                                  
				<label></label> 
				<button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
			</div>
		</form>             
		)
	}
}

class ListAuthors extends Component {

	render() {
		return (
			<table className="pure-table">
				<thead>
					<tr>
						<th>Nome</th>
						<th>email</th>
					</tr>
				</thead>
				<tbody>
					{
						this.props.listAuthor.map(author => 
							<tr key={author.id}>
								<td>{ author.nome }</td>
								<td>{ author.email }</td>
							</tr>
						)
					}
				</tbody>
			</table>
		)
	}
}

export default class AuthorBox extends Component {
	API_URL = 'http://cdc-react.herokuapp.com/api/autores';
	subscribersAuthor = new SubscribersAuthor();
	
  constructor() {
		super();
    this.state = { listAuthor: [] };
	}

  componentDidMount() {
		this.loadAuthors();
		this.registerSubscribes();
	}

	loadAuthors() {
    $.ajax({
      url: API_URL_AUTHOR,
      dataType: 'json',
      success: res => {
        this.setState({listAuthor: res});
      }
		});
	}

	registerSubscribes() {
		this.subscribersAuthor.onUpdateList('subscribe', 
			(topic, data) => this.setState({listAuthor: data.listAuthor}));
	}
	

	render() {
		return (
			<div>
				<div className="header">
					<h1>Cadastro de autores</h1>
				</div>
				<div className="content" id="content">
						<FormAuthor apiurl={API_URL_AUTHOR}/>
						<ListAuthors listAuthor={this.state.listAuthor}/>
				</div>
			</div>
		);
	}
}

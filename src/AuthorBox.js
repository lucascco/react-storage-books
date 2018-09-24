import React, { Component } from 'react';

import $ from 'jquery';
import CustomInput from './components/customInput';

class FormAuthor extends Component {

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
		success: res => this.props.onRegisterAuthor({listAuthor: res}),
		error: error => console.error('error', error)
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
		<div className="pure-form pure-form-aligned">
			<form className="pure-form pure-form-aligned" onSubmit={this.sendForm} method="post">
				<CustomInput id="nome" type="text" name="nome" label="Nome" value={this.state.nome} onChange={this.setName}/>
				<CustomInput id="email" type="email" name="email" label="E-mail" value={this.state.email} onChange={this.setEmail}/>
				<CustomInput id="senha" type="password" name="senha" label="Senha" value={this.state.senha} onChange={this.setPassword}/>
				<div className="pure-control-group">                                  
					<label></label> 
					<button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
				</div>
			</form>             
		</div>
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
	
  constructor() {
		super();
		this.onRegisterAuthor = this.onRegisterAuthor.bind(this);
    this.state = { listAuthor: [] };
	}

  componentDidMount() {
    $.ajax({
      url: this.API_URL,
      dataType: 'json',
      success: res => {
        this.setState({listAuthor: res});
      }
    });
	}
	
	onRegisterAuthor(data) {
		this.setState({listAuthor: data.listAuthor});
	}

	render() {
		return (
			<div>
				<FormAuthor apiurl={this.API_URL} onRegisterAuthor={this.onRegisterAuthor}/>
				<ListAuthors apiurl={this.API_URL} listAuthor={this.state.listAuthor}/>
			</div>
		);
	}
}

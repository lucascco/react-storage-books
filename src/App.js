import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';
import CustomInput from './components/customInput.js';

class App extends Component {

  API_URL = 'http://cdc-react.herokuapp.com/api/autores';

  constructor() {
    super();
    this.sendForm = this.sendForm.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setName = this.setName.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.state = {
      listAuthor: [],
      nome: '',
      senha: '',
      email: ''
    };
  }

  sendForm(event) {
    event.preventDefault();
    $.ajax({
      url: this.API_URL,
      contentType:'application/json',
      dataType: 'json',
      type: 'post',
      data: JSON.stringify({nome: this.state.nome, senha: this.state.senha, email: this.state.email}),
      success: res => this.setState({listAuthor: res}),
      error: error => console.error('error', error)
    })
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
  
  componentDidMount() {
    $.ajax({
      url: this.API_URL,
      dataType: 'json',
      success: res => {
        this.setState({listAuthor: res});
      }
    })
  }

  render() {
    return (
      <div id="layout">
          <a href="#menu" id="menuLink" className="menu-link">
              <span></span>
          </a>

          <div id="menu">
              <div className="pure-menu">
                  <a className="pure-menu-heading" href="#">Company</a>

                  <ul className="pure-menu-list">
                      <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                      <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
                      <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livro</a></li>
                  </ul>
              </div>
          </div>

          <div id="main">
              <div className="header">
                  <h1>Cadastro de autores</h1>
              </div>
              <div className="content" id="content">
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
                <div>
                  <table className="pure-table">
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.listAuthor.map(author => 
                          <tr key={author.id}>
                            <td>{ author.nome }</td>
                            <td>{ author.email }</td>
                          </tr>
                        )
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
      </div>
    );
  }
}

export default App;

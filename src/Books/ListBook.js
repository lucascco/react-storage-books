import React, { Component } from 'react';

export class ListBook extends Component {
	render() {
		return (
			<div>
				<table className="pure-table">
					<thead>
						<tr>
							<th>Título</th>
							<th>Preço</th>
							<th>Autor</th>
						</tr>
					</thead>
					<tbody>
						{
							this.props.listBook.map(book => 
								<tr key={book.id}>
									<td>{ book.titulo }</td>
									<td>{ book.preco }</td>
									<td>{ book.autor.nome }</td>
								</tr>
							)
						}
					</tbody>
				</table>
			</div>
		)
	}
}

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
						</tr>
					</thead>
					<tbody>
						{
							this.props.listBook.map(book => 
								<tr key={book.id}>
									<td>{ book.titulo }</td>
									<td>{ book.preco }</td>
								</tr>
							)
						}
					</tbody>
				</table>
			</div>
		)
	}
}

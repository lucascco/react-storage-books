import React, { Component } from 'react';

export default class CustomSelect extends Component {

	render() {
		return (
			<div className="pure-control-group">
				<label htmlFor={this.props.id}>{this.props.label}</label>
				<select value={this.props.value} onChange={this.props.onChange}>
					<option value={''}>Selecione</option>
					{
						this.props.listOptions
							.map(option => <option key={option.value} value={option.value}>{ option.name }</option>)
					}
				</select>
			</div>
		)
	}
}

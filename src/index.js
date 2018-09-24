import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router, Route, IndexRoute } from 'react-router';
import registerServiceWorker from './registerServiceWorker';

import AuthorBox from './Author/AuthorBox';
import App from './App';
import Home from './Home';

ReactDOM.render(
	<Router>
		<Route path="/" component={App}>
			<IndexRoute component={Home}/>
			<Route path="/autor" component={AuthorBox}/>
			<Route path="/livro"/>
		</Route>
	</Router>,
	document.getElementById('root')
);
registerServiceWorker();

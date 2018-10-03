import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import Home from './Home';
import AuthorBox from './Author/AuthorBox';
import BookBox from './Books/BookBox';

ReactDOM.render(
	<BrowserRouter>
		<App>
			<Switch>            
					<Route exact path="/" component={Home}/>
					<Route path="/autor" component={AuthorBox}/>
					<Route path="/livros" component={BookBox}/>                
			</Switch>            
		</App>
	</BrowserRouter>,
	document.getElementById('root')
);
registerServiceWorker();

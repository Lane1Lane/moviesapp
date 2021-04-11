import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'react-dates/lib/css/_datepicker.css';
import LoadingPage from './components/LoadingPage';
import scss from './styles/styles.scss';
import { startSetMovies } from './actions/movies';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

const renderApp = () => {
    ReactDOM.render(jsx, document.getElementById('app'));
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

store.dispatch(startSetMovies()).then(() => {
    renderApp();
});
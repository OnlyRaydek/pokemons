import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Pokemon from './components/Pokemon';
import PokemonList from './components/PokemonList';

import store from './store/store';

import './App.scss';

const App = () =>
    <div className="App">
        <BrowserRouter>
            <Provider store={store}>
                <Switch>
                    <Route path={'/'} exact component={PokemonList} />
                    <Route path={'/pokemon/:pokemon'} exact component={Pokemon} />
                    <Redirect to={'/'} />
                </Switch>
            </Provider>
        </BrowserRouter>
    </div>;


export default App;

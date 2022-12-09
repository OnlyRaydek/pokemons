import { combineReducers } from 'redux';
import PokemonListReducer from './PokemonListReducer';
import PokemonReducer from './PokemonReducer';
import PokemonTypesReducer from './PokemonTypesReducer';
import PokemonListByTypeReducer from './PokemonListByTypeReducer';

const RootReducer = combineReducers({
    PokemonList: PokemonListReducer,
    Pokemon: PokemonReducer,
    PokemonTypes: PokemonTypesReducer,
    PokemonListByTypeReducer: PokemonListByTypeReducer,
});

export default RootReducer;

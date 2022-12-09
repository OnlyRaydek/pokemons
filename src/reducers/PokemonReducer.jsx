/* eslint-disable default-param-last */

const DefaultState = {
    loading: false,
    data: {},
    errorMsg: '',
};

const PokemonReducer = (state = DefaultState, action) => {
    switch (action.type) {
    case 'POKEMON_LOADING':
        return {
            ...state,
            loading: true,
            errorMsg: '',
        };
    case 'POKEMON_FAIL':
        return {
            ...state,
            loading: false,
            errorMsg: 'Cannot find pokemon',
        };
    case 'POKEMON_SUCCESS':
        return {
            ...state,
            loading: false,
            errorMsg: '',
            data: {
                ...state.data,
                [action.pokemonName]: action.payload,
            },
        };
    default:
        return state;
    }
};

export default PokemonReducer;

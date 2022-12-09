/* eslint-disable default-param-last */

const DefaultState = {
    loading: false,
    data: [],
    errorMsg: '',
    count: 0,
};

const PokemonTypesReducer = (state = DefaultState, action) => {
    switch (action.type) {
    case 'POKEMON_TYPES_LOADING':
        return {
            ...state,
            loading: true,
            errorMsg: '',
        };
    case 'POKEMON_TYPES_FAIL':
        return {
            ...state,
            loading: false,
            errorMsg: 'Cannot get pokemon',
        };
    case 'POKEMON_TYPES_SUCCESS':
        return {
            ...state,
            loading: false,
            data: action.payload.results,
            errorMsg: '',
            count: action?.payload.count,
        };
    default:
        return state;
    }
};

export default PokemonTypesReducer;

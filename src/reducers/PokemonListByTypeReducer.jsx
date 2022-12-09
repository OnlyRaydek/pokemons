/* eslint-disable default-param-last */

const DefaultState = {
    loading: false,
    data: [],
    errorMsg: '',
    count: 0,
};

const PokemonListByTypeReducer = (state = DefaultState, action) => {
    switch (action.type) {
    case 'POKEMON_LIST_BY_TYPE_LOADING':
        return {
            ...state,
            loading: true,
            errorMsg: '',
        };
    case 'POKEMON_LIST_BY_TYPE_FAIL':
        return {
            ...state,
            loading: false,
            errorMsg: 'Cannot get pokemon',
        };
    case 'POKEMON_LIST_BY_TYPE_SUCCESS':
        return {
            ...state,
            loading: false,
            data: action.payload,
            errorMsg: '',
            count: action.payload.length,
        };
    default:
        return state;
    }
};

export default PokemonListByTypeReducer;

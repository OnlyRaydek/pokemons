import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { GetPokemonList, GetPokemonTypes, GetPokemonListByType } from '../../actions/pokemonActions';

import './styles.scss';


const FilterByType = ({ defaultOptions, selectedOption, setSelectedOption }) => {
    const dispatch = useDispatch();
    const pokemonTypes = useSelector(state => state.PokemonTypes);
    

    useEffect(() => {
        dispatch(GetPokemonTypes());
    }, []);

    useEffect(() => {
        if (selectedOption.value === 'All') {
            dispatch(GetPokemonList(1));
        }
    }, [selectedOption]);

    const handleSelectOption = (el) => {
        console.log(el);
        setSelectedOption(el)
        dispatch(GetPokemonListByType(el.url));
    };

    const pokemonTypesOptions = pokemonTypes.data.map(el => {
        return { value: el.name, label: el.name.toUpperCase(), url: el.url}
    });

    const options = [defaultOptions, ...pokemonTypesOptions]

    return (
        <div>
            <Select
                className="filter-select"
                defaultValue={selectedOption}
                onChange={(el) => handleSelectOption(el)}
                options={options}
            />
        </div>
    );
};

export default FilterByType;

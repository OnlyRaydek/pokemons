/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { GetPokemonTypes, GetPokemonListByType } from '../../actions/pokemonActions';


import './styles.scss';

const FilterByType = () => {
    const dispatch = useDispatch();
    const pokemonTypes = useSelector(state => state.PokemonTypes);
    const [selectedOption, setSelectedOption] = useState('UNKNOWN');

    useEffect(() => {
        dispatch(GetPokemonTypes());
    }, []);

    const handleSelectOption = (el) => {
        setSelectedOption(el)
        dispatch(GetPokemonListByType(el.url));
    };

    const options = pokemonTypes.data.map(el => {
        return { value: el.name, label: el.name.toUpperCase(), url: el.url}
    });

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

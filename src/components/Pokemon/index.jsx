/* eslint-disable new-cap */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetPokemon } from '../../actions/pokemonActions';

import './styles.scss';

const Pokemon = (props) => {
    const dispatch = useDispatch();
    const pokemonState = useSelector(state => state.Pokemon);
    const pokemonName = props.match.params.pokemon;

    useEffect(() => {
        dispatch(GetPokemon(pokemonName));
    }, []);

    const pokemonInfo = pokemonState.data[pokemonName];

    return(
        <div className="poke">
            <h1>{pokemonName}</h1>
            {pokemonInfo &&
                <div className="pokemon-wrapper">
                    <div className="item">
                        <h1>Picture</h1>
                        <img src={pokemonInfo.sprites.front_default} alt=""/>
                    </div>
                    <div className="item">
                        <h1>Stats</h1>
                        {pokemonInfo.stats.map((el, index) =>
                            <div key={index}>
                                <p>{el.stat.name} {el.base_stat}</p>
                            </div>
                        )}
                    </div>
                    <div className="item">
                        <h1>Abilities</h1>
                        {pokemonInfo.abilities.map((el, index) =>
                            <div key={index}>
                                <p>{el.ability.name}</p>
                            </div>
                        )}
                    </div>
                </div>
            }
            {pokemonState.loading && <p>Loading...</p>}
            {pokemonState.errorMsg !== '' && <p>error getting pokemon</p>}
        </div>
    );
};

export default Pokemon;

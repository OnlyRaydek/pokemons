/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable new-cap */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import FilterByType from '../FilterByType';

import { GetPokemonList, GetPokemonTypes } from '../../actions/pokemonActions';

import './styles.scss';

const DEFAULT_PAGE = 1;
const POKEMONS_PER_PAGE = 15;

const PokemonList = (props) => {
    const dispatch = useDispatch();
    const pokemonList = useSelector(state => state.PokemonList);
    const pokemonListByType = useSelector(state => state.PokemonListByTypeReducer);
    
    const [search, setSearch] = useState('');
    const [list, setList] = useState([]);
    const [pokemonCount, setPokemonCount] = useState(0);

    const getList = (page = DEFAULT_PAGE) => {
        dispatch(GetPokemonList(page));
    };
    
    console.log(pokemonList);
    console.log(pokemonListByType);
    
    useEffect(() => {
        getList(DEFAULT_PAGE);
        dispatch(GetPokemonTypes());
    }, []);

    useEffect(() => {
        if (pokemonList.count) {
            setList(pokemonList);
            setPokemonCount(pokemonList.count);
        }
    }, [pokemonList]);

    // useEffect(() => {
    //     if (pokemonListByType.count) {
    //         setList(pokemonListByType);
    //     }
    // }, [pokemonListByType]);

    const ShowData = () => {
        if (pokemonList.loading) {
            return <p>Loading...</p>;
        }

        if (list?.data) {
            return(
                <div className="list-wrapper">
                    {list?.data.map((el, index) =>
                        <Link to={`/pokemon/${el.name}`}>
                            <div key={index} className="pokemon-item">
                                <p>{el.name}</p>
                            </div>
                        </Link>
                    )}
                </div>
            );
        }

        if (pokemonList.errorMsg !== '') {
            return <p>{pokemonList.errorMsg}</p>;
        }

        return <p>Cannot get data</p>;
    };

    return(
        <div>
            <div className="filters-bar">
                <div className="search">
                    <p>Search: </p>
                    <input className="search__input" type="text" onChange={e => setSearch(e.target.value)}/>
                    <button
                        className="search__button"
                        onClick={() => props.history.push(`/pokemon/${search}`)}
                    >
                        Search
                    </button>
                </div>
                <FilterByType />
            </div>
            {ShowData()}
            {pokemonCount &&
                <ReactPaginate
                    pageCount={Math.ceil(pokemonCount / POKEMONS_PER_PAGE)}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                    onPageChange={(data) => getList(data.selected + DEFAULT_PAGE)}
                    containerClassName="pagination"
                    pageLinkClassName="page-link"
                    renderOnZeroPageCount={null}
                />
            }
        </div>
    );
};

export default PokemonList;

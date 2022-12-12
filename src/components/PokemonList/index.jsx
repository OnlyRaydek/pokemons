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
const DEFAULT_OPTIONS = { value: 'All', label: 'All', url: 'https://pokeapi.co/api/v2/pokemon/' };

const PokemonList = (props) => {
    const dispatch = useDispatch();
    const pokemonList = useSelector(state => state.PokemonList);
    
    const [search, setSearch] = useState('');
    const [list, setList] = useState([]);
    const [pokemonCount, setPokemonCount] = useState(0);
    const [selectedOption, setSelectedOption] = useState(DEFAULT_OPTIONS);

    const getList = (page = DEFAULT_PAGE) => {
        dispatch(GetPokemonList(page));
    };
    
    
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


    const ShowList = () => {
        if (pokemonList.loading) {
            return <p>Loading...</p>;
        }

        if (list?.data) {
            return(
                <div className="pokemon-list">
                    {list?.data.map((el, index) =>
                        <Link to={`/pokemon/${el.name}`} key={index}>
                            <div className="pokemon-item">
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
                <FilterByType
                    defaultOptions={DEFAULT_OPTIONS}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                />
            </div>
            {ShowList()}
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

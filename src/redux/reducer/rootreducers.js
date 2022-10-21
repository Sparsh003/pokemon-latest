import { combineReducers } from "redux";
import PokemonListReducer from "./reducer";
import PokemonMultipleReducer from "./PokemonReducer";

const rootreducers = combineReducers({ PokemonList: PokemonListReducer,Pokemon: PokemonMultipleReducer, });


export default rootreducers;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetPokemon } from "../redux/action";
import Loading from "./Loading";
import { toast } from "react-toastify";

function PokemonDetail() {
  let { pokemonName } = useParams();
  const pokemonState = useSelector((state) => state.Pokemon);
  const [current, setcurrent] = useState(1);
  const [toggle, settoggle] = useState(false);
  const [nickname, setnickname] = useState("");
  const [error, seterror] = useState(null);
  const [catched, setcathed] = useState(false);

  function Imgcenter() {
    switch (current) {
      case 1:
        return pokeData.sprites.front_default;
      case 2:
        return pokeData.sprites.back_default;
      case 3:
        return pokeData.sprites.front_shiny;
      case 4:
        return pokeData.sprites.back_shiny;
      default:
        return pokeData.sprites.front_default;
    }
  }

  // useEffect(() => {
  //   Imgcenter();
  // }, [current]);

  const pokeData = pokemonState.data[pokemonName];
  const pokeAbilities = pokemonState?.data[pokemonName]?.abilities;
  const pokeMove = pokemonState?.data[pokemonName]?.moves;
  const pokeType = pokemonState?.data[pokemonName]?.types;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetPokemon(pokemonName));
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("name"));
    if (data) {
      data.filter((el, item) => {
        if (el.pokename == pokemonName) {
          return setcathed(true);
        }
      });
    }
  }, []);

  const handleLocal = () => {
    var showList = [];
    if (nickname !== "") {
      var show = {
        nickname: nickname,
        pokename: pokeData.name,
        pokeimage: pokeData.sprites.front_default,
      };

      showList.push(show);

      showList = showList.concat(
        JSON.parse(localStorage.getItem("name") || "[]")
      );
      localStorage.setItem("name", JSON.stringify([...showList]));
      toast.success("Added Successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setcathed(true);

      settoggle(false);
      setnickname("");
    } else {
      seterror("please enter nickname ");
    }
  };

  return (
    <>
      {pokeData ? (
        <div className="container mt-4 mb-4">
          {pokeData && (
            <>
              <div className="d-flex align-items-center justify-content-center mb-2">
                <div className="pokemon-item p-2 text-center">
                  <div className="relative">
                    <img src={Imgcenter()} alt="" className="img-fluid-1" />

                    {current !== 4 && (
                      <div
                        className="right-arrow"
                        onClick={() => setcurrent(current + 1)}
                      >
                        <div className="width">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-24 h-24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                    {current !== 1 && (
                      <div
                        className="left-arrow"
                        onClick={() => setcurrent(current - 1)}
                      >
                        <div className="width">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="row">
                    <div className="col-md-3 col-lg-3 col-sm-3 col-6 mb-2">
                      <img
                        src={pokeData.sprites.front_default}
                        alt=""
                        className={`pokemon-item ${current === 1 && "active"} img-fluid`}
                        onClick={() => setcurrent(1)}
                      />
                    </div>
                    <div className="col-md-3  col-lg-3 col-sm-3  col-6 mb-2">
                      <img
                        src={pokeData.sprites.back_default}
                        alt=""
                        className={`pokemon-item ${current === 2 && "active"} img-fluid`}
                        onClick={() => setcurrent(2)}
                      />
                    </div>
                    <div className="col-md-3 col-lg-3 col-sm-3  col-6 mb-2">
                      <img
                        src={pokeData.sprites.front_shiny}
                        alt=""
                        className={`pokemon-item ${current === 3 && "active"} img-fluid`}
                        onClick={() => setcurrent(3)}
                      />
                    </div>
                    <div className="col-md-3 col-lg-3 col-sm-3  col-6 mb-2">
                      <img
                        src={pokeData.sprites.back_shiny}
                        alt=""
                        className={`pokemon-item ${current === 4 && "active"} img-fluid`}
                        onClick={() => setcurrent(4)}
                      />
                    </div>
                    <div className="col-12 mt-2">
                      <h3>
                        Name:{" "}
                        <small className="text-primary text-capitalize">
                          {pokeData.name}
                        </small>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 mt-3">
                  <div className="pokemon-item p-3">
                    <div className="row mt-3">
                      <div className="col-sm-6 col-12">
                        <h4>Abilities</h4>
                        <hr></hr>
                        {pokeAbilities && (
                          <ul>
                            {pokeAbilities.map((item, key) => (
                              <li key={key}>{item.ability.name}</li>
                            ))}
                          </ul>
                        )}

                        <h4>Pokemon Types:</h4>
                        <hr></hr>
                        {pokeType && (
                          <ul>
                            {pokeType.map((item, key) => (
                              <li key={key}>{item.type?.name}</li>
                            ))}
                          </ul>
                        )}

                        <h4>
                          {" "}
                          Weight:{" "}
                          <small className="text-primary">
                            {pokeData.weight}
                          </small>
                        </h4>
                      </div>

                      <div className="col-sm-6 col-12">
                        <h4>Moves</h4>
                        <hr></hr>
                        {pokeMove && (
                          <ul>
                            {pokeMove.slice(0, 10).map((item, key) => (
                              <li key={key}>{item.move.name}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                    <div className="d-flex align-items justify-content-center mt-3">
                      {toggle ? (
                        <div className="d-flex align-items justify-content-around">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Enter Nickname"
                            value={nickname}
                            onChange={(e) => {
                              setnickname(e.target.value);
                            }}
                          />
                          {error !== null && (
                            <small className="text-danger">{error}</small>
                          )}
                          <button
                            className="btn btn-primary  mx-2"
                            onClick={handleLocal}
                          >
                            Add
                          </button>
                        </div>
                      ) : (
                        <button
                          className="btn btn-primary "
                          onClick={() => settoggle(true)}
                          disabled={catched}
                        >
                          {!catched ? "Catch Me" : "Pokemon Catched"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="loading-form mt-5">
          <Loading />
        </div>
      )}
    </>
  );
}

export default PokemonDetail;

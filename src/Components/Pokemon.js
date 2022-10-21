import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPokemonList } from "../redux/action";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import pokeimg from "./static/customimg.png";
import Loading from "./Loading";
import ReactPaginate from "react-paginate";

function Pokemon() {
  const dispatch = useDispatch();
  const FetchData = (page = 1) => {
    dispatch(GetPokemonList(page));
  };

  const PokemonList = useSelector((state) => state.PokemonList);

  useEffect(() => {
    FetchData(1);
  }, []);
  return (
    <>
      {PokemonList.data.length === 0 ? (
        <div className="loading-form mt-5">
          <Loading />
        </div>
      ) : (
        <>
          <div className="container mt-3">
            <div>
              <h1 className="text-primary">Pokemon Go</h1>
              <hr></hr>
            </div>
            <div className="row mt-4">
              {PokemonList.data.map((el, index) => {
                return (
                  <div
                    className="col-md-4 col-lg-3 col-sm-6 col-12 mb-3"
                    key={index}
                  >
                    <div className="pokemon-item">
                      <Link to={`/pokemonDetail/${el.name}`} className="link1">
                        <Card>
                          <Card.Img
                            variant="top"
                            src={pokeimg}
                            className="img-fluid-1"
                          />
                          <Card.Body className="text-center">
                            <Card.Title>
                              <h4 className="text-capitalize">{el.name}</h4>
                            </Card.Title>

                            <Button variant="primary">View Detail</Button>
                          </Card.Body>
                        </Card>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="container bg-primary rounded p-2 text-white mb-5">
            <ReactPaginate
              pageCount={Math.ceil(PokemonList.count / 20)}
              pageRangeDisplayed={6}
              marginPagesDisplayed={1}
              onPageChange={(data) => FetchData(data.selected + 1)}
              containerClassName={"pagination"}
              previousLinkClassName={"pagination_link"}
              nextLinkClassName={"pagination_link"}
              disabledClassName={"pagination_link_disabled"}
              activeClassName={"pagination_link_active"}
            />
          </div>
        </>
      )}
    </>
  );
}

export default Pokemon;

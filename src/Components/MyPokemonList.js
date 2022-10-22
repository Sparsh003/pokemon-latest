import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import pokemonball from "./static/pokemonball.gif";

function MyPokemonList() {
  const [localdata, setlocaldata] = useState([]);

  const handleDelte = (index) => {
    const removeLocalData = localdata.filter((item, i) => {
      return i !== index;
    });
    setlocaldata(removeLocalData);
    localStorage.setItem("name", JSON.stringify(removeLocalData));
    const data = JSON.parse(localStorage.getItem("name"));
    setlocaldata([...data]);
    toast.success("Removed Successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("name"));
    if (data === null) {
      setlocaldata([]);
    } else {
      setlocaldata([...data]);
    }
  }, []);
  return (
    <>
      {localdata.length === 0 ? (
        <>
          <div className=" container mt-3 text-center">
            <h3>No Catched Pokemon</h3>
            <hr></hr>
            <img src={pokemonball} className="img-fluid-0" />
          </div>
        </>
      ) : (
        <div className="container mt-4">
          <Table responsive hover>
            <thead>
              <tr>
                <th>Pokemon Image</th>
                <th>Pokemon Name</th>
                <th>Nickname</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {localdata?.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img src={`${item.pokeimage}`} className="img-fluid" />
                  </td>
                  <td>{item.pokename}</td>
                  <td
                    className={`${
                      item.nickname === "released" && "text-danger"
                    }`}
                  >
                    {item.nickname}
                  </td>
                  <td>
                    <button
                      className=" btn btn-danger mx-1 my-1"
                      onClick={() => {
                        handleDelte(index);
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
}

export default MyPokemonList;

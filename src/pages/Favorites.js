import React, { useState } from "react";
import NaveBar from "../components/NaveBar";
import Pokemon from "../components/Pokemon";
import { useHistory } from "react-router";
import "../index.css";

function Favorites({ onClick }) {
  const [Ls] = useState(JSON.parse(localStorage.getItem("pokemon")));

  const history = useHistory();

  function removeFav(e) {
    localStorage.setItem(
      "pokemon",
      JSON.stringify({
        allpokemon: Ls.allpokemon.filter((item) => e.name !== item.name),
      })
    );
    history.go(0);
  }

  return (
    <>
      <NaveBar />
      <div className="main">
        <h1>Favorites</h1>
        <div className="container">
          {Ls && !Ls.allpokemon.length > 0 && (
            <h1>No Favorites added Yet....</h1>
          )}
          {Ls.allpokemon &&
            Ls.allpokemon.map((e, i) => {
              return (
                <div key={i}>
                  <Pokemon onClick={onClick} details={{ name: e.name }} />
                  <button
                    className="btn"
                    onClick={() => {
                      removeFav(e);
                    }}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Favorites;

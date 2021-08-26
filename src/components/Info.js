import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NaveBar from "./NaveBar";

function Info({ url }) {
  const [data, setData] = useState(null);
  const [extraData, setextraData] = useState(null);
  const [loading, setloading] = useState(true);
  const [cliked, setcliked] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(url, { signal })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setloading(false);
      });
    return () => {
      controller.abort();
    };
  }, [url]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const ok = data && data.species.url;
    if (ok) {
      fetch(data.species.url, { method: "GET", signal: signal })
        .then((res) => res.json())
        .then((data) => {
          setextraData(data);
          setloading(false);
        });
      return () => {
        controller.abort();
      };
    }
  });

  function saveToLocalStorage(name, url, speciesurl) {
    if (localStorage.getItem("pokemon")) {
      let existing_fav = localStorage.getItem("pokemon");
      for (let i of JSON.parse(existing_fav).allpokemon) {
        if (name === i.name) {
          return;
        }
      }
      let updated = JSON.parse(existing_fav);
      updated.allpokemon.push({
        name: name,
        url: url,
        speciesurl: speciesurl,
      });

      localStorage.setItem("pokemon", JSON.stringify(updated));
    } else {
      localStorage.setItem(
        "pokemon",
        JSON.stringify({
          allpokemon: [
            {
              name: name,
              url: url,
              speciesurl: speciesurl,
            },
          ],
        })
      );
    }
  }

  return (
    <>
      <NaveBar />
      <div className="main__">
        <div className="info-container">
          {cliked && <h2>Loading</h2>}
          {data && (
            <>
              <img
                className="poke"
                src={data.sprites.front_default}
                alt="Moonji therium"
              />
              <h2>{data.name}</h2>
              <div className="text">
                <p>Expeiance : {data.base_experience}</p>
                <p>Happiness : {extraData && extraData.base_happiness}</p>
                <p>Capture Rate : {extraData && extraData.capture_rate}</p>
                <p>
                  <b>Body</b>
                </p>
                <p>Height : {data.height}</p>
                <p>Weight : {data.weight}</p>
                <p>Color : {extraData && extraData.color.name}</p>
                <>
                  <p>
                    <b>Abilities</b>
                  </p>
                  {data &&
                    !loading &&
                    data.abilities.map((e, i) => {
                      return <p key={i}>{e.ability.name}</p>;
                    })}
                </>
              </div>
            </>
          )}
          <Link to="/">All Pokemons</Link>
          <button
            onClick={() => {
              let speciesUrl = data.species.url;
              saveToLocalStorage(data.name, url, speciesUrl);
              setcliked(true);
            }}
            style={
              cliked
                ? { backgroundColor: "green" }
                : { backgroundColor: "#ad1341" }
            }
          >
            {cliked ? "Added to Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Info;

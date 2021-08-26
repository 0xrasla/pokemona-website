import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import heart from "../assets/heart.svg";

function Pokemon({ details, onClick }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function getData(name) {
    onClick(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`https://pokeapi.co/api/v2/pokemon/${details.name}`, { signal })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((e) => {
        if (e.name !== "AbortError") {
          setLoading(true);
          setError(e.message);
        }
      });
    return () => {
      controller.abort();
    };
  }, [details.name]);

  return (
    <>
      {!loading && !error && (
        <Link to="/info">
          <div
            onClick={() => {
              getData(details.name);
            }}
          >
            {
              <div className="poke">
                <img
                  src={!loading ? data.sprites.front_default : heart}
                  alt="Moonji therium"
                />
                <p>{details.name}</p>
              </div>
            }
          </div>
        </Link>
      )}
    </>
  );
}

export default Pokemon;

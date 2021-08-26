import React, { useEffect, useState } from "react";
import Pokemon from "../components/Pokemon";
import NaveBar from "../components/NaveBar";
import "../index.css";

function Home({ onClick }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch("https://pokeapi.co/api/v2/pokemon?limit=200", { signal })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        setError("Error!");
      })
      .then((data) => {
        console.log(data);
        setData(data.results);
        setLoading(false);
      });
    return () => {
      console.log("abort");
      controller.abort();
    };
  }, []);
  return (
    <>
      <NaveBar />
      <div className="main">
        <h1>Pokemon Mania</h1>
        <div className="container">
          {loading && <div>Loading...</div>}
          {error && <div>Error! Can't Show Results!</div>}
          {!loading &&
            data &&
            data.map((e, i) => {
              return <Pokemon key={i} details={e} onClick={onClick} />;
            })}
        </div>
      </div>
    </>
  );
}

export default Home;

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import "./style.css";

const Bloques = () => {
  const [bloques, setBloques] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAllBloques = async () => {
      try {
        const res = await axios.get("https://backendtooltiwi-production.up.railway.app/bloques");
        console.log(res.data);
        setBloques(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBloques();
  }, []);

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  const results = !search ? bloques : bloques.filter((dato)=> dato.nombre.toLowerCase().includes(search.toLocaleLowerCase()))
 
  // useEffect(() => {
  //   const fetchAllBloques = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:8090/bloques");
  //       console.log(res.data);
  //       setBloques(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchAllBloques();
  // }, []);

  // https://backendtooltiwi-production.up.railway.app/bloques
// http://localhost:8090/bloques

  const handleDelete = async (id) => {
    try {
      await axios.delete("https://backendtooltiwi-production.up.railway.app/bloques/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-all">
      <h1>ToolTiwi</h1>
      <div className="navb">
        <input
        value={search}
          className="searchinput"
          type="text"
          placeholder="Haga su busqueda"
          onChange={searcher}
        />
        <Navbar />
      </div>
      <div className="bloques">
        {results.map((bloque) => (
          <div className="bloque" key={bloque.id}>
            <h3>
              <a rel="noreferrer" target="_blank" href={bloque.link}>
                {bloque.nombre}
              </a>
            </h3>
            <p>{bloque.descripcion}</p>
            {bloque.hashtag && <i>{bloque.hashtag}</i>}
            <div className="Buttons">
              {/* <button className="btn visitarBtn subbloque"> */}
              <a
                className="btn visitarBtn subbloque"
                rel="noreferrer"
                target="_blank"
                href={bloque.link}
              >
                Visitar
              </a>
              {/* </button> */}
              <div className="btnsideright">
                <button
                  className="btn eliminarBtn subbloque"
                  onClick={() => handleDelete(bloque.id)}
                >
                  Eliminar
                </button>
                {/* <button className="btn editarBtn subbloque"> */}
                <Link
                  className="btn editarBtn subbloque"
                  to={`/update/${bloque.id}`}
                >
                  Editar
                </Link>
                {/* </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bloques;

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Add = () => {
  const [bloque, setBloque] = useState({
    nombre: "",
    descripcion: "",
    hashtag: "",
    link: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBloque((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
// https://backendtooltiwi-production.up.railway.app/bloques
// http://localhost:8090/bloques
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://backendtooltiwi-production.up.railway.app/bloques", bloque);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form">
      <h2 className="formTitle">Agregar Nuevo Bloque</h2>
      <input
        type="text"
        placeholder="Nombre de la Herramienta"
        onChange={handleChange}
        name="nombre"
      />
      <textarea
        name="descripcion"
        id=""
        cols="30"
        rows="10"
        placeholder="Descripción"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="#diseño #programacion"
        onChange={handleChange}
        name="hashtag"
      />
      <input
        type="text"
        placeholder="link"
        onChange={handleChange}
        name="link"
      />
      <button className="btn agregarBtn formButton" onClick={handleClick}>Agregar</button>
    </div>
  );
};

export default Add;

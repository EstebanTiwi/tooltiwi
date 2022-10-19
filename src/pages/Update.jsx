import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Update = () => {
  const [bloque, setBloque] = useState({
    nombre: "",
    descripcion: "",
    hashtag: "",
    link: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const bloqueId = location.pathname.split("/")[2];

  useEffect(() => {
    const esId = (id) => {
      return id.id === Number(bloqueId)
    }
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("https://backendtooltiwi-production.up.railway.app/bloques");
        console.log(res.data, "info", bloqueId);
          console.log(res.data.find(esId))
          setBloque(res.data.find(esId))
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, [bloqueId]);

  const handleChange = (e) => {
    setBloque((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("https://backendtooltiwi-production.up.railway.app/bloques/" + bloqueId, bloque);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form">
      <h2>Editar Bloque</h2>
      <input
        type="text"
        placeholder="Nombre de la Herramienta"
        onChange={handleChange}
        name="nombre"
        value={bloque.nombre}
      />
      <textarea
        name="descripcion"
        id=""
        cols="30"
        rows="10"
        placeholder="Descripción"
        onChange={handleChange}
        value={bloque.descripcion}
      />
      <input
        type="text"
        placeholder="hashtags"
        onChange={handleChange}
        name="hashtag"
        value={bloque.hashtag}
      />
      <input
        type="text"
        placeholder="link"
        onChange={handleChange}
        name="link"
        value={bloque.link}
      />
      <button className="btn editarBtn formButton" onClick={handleClick}>
        Actualizar
      </button>
    </div>
  );
};

export default Update;

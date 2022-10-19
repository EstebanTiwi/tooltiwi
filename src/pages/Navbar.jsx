import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Navbar = () => {

  return (
    <div className="nav">
      {/* <button className='btn agregarBtn'>  */}
      <Link className="btn agregarBtn" to="/add">
        Agregar Nuevo Bloque
      </Link>
      {/* </button> */}
    </div>
  );
};

export default Navbar;

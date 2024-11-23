import React from "react";
import "./identify.scss";
import Title from "../title/title";
import { useNavigate } from "react-router-dom";

export function Identify() {
  const navigate = useNavigate();

  const redirectUser = () => {
    navigate("/login");
  };

  const userLogin = () => {
    navigate("/user-login");
  };

  return (
    <div>
      <Title>Identifique-se</Title>
      <div className="identify-btn">
        <button size="small" onClick={userLogin} className="btn-style">
          Usuário
        </button>
        <button onClick={redirectUser} className="btn-style">
          Voluntário
        </button>
      </div>
    </div>
  );
}

export default Identify;

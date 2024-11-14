import React from "react";
import "./user-login.scss";
import Title from "../title/title";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function UserLogin() {
    const navigate = useNavigate();
  
    const redirectUser = () => {
      navigate("/redirect-user");
    };

  return (
    <>
      <div className="user-login-wrapper">
        <Title>Identificação de usuário</Title>
        <div className="user-login-libras-form">
          <FaRegUser />
          <input
            type="text"
            placeholder="Digite seu nome"
            className="signup-input-field"
          />
        </div>
          <button size="large" className='user-login-btn' onClick={redirectUser}>Cadastrar</button>
      </div>
    </>
  );
}

export default UserLogin;

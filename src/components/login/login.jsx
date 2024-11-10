import React from "react";
import "./login.scss";
import Title from "../title/title";
import Button from "../button/button";
import { FaLock, FaRegEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export function LoginForm() {

  const navigate = useNavigate();
  
  const redirect = () => {
    navigate("/list");
  };

  const newUser = () => {
    navigate("/signup");
  };

  return (
    <>
      <div className="form-wrapper">
        <Title>Entrar</Title>
        <div className="libras-form">
          <FaRegEnvelope />
          <input
            type="email"
            placeholder="Digite seu e-mail"
            className="input-field"
          />
        </div>
        <div className="libras-form">
          <FaLock />
          <input
            type="password"
            placeholder="Digite sua senha"
            className="input-field"
          />
          </div>

          <a className="link" onClick={newUser}>Não possui cadastro?</a>
          <button className='btn-login' onClick={redirect}>Entrar</button>
      </div>
    </>
  );
}

export default LoginForm;

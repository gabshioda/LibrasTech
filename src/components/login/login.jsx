import React from "react";
import "./login.scss";
import Title from "../title/title";
import Button from "../button/button";
import { FaLock, FaRegEnvelope } from "react-icons/fa";

export function LoginForm({ children }) {
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

          <a href="youtube.com" className="link">Não possui cadastro?</a>
          <Button size="large" className='btn-login'>Entrar</Button>
      </div>
    </>
  );
}

export default LoginForm;

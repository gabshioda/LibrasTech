import React from "react";
import "./signup.scss";
import Title from "../title/title";
import Button from "../button/button";
import { FaLock, FaRegEnvelope, FaRegUser } from "react-icons/fa";

export function SignUpForm() {
  return (
    <>
      <div className="signup-wrapper">
        <Title>Novo usuário</Title>
        <div className="signup-libras-form">
          <FaRegUser />
          <input
            type="email"
            placeholder="Digite seu nome completo"
            className="signup-input-field"
          />
        </div>
        <div className="signup-libras-form">
          <FaRegEnvelope />
          <input
            type="email"
            placeholder="Digite seu e-mail"
            className="signup-input-field"
          />
        </div>
        <div className="signup-libras-form">
          <FaLock />
          <input
            type="password"
            placeholder="Digite sua senha"
            className="signup-input-field"
          />
          </div>
          <Button size="large" className='btn-signup'>Cadastrar</Button>
      </div>
    </>
  );
}

export default SignUpForm;

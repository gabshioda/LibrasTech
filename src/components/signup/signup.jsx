import React, { useState } from "react";
import "./signup.scss";
import Title from "../title/title";
import { FaLock, FaRegEnvelope, FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("ws://localhost:3001");

export function SignUpForm() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  

 const handleSignUp = () => {
  if (name.trim() && email.trim() && password.trim()) {
    // Emite o evento 'cadastrarUsuario' com os dados de nome, email e senha
    socket.emit("cadastrarUsuario", { name, email, password }, (response) => {
      // Resposta do servidor pode ser personalizada (ex.: "success" ou erro)
      console.log("Resposta do servidor:", response);

      if (response === "success") {
        // Se o cadastro for bem-sucedido, navega para a página de login
        navigate("/login");
      } else {
        // Caso contrário, exibe um alerta com a mensagem de erro
        alert("Erro ao cadastrar usuário. Tente novamente.");
      }
    });
  } else {
    alert("Por favor, preencha todos os campos.");
  }
 }



  return (
    <>
      <div className="signup-wrapper">
        <Title>Novo usuário</Title>
        <div className="signup-libras-form">
          <FaRegUser />
          <input
            type="text"
            placeholder="Digite seu nome completo"
            className="signup-input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="signup-libras-form">
          <FaRegEnvelope />
          <input
            type="email"
            placeholder="Digite seu e-mail"
            className="signup-input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="signup-libras-form">
          <FaLock />
          <input
            type="password"
            placeholder="Digite sua senha"
            className="signup-input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
          <button size="large" className='btn-signup' onClick={handleSignUp}>Cadastrar</button>
      </div>
    </>
  );
}

export default SignUpForm;

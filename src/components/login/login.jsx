import React, { useState } from "react";
import "./login.scss";
import Title from "../title/title";
import { FaLock, FaRegEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("ws://localhost:3000");  // URL do servidor WebSocket


export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleLogin = () => {
    if (email.trim() && password.trim()) {
      // Emite o evento 'login' com os dados de email e senha para o backend
      socket.emit("login", { email, password }, (response) => {
        // Resposta do servidor pode ser personalizada (por exemplo, uma mensagem de erro ou sucesso)
        console.log("Resposta do servidor:", response);

        if (response === "success") {
          // Se o login for bem-sucedido, navega para a página de redirecionamento
          navigate("/redirect", { state: { email } });
        } else {
          // Caso contrário, exibe um alerta com a mensagem de erro
          alert("E-mail ou senha inválidos");
        }
      });
    } else {
      alert("Por favor, preencha todos os campos.");
    }
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="libras-form">
          <FaLock />
          <input
            type="password"
            placeholder="Digite sua senha"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>

          <a className="link" onClick={newUser}>Não possui cadastro?</a>
          <button className='btn-login' onClick={handleLogin}>Entrar</button>
      </div>
    </>
  );
}

export default LoginForm;

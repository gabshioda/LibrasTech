import React, { useState } from "react";
import "./user-login.scss";
import Title from "../title/title";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

export function UserLogin() {
    const [nome, setNome] = useState('');
    const navigate = useNavigate();

    const handleCadastrar = () => {
       if (nome.trim()) {
      // Emite o evento 'nomeusuario' com o nome do usuário para o backend
      socket.emit("cadastrarUsuario", { nome }, (response) => {
        console.log("Resposta do servidor:", response);
      });

      // Redireciona para a página de redirecionamento com o nome do usuário
      navigate("/redirect-user", { state: { nome } });
    } else {
      alert("Por favor, insira seu nome.");
    }
    }

  return (
    <>
      <div className="user-login-wrapper">
        <Title>Identificação de usuário</Title>
        <div className="user-login-libras-form">
          <FaRegUser />
          <input
            type="text"
            placeholder="Digite seu nome"
            className="user-login-input-field"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
          <button size="large" className='user-login-btn' onClick={handleCadastrar}>Cadastrar</button>
      </div>
    </>
  );
}

export default UserLogin;

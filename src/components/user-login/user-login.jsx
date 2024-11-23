import React, { useState } from "react";
import "./user-login.scss";
import Title from "../title/title";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function UserLogin() {
  const [nome, setNome] = useState("");
  const navigate = useNavigate();

  const handleCadastrar = async () => {
    if (nome.trim()) {
      try {
        const response = await fetch(
          "http://localhost:8080/usuarios/usuarioEmFila",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              nome: nome.trim(),
              buscandoAtendimento: "true",
            }),
          }
        );

         if (response.status !== 200) {
           throw new Error(
            `Erro na resposta do servidor: ${response.statusText}`
          );
       }

        const textResponse = await response.text(); // Primeiro, obtenha a resposta como texto
        console.log("Resposta bruta do servidor:", textResponse);

        const responseData = JSON.parse(textResponse); // Depois, tente parsear como JSON
        console.log("Resposta JSON do servidor:", responseData);

        // Redireciona para a página de redirecionamento com o nome do usuário
        navigate("/redirect-user", { state: { nome } });
      } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        alert("Erro ao cadastrar usuário. Por favor, tente novamente.");
      }
    } else {
      alert("Por favor, insira seu nome.");
    }
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
            className="user-login-input-field"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <button
          size="large"
          className="user-login-btn"
          onClick={handleCadastrar}
        >
          Cadastrar
        </button>
      </div>
    </>
  );
}

export default UserLogin;

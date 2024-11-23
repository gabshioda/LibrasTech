import React, { useState } from "react";
import "./login.scss";
import Title from "../title/title";
import { FaLock, FaRegEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email.trim() && password.trim()) {
      try {
        const response = await fetch(
          "http://localhost:8080/voluntarios/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded", // Tipo de conteúdo como x-www-form-urlencoded
            },
            body: new URLSearchParams({
              email: email.trim(), // Mapeia o campo 'email'
              senha: password.trim(), // Mapeia o campo 'senha'
            }),
          }
        );

        if (response.status === 404) {
          // Se o status for 404, o e-mail não está cadastrado
          alert("E-mail não cadastrado.");
        } else if (response.status === 500) {
          // Se o status for 500, usuário ou senha incorretos
          alert("Usuário ou senha incorretos.");
        } else if (response.status === 200) {
          // Se o status for 200 (OK), armazena o ID do voluntário e navega para a próxima página
          const voluntarioId = await response.text(); // Captura o ID do voluntário
          console.log("ID do voluntário:", voluntarioId);

          // Opcional: Armazenar no localStorage, contexto ou estado global
          localStorage.setItem("voluntarioId", voluntarioId);

          // Redirecionar para a próxima página
          navigate("/redirect", { state: { email, voluntarioId } });
        } else {
          throw new Error(`Erro inesperado: ${response.statusText}`);
        }
      } catch (error) {
        console.error("Erro ao realizar o login:", error);
        alert("Erro ao realizar o login. Por favor, tente novamente.");
      }
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

        <a className="link" onClick={newUser}>
          Não possui cadastro?
        </a>
        <button className="btn-login" onClick={handleLogin}>
          Entrar
        </button>
      </div>
    </>
  );
}

export default LoginForm;

import React, { useState } from "react";
import "./signup.scss";
import Title from "../title/title";
import { FaLock, FaRegEnvelope, FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (name.trim() && email.trim() && password.trim()) {
      try {
        const response = await fetch("/voluntarios/cadastro", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Define o formato como JSON
          },
          body: JSON.stringify({
            nome: name.trim(), // Mapeia os campos conforme o payload esperado
            email: email.trim(),
            senha: password.trim(),
            disponivel: false,
          }),
        });

        if (response.status !== 200) {
          throw new Error(
            `Erro na resposta do servidor: ${response.statusText}`
          );
        }

        const responseData = await response.json();
        console.log("Resposta do servidor:", responseData);

        // Se o cadastro for bem-sucedido (com base em response.ok), navega para a página de login
        navigate("/login");
      } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        alert("Erro ao cadastrar usuário. Por favor, tente novamente.");
      }
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

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
        <button size="large" className="btn-signup" onClick={handleSignUp}>
          Cadastrar
        </button>
      </div>
    </>
  );
}

export default SignUpForm;

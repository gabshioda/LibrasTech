import React, { useEffect } from "react";
import Title from "../title/title";
import './redirect-user.scss'
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";

const socket = io("http://localhost:3000")

export function RedirectUser() {
 
  const location = useLocation();
  const nome = location.state?.nome; // Acessa o nome do usuário passado via state

  useEffect(() => {
    if (nome) {
      // Escuta o evento 'chamadaPronta' do backend para redirecionar o usuário
      socket.on("chamadaPronta", () => {
        setTimeout(() => {
          window.location.href = "/chamada"; // Ajuste para o URL de destino correto
        }, 2000);
      });
    }

    // Limpeza do listener quando o componente desmonta
    return () => {
      socket.off("chamadaPronta");
    };
  }, [nome]);

  return (
    <div className="redirect-user-align">
      <Title>Em breve você será redirecionado para uma chamada</Title>
    </div>
  )
}

export default RedirectUser

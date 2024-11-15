import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Title from "../title/title";
import './redirect.scss'

const socket = io("ws://localhost:3001"); 

export function Redirect() {

  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    // Escutando o status de disponibilidade do servidor, caso o servidor envie esse tipo de evento
    socket.on("availabilityStatus", (status) => {
      setIsAvailable(status);
    });

    // Limpeza ao sair do componente (remover o ouvinte)
    return () => {
      socket.off("availabilityStatus");
    };
  }, []);

  // Função para alternar a disponibilidade
  const toggleAvailability = () => {
    // Emitir o evento WebSocket com o novo estado de disponibilidade
    const newStatus = !isAvailable; // Inverte o estado de disponibilidade

    socket.emit("toggleAvailability", newStatus, (response) => {
      // O servidor pode responder com o status atualizado ou outra mensagem
      console.log("Resposta do servidor:", response);
      if (response === "success") {
        // Atualiza o estado local para refletir o novo status
        setIsAvailable(newStatus);
      } else {
        alert("Erro ao atualizar status. Tente novamente.");
      }
    });
  };

  return (
    <div className="redirect-align">
      <Title>Em breve você será redirecionado para uma chamada</Title>
      <button className="redirect-button" size="large" onClick={toggleAvailability}>{isAvailable ? 'Não estou disponivel' : 'Estou disponível'}</button>
    </div>
  )
}

export default Redirect

import React, { useEffect } from "react";
import Title from "../title/title";
import "./redirect-user.scss";
import { useNavigate } from "react-router-dom"; // Importando o hook de navegação

export function RedirectUser() {
  const navigate = useNavigate(); // Usando o hook de navegação do React Router

  useEffect(() => {
    // Função que verifica a disponibilidade do voluntário a cada 3 segundos
    const checkAvailableVolunteer = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/voluntarios/voluntariosDisponiveis"
        );

        if (response.status === 200) {
          const responseData = await response.json(); // Usando .json() ao invés de .text()

          if (responseData) {
            // Se a resposta contiver dados, processa o CallResponseDTO
            const { id, url } = responseData;

            // // Chama o endpoint para atualizar a disponibilidade do voluntário
            // await fetch("http://localhost:8080/voluntarios/voluntarioEmFila", {
            //   method: "POST",
            //   headers: {
            //     "Content-Type": "application/x-www-form-urlencoded",
            //   },
            //   body: new URLSearchParams({
            //     id: id.toString(), // ID do voluntário
            //     disponivel: "false", // Define o voluntário como não disponível
            //   }),
            // });

            // Redireciona o usuário para a URL recebida
            if (url) {
              window.open(url, "_blank"); // Abre a URL em uma nova aba
            }
          }
        } else {
          console.error(
            "Erro ao verificar voluntários disponíveis",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Erro ao verificar voluntários disponíveis:", error);
      }
    };

    // Chama a função inicialmente e a cada 3 segundos
    checkAvailableVolunteer();
    const intervalId = setInterval(checkAvailableVolunteer, 3000);

    // Limpeza do intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, []); // O array vazio faz com que o efeito seja executado apenas uma vez, quando o componente é montado

  return (
    <div className="redirect-user-align">
      <Title>Em breve você será redirecionado para uma chamada</Title>
    </div>
  );
}

export default RedirectUser;

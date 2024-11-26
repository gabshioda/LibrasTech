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
          const responseData = await response.json();

          if (responseData) {
            const { id, url } = responseData;

            if (url) {
              window.open(url, "_blank");
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

    checkAvailableVolunteer();
    const intervalId = setInterval(checkAvailableVolunteer, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="redirect-user-align">
      <Title>Em breve você será redirecionado para uma chamada</Title>
    </div>
  );
}

export default RedirectUser;

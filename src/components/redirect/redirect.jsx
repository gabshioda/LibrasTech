import React, { useState, useEffect } from "react";
import Title from "../title/title";
import "./redirect.scss";

const RedirectPage = () => {
  const [isAvailable, setIsAvailable] = useState(false); // Inicialmente não disponível
  const [loading, setLoading] = useState(true);
  const [redirectUrl, setRedirectUrl] = useState(""); // Variável para armazenar a URL de redirecionamento

  // Função para verificar a disponibilidade do voluntário a cada 3 segundos
  const checkAvailability = async () => {
    try {
      const voluntarioId = localStorage.getItem("voluntarioId"); // Recupera o ID do voluntário do localStorage
      if (!voluntarioId) {
        alert("ID do voluntário não encontrado. Faça login novamente.");
        return;
      }

      const response = await fetch(
        `http://localhost:8080/voluntarios/voluntariosDisponivel/${voluntarioId}`
      );

      if (response.status === 200) {
        const data = await response.json();
        setIsAvailable(data.isAvailable); // Atualiza o estado de disponibilidade
        if (data.url) {
          setRedirectUrl(data.url); // Armazena a URL de redirecionamento
        }
      } else {
        console.error("Erro ao verificar a disponibilidade do voluntário.");
      }
    } catch (error) {
      console.error("Erro ao verificar a disponibilidade:", error);
      alert("Erro ao verificar a disponibilidade. Por favor, tente novamente.");
    } finally {
      setLoading(false); // Finaliza o estado de carregamento
    }
  };

  useEffect(() => {
    // Chama a função inicialmente e a cada 3 segundos
    checkAvailability();
    const intervalId = setInterval(checkAvailability, 3000);

    // Limpeza do intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, []); // O array vazio faz com que o efeito seja executado apenas uma vez, quando o componente é montado

  // Função para alternar a disponibilidade e redirecionar o voluntário
  const toggleAvailability = async () => {
    try {
      const voluntarioId = localStorage.getItem("voluntarioId"); // Recupera o ID do voluntário do localStorage
      if (!voluntarioId) {
        alert("ID do voluntário não encontrado. Faça login novamente.");
        return;
      }

      // Define a disponibilidade como o estado invertido
      const disponivel = !isAvailable;

      const response = await fetch(
        "http://localhost:8080/voluntarios/voluntarioEmFila",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded", // Tipo de conteúdo
          },
          body: new URLSearchParams({
            id: voluntarioId, // ID do voluntário
            disponivel: disponivel.toString(), // Disponível como string (true ou false)
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Erro no servidor: ${response.statusText}`);
      }

      // Atualiza o estado local para refletir o novo status
      setIsAvailable(disponivel);

      // Busca a URL de redirecionamento

      const callResponse = await response.json();
      if (callResponse && callResponse.url) {
        const { id, url } = callResponse;
        setRedirectUrl(url); // Armazena a URL de redirecionamento
        if (url) {
          window.open(url, "_blank"); // Abre a URL em uma nova aba
        }
      }
    } catch (error) {
      console.error("Erro ao atualizar a disponibilidade:", error);
      alert("Erro ao atualizar a disponibilidade. Por favor, tente novamente.");
    }
  };

  return (
    <div className="redirect-align">
      <Title>Em breve você será redirecionado para uma chamada</Title>
      <button
        className={`redirect-button ${
          isAvailable ? "available" : "unavailable"
        }`}
        size="large"
        onClick={toggleAvailability}
        disabled={loading} // Desabilita o botão enquanto está carregando
      >
        {loading
          ? "Carregando..."
          : isAvailable
          ? "Não estou disponível"
          : "Estou disponível"}
      </button>
    </div>
  );
};

export default RedirectPage;

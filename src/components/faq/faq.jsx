import React, { useState } from "react";
import "./faq.scss";

const FAQ = () => {
  const faqs = [
    {
      question: "Como funciona a plataforma?",
      answer:
        " Basta criar uma conta, agendar uma videoconferência com um intérprete e começar a navegar com suporte em Libras..",
    },
    {
      question: "A plataforma é realmente gratuita?",
      answer: "Sim, nosso serviço é 100% gratuito e aberto a todos.",
    },
    {
      question: "Como posso ser um intérprete voluntário?",
      answer:
        "Você pode se inscrever como voluntário na nossa plataforma. Após um breve treinamento, estará pronto para ajudar!",
    },
  ];

  // Estado para controlar quais FAQs estão abertos
  const [openIndex, setOpenIndex] = useState(null);

  // Função para alternar a visibilidade da resposta
  const toggleAnswer = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Se já estiver aberto, fecha
    } else {
      setOpenIndex(index); // Caso contrário, abre
    }
  };

  return (
    <>
      <img src="/public/librastechfundo.png" width={250} height={250} alt="Logo LibrasTech" />
      <h2>Perguntas Frequentes</h2>
      <div className="faq">
        <ul className="faq-list">
          {faqs.map((faq, index) => (
            <li key={index}>
              <div className="faq-item">
                <button
                  onClick={() => toggleAnswer(index)}
                  className="faq-question"
                >
                  {faq.question}
                </button>
                {openIndex === index && (
                  <p className="faq-answer">{faq.answer}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FAQ;

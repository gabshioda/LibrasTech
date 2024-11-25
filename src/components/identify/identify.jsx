import React from "react";
import "./identify.scss";
import Title from "../title/title";
import { useNavigate } from "react-router-dom";

export function Identify() {
  const navigate = useNavigate();

  const redirectUser = () => {
    navigate("/login");
  };

  const userLogin = () => {
    navigate("/user-login");
  };

  const faq = () => {
    navigate("/faq");
  };

  return (
    <>
      <div>
        <img
          src="/public/librastechfundo.png"
          width={250}
          height={250}
          alt="Logo LibrasTech"
        />
        <Title>Identifique-se</Title>
        <div className="identify-btn">
          <button size="small" onClick={userLogin} className="btn-style">
            Usuário
          </button>
          <button onClick={redirectUser} className="btn-style">
            Voluntário
          </button>
        </div>
      </div>
      <div className="faq-div">
      <a className="identify-faq" onClick={faq}>
        Quem somos?
      </a>
      </div>
    </>
  );
}

export default Identify;

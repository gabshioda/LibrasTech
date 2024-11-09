import React from "react";
import Title from "../title/title";
import Button from "../button/button";
import './redirect.scss'

export function Redirect() {
  return (
    <div className="redirect-align">
      <Title>Em breve você será redirecionado para uma chamada</Title>
      <Button size="large">Estou disponível</Button>
    </div>
  )
}

export default Redirect

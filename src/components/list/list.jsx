import React from "react";
import './list.scss'
import Title from "../title/title";

export function List() {
    const atendentes = [
        "Gabriel",
        "Washington Silva",
        "Pedro Ricucci",
        "Pedro Vinicius",
        "Gustavo Viegas",
        "André Cataldi",
        "Marcus Zuppo"
    ]

  return (
   <div>
    <Title>Atendente</Title>
    <ul>
        {atendentes.map((nome, index) => 
        <li key={index} className="list-name">{nome}</li>
        )}
    </ul>
   </div>
  );
}

export default List;

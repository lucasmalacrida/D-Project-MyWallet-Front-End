import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const baseUrl = process.env.REACT_APP_DATABASE_URL;

export default function TransactionsPage() {
  const { tipo } = useParams();
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({ amount: "", name: "" });

  function handleNewTransaction() {
    // Pré-Validações
    if (!formFields.amount || !formFields.name) { return alert("Todos os campos são obrigatórios!"); }

    // Requisição
    const body = {
      amount: Number(formFields.amount),
      name: formFields.name
    };
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).token}`
      }
    };
    axios.post(`${baseUrl}/nova-transacao/${tipo}`, body, config)
      .then(res => {
        alert("Sucesso! Transação Realizada!");
        navigate('/home');
      })
      .catch(err => alert(err.response.request.responseText));
  }

  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={e => { e.preventDefault(); handleNewTransaction(); }}>
        <input
          placeholder="Valor"
          type="number"
          value={formFields.amount}
          onChange={e => {
            if (e.key === '-') { e.preventDefault() }
            setFormFields({ ...formFields, amount: e.target.value })
          }}
        />
        <input
          placeholder="Descrição"
          type="text"
          value={formFields.name}
          onChange={e => setFormFields({ ...formFields, name: e.target.value })}
        />
        <button type="submit">Salvar {tipo}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`;
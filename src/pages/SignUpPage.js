import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  function handleSignUp() {
    // Pré-Validações
    if (!formFields.name || !formFields.email || !formFields.password || !formFields.confirmPassword) { return alert("Todos os campos são obrigatórios!"); }
    if (formFields.confirmPassword !== formFields.password) { return alert("As senhas digitadas não coincidem!"); }

    // Requisição
    const { name, email, password } = { ...formFields };
    const body = { name, email, password };
    axios.post("http://localhost:5000/cadastro", body)
      .then(res => { alert("Sucesso! Conta Cadastrada!"); navigate('/') })
      .catch(err => alert(err.response.request.responseText))
  }

  return (
    <SingUpContainer>
      <form onSubmit={e => { e.preventDefault(); handleSignUp(); }}>
        <MyWalletLogo />
        <input
          placeholder="Nome"
          type="text"
          value={formFields.name}
          onChange={e => setFormFields({ ...formFields, name: e.target.value })}
        />
        <input
          placeholder="E-mail"
          type="email"
          value={formFields.email}
          onChange={e => setFormFields({ ...formFields, email: e.target.value })}
        />
        <input
          placeholder="Senha"
          type="password"
          value={formFields.password}
          onChange={e => setFormFields({ ...formFields, password: e.target.value })}
        />
        <input
          placeholder="Confirme a senha"
          type="password"
          value={formFields.confirmPassword}
          onChange={e => setFormFields({ ...formFields, confirmPassword: e.target.value })}
        />
        <button type="submit">Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

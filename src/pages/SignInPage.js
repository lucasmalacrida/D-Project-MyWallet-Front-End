import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";

const baseUrl = process.env.REACT_APP_API_URL;

export default function SignInPage() {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({ email: "", password: "" });

  function handleSignIn() {
    if (!formFields.email || !formFields.password) { return alert("Todos os campos são obrigatórios!"); }

    const { email, password } = { ...formFields };
    const body = { email, password };
    axios.post(`${baseUrl}/`, body)
      .then(res => {
        alert("LogIn Realizado!");
        localStorage.setItem('userData', JSON.stringify(res.data));
        navigate('/home');
      })
      .catch(err => alert(err.response.request.responseText));
  }

  return (
    <SingInContainer>
      <form onSubmit={e => { e.preventDefault(); handleSignIn(); }}>
        <MyWalletLogo />
        <input
          data-test="email"
          placeholder="E-mail"
          type="email"
          value={formFields.email}
          onChange={e => setFormFields({ ...formFields, email: e.target.value })}
        />
        <input
          data-test="password"
          placeholder="Senha"
          type="password"
          value={formFields.password}
          onChange={e => setFormFields({ ...formFields, password: e.target.value })}
        />
        <button data-test="sign-in-submit" type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
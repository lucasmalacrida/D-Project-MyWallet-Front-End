import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

const baseUrl = process.env.REACT_APP_DATABASE_URL;

const config = {
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).token}`
  }
};

export default function HomePage() {
  const navigate = useNavigate();
  const [homeData, setHomeData] = useState({ name: '', registries: [], cash: '' });

  useEffect(() => {
    axios.get(`${baseUrl}/home`, config)
      .then(res => {
        setHomeData(res.data);
      })
      .catch(err => alert(err.response.request.responseText));
  }, [])

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {homeData.name}</h1>
        <BiExit />
      </Header>

      <TransactionsContainer>
        <Transactions>
          {
            homeData.registries.length !== 0 ?
              homeData.registries.map((t, i) =>
                <ListItemContainer key={i}>
                  <div>
                    <span>{t.date}</span>
                    <strong>{t.name}</strong>
                  </div>
                  <Value color={t.type === "entrada" ? "positivo" : t.type === "saida" ? "negativo" : ""}>
                    {t.amount}
                  </Value>
                </ListItemContainer>
              )
              : <></>
          }
        </Transactions>

        <article>
          <strong>Saldo</strong>
          <Value color={homeData.cash > 0 ? "positivo" : "negativo"}>
            {homeData.cash}
          </Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={() => navigate("/nova-transacao/entrada")}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => navigate("/nova-transacao/saida")}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`;
const TransactionsContainer = styled.article`
  height: 0;
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`;
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`;
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`;
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`;
const Transactions = styled.ul`
  overflow-y: scroll;
`;
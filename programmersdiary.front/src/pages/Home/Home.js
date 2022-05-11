import React, { useState, useContext, useEffect } from "react";
import Menu from "../../components/Menu/Menu";
import Wrapper from "../../components/Wrapper/Wrapper";
import { BlackWrapper } from "./styles";
import Header from "../../components/Header/Header";
import Modal from "../../components/Modal/Modal";
import { ManipulateContext } from "../../context/ManipulaItem/ManipulateItem";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { codeLanguages, possuiAtributos } from "../../utils/utils";
import crud from "../../utils/crud.js";
import prettier from "prettier";
import { pluginsLista } from "../../utils/utils";

const Home = () => {
  const { manipulableItem, addManipulableItem } = useContext(ManipulateContext);
  const [itemCard, setItemCard] = useState({});
  const [textCode, setTextCode] = useState("");
  const [modalActive, setModalActive] = useState(false);
  const [linguagens, setLinguagens] = useState([]);

  // defini no cabecalho a linguagem e monta o objeto card
  useEffect(() => {
    setItemCard(manipulableItem);
  }, [manipulableItem]);

  // retirando o comentario talvez resolva o problema do salvamento
  useEffect(() => {
    if (manipulableItem.codigo != textCode) manipulableItem.salvo = false;
  }, [textCode]);

  // faz um fetch para pegar todas as linguagens do banco de
  useEffect(() => {
    async function getAll() {
      let listaLinguagens = await crud.getAll("linguagem");
      setLinguagens(listaLinguagens);
    }
    getAll();
  }, []);

  // caso um card já existente seja aberto, seu codigo irá para o container de texto
  useEffect(() => {
    if (itemCard.id) setTextCode(itemCard.codigo);
    else setTextCode("");
  }, [itemCard]);
  return (
    <>
      <Wrapper>
        <BlackWrapper>
          <Header obj={itemCard} codigo={textCode}></Header>
          <CodeMirror
            value={textCode}
            height="64vh"
            width={"100%"}
            onChange={(value, viewUpdate) => {
              console.log("value:", value);
              setTextCode(value);
            }}
            extensions={[
              codeLanguages[
                itemCard.labelLinguagem ? itemCard.labelLinguagem : "js"
              ],
            ]}
            theme={oneDark}
          />
          <Modal
            setModalActive={setModalActive}
            modalActive={modalActive}
            ListaLinguagens={linguagens}
          ></Modal>
        </BlackWrapper>
        <Menu setModalActive={setModalActive} openCard={itemCard}></Menu>
      </Wrapper>
    </>
  );
};

export default Home;

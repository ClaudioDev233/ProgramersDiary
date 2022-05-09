import React, { useContext, useEffect, useState } from "react";
import { HeaderWrapper, Title, Save } from "./styles";
import { AiOutlineSave } from "react-icons/ai";
import { ManipulateContext } from "../../context/ManipulaItem/ManipulateItem";
import prettier from "prettier";
import Error from "../Error/Error";
import crud from "../../utils/crud";
import { pluginsLista, possuiAtributos } from "../../utils/utils";

/*
  o header vai ser responsavel por salvar o conteudo que está no contexto manipulado.
*/
const Header = ({ obj, codigo }) => {
  const { manipulableItem, addManipulableItem, allCards, addCards } =
    useContext(ManipulateContext);
  const [error, setErrors] = useState({ err: false });
  const [teste, setTeste] = useState(false);
  const [code, setCode] = useState(codigo);
  console.log(manipulableItem);

  useEffect(() => {
    let identificador;
    let cardIndice;
    if (manipulableItem.aberto === true && !error.err) {
      console.log("salvo");
      let funcaoTest = async () => {
        if (manipulableItem.id) {
          manipulableItem.codigo = codigo;
          crud.atualizar(manipulableItem.id, manipulableItem);
        } else {
          manipulableItem.codigo = codigo;
          identificador = await crud.inserir(manipulableItem);
          // sendo novo vai localizar o card
          cardIndice = allCards.findIndex((card) => card.id === "");
          allCards[cardIndice].id = identificador;
        }
        /*
          Vai forçar a renderização de todos os componentes que usam esse contexto, assim corrigindo
          o problema do assincrono
        */
        // try {
        addManipulableItem({
          ...manipulableItem,
          novo: false,
          salvo: true,
          id: identificador ? identificador : manipulableItem.id,
          codigo: code,
        });
        if (cardIndice >= 0) addCards(allCards);
      };
      funcaoTest();
    }
  }, [teste]);

  // vai verificar se ha erro no codigo digitado
  useEffect(() => {
    if (codigo) {
      try {
        console.log(`teste`);
        setCode(
          prettier.format(codigo, {
            parser: manipulableItem.linguagem.nome,
            plugins: pluginsLista,
            jsxSingleQuote: true,
            bracketSameLine: true,
          })
        );
        setErrors({ err: false });
      } catch (err) {
        console.log(err);
        setErrors({ err: err });
      }
    }
  }, [codigo]);

  /*Alem de salvar, quando o card for alterado va devolver o codigo ja formatado para home*/
  function save() {
    // try {
    if (manipulableItem.nome) {
      // gatilho para invocar o useEffect de cima(é ele quem salva no banco de dados)
      setTeste((value) => !value);
    } else {
      setErrors({ err: "Crie um card antes de começar a digitar" });
    }
  }
  return (
    <>
      <HeaderWrapper>
        <Title>
          {error.err ? (
            <Error texto={error.err} />
          ) : obj.linguagem ? (
            obj.linguagem.labelLinguagem
          ) : null}
        </Title>
        <Save onClick={save}>
          <AiOutlineSave size="30px" />
        </Save>
      </HeaderWrapper>
    </>
  );
};

export default Header;

import React, { useContext, useEffect, useState } from "react";
import { HeaderWrapper, Title, Save } from "./styles";
import { AiOutlineSave } from "react-icons/ai";
import { ManipulateContext } from "../../context/ManipulaItem/ManipulateItem";
import prettier from "prettier";
import Error from "../Error/Error";
import crud from "../../utils/crud";
import { pluginsLista, possuiAtributos } from "../../utils/utils";
import achaId from "../../utils/achaCard";
/*
  o header vai ser responsavel por salvar o conteudo que está no contexto manipulado.
*/
const Header = ({ obj, codigo }) => {
  const { manipulableItem, addManipulableItem, allCards, addCards } =
    useContext(ManipulateContext);
  const [error, setErrors] = useState({});
  const [teste, setTeste] = useState(false);

  useEffect(() => {
    let identificador;
    let cardIndice;
    if (manipulableItem.aberto === true) {
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
        addManipulableItem({
          ...manipulableItem,
          salvo: true,
          novo: false,
          id: identificador ? identificador : manipulableItem.id,
        });
        if (cardIndice >= 0) addCards(allCards);
      };
      funcaoTest();
    }
  }, [teste]);

  /*Alem de salvar, quando o card for alterado va devolver o codigo ja formatado para home*/
  function save() {
    try {
      if (manipulableItem.nome) {
        const clearCode = prettier.format(codigo, {
          parser: obj.linguagem.nome,
          plugins: pluginsLista,
          jsxSingleQuote: true,
          bracketSameLine: true,
        });
        // gatilho para invocar o useEffect de cima(é ele quem salva no banco de dados)
        setTeste((value) => !value);
        // isso aqui é feito para poder mandar o codigo formatado para a home
        addManipulableItem({ ...manipulableItem, codigo: clearCode });
        setErrors({ err: false });
      } else {
        setErrors({ err: "Crie um card antes de começar a digitar" });
      }
    } catch (err) {
      setErrors({ err: err });
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

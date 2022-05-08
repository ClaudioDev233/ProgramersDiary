import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import { WrapperGlobal } from "./styles";
import ManipulateProvider from "./context/ManipulaItem/ManipulateItem";
import NewItemProvider from "./context/NewItem/NewItem";
import OldItemProvider from "./context/OldItem/OldItem";

function App() {
  return (
    <>
      <ManipulateProvider>
        <NewItemProvider>
          <OldItemProvider>
            <WrapperGlobal>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </WrapperGlobal>
          </OldItemProvider>
        </NewItemProvider>
      </ManipulateProvider>
    </>
  );
}

export default App;

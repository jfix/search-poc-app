import React from "react";
import { useHistory } from "react-router-dom";

import SearchBar from '../../components/SearchBar/SearchBar';

import "./Home.css";
import "../../pages/Search/Search.css";

export default function Home() {
  const history = useHistory();
  const navigateToSearchPage = (q) => {
    if (!q || q === '') {
      q = '*'
    }
    history.push('/search?q=' + q);
  }

  return (
    <main className="main main--home">
      <div className="row home-search">
        <img className="logo" src="/images/oecd-logo-colour.svg" alt="Cognitive Search"></img>
        <p className="poweredby lead">Proof of Concept using Azure Cognitive Search</p>
        <SearchBar postSearchHandler={navigateToSearchPage}></SearchBar>
      </div>
    </main>
  );
};

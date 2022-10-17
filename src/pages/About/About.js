import React from "react";

import "./About.css";

export default function About() {

  const PrettyPrintJson = (data) => {
    // (destructured) data could be a prop for example
    return (<div><pre>{ JSON.stringify(data, null, 2) }</pre></div>);
  }
  
  return (
    <main className="main main--home">
      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <h1>About this proof of concept</h1>
            <p className="lead">Learn what this Proof of Concept using Azure Cognitive Search is supposed to show.</p>

            <h2>Goals</h2>
            
            <p>Show that Azure Cognitive Search has the necessary features we require for our future search engine.</p>
            <ul>
              <li>Index all sorts of documents (different websites, different types of documents, ...)</li>
              <li>Show indexation is immediate for single or few documents</li>
              <li>Prove we can have the usual expected features for search, such as Autosuggest, Facets and the like</li>
              <li>It should be fast</li>
            </ul>
            
            <h2>The moving parts</h2>

            <p>Several parts are necessary to build a search engine using Azure Cognitive Search</p>
            <ul>
              <li>The actual contents, these are <strong>JSON documents</strong> that need to be generated for each web content we want to add to the search engine index. They need to adhere to the same schema that we control.</li>
              <li><strong>Data storage</strong>, where the JSON documents are to be stored. This is a Azure blob storage area that needs to be set up and configured</li>
              <li><strong>An index</strong> which will hold the JSON documents in an efficient format that allows for quick access. It's a bit like the database of the search engine.</li>
              <li><strong>An indexer</strong> is the connector between the data storage and the index. It will read the documents once or regularly, on a schedule or when triggered, and add them to the index. If they already exist, they are updated, otherwise they are added.</li>
              <li>A <strong>user interface</strong>, or several, is needed to actually use the index and return results.</li>
            </ul>
            
            <h3>JSON documents</h3>

            <p>At this point, two sources have been integrated in the search engine:</p>
            <ol>
              <li>Publications; 31219 documents (via the Discovery Service, similar to iLibrary) - this represents most publications available on iLibrary, such as articles, books, workinpapers, podcasts, indicators, datasets, and summaries</li>
              <li>Official documents; 51199 documents (via an XML dump provided by DKI) - this covers official documents (without specification), agendas, and minutes of meetings, all are obviously unclassified</li>
            </ol>

            <p>For the purpose of this exercise, the following JSON schema has been put in place. The common fields are:</p>
            <ul>
              <li><strong>Domain</strong>, which indicates the provenance (think: "Publication", "Official document", "Legal instrument", "Event", ...)</li>
              <li><strong>Type</strong>: a subtype specific for each domain, such as "Book" or "Article" for the Publication domain, or "Meeting notes" or "Agenda" for Official documents.</li>
              <li><strong>Title</strong>, which can be either French or English (we have both, <code>title_en</code> and <code>title_fr</code>. Every item must have a title. For publications, I have concatenated a potential subtitle with the title.</li>
              <li><strong>Date</strong>, usually this will be the publication date or some other date of first coming into this world.</li>
              <li><strong>URL</strong>, this is another obligatory item because without an URL what use is the search result?</li>
              <li><strong>Language</strong>, can be more than one, only English and French are currently accepted within the context of the PoC</li>
              <li><strong>Description</strong>, again can be English or French. This gives some more meat to the index, otherwise the search index would only be able to search inside the titles for a user-submitted query.</li>
              <li><strong>Size</strong>, this field encompasses the quantity of an item, such as the number of pages of a publication or an Official document, or the length, in minutes, of a Podcast.</li>
              <li><strong>Image URL</strong> is a link to an image that can be displayed next to the search result. This makes sense for publications where we have usually a cover, but may not work for Official documents.</li>
            </ul>

            <p>JSON document for an Official Document:</p>
              {PrettyPrintJson(
                {
                  "id": "daf-ca-cg-rd-2008-6-en-6120",
                  "domain": "official document",
                  "type": "official document",
                  "title_en": "DAF/CA/CG/RD(2008)6 - Abstracts from the OECD publication \"Asia : Overview of Corporate Governance Frameworks in 2007\"",
                  "date": "2008-11-14T00:00:00.000+01:00Z",
                  "url": "https://one.oecd.org/document/DAF/CA/CG/RD(2008)6/en/pdf",
                  "languages": ["en"],
                  "description_en": "As background for the discussion on related party transactions in Asia. <br/><br/>The complete version is available in pdf format only.",
                  "size": "2 pages",
                  "image_url": "https://placekitten.com/340/460"
                })
              }

            <p>JSON document for an iLibrary publication:</p>
              {PrettyPrintJson(
                {
                  "id": "0ad89895-fr",
                  "domain": "publications",
                  "type": "book",
                  "title_fr": "Cadre d’action en matière de bonne gouvernance publique - Éléments fondamentaux pour le bon fonctionnement des administrations publiques",
                  "url": "https://doi.org/10.1787/0ad89895-fr",
                  "languages": ["fr"],
                  "size": "118 pages",
                  "date": "2021-12-21T00:00:00Z",
                  "description_fr": "<p>Face aux défis interdépendants de notre époque, il convient d’adopter, dans le domaine de la gouvernance publique, une démarche cohérente et pluridimensionnelle. Le <em>Cadre d’action de l’OCDE en matière de bonne gouvernance publique</em> offre à tous les niveaux d’administration un outil intégré de diagnostic, d’orientation et de comparaison qui a pour objectif d’améliorer la qualité de la gouvernance publique — objectif qui revêt une importance stratégique immédiate pour les pouvoirs publics, à l’heure où il leur faut gérer la crise liée au COVID-19 et préparer une reprise durable et inclusive. Ce Cadre d’action s’appuie sur les instruments juridiques adoptés par l’OCDE dans ce domaine, et sur les enseignements tirés depuis dix ans à la faveur des Examens de l’OCDE sur la gouvernance publique et d’autres examens nationaux ou sectoriels. La première partie de ce Cadre d’action évoque l’importance des valeurs fondamentales de la gouvernance et passe en revue les éléments catalyseurs d’une bonne gouvernance publique que les pouvoirs publics peuvent mettre en place pour réussir leurs réformes. La deuxième partie du Cadre d’action présente une vue d’ensemble des outils de gestion et des instruments d’action qui peuvent améliorer la qualité et l’impact de l’action publique aux différentes étapes de son cycle. Dans chaque chapitre, les responsables publics trouveront une liste de questions stratégiques sur lesquelles ils pourront s’appuyer pour évaluer les capacités institutionnelles et décisionnelles de leur administration dans des domaines essentiels de la gouvernance publique.</p>",
                  "subjects_en": [
                      "Governance",
                      "Development",
                      "Urban, Rural and Regional Development"
                  ],
                  "subjects_fr": [
                      "Gouvernance",
                      "Développement",
                      "Développement urbain, rural et régional"
                  ],
                  "image_url": "https://assets.oecdcode.org/covers/340/0ad89895-fr_0ad89895.jpg"
              }
              )}

            <h2>Limitations</h2>
            <p>As this is only a proof of concept, not everything has been implemented, for example:</p>
            <ul>
              <li>Only English and French are currently accepted (but should be really have others?)</li>
              <li>Official documents don't have subjects and seldom descriptions; Publications don't have countries</li>
              <li>Ordering of results is (apparently) ordering by adding to the index</li>
              <li>Only simple checkbox facets have been used, for dates a slider facet would be more appropriate and feasible</li>
              <li>The look and feel of the page is purposefully not similar to the final design (which final design?)</li>
            </ul>

            <h2>Further reading</h2>
            <p>The project lives here:</p>
            <ul>
              <li>The backend (index management, document generation) is here: <a href="http://github.com/oecd/search-poc/">http://github.com/oecd/search-poc/</a> </li>
              <li>The frontend application (where you currently are) lives currently here: <a href="http://github.com/jfix/search-poc-app/">http://github.com/jfix/search-poc-app/</a></li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

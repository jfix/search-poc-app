import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import dayjs from 'dayjs';

import "./Details.css";

export default function Details() {

  let { id } = useParams();
  const [document, setDocument] = useState({});
  const [selectedTab, setTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // console.log(id);
    axios.get('/api/lookup?id=' + id)
      .then(response => {
        const doc = response.data.document;
        setDocument(doc);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });

  }, [id]);

  // View default is loading with no active tab
  let detailsBody = (<CircularProgress />),
      rawStyle    = "nav-link";

  if (!isLoading && document) {
    // View result
    if (selectedTab === 0) {
      const description = document.description?.en
      const subjects = document.subjects_en
      detailsBody = (
        <div className="card-body">
          <h5 className="card-title">{document.title}</h5>
          <img className="image2" src={document.thumbnail} alt="Book cover"></img>
          <p className="card-text">Author: {document.authors?.join('; ')}</p>
          <p className="card-text">Published by {document.publishers} on {dayjs(document.publicationDate).format('d MMMM YYYY')}</p>
          <p className="card-text">DOI: <a href={document.url} rel="noreferrer" target="_blank">{document.url}</a></p>
          <p className="card-text">Abstract: {description}</p>
          <p className="card-text">Subjects: {subjects.join(', ')}</p>
          
        </div>
      );
    }

    // View raw data
    else {
      rawStyle += " active";
      detailsBody = (
        <div className="card-body text-start">
          <pre><code>
            {JSON.stringify(document, null, 2)}
          </code></pre>
        </div>
      );
    }
  }

  return (
    <main className="main main--details container fluid">
      <div className="card text-center result-container">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item"><button className={rawStyle} onClick={() => setTab(1)}>Raw Data</button></li>
              {/* <li className="nav-item"><button className={resultStyle} onClick={() => setTab(0)}>Result</button></li> */}
          </ul>
        </div>
        {detailsBody}
      </div>
    </main>
  );
}

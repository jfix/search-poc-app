import React from 'react';

import './Result.css';

export default function Result(props) {
    return(
    <div className="card result">
        <a href={`/details/${props.document.id}`}>
            <img className="card-img-top" src={props.document.thumbnail} alt={props.document.title}></img>
            <div className="card-body">
                <span className="title-style">{props.document.title}</span>
            </div>
        </a>
    </div>
    );
}

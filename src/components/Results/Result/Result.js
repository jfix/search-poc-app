import React from 'react';

import './Result.css';
import dayjs from 'dayjs';

export default function Result(props) {
    var description = props.document.description_en || props.document.description_fr;
    description = description ? description.replace(/(<([^>]+)>)/ig, '') : ''
    var language = props.document.languages[0];
    language = (language === 'en') ? 'English' : 'French'
    var size = props.document.size;
    size = (size === '1 pages') ? 'One page' : size;
    var imageUrl = props.document.image_url.replace('https:https://', 'https://')
    imageUrl = (imageUrl === 'https:') ? `https://via.placeholder.com/340x460?text=${props.document.type}` : imageUrl
    return(
        <div className="card p-0 result mb-12" style={{"width": "100%", "minWidth": "100%"}}>
            <div className="row">
                <div className="col-md-2">
                    <a href={`/details/${props.document.id}`} title="Click for details">
                        <img src={imageUrl} alt={props.document.title_en} className="result-img img-fluid rounded-start"></img>
                    </a>
                </div>
                <div className="col-md-10">
                <div className="card-body">
                    <h5 className="card-title">{props.document.title_en || props.document.title_fr}</h5>
                    <p className="text-truncate card-text">{description}</p>
                    <p className="card-text"><a href={props.document.url}>{props.document.url}</a></p>
                    <div className='row'>
                        <div className='col-md-2'>
                            <p className="card-text"><small className="text-capitalize text-muted">{props.document.type}</small></p>
                        </div>
                        <div className='col-md-2'>
                            <p className="card-text"><small className="text-muted">{dayjs(props.document.date).format('D MMM YYYY')}</small></p>
                        </div>
                        <div className='col-md-2'>
                            <p className="card-text"><small className="text-muted">{language}</small></p>
                        </div>
                        <div className='col-md-2'>
                            <p className="card-text"><small className="text-muted">{size}</small></p>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

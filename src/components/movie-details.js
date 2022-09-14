import React, { useState } from 'react';
// import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'


function MovieDetails(props) {

  const [highlighted, setHighlighted] = useState(-1)
  

  const mov = props.movie;

  const highlightRate = high => e => {
    setHighlighted(high);
  }

  const rateClicked = rate => e => {
    fetch(`http://127.0.0.1:8000/api/movies/${mov.id}/rate_movie/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 32912ccf989e862597a9e9fff3db1d93f5af2529'
      },
      body: JSON.stringify({ stars: rate + 1 }),
    })
      .then( () => getDetails())
      // TODO: display error message
      .catch(error => console.log(error))
  }

  const getDetails = () => {
    fetch(`http://127.0.0.1:8000/api/movies/${mov.id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 32912ccf989e862597a9e9fff3db1d93f5af2529'
      }
    })
      .then(resp => resp.json())
      .then(resp => props.updateMovie(resp))
      // TODO: display error message
      .catch(error => console.log(error))
  }

  return (
    <React.Fragment>
      {mov ? (
        <div>
          <h1>{mov.title}</h1>
          <p>{mov.description}</p>
          <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 0 ? 'orange' : ''} />
          <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 1 ? 'orange' : ''} />
          <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 2 ? 'orange' : ''} />
          <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 3 ? 'orange' : ''} />
          <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 4 ? 'orange' : ''} />
          ({mov.no_of_ratings})
          <div className='rate-container'>
            <h2>Rate it</h2>
            {[...Array(5)].map((e, i) => {
              return <FontAwesomeIcon key={i} icon={faStar} className={highlighted > i - 1 ? 'purple' : ''}
                onMouseEnter={highlightRate(i)}
                onMouseLeave={highlightRate(-1)}
                onClick={rateClicked(i)}
              />
            })

            }
          </div>
        </div>
      ) : null}

    </React.Fragment>
  )
}

export default MovieDetails;
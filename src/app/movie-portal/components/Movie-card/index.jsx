import React, { memo } from "react";
import PropTypes from "prop-types";
import { Badge, Card, Col } from "react-bootstrap";
import { useAuthContext } from '../../../utils/auth.context';

const MovieCard = memo(({ movie, editMovie, deleteMovie }) => {

    const { role } = useAuthContext();
    const {
        _id,
        name,
        director,
        popularity,
        imdb_score,
        genre
    } = movie;

    const renderBadges = () => {
        return genre.map((cat, index) => <Badge key={index} variant="secondary float-right" className="mr-2">{cat}</Badge>)
    }

    const renderButtons = (movie) => {
        return (
            <>
                <i className="fa fa-edit mr-2" onClick={() => editMovie(movie)}></i>
                <i className="fa fa-trash mr-2" onClick={() => deleteMovie(movie)}></i>
            </>
        )
    }
    return (
        <Col
            xs={12}
            md={12}
            sm={12}
            className="movieCard"
            key={_id}
        >
            <Card
                className="mb-2 p-2"
            >
                <Card.Body>
                    <Card.Title>
                        <span className="fa fa-film" style={{ marginRight: "10px" }}></span>
                        {name}
                        <span className="float-right">{imdb_score} <span className="fa fa-star checked"></span></span>
                    </Card.Title>
                    <Card.Text>
                        <i className="fa fa-video-camera mr-2" aria-hidden="true"></i><b>Director: </b>{director}
                        <i className="fa fa-users d-block mr-2 mt-2" aria-hidden="true"> {' '}{popularity}%</i>
                        {renderBadges()}
                    </Card.Text>
                    {role === 'admin' ? renderButtons(movie) : ''}
                </Card.Body>
            </Card>
        </Col >
    )
})

MovieCard.prototype = {
    movie: PropTypes.shape({
        _id: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        popularity: PropTypes.string.isRequired,
        imdb_score: PropTypes.number.isRequired,
        genre: PropTypes.array.isRequired,
    })
};
export default MovieCard;

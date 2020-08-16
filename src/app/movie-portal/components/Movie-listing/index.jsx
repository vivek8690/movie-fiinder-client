import React from "react";
import PropTypes from "prop-types";
import MovieCard from "../Movie-card";
import { Row, Container, Col } from "react-bootstrap";

function MovieListing({ movies, editMovie, deleteMovie }) {
  let moviesList = movies.map(movie =>
    <MovieCard key={movie._id} movie={movie}
      editMovie={editMovie} deleteMovie={deleteMovie} />
  );

  return (
    <Container>
      <Row>{moviesList.length > 0 ? moviesList : <Col>No Data found</Col>}</Row>
    </Container>
  );
}

MovieListing.defaultProps = {};
MovieListing.propTypes = {
  movies: PropTypes.array.isRequired
};
export default MovieListing;

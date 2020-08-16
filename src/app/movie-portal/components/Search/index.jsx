import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Select from 'react-select';
import PropTypes from "prop-types";

import SearchBar from "./searchBar";
import { useAuthContext } from '../../../utils/auth.context';


const options = [
  { value: 'imdb_score', label: 'imdb_score' },
  { value: 'popularity', label: 'popularity' },
  { value: 'director', label: 'director' },
  { value: 'name', label: 'name' },
];

function SearchArea({ onHandleChange, newMovie, categories }) {

  const { role } = useAuthContext();
  const [query, setQuery] = useState({
    search: '',
    sortBy: options[0],
    genre: []
  })

  useEffect(() => {
    onHandleChange(query)
  }, [query])

  return (
    <Container className="search-area">
      <Row>
        <Col>
          <SearchBar
            placeholder="Search movie by name / director"
            name="search"
            type="text"
            onChange={(evt) => setQuery({ ...query, search: evt.target.value })}
          />
        </Col>
        <Col>
          <Select
            value={[query.sortBy]}
            onChange={(obj) => setQuery({ ...query, sortBy: obj })}
            options={options}
            placeholder='sort by'
          />
        </Col>
        <Col>
          <Select
            value={query.genre}
            onChange={(obj) => setQuery({ ...query, genre: obj })}
            isMulti
            options={categories}
            placeholder='select categories'
          />
        </Col>
        {role === 'admin' ? <Col>
          <Button className="btn btn-secondary"
            onClick={() => newMovie(true)}>Add Movie</Button>
        </Col> : ''}
      </Row>
    </Container>
  );
}

SearchArea.propTypes = {
  onHandleChange: PropTypes.func.isRequired
};
export default SearchArea;

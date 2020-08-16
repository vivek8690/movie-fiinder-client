import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import PropTypes from "prop-types";

function SearchBar(props) {
  return (
    <InputGroup className="search-box">
      <Form.Control
        aria-describedby="inputGroup-sizing-sm"
        placeholder="Search"
        type="text"
        {...props}
      />
    </InputGroup>
  );
}
SearchBar.defaultProps = {
  // text: ""
};
SearchBar.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
export default SearchBar;

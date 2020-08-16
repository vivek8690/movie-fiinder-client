import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import { getCategories } from "../../../utils/category.api";

const MovieComponent = ({ show, onHide, action, movieObj, actioncallback }) => {

    const [categories, setCategories] = useState([]);
    const [movie, setMovie] = useState({
        name: '',
        director: '',
        imdb_score: 0,
        popularity: 0,
        genre: []
    })

    const fetchCategories = async () => {
        try {
            const categories = await getCategories();
            const options = categories.data.data.map(cat => {
                const obj = {}
                obj.value = cat.type;
                obj.label = cat.type;
                return obj;
            })
            setCategories(options);
        } catch (err) {
            console.log(err);
        }
    }

    const formatCategories = (categories) => {
        if (categories && categories.length > 0) {
            return categories.map((cat,index) => {
                const obj = {}
                obj.value = cat;
                obj.label = cat;
                obj.key = index;
                return obj;
            })
        }
        return [];
    }

    const handleChange = (obj) => {
        setMovie({ ...movie, genre: obj });
    }

    useEffect(() => {
        fetchCategories();
        if (movieObj) {
            movieObj.genre = formatCategories(movieObj.genre);
            console.log(movieObj.genre);
            setMovie(movieObj);
        }
    }, [movieObj]);

    const handleSubmit = (event) => {
        event.preventDefault();
        actioncallback(action, movie);
    }

    return (
        <Modal size="lg" show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{action} Movie </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2">
                            Movie Name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text"
                                placeholder="Enter Movie name"
                                value={movie.name || ''}
                                onChange={(evt) => setMovie({ ...movie, name: evt.target.value })}
                                required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2">
                            Director
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text"
                                placeholder="Enter Director name"
                                value={movie.director || ''}
                                onChange={(evt) => setMovie({ ...movie, director: evt.target.value })}
                                required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2">
                            Ratings
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="number" min="0" max="10"
                                step="0.01"
                                placeholder="Enter Ratings"
                                value={movie.imdb_score || ''}
                                onChange={(evt) => setMovie({ ...movie, imdb_score: evt.target.value })}
                                required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2">
                            Populariy
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="number" min="0" max="100"
                                placeholder="Enter Popularity"
                                value={movie.popularity || ''}
                                onChange={(evt) => setMovie({ ...movie, popularity: evt.target.value })}
                                required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2">
                            Categories
                        </Form.Label>
                        <Col sm="10">
                            <CreatableSelect
                                value={movie.genre || ''}
                                isMulti
                                options={categories}
                                placeholder='select categories'
                                onChange={handleChange}
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onHide}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>)
}

export default MovieComponent;
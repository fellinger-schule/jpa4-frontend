import React, { useState } from "react";
import { ListGroup, Row, Col, Modal, Table, Form, Button, Card } from "react-bootstrap";
import { IMovie } from "../App";
import mockMovieList from "../mock/movieList.json";

export function RecentMovies() {
	const [displayAddModal, setDisplayAddModal] = useState(false);
	const [tempMovieData, setTempMovieData] = useState({
		id: -1,
		title: "",
		imdb_id: "",
		rating: -1,
	});

	const [movieList, setMovieList] = useState(mockMovieList);

	function getAllMovies() {
		//TODO: be implemented
	}

	function addNewMovie(title: string, duration: number, rating: number, imdb_id?: string) {
		//TODO: be implemented
	}

	function removeMovie(movieId: number) {
		//TODO: be implemented
	}

	return (
		<>
			<div className="mx-auto" style={{ width: "50em", paddingTop: "2em" }}>
				<Button className="btn-block" onClick={() => setDisplayAddModal(true)}>
					Film hinzufügen
				</Button>
				<hr></hr>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Title</th>
							<th>IMDB ID</th>
							<th>Bewertung</th>
							<th></th>
						</tr>
					</thead>
					{movieList.map((movie, index) => (
						<tr>
							<td>{index}</td>
							<td>{movie.title}</td>
							<td>{movie.imdb_id}</td>
							<td>{movie.rating}</td>
							<td>
								<Button variant="danger" size="sm">
									✕
								</Button>
							</td>
						</tr>
					))}
				</Table>
			</div>
			<Modal show={displayAddModal} onHide={() => setDisplayAddModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Aktuellen Film hinzufügen</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{" "}
					<Form>
						<Row>
							<Col>
								<Form.Control placeholder="Titel" />
							</Col>
							<Col>
								<Form.Control placeholder="IMDB ID (optional)" />
							</Col>
						</Row>
						<hr></hr>
						<Row>
							<Col>
								<Form.Control placeholder="Dauer (in Sek.)" />
							</Col>
							<Col>
								<Form.Control placeholder="Bewertung" />
							</Col>
						</Row>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setDisplayAddModal(false)}>
						Abbrechen
					</Button>
					<Button variant="primary">Hinzufügen</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

import React, { useState } from "react";
import { ListGroup, Row, Col, Modal, Table, Form, Button, Card } from "react-bootstrap";
import { IMovie } from "../App";
import { API_URL } from "../App";
import mockMovieList from "../mock/movieList.json";

export function RecentMovies() {
	const [displayAddModal, setDisplayAddModal] = useState(false);
	let tmpMovieData: IMovie = {
		id: -1,
		title: "",
		duration: 0,
		imdb_id: "",
		rating: -1,
	};

	const [movieList, setMovieList] = useState(mockMovieList);

	function getAllMovies() {
		fetch(`${API_URL}/Movie/GetMovie`)
			.then((response) => response.json())
			.then((data) =>
				data.map((elm: any) => ({ id: elm.id, title: elm.name, rating: elm.rating } as IMovie))
			)
			.then((data) => setMovieList(data));
	}

	function addNewMovie(title: string, duration: number, rating: number, imdb_id?: string) {
		fetch(`${API_URL}/Movie/MovieAdd`, {
			method: "POST",
			body: JSON.stringify({ name: title, duration: duration, rating: rating }),
		}).then((res) => {
			console.log("Movie added. Response: ", res);
		});
	}

	function removeMovie(movieId: number) {
		fetch(`${API_URL}/Movie/MovieDelete/${movieId}`);
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
								<Form.Control
									placeholder="Titel"
									onChange={(evt) => (tmpMovieData["title"] = evt.target.value)}
								/>
							</Col>
							<Col>
								<Form.Control
									placeholder="IMDB ID (optional)"
									onChange={(evt) => (tmpMovieData["imdb_id"] = evt.target.value)}
								/>
							</Col>
						</Row>
						<hr></hr>
						<Row>
							<Col>
								<Form.Control
									placeholder="Dauer (in Sek.)"
									onChange={(evt) => (tmpMovieData["duration"] = parseFloat(evt.target.value))}
								/>
							</Col>
							<Col>
								<Form.Control
									placeholder="Bewertung"
									onChange={(evt) => (tmpMovieData["rating"] = parseFloat(evt.target.value))}
								/>
							</Col>
						</Row>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={() => {
							setDisplayAddModal(false);
						}}
					>
						Abbrechen
					</Button>
					<Button
						variant="primary"
						onClick={() => {
							addNewMovie(
								tmpMovieData.title,
								tmpMovieData.duration,
								tmpMovieData.rating,
								tmpMovieData.imdb_id
							);
							console.log("added");
							setDisplayAddModal(false);
						}}
					>
						Hinzufügen
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

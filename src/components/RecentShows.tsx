import React, { useState } from "react";
import { ListGroup, Row, Col, Modal, Table, Form, Button, Card } from "react-bootstrap";
import { IMovie } from "../App";
import mockHalls from "../mock/halls.json";
import mockMovies from "../mock/movieList.json";
import mockShows from "../mock/shows.json";

function formatDate(ds: string) {
	if (ds == null) {
		return "";
	}

	const options = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "numeric",
		minute: "numeric",
		hour12: false,
	};

	return Intl.DateTimeFormat("de", options).format(Date.parse(ds));
}

export function RecentShows() {
	var tmpMovieId = -1;
	var tmpHallId = -1;
	var tmpDate = -1;

	const [displayAddModal, setDisplayAddModal] = useState(false);
	const [movieList, setMovieList] = useState(mockMovies);
	const [hallList, setHallList] = useState(mockHalls);
	const [showList, setShowList] = useState(mockShows);

	function addNewShow(movieId: number, hallId: number, timestamp: number) {
		//TODO: be implemented
	}

	function removeShow(showId: number) {
		//TODO: be implemented
		getAllShows(); //get new version of the list
	}

	function getAllShows() {
		//TODO: be implemented
	}

	return (
		<>
			<div className="mx-auto" style={{ width: "50em", paddingTop: "2em" }}>
				<Button className="btn-block" onClick={() => setDisplayAddModal(true)}>
					Vorstellung hinzufügen
				</Button>
				<hr></hr>
				<Table striped bordered hover>
					{" "}
					<thead>
						<tr>
							<th>#</th>
							<th>Film</th>
							<th>Halle</th>
							<th>Datum</th>
							<th></th>
						</tr>
					</thead>
					{showList.map((show, index) => (
						<tr>
							<td>{index}</td>
							<td>{show.movieTitle}</td>
							<td>{show.hallLocation}</td>
							<td>{formatDate(show.date)}</td>
							<td>
								<Button variant="danger" size="sm" onClick={() => removeShow(show.id)}>
									✕
								</Button>
							</td>
						</tr>
					))}
				</Table>
			</div>
			<Modal show={displayAddModal} onHide={() => setDisplayAddModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Aktuelle Vorstellung hinzufügen</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{" "}
					<Form>
						<Row>
							<Col>
								<Form.Group>
									<Form.Label>Film</Form.Label>
									<Form.Control
										as="select"
										onChange={(evt) => (tmpMovieId = Number(evt.target.value))}
									>
										{movieList.map((movie) => (
											<option value={movie.id}>{movie.title}</option>
										))}
									</Form.Control>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group>
									<Form.Label>Saal</Form.Label>
									<Form.Control
										as="select"
										onChange={(evt) => (tmpHallId = Number(evt.target.value))}
									>
										{hallList.map((hall) => (
											<option value={hall.id}>
												{hall.location} ({hall.numberOfSeats})
											</option>
										))}
									</Form.Control>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col>
								<Form.Group>
									<Form.Label>Datum</Form.Label>
									<Form.Control
										placeholder="2015-10-12 12:00:00"
										onChange={(evt) => (tmpDate = Date.parse(evt.target.value))}
									/>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group>
									<Form.Label>Anmerkung</Form.Label>
									<Form.Control placeholder="" readOnly />
								</Form.Group>
							</Col>
						</Row>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setDisplayAddModal(false)}>
						Abbrechen
					</Button>
					<Button variant="primary" onClick={() => addNewShow(tmpMovieId, tmpHallId, tmpDate)}>
						Hinzufügen
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

import React, { useState, useEffect } from "react";
import { ListGroup, Row, Col, Modal, Table, Form, Button, Card } from "react-bootstrap";
import { IMovie, IHall, IShow } from "../App";
import { API_URL } from "../App";

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
	let date = new Date(Number(ds));
	if (date) return Intl.DateTimeFormat("de", options).format(date);
	else return "";
}

var tmpMovieId: number;
var tmpHallId: number;
var tmpDate: number;

export function RecentShows() {
	const [displayAddModal, setDisplayAddModal] = useState(false);
	const [movieList, setMovieList] = useState([] as IMovie[]);
	const [hallList, setHallList] = useState([] as IHall[]);
	const [showList, setShowList] = useState([] as IShow[]);
	const [isDateCorrect, setDateCorrect] = useState(false);

	useEffect(() => {
		getAllMovies();
		getAllHalls();
		getAllShows();
	}, []);

	function getAllMovies() {
		fetch(`${API_URL}/Movie/GetMovie`)
			.then((response) => response.json())
			.then((data) =>
				data.map((elm: any) => ({ id: elm.id, title: elm.name, rating: elm.rating } as IMovie))
			)
			.then((data) => setMovieList(data));
	}

	function getAllHalls() {
		fetch(`${API_URL}/Hall/GetHall`)
			.then((response) => response.json())
			.then((data) =>
				data.map(
					(elm: any) =>
						({ id: elm.id, location: elm.location, numberOfSeats: elm.numberOfSeats } as IHall)
				)
			)
			.then((data) => setHallList(data));
	}

	function addNewShow(movieId: number, hallId: number, timestamp: number) {
		if (!tmpMovieId || !tmpHallId || !tmpDate) return;
		let data = JSON.stringify({
			id: 0, //will get generated on backend
			hallId: hallId,
			hallName: "",
			movieId: movieId,
			movieTitle: "",
			showTime: `${timestamp}`,
		});
		fetch(`${API_URL}/Show/ShowAdd`, {
			method: "POST",
			body: data,
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => console.log(res))
			.then(() => getAllShows());
	}

	function removeShow(showId: number) {
		fetch(`${API_URL}/Show/ShowDelete/${showId}`, {
			method: "DELETE",
		})
			.then((res) => console.log(res))
			.then(() => getAllShows());
	}

	function getAllShows() {
		fetch(`${API_URL}/Show/GetShow`)
			.then((res) => res.json())
			.then((data) =>
				data.map((elm: any) => ({
					id: elm.id,
					movieTitle: elm.movieTitle,
					hallLocation: elm.hallName,
					date: elm.showTime,
				}))
			)
			.then((data) => setShowList(data));
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
										onChange={(evt) => {
											tmpMovieId = Number(evt.target.value);
											console.log(tmpMovieId);
										}}
									>
										<option value={-1}></option>
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
										<option value={-1}></option>
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
										isInvalid={!isDateCorrect}
										isValid={isDateCorrect}
										placeholder="2015-10-12 12:00:00"
										onChange={(evt) => {
											let _tmpDate = Date.parse(evt.target.value);
											if (isNaN(_tmpDate)) {
												setDateCorrect(false);
											} else {
												setDateCorrect(true);
												tmpDate = _tmpDate;
											}
										}}
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
					<Button
						variant="primary"
						onClick={() => {
							addNewShow(tmpMovieId, tmpHallId, tmpDate);
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

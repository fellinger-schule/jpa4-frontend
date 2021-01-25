import React, { useState } from "react";
import {
	Container,
	Row,
	Col,
	ListGroup,
	InputGroup,
	Form,
	FormControl,
	Card,
	Button,
	Modal,
} from "react-bootstrap";
import { IMovie } from "../App";
import { IShow } from "../App";
import { ICustomer } from "../App";
import { ISeat } from "../App";
import fa_usericon from "../assets/fa_usericon.png";
import mockShows from "../mock/shows.json";
import mockCustomers from "../mock/customers.json";
import mockSeats from "../mock/seats.json";

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
export function BoxOffice() {
	var customers = mockCustomers;
	const [activeShow, setActiveShow] = useState({} as IShow);
	const [activeCustomer, setActiveCustomer] = useState({} as ICustomer);
	const [availableSeats, setAvailableSeats] = useState(mockSeats as ISeat[]);
	const [buyModalOpen, setBuyModalOpen] = useState(false);

	function onIdInput(ids: string) {
		setActiveCustomer(customers.find((c) => c.id == Number(ids)) || ({} as ICustomer));
	}

	function onShowSelect(show: IShow) {
		setActiveShow(show);
		setAvailableSeats(mockSeats as ISeat[]);
	}

	return (
		<>
			<Row>
				<Col className="border-right">
					<ListGroup style={{ paddingTop: "2em" }} variant="flush">
						{mockShows.map((show, index) => (
							<ListGroup.Item
								action
								active={show.id == activeShow.id}
								onClick={() => onShowSelect(show)}
							>
								<span className="float-left">{show.movieTitle} </span>
								<span className="float-right">{formatDate(show.date)} </span>
							</ListGroup.Item>
						))}
					</ListGroup>
				</Col>
				<Col>
					<Container style={{ paddingTop: "0.5em" }}>
						<Card style={{ width: "36rem", margin: "auto" }} className="position-fixed">
							<Card.Img
								style={{ width: "100%", height: "15vw", objectFit: "scale-down" }}
								variant="top"
								src={fa_usericon}
							/>
							<Card.Body>
								<Card.Title></Card.Title>

								<Form>
									<Form.Row>
										<Form.Group as={Col}>
											<InputGroup className="mb-3">
												<InputGroup.Prepend>
													<InputGroup.Text>ID</InputGroup.Text>
												</InputGroup.Prepend>
												<FormControl
													placeholder="123456"
													onChange={(evt) => {
														onIdInput(evt.target.value);
													}}
												/>
											</InputGroup>
											<hr></hr>
											<Form.Group as={Row}>
												<Form.Label column sm="2">
													Name
												</Form.Label>
												<Col sm="10">
													<Form.Control disabled value={activeCustomer.name || ""} />
												</Col>
											</Form.Group>
											<Form.Group as={Row}>
												<Form.Label column sm="2">
													Besuche
												</Form.Label>
												<Col sm="10">
													<Form.Control disabled value={activeCustomer.numberOfVisits || ""} />
												</Col>
											</Form.Group>
											<Form.Group as={Row}>
												<Form.Label column sm="2">
													Status
												</Form.Label>
												<Col sm="10">
													<Form.Control
														disabled
														value={
															activeCustomer.premiumStatus == undefined
																? ""
																: activeCustomer.premiumStatus == true
																? "Premium"
																: "Standard"
														}
													/>
												</Col>
											</Form.Group>
										</Form.Group>
									</Form.Row>
									<Card
										className={
											Object.keys(activeShow).length == 0 || Object.keys(activeCustomer).length == 0
												? "d-none"
												: ""
										}
										bg="primary"
										text="light"
									>
										<Card.Body>
											<span className="float-left">{activeShow.movieTitle} </span>
											<span className="float-right">{formatDate(activeShow.date)}</span>
											<br></br>
											<span className="float-left">Halle {activeShow.hallLocation}</span>
											<br></br>
											<hr></hr>

											<Row style={{ marginTop: "1em" }}>
												<Col>
													<Button
														block
														variant="secondary"
														onClick={() => setActiveShow({} as IShow)}
													>
														Abbrechen
													</Button>
												</Col>
												<Col>
													<Button block variant="success" onClick={() => setBuyModalOpen(true)}>
														Bezahlen...
													</Button>
												</Col>
											</Row>
										</Card.Body>
									</Card>
									<hr></hr>
								</Form>
							</Card.Body>
						</Card>
					</Container>
				</Col>
			</Row>
			<Modal show={buyModalOpen} onHide={() => setBuyModalOpen(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Bezahlung</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group as={Row}>
							<Form.Label column sm={2}>
								Kunde
							</Form.Label>
							<Col sm={10}>
								<Form.Control readOnly value={activeCustomer.name} />
							</Col>
						</Form.Group>
						<Form.Group as={Row}>
							<Form.Label column sm={2}>
								Film
							</Form.Label>
							<Col sm={10}>
								<Form.Control readOnly value={activeShow.movieTitle} />
							</Col>
						</Form.Group>
						<Form.Group as={Row}>
							<Form.Label column sm={2}>
								Halle
							</Form.Label>
							<Col sm={10}>
								<Form.Control readOnly value={activeShow.hallLocation} />
							</Col>
						</Form.Group>
						<Form.Group as={Row}>
							<Form.Label column sm={2}>
								Sitz
							</Form.Label>
							<Col sm={10}>
								<Form.Control as="select">
									{availableSeats.map((seat) => (
										<option value={seat.id}>
											{seat.label} ({seat.price}€)
										</option>
									))}
								</Form.Control>
							</Col>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setBuyModalOpen(false)}>
						Abbrechen
					</Button>
					<Button variant="success">Bezahlen</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

import React, { useState, useEffect } from "react";
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
import { IMovie, IShow, ICustomer, ISeat, ITicket, API_URL } from "../App";
import fa_usericon from "../assets/fa_usericon.png";
import mockSeats from "../mock/seats.json";

function formatDate(ds: string) {
	if (ds == null) {
		return "";
	}

	const options = {
		year: "numeric" as const,
		month: "2-digit" as const,
		day: "2-digit" as const,
		hour: "numeric" as const,
		minute: "numeric" as const,
		hour12: false as const,
	};
	let date = new Date(Number(ds));
	if (date) return Intl.DateTimeFormat("de", options).format(date);
	else return "";
}

export function BoxOffice() {
	var customers = [] as ICustomer[];
	const [showList, setShowList] = useState([] as IShow[]);
	const [activeShow, setActiveShow] = useState({} as IShow);
	const [activeCustomer, setActiveCustomer] = useState({} as ICustomer);
	const [availableSeats, setAvailableSeats] = useState(mockSeats as ISeat[]);
	const [buyModalOpen, setBuyModalOpen] = useState(false);

	useEffect(() => {
		getAllShows();
	}, []);

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

	function onIdInput(ids: string) {
		if (!ids.match(/^[0-9]+$/)) return;

		fetch(`${API_URL}/Customer/GetCustomerByID/${ids}`)
			.then((res) => res.json())
			.then((data) =>
				setActiveCustomer({
					id: data.id,
					name: data.name,
					numberOfVisits: data.numberOfVisits,
					isPremium: data.primeMember,
				} as ICustomer)
			)
			.catch((error) => {
				console.log("BoxOffice Api Fetch error", error);
			});
	}

	function onShowSelect(show: IShow) {
		setActiveShow(show);
		setAvailableSeats(mockSeats as ISeat[]);
	}

	function addNewTicket(custId: number, showId: number) {
		fetch(`${API_URL}/Ticket/TicketAdd`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ customerId: custId, showId: showId }),
		}).then((res) => console.log(res));
	}

	return (
		<>
			<Row>
				<Col className="border-right">
					<ListGroup style={{ paddingTop: "2em" }} variant="flush">
						{showList.map((show, index) => (
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
															activeCustomer.isPremium == undefined
																? ""
																: activeCustomer.isPremium == true
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
					<Button
						variant="success"
						onClick={() => {
							setBuyModalOpen(false);
							addNewTicket(activeCustomer.id, activeShow.id);
						}}
					>
						Bezahlen
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

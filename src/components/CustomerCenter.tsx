import React, { useState } from "react";
import { Container, Row, Col, InputGroup, FormControl, Form, Button, Card } from "react-bootstrap";
import { ICustomer } from "../App";
import { API_URL } from "../App";
import fa_usericon from "../assets/fa_usericon.png";

function deepCopy(obj: any) {
	return JSON.parse(JSON.stringify(obj));
}

export function CustomerCenter() {
	let tmpCustomer = { id: 0, name: "", premiumStatus: false, numberOfVisits: 0 };
	const emptyCustomer = { id: 0, name: "", numberOfVisits: 0, premiumStatus: false };

	const [newUserMode, setNewUserMode] = useState(true);
	const [deleteModalActive, setDeleteModalActive] = useState(true);
	const [workingCustomer, setWorkingCustomer] = useState(emptyCustomer as ICustomer);

	function onIdInputChanged(id: string) {
		if (id != "") {
			console.log("newusermode disabled");
			setNewUserMode(false);
			fetch(`${API_URL}/Customer/CustomerByID/${id}`)
				.then((res) => res.json())
				.then(
					(data) =>
						data.map((elm: any) => ({
							id: elm.id,
							name: elm.name,
							numberOfVisits: elm.numberOfVisits,
							premiumStatus: elm.isPrimeMember,
						})) as ICustomer
				)
				.then((data) => setWorkingCustomer(data));

			//clearFields();
		} else {
			setNewUserMode(true);
		}
	}

	function clearFields() {
		setWorkingCustomer(emptyCustomer);
	}

	function addCustomer(name: string, numberOfVisits: number, premiumStatus: boolean) {
		fetch(`${API_URL}/Customer/CustomerAdd`, {
			method: "POST",
			body: JSON.stringify({
				name: name,
				numberOfVisits: numberOfVisits,
				isPremium: premiumStatus,
			}),
		}).then((res) => {
			console.log("Movie added. Response: ", res);
		});
	}

	function deleteCustomer(customerId: number) {
		clearFields();
		fetch(`${API_URL}/Customer/CustomerDelete/${customerId}`);
	}

	return (
		<>
			<Container style={{ paddingTop: "2em" }}>
				<Card style={{ width: "36rem", margin: "auto" }}>
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
												onIdInputChanged(evt.target.value);
											}}
										/>
									</InputGroup>
									<hr></hr>
									<Form.Group>
										<Form.Label>Vollständiger Name</Form.Label>
										<Form.Control
											//placeholder="John Doe"
											value={workingCustomer.name}
											onInput={(evt: any) => {
												let tmp = deepCopy(workingCustomer);
												tmp.name = evt.target.value;
												setWorkingCustomer(tmp);
											}}
											disabled={!newUserMode}
										/>
									</Form.Group>
								</Form.Group>
							</Form.Row>

							<Form.Row>
								<Form.Group as={Col} controlId="formGridCity">
									<Form.Label>Anzahl der Besuche</Form.Label>
									<Form.Control
										value={workingCustomer.numberOfVisits}
										onInput={(evt: any) => {
											let tmp = deepCopy(workingCustomer);
											tmp.numberOfVisits = evt.target.value;
											setWorkingCustomer(tmp);
										}}
										disabled={!newUserMode}
									/>
								</Form.Group>

								<Form.Group as={Col} controlId="formGridState">
									<Form.Label>Mitgliedschaft</Form.Label>
									<Form.Control
										as="select"
										value={workingCustomer.premiumStatus ? 0 : 1}
										onInput={(evt: any) => {
											let tmp = deepCopy(workingCustomer);
											tmp.premiumStatus = evt.target.value;
											setWorkingCustomer(tmp);
										}}
										disabled={!newUserMode}
									>
										<option>Standard</option>
										<option>Premium</option>
									</Form.Control>
								</Form.Group>
							</Form.Row>
							<hr></hr>
							<Row>
								<Col>
									<Button block variant="danger" disabled={newUserMode}>
										Kunde löschen
									</Button>
								</Col>
								<Col>
									<Button block variant="primary" disabled={!newUserMode}>
										Neuen Kunden hinzufügen
									</Button>
								</Col>
							</Row>
						</Form>
					</Card.Body>
				</Card>
			</Container>
		</>
	);
}

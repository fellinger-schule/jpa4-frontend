import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { CustomerCenter } from "./components/CustomerCenter";

export interface ICustomer {
	id: number;
	name: string;
	numberOfVisits: number;
	premiumStatus: number;
}

function TabContent(props: any) {
	switch (props.tabName) {
		case "kassa": {
			return <h1>hallo bei der kassa</h1>;
			break;
		}
		case "kundencenter": {
			return <CustomerCenter />;
			break;
		}
		default:
			//we shouldnt ever be here
			return <h1>???</h1>;
			break;
	}
}

function App() {
	const [activeTab, setActiveTab] = useState("kassa");

	return (
		<div className="App">
			<div className="container-fluid">
				<ul className="nav nav-tabs">
					<li className="nav-item">
						<a
							className={`nav-link ${activeTab == "kassa" ? "active" : ""}`}
							onClick={() => setActiveTab("kassa")}
							href="#"
						>
							Kassa
						</a>
					</li>
					<li className="nav-item">
						<a
							className={`nav-link ${activeTab == "kundencenter" ? "active" : ""}`}
							onClick={() => setActiveTab("kundencenter")}
							href="#"
						>
							Kundencenter
						</a>
					</li>
				</ul>

				<TabContent tabName={activeTab} />
			</div>
		</div>
	);
}

export default App;

import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { CustomerCenter } from "./components/CustomerCenter";
import { RecentMovies } from "./components/RecentMovies";
import { RecentShows } from "./components/RecentShows";

export interface ICustomer {
	id: number;
	name: string;
	numberOfVisits: number;
	premiumStatus: number;
}
export interface IMovie {
	id: number;
	title: string;
	imdb_id?: string;
	rating: number;
}

export interface IHall {
	numberOfSeats: number;
	location: string;
}

export interface IShow {
	movie: IMovie;
	hall: IHall;
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
		case "movies": {
			return <RecentMovies />;
			break;
		}
		case "shows": {
			return <RecentShows />;
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
					<li className="nav-item">
						<a
							className={`nav-link ${activeTab == "movies" ? "active" : ""}`}
							onClick={() => setActiveTab("movies")}
							href="#"
						>
							Aktuelle Filme
						</a>
					</li>
					<li className="nav-item">
						<a
							className={`nav-link ${activeTab == "shows" ? "active" : ""}`}
							onClick={() => setActiveTab("shows")}
							href="#"
						>
							Vorstellungen
						</a>
					</li>
				</ul>

				<TabContent tabName={activeTab} />
			</div>
		</div>
	);
}

export default App;

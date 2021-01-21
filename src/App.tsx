import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { CustomerCenter } from './components/CustomerCenter';

function TabContent(props:any) {
	switch(props.tabName) {
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
		<ul className="nav nav-pills nav-fill">
		<li className="nav-item">
			<a className={`nav-link ${activeTab == "kassa" ? "active": ""}`} onClick={() => setActiveTab("kassa")} href="#">Kassa</a>
		</li>
		<li className="nav-item">
			<a className={`nav-link ${activeTab == "kundencenter" ? "active": ""}`} onClick={() => setActiveTab("kundencenter")} href="#">Kundencenter</a>
		</li>
		<li className="nav-item">
			<a className="nav-link" href="#">Link</a>
		</li>
	 </ul>
	 <TabContent tabName={activeTab} />
	 
	 </div>
  );
}

export default App;

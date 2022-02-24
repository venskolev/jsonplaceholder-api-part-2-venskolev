import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import { UserInfo } from "./components/UserInfo";
import { SmartUserInfo } from "./components/SmartUserInfo";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

function App() {
  const [users, setUsers] = useState([]);

  // State-Variable für den ausgewählten User (per Click)
  const [selectedUser, setSelectedUser] = useState(null);
  // State Variable für den Ladezustand
  const [loading, setLoading] = useState(false);

  // Nur zu Demo-Zwecken, um eine künstliche Warteschleife zu erzeugen... ---
  const wait = (ms) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  };
  // --->
  const loadData = async () => {
    try {
      setLoading(true);
      await wait(1000);
      const response = await axios.get("/users");
      // console.log(response.data);
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      alert(err.message);
      setLoading(false);
    }
  };

  // UseEffect, der nur beim ersten Laden der App ausgeführt wird
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {loading === true ? (
          <>
            <img src={logo} className="App-logo" alt="logo" />
            <span>Lade Daten</span>
          </>
        ) : undefined}
      </header>
      <ul className="userList">
        {users.map((user, index) => {
          return (
            <li key={`users-${index}`} onClick={() => setSelectedUser(user.id)}>
              {user.name}, {user.phone}, {user.email}, {user.address.geo.lat} /{" "}
              {user.address.geo.lng}
            </li>
          );
        })}
      </ul>

      <SmartUserInfo userId={selectedUser} />
    </div>
  );
}

export default App;

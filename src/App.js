import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import { useParams, Link } from "react-router-dom";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

function App() {
  const [users, setUsers] = useState([]);
  let params = useParams();
  // State-Variable für den ausgewählten User (per Click)
  // const [selectedUser, setSelectedUser] = useState(null);
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
  const userLoad = users.find((user) => user.name === params.usersname);
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
            <Link to={'./userinfo/' + user.id}>
              <li key={`users-${index}`}
              >
                {user.name}, {user.phone}
              </li></Link>
          );
        })}
        {params.username ? (
          <div>
          <strong>User Info </strong> {userLoad.name}
          </div>
        ): undefined}
      </ul>

    </div>
  );
}

export default App;

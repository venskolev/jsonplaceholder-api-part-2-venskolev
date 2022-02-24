import axios from "axios";
import { useState, useEffect } from "react";
import "../App";
import { useParams } from "react-router-dom";
import "../App.css"
import logo from "../logo.svg";

export const SmartUserInfo = () => {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const params = useParams();

  useEffect(() => {
    // Variante 1: Funktion definieren und später mit Namen aufrufen
    const loadTodos = async () => {
      try {
        const response = await axios.get("/users/" + params.userId + "/todos");
        setTodos(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (params.userId) {
      // Variante 2: Funktion als IIFE in einem Schritt definieren und aufrufen
      (async () => {
        try {
          const response = await axios.get("/users/" + params.userId);
          setUser(response.data);
        } catch (error) {
          console.log(error);
        }
      })();
      loadTodos();
    }
  }, [params.userId]);
  return (
    <div className="UserInfo">
      <header className="App-header">
          <>
            <img src={logo} className="App-logo" alt="logo" />
            <span>Lade Daten</span>
            <button className="ButtonHome"><a href="/">Home</a></button>
          </>
      </header>
      <h1>SmartUserInfo</h1>
      <p>{params.userId}</p>
      {user ? (
        <>
          <p>{user.name}</p>
          <p>{user.phone}</p>
          <p>
            {user?.address?.geo?.lat} / {user?.address?.geo?.lng}
          </p>
          <p>{user.company.name}</p>
        </>
      ) : (
        <p>Bitte wählen Sie einen User!</p>
      )}
      <ul>
        {todos.map((todo) => {
          return (
            <li
              style={{
                color: todo.completed ? "green" : "red",
              }}
              key={`todos-${todo.id}`}
            >
              {todo.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

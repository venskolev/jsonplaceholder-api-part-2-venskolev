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
  const [userAlbum, setUserAlbum] = useState(null);

  useEffect(() => {
    // Variante 1: Funktion definieren und später mit Namen aufrufen
    const loadTodos = async () => {
      try {
        const response = await axios.get("/users/" + params.userId + "/todos");
        const album = await axios.get("/photos/");
        setTodos(response.data);
        setUserAlbum(album.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (params.userId) {
      // Variante 2: Funktion als IIFE in einem Schritt definieren und aufrufen
      (async () => {
        try {
          const response = await axios.get("/users/" + params.userId);
          const album = await axios.get("/photos/" + params.userId);
          setUserAlbum(album.data);
          setUser(response.data);
        } catch (error) {
          console.log(error);
        }
      })();
      loadTodos();
    }
  }, [params.userId]);
  // function userBild(e) {
  //   e.target.setAttribute( 'src', `${userAlbum.url}`);
  //   e.target.setAttribute('alt', 'UserBild');
  // };
  return (
    <div className="UserInfo">
      <header className="App-header">
          <>
           <a href="/"><img src={logo} className="App-logo" alt="logo" />
            <span>Lade Daten</span></a>
            <button className="ButtonHome"><a href="/">Home</a></button>
          </>
      </header>
      <h1>SmartUserInfo</h1>
      {userAlbum ? (
        <div>
            <img src={userAlbum.thumbnailUrl} alt="Bild"/>
          {/* <span>{userAlbum.title}</span> */}
        </div>
      ) : undefined}
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

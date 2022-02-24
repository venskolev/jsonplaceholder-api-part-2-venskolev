import axios from "axios";
import { useState, useEffect } from "react";

export const SmartUserInfo = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Variante 1: Funktion definieren und später mit Namen aufrufen
    const loadTodos = async () => {
      try {
        const response = await axios.get("/users/" + userId + "/todos");
        setTodos(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (userId) {
      // Variante 2: Funktion als IIFE in einem Schritt definieren und aufrufen
      (async () => {
        try {
          const response = await axios.get("/users/" + userId);
          setUser(response.data);
        } catch (error) {
          console.log(error);
        }
      })();
      loadTodos();
    }
  }, [userId]);
  return (
    <div>
      <h1>SmartUserInfo</h1>
      <p>{userId}</p>
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

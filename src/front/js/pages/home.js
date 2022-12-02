import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")

  const login = () => {
    console.log(email, password);

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY2OTk3ODYwNCwianRpIjoiOWM3NTQyOTMtYzc1Zi00MzlhLTljZTEtODUxZDE1ODQzNjVjIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IllhcyIsIm5iZiI6MTY2OTk3ODYwNCwiZXhwIjoxNjY5OTc5NTA0fQ.ySLlRPgaG_TTO9WOMRPFzfIbeOC432Dzg9RgcNrZ3vY"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
      password: password,
      is_active: "True",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://3001-4geeksacade-reactflaskh-0objc7umdg0.ws-eu77.gitpod.io/api/login",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.token) {
         localStorage.setItem("token", result.token);
         navigate("/demo");
    } else {
      setError(result.msg)
    }
       })
    .catch((error) => console.log("error", error));
    };

  return (
    <div className="text-center mt-5">
      <h1>Hello Yas!</h1>
      <button onClick={login}>Login</button>
      <div>
        <label>Email</label>
        <input onChange={(event) => setEmail(event.target.value)}></input>
      </div>
      <div>
        <label>Password</label>
        <input onChange={(event) => setPassword(event.target.value)}></input>

        {error && (
          <div class= "alert alert-danger" role="alert">
            {error}
            </div>
        )}
      </div>
    </div>
  );
};

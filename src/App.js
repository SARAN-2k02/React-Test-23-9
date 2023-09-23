import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  const [users, setUsers] = useState({
    title: "",
    body: "",
  });
  useEffect(() => {
    axios
      .get("http://localhost:3003/posts")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.log("error occured", err);
      });
  }, []);

  function handleChange(e) {
    const value = e.target.value;
    setUsers({ ...users, [e.target.name]: value });
  }
  // console.log(users);

  function handleSubmit() {
    // e.preventDefault();
    axios
      .post("http://localhost:3003/posts", users)
      .then((response) => {
        console.log("POSTED DATA", response.data);
      })
      .catch((err) => console.log("error in post data", err));

    axios
      .get("http://localhost:3003/posts")
      .then((response) => {
        console.log("postedd data", response.data);
      })
      .catch((err) => console.log("error in get data", err));
  }

  function handleUpdate() {
    // alert("Update");
    axios
      .post("http://localhost:3003/posts", users)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log("error in posting", err));
  }
  function handleDelete({ id }) {
    const deltUser = axios
      .delete(`http://localhost:3003/posts/${id}`)
      .then((response) => {
        response.data.filter((item) => {
          console.log(item.id !== id);
          // return item.id !== id;
        });
      })
      .catch((err) => console.log("error", err));
  }
  return (
    <div className="App">
      <div className="form-container">
        <form>
          <div>
            <label>Title </label>
            <input
              type="text"
              name="title"
              value={users.title}
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <label>Body </label>
            <input
              type="text"
              name="body"
              value={users.body}
              onChange={handleChange}
            ></input>
          </div>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>

      <div>
        <div className="datas">
          {data.map((item) => (
            <>
              <small> ID: {item.id}</small>
              <p key={item.id}>
                Title : <span>{item.title}</span>
              </p>
              <h5>Body : {item.body}</h5>
              <button onClick={handleUpdate}>Update</button>
              <button onClick={handleDelete}>Delete</button>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

//  <ul>
//    {data.map((item) => (
//      <>
//        <li className="list" key={item.id}>
//          {item.title}
//        </li>
//        <li>{item.body}</li>
//      </>
//    ))}
//  </ul>;

export default App;

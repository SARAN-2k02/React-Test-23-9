import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [button, setButton] = useState(false);

  const [editdata, setEditData] = useState();

  // const [users, setUsers] = useState({
  //   title: "",
  //   body: "",
  // });

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

  function handleAdd(e) {
    e.preventDefault();

    const users = {
      title,
      body,
    };
    axios
      .post("http://localhost:3003/posts", users)
      .then((response) => {
        axios
          .get("http://localhost:3003/posts")
          .then((response) => {
            console.log("postedd data", response.data);
            setData(response.data);
          })
          .catch((err) => console.log("error in get data", err));
      })
      .catch((err) => console.log("error in post data", err));


      setTitle("")
      setBody("")
  }

  function handleEdit(item) {
    setTitle(item.title);
    setBody(item.body);

    setEditData(item);

    setButton(true);
  }

  function handleUpdate(e) {
    e.preventDefault();
    const users = {
      title,
      body,
    };
    axios
      .put(`http://localhost:3003/posts/${editdata.id}`, users)
      .then((response) => {
        axios
          .get("http://localhost:3003/posts")
          .then((response) => {
            console.log("postedd data", response.data);
            setData(response.data);
          })
          .catch((err) => console.log("error in get data", err));
      })
      .catch((err) => console.log("error in posting", err));
  }
  function handleDelete(id) {
    axios
      .delete(`http://localhost:3003/posts/${id}`)
      .then((response) => {
        console.log("DAta deleted 👍🏻", response.data);
        setData(data.filter((item) => item.id !== id));
        console.log(data);
        axios
          .get("http://localhost:3003/posts")
          .then((response) => {
            setData(response.data);
          })
          .catch((err) => console.log("error in deleting", err));
      })
      .catch((err) => console.log("error fetch dlt data", err));
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Body </label>
            <input
              type="text"
              name="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></input>
          </div>
          {button ? (
            <button className="update-btn" onClick={handleUpdate}>Update</button>
          ) : (
            <button className="sub-btn"  onClick={handleAdd}>Submit</button>
          )}
        </form>
      </div>

      <div>
        <div className="datas">
          {data.map((item, index) => (
            <>
              <small className="id" key={index}> ID: {item.id}</small>
             
              <p key={item.id}>
                Title : <span>{item.title}</span>
              </p>
              <h5>Body : {item.body}</h5>
              <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
              <button className="dlt-btn" onClick={() => handleDelete(item.id)}>Delete</button>
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

import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  const [userId,setUserId]=useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('http://localhost:5000/read');
        setUsers(response.data)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    fetchUsers();
  }, []);

  const onSubmitHandler = async () => {
    try {
      await axios.post('http://localhost:5000/create', { name, age, email });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const onDeleteHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const onEditHandler = async (id) => {
    try {
      setUserId(id);
      const response = await axios.get(`http://localhost:5000/readOne/${id}`);
      setName(response.data.name)
      setAge(response.data.age)
      setEmail(response.data.email)
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const onUpdateHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/update/${userId}`, { name, age, email });
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
    console.log(userId)
  }

  return (
    <>
      <h1>CRUD APP</h1>
      <form onSubmit={onSubmitHandler}>
        <div className="myInput">
          <input type="text" placeholder='Enter name' value={name} onChange={e => setName(e.target.value)} />
          <input type="number" placeholder='Enter age' value={age} onChange={e => setAge(e.target.value)} />
          <input type="text" placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)} />
          <div>
            <input type="submit" />
            <input type="submit" value="Update" onClick={onUpdateHandler} />
          </div>
        </div>
      </form>
      <div className="myTable">
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">NAME</th>
              <th scope="col">AGE</th>
              <th scope="col">EMAIL</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={() => onEditHandler(user._id)}>Edit</button>
                    <button onClick={() => onDeleteHandler(user._id)}>Detele</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
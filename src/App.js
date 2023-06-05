import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  },[])

  const handleAddUser=event=>{
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = {name, email};
    console.log(user);

    fetch('http://localhost:5000/users',{
      method: 'POST',
      headers:{
        'content-type': 'application/json'
      },
      body:JSON.stringify(user)
    })
    .then(res => res.json()
    .then(data => {
      console.log(data);
    const newUser = [...users, data]
    setUsers(newUser);
    }))
    .catch(err => console.log(err))
    event.target.reset();

  }


  return (
    <div className="App">
      <form onSubmit={handleAddUser}>
      <input type="text" name='name' placeholder='name'/>
      <br />
      <input type="text" name="email" placeholder='email'/>
      <br />
      <button type="submit">submit</button>
      </form>

      <h2>Here is all user number: {users.length}</h2>
      {
        users.map(user => <p key={user.id}>{user.name} {user.email}</p>)
      }
    </div>
  );
}

export default App;

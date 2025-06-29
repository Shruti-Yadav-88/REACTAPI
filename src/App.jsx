import axios from "axios";
import { useEffect, useState } from "react";

const App=() =>{
  const BaseUrl = "https://jsonplaceholder.typicode.com";
  const UserUrl = `${BaseUrl}/users`;

const [users,setUsers] = useState([]);
useEffect(()=>{
const fetchUsers=async()=>{
  try {
  const responsegi = await axios.get(UserUrl);
  setUsers(response.data);
  } catch (e){
    console.error("Error fetching users:", e)
  }

} 
fetchUsers();
  }, [])
  return( 
  <>This is app component
  {users.map((user) => (
    <div key={user.id}>{user.name}</div>
   ))}
    </>)
  
};

export default App

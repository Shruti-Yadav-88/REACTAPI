// GbeEn7
import axios from "axios";
import { Fragment, useEffect, useState } from "react";

const App = () => {
  const BaseUrl = "https://jsonplaceholder.typicode.com";
  const UserUrl = `${BaseUrl}/users`;

  const [users, setUsers] = useState([]);
  console.log(users);
  // useEffect(()=>{},[])
  const deleteUser = async(id) => {
    try{
   await axios.delete(`${UserUrl}/${id}`);
    setUsers(users.filter((user)=>user.id !== id )) 
    } catch (e){
      console.error("Error deleting user", e)
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(UserUrl);
        setUsers(response.data);
      } catch (e) {
        console.error("Error fetching users:", e);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      This is app component
      {users.map((user) => (
        <Fragment key={user.id}>
          <div
            style={{
              backgroundColor: "lightblue",
              margin: "10px",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            {user.name}
          </div>
          <button style={{ backgroundColor: "red" }}
          onClick={()=> deleteUser(user.id)}>Delete {user.name}</button>
        </Fragment>
      ))}
    </>
  );
};

export default App;

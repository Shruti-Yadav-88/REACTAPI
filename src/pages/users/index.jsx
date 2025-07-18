import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { BaseUrl } from "../../App";

const Users = () => {
  const [users, setUsers] = useState([]);
  const UserUrl = `${BaseUrl}/users`;

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${UserUrl}/${id}`);
      // const response = await axios.get(UserUrl);

      setUsers(users.filter((user) => user.id !== id));
    } catch (e) {
      console.error("Error deleting user:", e);
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
    <div>
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
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => deleteUser(user.id)}
          >
            Delete {user.name}
          </button>
        </Fragment>
      ))}
    </div>
  );
};

export default Users;
import React from "react";
import { useDeleteUserMutation, useGetUsersQuery } from "./usersApiSlice";

const UserList = () => {
  // запрос к серверу по назначенному адресу
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();
  const [deleteUser,{}] = useDeleteUserMutation()

  if (isLoading) return <h1>Иди нахуй тут загрузка</h1>;

  const deleteUserHandler = async (item) => {
    deleteUser(item)
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Password</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((item) => (
          <tr key={item._id}>
            <td>{item._id}</td>
            <td>{item.username}</td>
            <td>{item.password}</td>
            <td>{item.active ? "Active" : "Disabled"}</td>
            <td>
              <button onClick={() => deleteUserHandler(item)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;

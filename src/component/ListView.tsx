import React, { ChangeEvent, useEffect, useState } from 'react';
import { updateUser, deleteUser } from '../redux/api';
import { useAppDispatch, useAppSelector } from './hooks';
import '../css/userTable.scss';
import { fetchUsers } from '../redux/action/UserAction';

const ListView = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.UserReducer.users.users);
  const loading = useAppSelector((state) => state.UserReducer.users.loading);
  const error = useAppSelector((state) => state.UserReducer.users.error);
  const [sortedUsers, setSortedUsers] = useState(users);
  const [ascending, setAscending] = useState(true);
  const [editedUser, setEditedUser] = useState<any>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    setSortedUsers(users);
  }, [users]);

  const handleEdit = (user: any) => {
    setEditedUser({ ...user });
  };

  const handleSave = () => {
    dispatch(updateUser(editedUser));
    setEditedUser(null); 
  };

  const handleCancel = () => {
    setEditedUser(null); // Reset editedUser state on cancel
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value;
    setEditedUser((prevUser: any) => ({
      ...prevUser,
      [field]: value
    }));
  };

  const handleSort = () => {
    // Toggle sorting order
    const newSortedUsers = [...sortedUsers].sort((a, b) => {
      if (ascending) {
        return a.name.first.localeCompare(b.name.first);
      } else {
        return b.name.first.localeCompare(a.name.first);
      }
    });
    setSortedUsers(newSortedUsers);
    setAscending(!ascending);
  };

  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allUserIds = sortedUsers.map((user: any) => user.id);
      setSelectedUsers(allUserIds);
    } else {
      setSelectedUsers([]);
    }
  };

  const handleCheckboxChange = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleDelete = () => {
    selectedUsers.forEach((userId) => {
      dispatch(deleteUser(userId));
    });
    setSelectedUsers([]);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button className="button button--delete" onClick={handleDelete}>Delete</button>
      <button className='button button--sort' onClick={handleSort}>
        {ascending ? 'Ascending' : 'Descending'}
      </button>
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" onChange={handleSelectAll} /></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Country</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user: any) => (
            <tr key={user.login.uuid}>
              <td><input type="checkbox" onChange={() => handleCheckboxChange(user.id)} /></td>
              <td>
                {editedUser && editedUser.id === user.id ? (
                  <input
                    type="text"
                    name='name.first'
                    value={editedUser.name.first}
                    onChange={(e) => handleInputChange(e, 'name.first')}
                  />
                ) : (
                  user.name.first
                )}
              </td>
              <td>
                {editedUser && editedUser.id === user.id ?  (
                  <input
                    type="text"
                    value={editedUser.name.last}
                    onChange={(e) => handleInputChange(e, 'name.last')}
                  />
                ) : (
                  user.name.last
                )}
              </td>
              <td>{user.dob.age}</td>
              <td>{user.location.country}</td>
              <td>
                {editedUser && editedUser.id === user.id ? (
                  <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(user)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListView;

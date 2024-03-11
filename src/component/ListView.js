import React, { useEffect, useState } from 'react';
import { fetchUsers, updateUser, deleteUser } from '../redux/api';
import {  useAppDispatch, useAppSelector } from '../hooks';
import '../css/userTable.scss';

const ListView = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.UserReducer.users.users);
  const loading = useAppSelector((state) => state.UserReducer.users.loading);
  const error = useAppSelector((state) => state.UserReducer.users.error);
  const [sortedUsers, setSortedUsers] = useState(users);
  const [ascending, setAscending] = useState(true);
  const [editedUser, setEditedUser] = useState(null);

  const [selectedUserId, setSelectedUserId] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    setSortedUsers(users);
  }, [users]);

  const handleSort = () => {
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

  const handleEdit = (user) => {
    setEditedUser({ ...user });
  };

  const handleInputChange = (e, field) => {
  const { value } = e.target;
  setEditedUser((prevUser) => ({
    ...prevUser,
    name: {
      ...prevUser.name,
      [field]: value
    },
    dob: {
      ...prevUser.dob,
      [field]: value
    },
    location:{
      ...prevUser.location,
      [field]: value
    }
  }));
};

  const handleSave = () => {
    dispatch(updateUser(editedUser));
    setEditedUser(null); 
  };

  const handleCancel = () => {
    setEditedUser(null);
  };
  
  const confirmDelete = () => {
    if (selectedUserId.length > 0) {
      selectedUserId.forEach(userId => {
        dispatch(deleteUser(userId));
      });
      setSelectedUserId([]);
      setShowDeleteConfirmation(false);
    }
  };

   const handleCheckboxChange = (userId) => {
    if (selectedUserId.includes(userId)) {
      setSelectedUserId(prevIds => prevIds.filter(id => id !== userId));
    } else {
      setSelectedUserId(prevIds => [...prevIds, userId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedUserId.length === users.length) {
      setSelectedUserId([]);
    } else {
      setSelectedUserId(users.map((user) => user.login.uuid));
    }
  };

  const handleDelete = () => {
    setShowDeleteConfirmation(true);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {showDeleteConfirmation && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete the selected users?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={cancelDelete}>No</button>
        </div>
      )}
      <button className="button button--delete" onClick={handleDelete}>Delete</button>
      <button className='button button--sort' onClick={handleSort}>
        {ascending ? 'Ascending' : 'Descending'}
      </button>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedUserId.length === (users ? users.length : 0)}
                onChange={handleSelectAll}
              /></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Country</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.login.uuid}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedUserId.includes(user.login.uuid)}
                  onChange={() => handleCheckboxChange(user.login.uuid)}
                />
              </td>
              {editedUser && editedUser.login.uuid === user.login.uuid ? (
            <>
            <td>
              <input
                type="text"
                value={editedUser.name.first || ''}
                onChange={(e) => handleInputChange(e, 'first')}
              />
            </td>
            <td>
              <input
                type="text"
                value={editedUser.name.last || ''}
                onChange={(e) => handleInputChange(e, 'last')}
              />
            </td>
            <td>
              <input
                type="text"
                value={editedUser.dob.age || ''}
                onChange={(e) => handleInputChange(e, 'age')}
              />
              </td>
              <td>
              <input
                type="text"
                value={editedUser.location.country || ''}
                onChange={(e) => handleInputChange(e, 'country')}
              />
              </td>
            </>
          ) : (
            <>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.dob.age}</td>
              <td>{user.location.country}</td>
            </>
          )}
              <td>
                {editedUser && editedUser.login.uuid === user.login.uuid ? (
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

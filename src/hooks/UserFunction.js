import { useEffect, useState } from 'react';
import { fetchUsers, updateUser, deleteUser } from '../redux/api';
import { sortUsers } from '../redux/action/UserAction';
import { useDispatch, useSelector } from 'react-redux';

const UserFunction = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.UserReducer.users.users);
  const loading = useSelector((state) => state.UserReducer.users.loading);
  const error = useSelector((state) => state.UserReducer.users.error);
  const [ascending, setAscending] = useState(true);
  const [editedUser, setEditedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState([]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSort = () => {
    dispatch(sortUsers());
    setAscending(!ascending);
  };

  const handleEdit = (user) => {
    setEditedUser({ ...user });
  };

  const handleInputChange = (e, type, field) => {
  const { value } = e.target;
  setEditedUser((prevUser) => ({
    ...prevUser,
  [type]: {
      ...prevUser[type],
      [field]: value,
    },
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
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to delete the selected user(s)?')) {
        confirmDelete();
    }
  };

  return {
    users,
    loading,
    error,
    ascending,
    editedUser,
    selectedUserId,
    handleSort,
    handleEdit,
    handleInputChange,
    handleSave,
    handleCancel,
    confirmDelete,
    handleCheckboxChange,
    handleSelectAll,
    handleDelete,
  };
};

export default UserFunction;
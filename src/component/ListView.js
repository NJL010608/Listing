import UserFunction from '../hooks/UserFunction';
import '../css/userTable.scss';

const ListView = () => {
    const {
    users,
    loading,
    error,
    sortedUsers,
    ascending,
    editedUser,
    selectedUserId,
    handleSort,
    handleEdit,
    handleInputChange,
    handleSave,
    handleCancel,
    handleCheckboxChange,
    handleSelectAll,
    handleDelete,
  } = UserFunction();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleSort}>
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
                onChange={(e) => handleInputChange(e, 'name' , 'first')}
              />
            </td>
            <td>
              <input
                type="text"
                value={editedUser.name.last || ''}
                onChange={(e) => handleInputChange(e, 'name', 'last')}
              />
            </td>
            <td>
              <input
                type="number"
                value={editedUser.dob.age || ''}
                onChange={(e) => handleInputChange(e, 'dob', 'age')}
              />
              </td>
              <td>
              <input
                type="text"
                value={editedUser.location.country || ''}
                onChange={(e) => handleInputChange(e, 'location', 'country')}
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

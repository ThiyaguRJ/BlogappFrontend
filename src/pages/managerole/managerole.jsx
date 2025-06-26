import React, { useState } from "react";
import Delete from "../../assets/delete.png";
import Edit from "../../assets/edit.png";
import { BASE_API } from "../../service/baseservice";
import axios from "axios";
import { useEffect } from "react";

const USERS_PER_PAGE = 2;

const Managerole = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [usersall, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [changeRole, setChangeRole] = useState([]);


  const getAllUsers = async () => {
    try {
      const res = await axios.get(BASE_API.GET_ALL_USERS, {
        withCredentials: true,
      });


      if (res.data?.success) {
        console.log("Users fetched successfully");
        setUsers(res.data.data);
      }
    } catch (err) {
      throw new Error("Error fetching users: " + err.message);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const filteredUsers = usersall.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  const togglePopup = () => setIsOpen(!isOpen);

  const handleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSubmit = async(e) => {  
    e.preventDefault();

    try {
      const res = await axios.put(
        `${BASE_API.UPDATE_ROLE}/${changeRole._id}`,
        {
          role: selectedRole,
        },
        {
          withCredentials: true,                                             
        }
      );

      if (res.data.success) {
        console.log("Role changed successfully");
        getAllUsers(); 
        togglePopup();
      } else {
        togglePopup();
        console.error("Failed to change role");
      }
    } catch (err) {
      throw new Error("Error in changing role: " + err.message);
    }

  };

  const handleDelete = async(id) => {  
    try {
      const res = await axios.delete(
        `${BASE_API.DELETE_USER_ROLE}/${id}`,
      );

      if (res.data.success) {
        console.log("Role changed successfully");
        getAllUsers(); 
      } else {
        console.error("Failed to change role");
      }
    } catch (err) {
      throw new Error("Error in changing role: " + err.message);
    }

  };

  const handleChangeRole = (user) => {
    setChangeRole(user);
    setSelectedRole(user.role);
    togglePopup();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Manage User Roles</h1>

      <div className="mb-4 flex justify-end">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name or email"
          className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3 border-b">S.No</th>
              <th className="text-left p-3 border-b">Name</th>
              <th className="text-left p-3 border-b">Email</th>
              <th className="text-left p-3 border-b">Role</th>
              <th className="text-left p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">
                    {(currentPage - 1) * USERS_PER_PAGE + index + 1}
                  </td>
                  <td className="p-3 border-b">{user.username}</td>
                  <td className="p-3 border-b">{user.email}</td>
                  <td className="p-3 border-b">
                    {user.role === "reader" ? "Reader" : user.role === undefined ? "" : "Author" }
                  </td>
                  <td className="p-3 border-b flex flex-row w-[150px]">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                      onClick={() => handleChangeRole(user)}>
                      <img src={Edit} />
                    </button>
                    <button onClick={() => handleDelete(user?._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex justify-center text-center">
                      <img src={Delete}  />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-3 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}>
          Previous
        </button>

        <div>
          <span className="text-sm mr-5">
            Page {currentPage} of {totalPages || 1}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages || totalPages === 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}>
            Next
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-sm p-6">
            <h2 className="text-lg font-bold mb-4">Select Role</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1 font-medium" htmlFor="role">
                  Role
                </label>
                <select
                  id="role"
                  value={selectedRole}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required>
                  <option value="">Select a role</option>
                  <option value="author">Author</option>
                  <option value="reader">Reader</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={togglePopup}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Managerole;

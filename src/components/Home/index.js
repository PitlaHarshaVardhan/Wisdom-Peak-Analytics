import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Header from "../Header";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const Home = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [sortDirection, setSortDirection] = useState("asc");

  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
      setApiStatus(apiStatusConstants.success);
    } else {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const onSearchInputChange = (event) => {
    const input = event.target.value.toLowerCase();
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(input)
    );
    setSearchInput(input);
    setFilteredUsers(filtered);
  };

  const onSortUsers = () => {
    const sorted = [...filteredUsers].sort((a, b) =>
      sortDirection === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    setFilteredUsers(sorted);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  return (
    <div>
      <Header />
      <div className="home-page">
        <div className="search-container">
          <input
            type="search"
            value={searchInput}
            onChange={onSearchInputChange}
            placeholder="Search by name"
            className="search-input"
          />
          <button type="button" className="sort-button" onClick={onSortUsers}>
            Sort
          </button>
        </div>
        {apiStatus === apiStatusConstants.inProgress && (
          <div className="loads">
            <ClipLoader
              size={150}
              color={"#36d7b7"}
              loading={true} // Pass the loading state here
            />
          </div>
        )}
        {apiStatus === apiStatusConstants.failure && (
          <p>Failed to fetch data</p>
        )}
        {apiStatus === apiStatusConstants.success &&
          (filteredUsers.length === 0 ? (
            <h1>data not found</h1>
          ) : (
            <ul className="user-list">
              {filteredUsers.map((user, index) => (
                <li key={user.id} className="user-item">
                  <div className="user-item-content">
                    <div className="users-cont">
                      <img
                        src={`https://api.dicebear.com/6.x/personas/svg?seed=${user.name}&style=formal&scale=80`}
                        alt={`${user.name}'s avatar`}
                        className="user-avatar"
                      />

                      <div>
                        <p>
                          <span className="spans">Name:</span> {user.name}
                        </p>
                        <p>
                          <span className="spans">Email:</span> {user.email}
                        </p>
                        <p>
                          <span className="spans">City:</span>{" "}
                          {user.address.city}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate(`/user/${user.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ))}
      </div>
    </div>
  );
};

export default Home;

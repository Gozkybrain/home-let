import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import "../styles/Users.css";
import Loading from "../components/loading";
import dummy from "../assets/fiat.png";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchT, setSearchT] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersQuery = query(collection(db, "users"));
        const querySnapshot = await getDocs(usersQuery);
        const usersList = querySnapshot.docs.map((doc) => {
          const userData = doc.data();
          const userId = doc.id;

          return {
            id: userId,
            fullName: userData.fullName || "Unknown User",
            email: userData.email || "No Email",
            profilePhotoUrl: userData.profilePhotoUrl || dummy,
            role: userData.role || "Customer",
          };
        });

        setUsers(usersList);
        setFilteredUsers(usersList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users: ", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) => {
      const fullName = user.fullName ? user.fullName.toLowerCase() : "";
      const email = user.email ? user.email.toLowerCase() : "";
      return (
        fullName.includes(searchT.toLowerCase()) ||
        email.includes(searchT.toLowerCase())
      );
    });
    setFilteredUsers(filtered);
  }, [searchT, users]);

  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="allUsersContainer">
      <div className="searchContainer">
        <h1 className="usersTitle">All Users</h1>
        <input
          className="search"
          type="text"
          placeholder="Search users..."
          value={searchT}
          onChange={(e) => setSearchT(e.target.value)}
        />
      </div>

      {filteredUsers.length > 0 ? (
        <div className="usersList">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="userRow"
              onClick={() => handleUserClick(user.id)}
            >
              <img
                src={user.profilePhotoUrl}
                alt="Profile"
                className="profilePic"
              />
              <div className="userDetailsFlex">
                <p className="userDetail">{user.fullName}</p>
                <p className="userDetail">{user.email}</p>
                <p className="userDetail">{user.role}</p>
              </div>
            </div>
          ))}
          <div className="totalUsersCountContainer">
            <h2 className="totalUsers">Total Users</h2>
            <span className="userCount">{users.length}</span>
          </div>
        </div>
      ) : (
        <p className="noUsers">No users found</p>
      )}
    </div>
  );
};

export default AllUsers;

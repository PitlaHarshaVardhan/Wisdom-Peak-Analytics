import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Header from "../Header";
import "./index.css";

class UserDetailPage extends Component {
  state = {
    user: null,
    isLoading: true,
    error: null,
  };

  componentDidMount() {
    const { userId } = this.props;
    this.fetchUserDetails(userId);
  }

  fetchUserDetails = async (userId) => {
    const apiUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;
    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const user = await response.json();
        this.setState({ user, isLoading: false });
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  };

  render() {
    const { user, isLoading, error } = this.state;

    if (isLoading) {
      return (
        <div className="loads1">
          <ClipLoader size={150} color={"#36d7b7"} loading={true} />
        </div>
      );
    }

    if (error) {
      return <p>{error}</p>;
    }

    if (!user) {
      return <p>User not found</p>;
    }

    const { name, email, phone, company, website } = user;

    return (
      <div>
        <Header />
        <div className="user-detail-container">
          <div className="profile-photo">
            <img
              src="https://i.pinimg.com/736x/b1/88/c6/b188c6801ad1d71d3c962c6e4aa2d0cf.jpg"
              alt={`${name}'s profile`}
            />
          </div>
          <h1>User Details</h1>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Phone:</strong> {phone}
          </p>
          <p>
            <strong>Company:</strong> {company.name}
          </p>
          <p>
            <strong>Website:</strong>{" "}
            <a
              href={`https://${website}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {website}
            </a>
          </p>
          <Link to="/">
            <button type="button" className="back-button">
              Go Back
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const Details = () => {
  const { userId } = useParams();
  return <UserDetailPage userId={userId} />;
};

export default Details;

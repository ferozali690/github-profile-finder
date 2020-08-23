import React, { Component } from "react";
import Axios from "axios";
import "./Profile.css";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      users: [],
      usersRepo: [],
      repo: false,
    };
  }
  handleChange = (e) => {
    this.setState({ username: e.target.value });
  };
  componentDidMount() {
    this.handleSearch();
  }
  handleSearch = () => {
    Axios.get(
      `https://api.github.com/search/users?q=${this.state.username}`
    ).then((res) => {
      this.setState({ users: res.data.items });
      this.setState({ username: "" });
    });
  };
  handleUserRepo = (login) => {
    Axios.get(`https://api.github.com/users/${login}/repos`).then((res) => {
      this.setState({ usersRepo: res.data });
      this.setState({ repo: true });
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
  };
  render() {
    const { users, usersRepo, repo } = this.state;

    return (
      <div className="profile">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.username}
            onChange={this.handleChange}
            placeholder="Enter UserName"
          />
          <input type="submit" value="submit" onClick={this.handleSearch} />
        </form>
        <ul className="users">
          {users.map((item) => (
            <div className="users_container" key={item.id}>
              <li
                className="user_container_list"
                onClick={() => this.handleUserRepo(item.login)}
              >
                <img
                  src={item.avatar_url}
                  alt={item.login}
                  width="25px"
                  height="25px"
                />
                {item.login}
              </li>
            </div>
          ))}
        </ul>
        <div className="repo_container">
          {repo && (
            <h3 className="repo_heading">
              Repository
              <span className="repo_count">({usersRepo.length})</span>
            </h3>
          )}

          {usersRepo.map((item) => (
            <div className="users_repo_container" key={item.id}>
              <li className="users_repo_list">
                <span>
                  <h5>Repository Name</h5>
                  <span className="repo_name">{item.name}</span>
                </span>
                <br />
                <span>
                  <h5>Date</h5>
                  <span className="repo_date">{item.created_at}</span>
                </span>
              </li>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

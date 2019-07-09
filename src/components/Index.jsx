import React, { Component } from "react";
import { getPosts } from "../services/api";
import { Link } from "react-router-dom";

class Index extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    var self = this;
    getPosts().then(function(json) {
      self.setState({ posts: json });
    });
  }

  render() {
    var posts = this.state.posts.map((post, idx) => {
      return (
        <li key={idx}>
          <Link to={`/posts/${post._id}`}>{post.title}</Link>
          <p>Upvotes: {post.upvotes}</p>
          <a href="#" className="btn btn-success">
            Upvote
            <i className="fa fa-thumbs-up" />
          </a>
          &nbsp; &nbsp;
          <a href="#" className="btn btn-danger">
            Downvote <i className="fa fa-thumbs-down" />
          </a>
        </li>
      );
    });
    return (
      <div>
        <h2>React Hacker News</h2>
        <hr />
        <br />
        <ul>{posts}</ul>
      </div>
    );
  }
}

export default Index;

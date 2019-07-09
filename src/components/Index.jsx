import React, { Component } from "react";
import { getPosts, upvotePost } from "../services/api";
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

  handleUpvote = (id, type) => {
    var self = this;

    upvotePost(id, type).then(function(json) {
      getPosts().then(function(json) {
        self.setState({ posts: json });
      });
    });
  };

  handleDownvote = (id, type) => {
    var self = this;

    upvotePost(id, type).then(function(json) {
      getPosts().then(function(json) {
        self.setState({ posts: json });
      });
    });
  };

  render() {
    var posts = this.state.posts.map((post, idx) => {
      return (
        <li key={idx}>
          <Link to={`/posts/${post._id}`}>{post.title}</Link>
          <p>Upvotes: {post.upvotes}</p>
          <a
            href="#"
            onClick={() => this.handleUpvote(post._id, "upvote")}
            className="btn btn-success"
          >
            Upvote
            <i className="fa fa-thumbs-up" />
          </a>
          &nbsp; &nbsp;
          <a
            href="#"
            onClick={() => this.handleDownvote(post._id, "downvote")}
            className="btn btn-danger"
          >
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

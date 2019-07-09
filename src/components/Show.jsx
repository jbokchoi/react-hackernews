import React, { Component } from "react";
import { getPost, addComment, upvotePost, deletePost } from "../services/api";
import { Link } from "react-router-dom";

class Show extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      title: "",
      body: "",
      comments: [],
      commentBody: "",
      upvotes: ""
    };
  }

  componentDidMount() {
    var id = this.props.match.params.id;
    var self = this;

    getPost(id).then(function(post) {
      self.setState({
        id: post._id,
        title: post.title,
        body: post.body,
        comments: post.comments,
        upvotes: post.upvotes
      });
    });
  }

  handleSubmit = e => {
    var self = this;
    e.preventDefault();
    addComment(this.state.id, this.state.commentBody).then(function(json) {
      getPost(self.state.id).then(function(post) {
        self.setState({
          id: post._id,
          title: post.title,
          body: post.body,
          comments: post.comments,
          commentBody: "",
          upvotes: post.upvotes
        });
      });
    });
  };

  handleCommentBody = e => {
    this.setState({ commentBody: e.target.value });
  };

  handleUpvote = (id, type) => {
    var self = this;

    upvotePost(id, type).then(function(json) {
      getPost(id).then(function(post) {
        self.setState({
          id: post._id,
          title: post.title,
          body: post.body,
          comments: post.comments,
          commentBody: "",
          upvotes: post.upvotes
        });
      });
    });
  };

  handleDownvote = (id, type) => {
    var self = this;

    upvotePost(id, type).then(function(json) {
      getPost(id).then(function(post) {
        self.setState({
          id: post._id,
          title: post.title,
          body: post.body,
          comments: post.comments,
          commentBody: "",
          upvotes: post.upvotes
        });
      });
    });
  };

  handleDelete = id => {
    deletePost(id).then(function(json) {
      window.location = "/";
    });
  };

  render() {
    var comments = this.state.comments.map((comment, idx) => {
      return <li key={idx}>{comment.body}</li>;
    });
    return (
      <div>
        <br />
        <h2>{this.state.title}</h2>
        <br />
        <p>{this.state.body}</p>
        <Link to={`/posts/${this.state.id}/edit`} className="btn btn-secondary">
          Edit Post
        </Link>
        &nbsp; &nbsp;
        <a
          href="#"
          onClick={() => this.handleDelete(this.state.id)}
          className="btn btn-info"
        >
          Delete Post
          <i className="fa fa-trash" />
        </a>
        <br />
        <br />
        <br />
        <hr />
        <p>Upvotes: {this.state.upvotes}</p>
        <a
          href="#"
          onClick={() => this.handleUpvote(this.state.id, "upvote")}
          className="btn btn-success"
        >
          Upvote
          <i className="fa fa-thumbs-up" />
        </a>
        &nbsp; &nbsp;
        <a
          href="#"
          onClick={() => this.handleDownvote(this.state.id, "downvote")}
          className="btn btn-danger"
        >
          Downvote <i className="fa fa-thumbs-down" />
        </a>
        <br />
        <hr />
        {this.state.comments.length <= 0 ? (
          <h3>No Comments</h3>
        ) : (
          <ul>{comments}</ul>
        )}
        <br />
        <hr />
        <form onSubmit={this.handleSubmit}>
          <label>Add Comment</label>
          <br />
          <textarea
            onChange={this.handleCommentBody}
            value={this.state.CommentBody}
          />
          <br />
          <input type="submit" value="Add Comment" className="btn btn-dark" />
        </form>
      </div>
    );
  }
}

export default Show;

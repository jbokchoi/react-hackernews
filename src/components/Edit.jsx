import React, { Component } from "react";
import { getPost, editPost } from "../services/api";

class Edit extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      title: "",
      body: ""
    };
  }

  componentDidMount() {
    var id = this.props.match.params.id;
    var self = this;

    getPost(id).then(function(post) {
      self.setState({
        id: post._id,
        title: post.title,
        body: post.body
      });
    });
  }

  handleSubmit = e => {
    var self = this;
    e.preventDefault();
    editPost(this.state).then(function(json) {
      window.location = `/posts/${self.state.id}`;
    });
  };

  handleTitle = e => {
    this.setState({ title: e.target.value });
  };

  handleBody = e => {
    this.setState({ body: e.target.value });
  };

  render() {
    return (
      <div>
        <h1>Edit Post</h1>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <label>Post Title</label>
          <br />
          <input onChange={this.handleTitle} value={this.state.title} />
          <br />
          <br />

          <label>Post Body</label>
          <br />
          <textarea onChange={this.handleBody} value={this.state.body} />
          <br />
          <br />
          <input
            type="submit"
            className="btn btn-primary"
            value="Submit Post"
          />
        </form>
      </div>
    );
  }
}

export default Edit;

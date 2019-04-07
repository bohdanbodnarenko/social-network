import React, { Component } from "react";
import SinglePost from "../../components/SinglePost/SinglePost";
import Spinner from "../../UI/Spinner/Spinner";
import { getPost } from "../../utils/requests";

export class PostPage extends Component {
  state = {
    post: this.props.post,
    currentPostId: this.props.match.params.postId
  };

  componentDidMount = async () => {
    const { data } = await getPost(this.state.currentPostId);
    this.setState({ post: data.post });
  };

  render() {
    const { post } = this.state;
    if (!post) {
      return <Spinner />;
    }
    return <SinglePost post={post} />;
  }
}

export default PostPage;

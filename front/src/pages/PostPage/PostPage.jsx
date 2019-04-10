import React, { Component } from "react";
import SinglePost from "../../components/SinglePost/SinglePost";
import Spinner from "../../UI/Spinner/Spinner";
import { connect } from "react-redux";
import { getPostById } from "../../store/posts/actions";

class PostPage extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.postId);
  }

  render() {
    const { post } = this.props;
    if (!post) {
      return <Spinner />;
    }
    return <SinglePost withComments post={post} />;
  }
}

const mapStateToProps = ({ posts }) => ({
  post: posts.selectedPost
});

const mapDispatchToProps = dispatch => ({
  getPost: id => dispatch(getPostById(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPage);

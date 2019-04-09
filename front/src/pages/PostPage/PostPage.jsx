import React from "react";
import SinglePost from "../../components/SinglePost/SinglePost";
import Spinner from "../../UI/Spinner/Spinner";
import { connect } from "react-redux";
import { getPostById } from "../../store/posts/actions";

const PostPage = props => {
  props.getPost(props.match.params.postId);

  const { post } = props;
  if (!post) {
    return <Spinner />;
  }
  return <SinglePost withComments post={post} />;
};

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

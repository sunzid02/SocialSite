import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getPost } from '../../actions/postAction'; // Uncomment if you need to fetch a specific post
import { Link, useParams } from 'react-router-dom';
import Spinner from '../layout/Spinner'; // Uncomment if you want to show a spinner while loading
import { useEffect, Fragment } from 'react';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';

const Post = ({  getPost, post: {post, loading} }) => {
  const { id } = useParams(); // Get post ID from route

  useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back to Posts
      </Link>
      <PostItem post={post} showActions={false} />
      {/* Comments Section */}
      <div className="comments">
        <h3>Comments</h3>
        <CommentForm postId={post._id} />

        {post.comments && post.comments.length > 0 ? (
          post.comments.map(comment => (
            <div key={comment._id} className="comment" style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <img
                src={comment.avatar}
                alt={comment.name}
                style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '1rem' }}
              />
              <p style={{ margin: 0 }}>
                <strong>{comment.name}:</strong> {comment.text}
              </p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </Fragment>
  );


}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post,

});

export default connect(mapStateToProps, { getPost })(Post);

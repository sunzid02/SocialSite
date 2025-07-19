import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postAction'
import Spinner from '../layout/Spinner'


const Posts = ({getPosts, post: {posts, loading}}) => {

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div>
      {loading ? <Spinner /> : (
        <Fragment>
          {posts.map(post => (
            <div key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ))}
        </Fragment>
      )}
    </div>
  )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);


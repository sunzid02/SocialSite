import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postAction'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem';
import PostForm from './PostForm';


const Posts = ({getPosts, post: {posts, loading}}) => {

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div>
      {loading ? <Spinner /> : (
        <Fragment>
        <div className='ppost'>'
            <h1 className='large text-primary'> Posts </h1>
            <p className='lead'>
            <i className='fas fa-user' /> Welcome to the community </p>

            {/* post form */}
            <PostForm/>

            <div className='posts'>
                {posts.map(post => (
                  <PostItem key={post._id} post={post} />
                ))}
            </div>
          </div>
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


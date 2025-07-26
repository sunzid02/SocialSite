import React, { useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addPost } from '../../actions/postAction';

const PostForm = ({addPost, auth: {user: {name, avatar}}  }) => {
  const [text, setText] = useState('');
  
  return (
    <div className="post-form">
        <div className="post-form-header bg-primary">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1" onSubmit={e => {
            e.preventDefault();
            addPost({ text, name, avatar });
            setText('');
        }}>
          <textarea cols="30" rows="5" placeholder="Create a post"
            value={text}
            onChange={e => setText(e.target.value)}
          ></textarea>
          <input type="submit" value="Submit" className="btn btn-dark my-1" />
          <input type="hidden" name="name" value={name} />
          <input type="hidden" name="avatar" value={avatar} />
        </form>
    </div>
  )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addPost })(PostForm);

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../../actions/postAction'


const CommentForm = ({addComment, postId, auth:{user: {name, avatar}}}) => {
  const [text, setText] = useState('');

//   const onSubmit = e => {
//     e.preventDefault()
//     addComment(postId, { text })
//     setText('')
//   }

  return (
    <div className="post-form">
        <div className="post-form-header bg-primary">
          <h3>Leave a comment...</h3>
        </div>
        <form className="my-1"  onSubmit={e => {
            e.preventDefault();
            addComment(postId,  { text, name, avatar });
            setText('');
        }}>
          <textarea cols="30" rows="5" placeholder="Your comment"
            value={text}
            onChange={e => setText(e.target.value)}
          ></textarea>
          <br />
          <input type="hidden" name="name" value={name} />
          <input type="hidden" name="avatar" value={avatar} />
          <input type="submit" value="Submit" className="btn btn-dark my-1" />
        </form>
    </div>
  )
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addComment })(CommentForm)

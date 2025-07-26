import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../../actions/postAction'


const CommentForm = ({addComment, postId}) => {
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
            addComment(postId,  { text });
            setText('');
        }}>
          <textarea cols="30" rows="5" placeholder="Your comment"
            value={text}
            onChange={e => setText(e.target.value)}
          ></textarea>
          <br />
          <input type="submit" value="Submit" className="btn btn-dark my-1" />
        </form>
    </div>
  )
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
}

export default connect(null, { addComment })(CommentForm)

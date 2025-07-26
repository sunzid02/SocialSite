import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import moment from 'moment';
import { deleteComment } from '../../actions/postAction'; // Import deleteComment action

const CommentItem = ({ 
    comment: { _id, text, name, avatar, user, date }, 
    postId ,
    auth,
    deleteComment
}) => {
  return (
        <div class="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img
                class="round-img"
                src={avatar}
                alt={name}
                style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '1rem' }}
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p class="my-1">
              {text}
            </p>
            <p class="post-date">
             Posted on {moment(date).format('DD.MM.YYYY')}
            </p>

            {user === auth.user.id ? (
              <button onClick={() => deleteComment(postId, _id)} type="button" className="btn btn-danger">
                <i className="fas fa-times"></i>
              </button>
            ) : (
                ' '
            )}
          </div>
        </div>
  )
}



CommentItem.propTypes = {
    postId: PropTypes.number.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  // You can map state to props if needed
  auth: state.auth
});


export default connect(mapStateToProps, {  deleteComment })(CommentItem)

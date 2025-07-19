import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';

const PostItem = ({auth, post:{_id, text, name, avatar, user, likes, comments, date}}) => 
         ( <div className="post bg-white my-1 p-1">
            <div>
              <a href="profile.html">
                <img
                  className="round-img"
                  src={avatar}
                  alt={name}
                />
                <h4>{name}</h4>
              </a>
            </div>

            <div>
              <p className="my-1">
                {text}
              </p>
              <p className="post-date">
               Posted on {moment(date).format('YYYY/MM/DD')}
              </p>
              <button className="btn">
                <i className="fas fa-thumbs-up"></i> <span>{likes.length > 0 && <span className='like-count'> {likes.length}</span>}</span>
              </button>
              <button className="btn">
                <i className="fas fa-thumbs-down"></i>
              </button>
                <Link to={`/post/${_id}`} className="btn btn-primary">
                    Discussion {comments.length > 0 && <span className='comment-count'>{comments.length}</span>}
                </Link>

                { !auth.loading && user === auth.user._id && (
                  <Fragment>
                    <button type="button" className="btn btn-danger">
                      <i className="fas fa-times"></i>
                    </button>
                  </Fragment>
                )}
            </div>

          </div>
          )


PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    // add any other prop types you need
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(PostItem);

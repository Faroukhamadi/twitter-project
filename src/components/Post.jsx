import portrait from '../images/portrait.png';
import { ReactComponent as Dots } from '../images/dots.svg';
import { ReactComponent as Comment } from '../images/comment.svg';
import { ReactComponent as Retweet } from '../images/retweet.svg';
import { ReactComponent as Like } from '../images/like.svg';
import { ReactComponent as Upload } from '../images/Upload.svg';

const Post = () => {
  return (
    <div className="post-container">
      <div className="post-img-container">
        <img src={portrait} alt="portrait" />
      </div>
      <div className="post-info">
        <div className="post-info-header">
          <p>
            <span className="name">Farouk</span>{' '}
            <span className="at">@Farouk</span>{' '}
            <span className="date">Sun Jan 04 2022</span>
          </p>
          <div className="svg-container">
            <Dots className="dots" alt="dots" />
          </div>
        </div>
        <div className="post-info-text">
          <p>Hello there homie.</p>
        </div>
        <div className="post-info-reactions">
          <div className="svg-container">
            <Comment className="comment" alt="comment" />
          </div>
          <div className="svg-container">
            <Retweet className="retweet" alt="retweet" />
          </div>
          <div className="svg-container">
            <Like className="like" alt="like" />
          </div>
          <div className="svg-container">
            <Upload className="upload" alt="upload" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

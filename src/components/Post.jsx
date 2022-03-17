import portrait from '../images/portrait.png';
import nardine from '../images/nardine.jpg';
import empty from '../images/empty.jpg';
import mihyar from '../images/mihyar.jpg';
import { ReactComponent as Dots } from '../images/dots.svg';
import { ReactComponent as Comment } from '../images/comment.svg';
import { ReactComponent as Retweet } from '../images/retweet.svg';
import { ReactComponent as Like } from '../images/like.svg';
import { ReactComponent as Upload } from '../images/Upload.svg';
import { storage } from '../firebase-config.js';
import { getDownloadURL, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';

const Post = (props) => {
  const [image, setImage] = useState();
  useEffect(() => {
    const emptyReference = ref(
      storage,
      'gs://twitter-project-a2bb5.appspot.com/empty.jpg'
    );

    const faroukReference = ref(
      storage,
      'gs://twitter-project-a2bb5.appspot.com/farouk.png'
    );
    const mihyarReference = ref(
      storage,
      'gs://twitter-project-a2bb5.appspot.com/mihyar.jpg'
    );
    const nardineReference = ref(
      storage,
      'gs://twitter-project-a2bb5.appspot.com/nardine.jpg'
    );

    let referenceToLookFor = '';
    switch (props.userName.toLowerCase()) {
      case 'farouk':
        referenceToLookFor = faroukReference;
        break;
      case 'mihyar':
        referenceToLookFor = mihyarReference;
        break;
      case 'nardine':
        referenceToLookFor = nardineReference;
        break;
      default:
        referenceToLookFor = emptyReference;
        break;
    }

    getDownloadURL(referenceToLookFor)
      .then((url) => {
        console.log(url);
        setImage(url);
      })
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <div className="post-container">
      <div className="post-img-container">
        <img src={image} alt="portrait" />
      </div>
      <div className="post-info">
        <div className="post-info-header">
          <p>
            <span className="name">{props.userName}</span>{' '}
            <span className="at">@{props.userAt}</span>{' '}
            <span className="date">{props.date}</span>
          </p>
          <div className="svg-container">
            <Dots className="dots" alt="dots" />
          </div>
        </div>
        <div className="post-info-text">
          <p>{props.text}</p>
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

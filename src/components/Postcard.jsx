import {
  RiHeartFill,
  RiHeartLine,
  RiChat3Line,
  RiBookmarkLine,
} from "@remixicon/react";
const Postcard = ({ username, date, title, post, likes, comments }) => {
  return (
    <div className="post-card" id="single-post-sec">
      <div className="post-meta">
        <span>✍ {username}</span>
        <span>{date}</span>
      </div>
      <h1>{title}</h1>
      <p>{post}</p>

      <div className="post-actions">
        <button>
          {likes.length !== 0 ? <RiHeartFill /> : <RiHeartLine />}
        </button>
        <p>{likes.length}</p>

        <button>
          <RiChat3Line />
        </button>
        <p>{comments.length}</p>

        <button>
          <RiBookmarkLine />
        </button>
      </div>
    </div>
  );
};

export default Postcard;

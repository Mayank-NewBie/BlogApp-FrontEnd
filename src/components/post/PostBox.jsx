import { Link } from "react-router-dom"
import { RiHeartFill, RiHeartLine, RiChat3Line, RiBookmarkLine, RiDeleteBinFill } from "@remixicon/react"
import CommentContainer from "./CommentContainer"
const PostBox = ({item,isliked,likeCount,commentCount,activePostId,commentPopOpen,messages, setMessages, comment, setActivePostId, like, deletePost}) => {
  return (
    <div
      className="post-card">
      <div className="post-meta">
        <span>✍ {item.user.username}</span>
        <span>{Date(item.updatedAt).substring(0, 21)}</span>
      </div>

      <h1>
        <Link to={`/singlePost/${item._id}`}>
          {item.title}
        </Link>
      </h1>
      <p>{item.post}</p>


      <div className="action-container">
        <div className="post-actions">
          <button onClick={() => {
            like(item._id)
          }}>
            {isliked ?
              <RiHeartFill />
              :
              <RiHeartLine />}
          </button>

          <p>{likeCount}</p>

          <button onClick={() => {
            commentPopOpen(item._id)
          }}>
            <RiChat3Line />
          </button>
          <p>{commentCount}</p>
          <button><RiBookmarkLine /></button>
        </div>
        <div className="bin-section">
          <button onClick={() => {
            deletePost(item._id)
          }}>
            <RiDeleteBinFill />
          </button>
        </div>

      </div>
      {activePostId === item._id ?
        <CommentContainer item={item} commentPopOpen={commentPopOpen} messages={messages} setMessages={setMessages} comment={comment} setActivePostId={setActivePostId} activePostId={activePostId}/>
        :
        null
      }

    </div>
  )
}

export default PostBox

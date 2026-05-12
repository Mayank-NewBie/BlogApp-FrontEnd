import {
  RiDeleteBin2Fill,
  RiCheckLine,
  RiCloseLine,
  RiEditLine,
} from "@remixicon/react";

const CommentItem = ({
  item,
  deleteComment,
  setEditText,
  editText,
  editPost,
  setIsCommentId,
  isCommentId,
  postId,
}) => {
  return (
    <div className="comment-top-insider">
      <div className="comment-header">
        <span>✍ {item.user.username}</span>
        <button
          onClick={() => {
            deleteComment(item._id);
          }}
        >
          <RiDeleteBin2Fill size={22} />
        </button>
      </div>

      {isCommentId === item._id ? (
        <div className="edit-comment">
          <input
            type="text"
            className="edit-comment-input"
            placeholder="Edit Your Comment"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button
            onClick={() => {
              editPost(postId, item._id);
            }}
          >
            <RiCheckLine size={28} />
          </button>
          <button
            onClick={() => {
              setIsCommentId(null);
            }}
          >
            <RiCloseLine />
          </button>
        </div>
      ) : (
        <>
          <p>{item.text}</p>
        </>
      )}

      {isCommentId !== item._id ? (
        <button
          onClick={() => {
            setIsCommentId(item._id);
            setEditText(item.text);
          }}
        >
          <RiEditLine />
        </button>
      ) : null}
    </div>
  );
};

export default CommentItem;

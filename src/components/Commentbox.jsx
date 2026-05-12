import api from "../api/axios";
import CommentItem from "./CommentItem";
import toast from "react-hot-toast";

const Commentbox = ({
  comments,
  setComments,
  isCommentId,
  setIsCommentId,
  editText,
  setEditText,
  postId,
  user,
}) => {
  const deleteComment = async (commentId) => {
    try {
      await api.delete(`/post/${postId}/${commentId}/deleteComment`);

      const updatedComment = comments.filter((item) => item._id !== commentId);

      setComments(updatedComment);

      toast.success("Comment Deleted");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const editPost = async (postId, commentId) => {
    if (!user) return;
    try {
      await api.put(`/post/${postId}/${commentId}/editComment`, {
        text: editText,
      });

      const updatedComment = comments.map((item) =>
        item._id === commentId ? { ...item, text: editText } : item,
      );
      setComments(updatedComment);
      setIsCommentId(null);

      toast.success("Comment Edited");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="comment-section">
      <h1 className="comment-heading">Comments</h1>
      <main>
        {comments.length !== 0 ? (
          comments.map((item) => (
            <div key={item._id} className="comment-top">
              <CommentItem
                item={item}
                deleteComment={deleteComment}
                setEditText={setEditText}
                editText={editText}
                editPost={editPost}
                setIsCommentId={setIsCommentId}
                isCommentId={isCommentId}
                postId={postId}
              />
            </div>
          ))
        ) : (
          <h1 className="No-Comment-Section">No Comment</h1>
        )}
      </main>
    </div>
  );
};

export default Commentbox;

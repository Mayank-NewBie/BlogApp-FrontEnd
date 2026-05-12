import api from "../api/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Postcard from "../components/Postcard";
import Commentbox from "../components/Commentbox";
import toast from "react-hot-toast";
const SinglePostPage = ({ user }) => {
  const { postId } = useParams();
  const [singlePost, setSinglePost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isCommentId, setIsCommentId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/post/${postId}`);
        setSinglePost(res.data);
        setComments(res.data.singlePost.comments);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchPost();
  }, [postId]);

  if (!singlePost) return <h1>Loading...</h1>;

  const username = singlePost.singlePost.user.username;
  const date = Date(singlePost.singlePost.updatedAt).substring(0, 16);
  const title = singlePost.singlePost.title;
  const post = singlePost.singlePost.post;
  const likes = singlePost.singlePost.likes;

  return (
    <div>
      <Navbar username={username} />
      <Postcard
        username={username}
        date={date}
        title={title}
        post={post}
        likes={likes}
        comments={comments}
      />
      <Commentbox
        comments={comments}
        isCommentId={isCommentId}
        setIsCommentId={setIsCommentId}
        setComments={setComments}
        setEditText={setEditText}
        editText={editText}
        postId={postId}
        user={user}
      />
    </div>
  );
};

export default SinglePostPage;

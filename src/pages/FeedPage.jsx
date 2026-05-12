import api from "../api/axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CreatePost from "../components/post/CreatePost";
import FeedSearch from "../components/post/FeedSearch";
import PostBox from "../components/post/PostBox";
import toast from "react-hot-toast";

const FeedPage = ({ user }) => {
  const [allPost, setAllPost] = useState([]);
  const [postPop, setpostPop] = useState(false);
  const [activePostId, setActivePostId] = useState(null);
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [messages, setMessages] = useState({});

  const getPost = async () => {
    const res = await api.get("/post/");
    setAllPost(res.data.allPost);
  };

  const createPost = async (e) => {
    e.preventDefault();
    try {
      const data = { title, post };
      const res = await api.post("/post/", data);
      toast.success("Post Created");
    } catch (error) {
      toast.error(error.response.data.message);
    }

    getPost();
  };

  const postPopOpen = () => {
    setpostPop(true);
  };

  const commentPopOpen = (postId) => {
    setActivePostId(postId);
  };

  const like = async (postId) => {
    if (!user) return; //dont run if not authenticated
    try {
      const res = await api.post(`/post/${postId}/like`, {});
      getPost();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const comment = async (postId, msg) => {
    if (activePostId !== postId) return; //No Wrong Firing of req
    if (!user) return; //dont run if not authenticated
    if (!msg || !msg.trim()) return;
    try {
      const res = await api.post(`/post/${postId}/comment`, { text: msg });

      setMessages((prev) => ({
        ...prev,
        [postId]: "",
      }));

      setActivePostId(null);
      getPost(); //refresh post and comment
      toast.success("Comment Posted");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deletePost = async (postId) => {
    try {
      const res = await api.delete(`/post/${postId}`);
    } catch (error) {
      toast.error(error.response.data.message);
    }

    getPost();
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="feed-container">
      <Navbar username={user.username} />

      <CreatePost
        postPop={postPop}
        user={user}
        createPost={createPost}
        setpostPop={setpostPop}
        setTitle={setTitle}
        setPost={setPost}
        postPopOpen={postPopOpen}
        title={title}
        post={post}
      />

      <FeedSearch />

      <h2 className="feed-title">Your Feed</h2>

      <main className="feed-posts">
        {allPost.length ? (
          allPost.map((item) => {
            const isliked = item.likes.some((id) => id.toString() === user._id);
            const likeCount = item.likes.length;
            const commentCount = item.comments.length;
            return (
              <div key={item._id}>
                <PostBox
                  item={item}
                  isliked={isliked}
                  likeCount={likeCount}
                  commentCount={commentCount}
                  activePostId={activePostId}
                  commentPopOpen={commentPopOpen}
                  messages={messages}
                  setMessages={setMessages}
                  comment={comment}
                  setActivePostId={setActivePostId}
                  like={like}
                  deletePost={deletePost}
                />
              </div>
            );
          })
        ) : (
          <h1 className="No-Post-Section">No Post Available</h1>
        )}
      </main>
    </div>
  );
};

export default FeedPage;

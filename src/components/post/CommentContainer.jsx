const CommentContainer=({item,messages,setMessages, comment, setActivePostId, activePostId})=>{
  return(
    <div className="comment-container">
          <div className="span-container">
            <span>✍ {item.user.username}</span>
            <span>{Date(item.updatedAt).substring(0, 16)}</span>
          </div>
          <input type="text" placeholder="Write Your Comment" value={messages[item._id] || ''} onChange={(e) => {
            setMessages(prev => ({
              ...prev,
              [item._id]: e.target.value
            }))
          }} />
          <button type="button" onClick={(e) => {
            const msg = messages[item._id]
            e.stopPropagation()
            if (!activePostId) return
            comment(item._id, msg)
          }}>
            comment
          </button>
          <span
            className="close-btn"
            onClick={() => { setActivePostId(null) }}>
            X
          </span>
        </div>
  )
}

export default CommentContainer
const CreatePost=({postPop,user,createPost,setpostPop,setTitle,setPost,postPopOpen,title,post})=>{
  return(
    <div>
      {postPop?
       <form className="create-post-section" onSubmit={(e)=>{
        createPost(e)
        setpostPop(false)
       }}>
            <input 
              type="text" 
              placeholder="Title of your Post"
              value={title}
              onChange={(e)=>{setTitle(e.target.value)}}
            />
            <input 
              type="text" 
              placeholder="Content of your Post" 
              value={post}
              onChange={(e)=>{setPost(e.target.value)}}
            />
            <button 
              type="submit" 
            >
              Post
            </button>
            <button onClick={()=>setpostPop(false)}>X</button>
      </form>
      :
      <div className="create-post">
        <div className="avatar">
            {user.username[0]}
        </div>

        <button onClick={postPopOpen}>
          Start writing a new post...
        </button>
      </div>

     }
    </div>
   
  )
}

export default CreatePost
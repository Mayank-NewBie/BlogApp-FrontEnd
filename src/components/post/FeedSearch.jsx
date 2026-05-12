import { RiSearchLine } from "@remixicon/react"
const FeedSearch=()=>{
  return(
    <div className="feed-search">
        <input 
          type="text"
          placeholder="Search posts..."
        />
        <RiSearchLine size={30}/>
      </div>
  )
}

export default FeedSearch
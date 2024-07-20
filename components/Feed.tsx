'use client'
import { useEffect, useState } from "react"
import PromptCard from "./PromptCard"
import axios from "axios"

interface Post {
  _id: string;
}

interface PromptCardListProps {
  data: Post[];
  handleTagClick: (tag: string) => void;
}

const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => {
  return (
    <div className="mt-16 promt_layout">
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchtext, setSearchText] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/prompt');
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPost();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search tag or username"
          value={searchtext}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={(tag) => { /* Implement tag click handling */ }}
      />
    </section>
  )
}

export default Feed;

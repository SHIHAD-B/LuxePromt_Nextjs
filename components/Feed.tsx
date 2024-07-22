'use client'
import { useEffect, useState } from "react"
import PromptCard from "./PromptCard"
import axios from "axios"

interface Post {
  _id: string;
  prompt: string;
  tag: string;
  creator: any;
}

interface PromptCardListProps {
  data: Post[];
  handleTagClick: (tag: string) => void;
}

const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredData, setFilteredData] = useState<Post[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setSearchText(searchText);

    if (searchText.trim() !== "") {
      const pattern = new RegExp(searchText, 'i');
      const filtered = posts.filter((item) =>
        pattern.test(item.prompt) ||
        pattern.test(item.tag) ||
        pattern.test(item.creator.username)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(posts);
    }
  }

  useEffect(() => {
    setFilteredData(posts);
  }, [posts]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/prompt');
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={filteredData}
        handleTagClick={(tag) => { /* Implement tag click logic here */ }}
      />
    </section>
  )
}

export default Feed;

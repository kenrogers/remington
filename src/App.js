import { useEffect, useState } from "react";
import Gun from "gun";

import "./App.css";

function App() {
  const [posts, setPosts] = useState();
  const [postList, setPostList] = useState([]);
  const [postContent, setPostContent] = useState("");

  let gun = Gun();

  useEffect(() => {
    setPosts(gun.get("posts"));
  }, []);

  useEffect(() => {
    if (posts !== undefined) {
      const postArray = [];
      posts.map().on((post, id) => {
        postArray.push(post);
      });
      setPostList(postArray);
    }
  }, [posts]);

  const handlePostContentChange = (event) => {
    event.persist();
    setPostContent(event.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    posts.set(postContent);
    setPostList([...postList, postContent]);
    setPostContent("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="postContent"
            value={postContent}
            onChange={handlePostContentChange}
          />
          <button type="submit">Add Post</button>
        </form>
        {postList !== undefined
          ? postList.map((post, index) => {
              return <p key={index}>{post}</p>;
            })
          : ""}
      </header>
    </div>
  );
}

export default App;

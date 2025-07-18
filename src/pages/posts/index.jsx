import React, { Fragment, useEffect, useState } from "react";
import { BaseUrl } from "../../App";
import axios from "axios";

const Posts = () => {
  const POST_URL = `${BaseUrl}/posts`;
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [posts, setPosts] = useState([]);
  const [editPostID, setEditPostID] = useState(null);

  const createPost = async () => {
    const payload = {
      userId: 1,
      title: title,
      body: desc,
    };
    try {
      await axios.post(POST_URL, payload);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  const editPost = (id) => {
    const clickedPost = posts.find((post) => post.id === id);
    setTitle(clickedPost.title);
    setDesc(clickedPost.body);
    setEditPostID(id);
  };

  const HitEditAPI = async () => {
    const payload = {
      userId: 2,
      title: title,
      body: desc,
    };
    try {
      await axios.put(`${POST_URL}/${editPostID}`, payload);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get(POST_URL);
      setPosts(response.data);
    };
    getPosts();
  }, []);
  return (
    <div
      style={{
        backgroundColor: "lightpink",
        padding: "10px",
        borderRadius: "6px",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      }}
    >
      <input
        value={title}
        type="text"
        placeholder="enter title..."
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={desc}
        placeholder="enter description..."
        onChange={(e) => setDesc(e.target.value)}
      />
      <button disabled={!title || !desc} onClick={HitEditAPI}>
        Hit edit API
      </button>
      <button disabled={!title || !desc} onClick={createPost}>
        Hit Create API
      </button>
      {posts.map((post) => {
        return (
          <Fragment key={post.id}>
            <div style={{ backgroundColor: "lightcyan", padding: "8px" }}>
              {post.title}
              <hr />
              {post.body}
            </div>
            <button onClick={() => editPost(post.id)}>edit</button>
          </Fragment>
        );
      })}
    </div>
  );
};
export default Posts;

import { db, auth } from "../../config/firebase";
import { getDocs, collection, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Post } from "../../components/Post";
import { CreateForm } from "../create-post/Create-form";
import { useAuthState } from "react-firebase-hooks/auth";

export const Home = () => {
  const [user] = useAuthState(auth);
  const [postsList, setPostsList] = useState(null);
  const postsRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(query(postsRef, orderBy("createdAt", "desc")));
    setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getPosts();
  }, [postsRef]);
  return (
    <div>
      {user && <CreateForm />}
      {postsList?.map((post, key) => (
        <Post post={post} key={key} />
      ))}
    </div>
  );
};

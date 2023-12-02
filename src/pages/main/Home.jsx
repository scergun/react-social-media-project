import { db, auth } from "../../config/firebase";
import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { Post } from "../../components/Post";
import { CreateForm } from "../create-post/Create-form";
import { useAuthState } from "react-firebase-hooks/auth";

export const Home = () => {
  const [user] = useAuthState(auth);
  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("createdAt", "desc"));

    // Realtime updates with onSnapshot
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPostsList(posts);
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user && <CreateForm />}
      {postsList.map((post, index) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

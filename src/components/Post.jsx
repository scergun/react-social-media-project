import { useEffect, useState } from "react";
import {
  onSnapshot,
  query,
  collection,
  where,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase"; // Yolunuzun doğru olduğundan emin olun
import "../styles/Post.css";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

export const Post = (props) => {
  const { post } = props;
  const [user] = useAuthState(auth);
  const [likes, setLikes] = useState([]);
  const navigate = useNavigate();

  // Realtime likes data
  useEffect(() => {
    const likesRef = collection(db, "likes");
    const q = query(likesRef, where("postId", "==", post.id));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const likesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLikes(likesData);
    });

    return () => unsubscribe(); // Cleanup function
  }, [post.id]);

  const addLike = async () => {
    try {
      await addDoc(collection(db, "likes"), {
        userId: user?.uid,
        postId: post.id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        collection(db, "likes"),
        where("postId", "==", post.id),
        where("userId", "==", user.uid)
      );
      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;

      await deleteDoc(doc(db, "likes", likeId));
    } catch (err) {
      console.log(err);
    }
  };

  const hasUserLiked = likes?.some((like) => like.userId === user?.uid);

  return (
    <div>
      <div className="post1">
        <div className="user-info-container1">
          <div className="user-info1">
            <img
              src={post.userImg}
              width={90}
              height={90}
              style={{ borderRadius: "90px" }}
            />
            <p className="username1">{post.username}</p>
          </div>
        </div>

        <div className="body-container">
          <div className="body1">
            <p>{post.description}</p>
          </div>
        </div>
        <div className="footer1">
          <button
            onClick={() =>
              user ? (hasUserLiked ? removeLike : addLike) : navigate("/login")
            }
          >
            {hasUserLiked ? <HeartFill size={18} /> : <Heart size={18} />}
          </button>
          {likes && <p>{likes.length}</p>}
        </div>
      </div>
    </div>
  );
};

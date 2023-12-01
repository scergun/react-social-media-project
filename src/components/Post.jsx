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
              onClick={() => {
                navigate("/user");
              }}
            />
            <p
              className="username1"
              onClick={() => {
                navigate("/user");
              }}
            >
              {post.username}
            </p>
          </div>
        </div>

        <div className="body-container">
          <div className="body1">
            <p>{post.description}</p>
          </div>
        </div>
        <div className="footer1">
          <button onClick={hasUserLiked ? removeLike : addLike}>
            {hasUserLiked ? <HeartFill size={18} /> : <Heart size={18} />}
          </button>
          {likes && <p>{likes.length}</p>}
        </div>
      </div>

      <div className="post1">
        {/* Post içeriği */}
        <div className="user-info-container1">
          {/* Kullanıcı bilgisi ve resmi */}
          <div className="user-info1">
            <img
              src={"https://picsum.photos/200"}
              width={90}
              height={90}
              style={{ borderRadius: "90px" }}
              onClick={() => {
                navigate("/user");
                // setClickedProfile(post.userId); // Eğer bu fonksiyon tanımlıysa
              }}
            />
            <p
              className="username1"
              onClick={() => {
                navigate("/user");
                // setClickedProfile(post.userId); // Eğer bu fonksiyon tanımlıysa
              }}
            >
              Samet Çağlar Ergün
            </p>
          </div>
        </div>

        <div className="body1">
          {/* Post açıklaması */}
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis
            perferendis alias commodi officia rerum, voluptates aliquam vero
            iusto tempora nobis voluptate debitis molestias aut neque error
            deserunt dolore doloribus aperiam?
          </p>
        </div>
        <div className="footer1">
          {/* Like butonu ve sayısı */}
          <button>{<HeartFill size={18} />}</button>
          <p>1</p>
        </div>
      </div>
    </div>
  );
};

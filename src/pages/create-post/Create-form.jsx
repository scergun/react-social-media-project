import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../../styles/CreatePost.css";

export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    description: yup.string().required("You must add description."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");

  const onCreatePost = async (data) => {
    await addDoc(postsRef, {
      ...data,
      username: user.displayName,
      userId: user?.uid,
      userImg: user?.photoURL,
      createdAt: serverTimestamp(),
    });
    navigate("/");
  };

  return (
    <form className="form" onSubmit={handleSubmit(onCreatePost)}>
      <textarea
        spellCheck="false"
        className="textarea"
        placeholder="Description..."
        {...register("description")}
      />
      <p style={{ color: "red" }}>{errors.description?.message}</p>
      <input className="post-btn" type="submit" />
    </form>
  );
};

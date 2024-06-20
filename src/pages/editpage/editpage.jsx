import "./editpage.css";
import "../../index.css";
import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import Loading from "../../comp/Loading";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/config";
import { collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { useParams } from "react-router-dom";
import Moment from "react-moment";
import React, { useRef } from "react";

const Edit = () => {
  const [user, loading] = useAuthState(auth);
  const { stringid } = useParams();
  const navigate = useNavigate();
  const inputElement = useRef(null);
  const [value, valueLoading] = useCollection(
    user ? collection(db, user.uid) : null
  );

  const [taskData, setTaskData] = useState(null);
  const [newSubtitle, setNewSubtitle] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleTrash = async (e) => {
    e.preventDefault();
    const subtitleIndex = Array.from(
      e.target.parentElement.parentElement.children
    ).indexOf(e.target.parentElement);
    const newSubtitles = taskData.subtitle.filter(
      (_, index) => index !== subtitleIndex
    );
    await updateDoc(doc(db, user.uid, stringid), {
      subtitle: newSubtitles,
    });
    setTaskData({ ...taskData, subtitle: newSubtitles });
  };

  const handleAddSubtitle = async () => {
    const newSubtitles = [...taskData.subtitle, newSubtitle];
    setIsAdding(false);
    await updateDoc(doc(db, user.uid, stringid), {
      subtitle: newSubtitles,
    });
    setTaskData({ ...taskData, subtitle: newSubtitles });
    setNewSubtitle("");
  };

  const handleDeleteTask = async () => {
    navigate("/");
    await deleteDoc(doc(db, user.uid, stringid));
  };

  const handleTitleChange = async (e) => {
    const newTitle = e.target.value;
    await updateDoc(doc(db, user.uid, stringid), {
      title: newTitle,
    });
    setTaskData({ ...taskData, title: newTitle });
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }

    if (user && !user.emailVerified) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!valueLoading && value) {
      const stringId = String(stringid);
      const taskDoc = value.docs.find((doc) => doc.id === stringId);
      const foundTaskData = taskDoc ? taskDoc.data() : null;
      setTaskData(foundTaskData);
    }
  }, [valueLoading, value, stringid]);

  if (loading || valueLoading) {
    return <Loading />;
  }

  if (!user || !user.emailVerified || !taskData) {
    return <p>Task not found</p>;
  }

  const handleCheckboxClick = async (checked) => {
    try {
      await updateDoc(doc(db, user.uid, `${taskData.id}`), {
        completed: checked,
      });
      setTaskData({ ...taskData, completed: checked });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Edit-task Page</title>
      </Helmet>
      <Header />
      <div className="edit-task">
        <section className="center">
          <h1>
            <input
              defaultValue={taskData.title}
              type="text"
              ref={inputElement}
              className="title-name"
              onBlur={handleTitleChange}
            />
            <i
              onClick={(eo) => {
                eo.preventDefault();
                inputElement.current.focus();
              }}
              className="fa-regular fa-pen-to-square"
            ></i>
          </h1>
        </section>
        <section className="sub-task">
          <div className="flex parent-time">
            <p className="time">
              <Moment fromNow date={parseInt(taskData.id, 10)} />
            </p>
            <div className="checkboxdiv">
              <label htmlFor="completed"> Completed </label>
              <input
                type="checkbox"
                id="completed"
                onClick={(e) => handleCheckboxClick(e.target.checked)}
                defaultChecked={taskData.completed}
              />
            </div>
          </div>
          <ul>
            {Array.isArray(taskData.subtitle) &&
              taskData.subtitle.map((subtitle, index) => (
                <li key={index} className="card-task flex">
                  <p>{subtitle}</p>
                  <i
                    className="fa-solid fa-trash"
                    onClick={(e) => {
                      handleTrash(e);
                    }}
                  ></i>
                </li>
              ))}
            {isAdding && (
              <li className="card-task flex newtask">
                <form>
                  <input
                    type="text"
                    value={newSubtitle}
                    onChange={(e) => setNewSubtitle(e.target.value)}
                  />
                  <button className="BTNSUBTITLe" onClick={handleAddSubtitle}>
                    Add
                  </button>
                  <button
                    className="BTNSUBTITLe"
                    onClick={() => setIsAdding(false)}
                  >
                    Cancel
                  </button>
                </form>
              </li>
            )}
          </ul>
        </section>
        <section className="center sectionon">
          <button className="add-more-btn" onClick={() => setIsAdding(true)}>
            Add more <i className="fa fa-plus"></i>
          </button>
          <button className="delete" onClick={handleDeleteTask}>
            Delete task
          </button>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Edit;

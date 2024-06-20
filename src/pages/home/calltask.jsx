import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import { db } from "../../firebase/config";
import Moment from "react-moment";

const Calltask = ({ user, sortOrder, filter }) => {
  const [value, loading, error] = useCollection(collection(db, user.uid));

  if (error) {
    console.error("Error fetching tasks:", error);
    return <h1>Error: {error.message}</h1>;
  }

  if (loading) {
    return (
      <ReactLoading type={"spin"} color={"white"} height={20} width={20} />
    );
  }

  if (value) {
    const tasks = value.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // تطبيق الفلترة
    const filteredTasks = tasks.filter((task) => {
      if (filter === "completed") {
        return task.completed;
      } else if (filter === "not_completed") {
        return !task.completed;
      }
      return true; // عرض جميع المهام
    });

    // تطبيق الترتيب
    const sortedTasks = filteredTasks.sort((a, b) => {
      if (sortOrder === "newest") {
        return b.id - a.id;
      } else if (sortOrder === "oldest") {
        return a.id - b.id;
      }
      return 0;
    });

    return (
      <section className="flex all-tasks mt">
        {sortedTasks.map((task, index) => (
          <article
            style={{
              textDecoration: task.completed ? "line-through  red " : "none",
            }}
            key={index}
            dir="auto"
            className="one-task"
          >
            <Link to={`/editpage/${task.id}`}>
              <h2>{task.title}</h2>
              <ul>
                {Array.isArray(task.subtitle) &&
                  task.subtitle.map((subtitleItem, subIndex) => {
                    if (subIndex < 2) {
                      return <li key={subIndex}>{subtitleItem}</li>;
                    } else {
                      return null;
                    }
                  })}
              </ul>
              <p className="time">
                <Moment fromNow date={parseInt(task.id, 10)} />
              </p>
              <p className="time completed">
                {task.completed ? "completed" : "Not completed"}
              </p>
            </Link>
          </article>
        ))}
      </section>
    );
  }

  return null;
};

export default Calltask;

import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import React from "react";
import ReactLoading from "react-loading";
import Loading from "../../comp/Loading";
import { Helmet } from "react-helmet-async";
import { doc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import "./home.css";
import { db } from "../../firebase/config";
import { useState } from "react";
import Modaling from "./modaling";
const Home = () => {
  const [array, setarray] = useState([]);
  const [title, settitle] = useState("");
  const [subtitle, setsubtitle] = useState("");
  // --------------------
  //modAL functions
  //
  //---------------------

  const titleImput = (eo) => {
    settitle(eo.target.value);
  };
  const subtitleInputs = (eo) => {
    setsubtitle(eo.target.value);
  };

  const addBTN = (eo) => {
    eo.preventDefault();
    if (!array.includes(subtitle)) {
      array.push(subtitle);
    }
    setsubtitle("");
  };
  const submitBTN = async (eo) => {
    eo.preventDefault();
    const taskid = Date();
    setshowloading(true);
    await setDoc(doc(db, user.uid, `${taskid}`), {
      title: `${title}`,
      subtitle: array,
      id: taskid,
      completed: false,
    });
    console.log("Doneeee>>>>>>>>>");
    setarray([]);
    settitle("");
    setshowloading(false);
    setshowmodel(false);
    setshowmassage(false);
    setTimeout(() => {
      setshowmassage(true);
    }, 3000);
  };

  // --------------------
  //modAL functions ENDs
  //
  //---------------------

  const sendAgain = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      console.log("Elmail vertification sent !!");
    });
  };

  const [showmodel, setshowmodel] = useState(false);
  const [showloading, setshowloading] = useState(false);
  const [showmassage, setshowmassage] = useState(true);
  const closeModel = () => {
    setshowmodel(false);
  };
  const newtaskbtn = () => {
    setshowmodel(true);
  };

  const [user, loading] = useAuthState(auth);

  // sendEmailVerification(auth.currentUser).then(() => {
  //   console.log("Email verification sent!");
  //   // ...
  // });

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title>HOME Page</title>
          <meta name="description" content="HOMEEEEEEEEEEEE" />
        </Helmet>

        <Header />

        <main>
          <p className="pls">
            Please{" "}
            <Link style={{ fontSize: "30px" }} to="/signin">
              sign in
            </Link>{" "}
            to continue...{" "}
            <span>
              <i className="fa-solid fa-heart"></i>
            </span>
          </p>
        </main>

        <Footer />
      </>
    );
  }

  if (user) {
    if (!user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet>

          <Header />

          <main>
            <p>
              {" "}
              Welcome: {user.displayName}{" "}
              <span>
                <i className="fa-solid fa-heart"></i>{" "}
              </span>
            </p>

            <p>Please verify your email to continue ✋ </p>
            <button
              onClick={() => {
                sendAgain();
              }}
              className="delete"
            >
              Send email
            </button>
          </main>

          <Footer />
        </>
      );
    }
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet>

          <Header />

          <main className="home">
            {/* options section */}
            <section className="parent-of-btns flex mtt">
              <button>Newest first</button>

              <button>Oldest first</button>
              <select id="browsers">
                <option value="ddddd"> All Tasks </option>
                <option value="dddddd"> Completed </option>
                <option value="dddddd"> Not Completed </option>
              </select>
            </section>
            {/* show taskes */}
            <section className="flex all-tasks mt">
              <Link to={"/editpage"}>
                <article dir="auto" className="one-task">
                  <h2> New Task </h2>
                  <ul>
                    <li>html</li>
                  </ul>
                  <p className="time">a day ago</p>
                </article>
              </Link>
            </section>
            {/* new task button */}
            <section className="mt">
              <button
                className="add-task-btn"
                onClick={() => {
                  newtaskbtn();
                }}
              >
                Add new task <i className="fa-solid fa-plus"></i>
              </button>
            </section>
            {showmodel && (
              <Modaling
                ReactLoading={ReactLoading}
                showloading={showloading}
                submitBTN={submitBTN}
                array={array}
                addBTN={addBTN}
                subtitle={subtitle}
                subtitleInputs={subtitleInputs}
                title={title}
                titleImput={titleImput}
                closeModel={closeModel}
              />
            )}
            <p
              style={{
                right: showmassage ? "-205px" : "5px",
              }}
              className="task-massage"
            >
              <i className="fa-solid fa-circle-check"></i>
              Task added successfully
            </p>
          </main>

          <Footer />
        </>
      );
    }
  }
};
export default Home;

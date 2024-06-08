import "./editpage.css";
import "../../index.css";
import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import Loading from "../../comp/Loading";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";

const Edit = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }

    if (user) {
      if (!user.emailVerified) {
        navigate("/");
      }
    }
  });

  if (loading) {
    return <Loading />;
  }

  if (user) {
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>task Page</title>
          </Helmet>
          <Header />
          <div className="edit-task">
            {/* Title */}
            <section className="center">
              <h1>
                <input
                  value={"yousef noumany"}
                  type="text"
                  className=" title-name"
                />
                <i className="fa-regular fa-pen-to-square"></i>
              </h1>
            </section>
            {/* sub task section */}
            <section className=" sub-task">
              <div className="flex parent-time">
                <p className="time"> Created: 6 days ago</p>
                <div className="checkboxdiv">
                  <label htmlFor="completed"> Completed </label>
                  <input type="checkbox" id="completed" />
                </div>
              </div>
              <ul>
                <li className="card-task flex">
                  <p>sub task</p>
                  <i className="fa-solid fa-trash"></i>
                </li>
                <li className="card-task flex">
                  <p>sub task</p>
                  <i className="fa-solid fa-trash"></i>
                </li>
              </ul>
            </section>
            {/* add more button && delete button */}
            <section className="center sectionon">
              <button className="add-more-btn ">
                Add more <i className=" fa-plus"></i>
              </button>
              <button className="delete"> Delete task</button>
            </section>
          </div>
          <Footer />
        </>
      );
    }
  }
};

export default Edit;

import React from "react";
import { Helmet } from "react-helmet-async";
// data is a close function
export default function Model({ data, children }) {
  return (
    <div className="parent-of-model forma">
      <Helmet>
        <style>
          {`.parent-of-model{
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;   
    
    background-color: #00000092;
  }
  .model-all{
    background-color: whitesmoke;
    overflow-y: scroll;
    width: 400px;
    height: 333px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    animation: mymove .8s ;
    scale: 1;

}
@keyframes mymove {
  0%{scale:0 ;transform : translateY(-100vh)}
  100%{ scale: 1;transform : translateY(0)}
}





`}
        </style>
      </Helmet>
      <form className={`model-all`}>
        <div
          onClick={() => {
            data();
          }}
          className="close"
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
        {children}
      </form>
    </div>
  );
}

import React from "react";
import Model from "../../share/model";
function Modaling({
  closeModel,
  showloading,
  submitBTN,
  array,
  ReactLoading,
  addBTN,
  subtitle,
  subtitleInputs,
  title,
  titleImput,
}) {
  return (
    <Model data={closeModel}>
      <div style={{ textAlign: "left", height: "100%" }}>
        <input
          onChange={(eo) => {
            titleImput(eo);
          }}
          required
          placeholder=" Add title : "
          type="text"
          value={title}
        />
        <div>
          <input
            onChange={(eo) => {
              subtitleInputs(eo);
            }}
            required
            placeholder=" details : "
            type="text"
            value={subtitle}
          />
          <button
            onClick={(eo) => {
              addBTN(eo);
            }}
          >
            Add
          </button>
        </div>
        {array.map((item, index) => {
          return (
            <ul className="ulmodel" key={index}>
              <li>{item}</li>
            </ul>
          );
        })}

        <button
          onClick={(eo) => {
            submitBTN(eo);
          }}
        >
          {showloading ? (
            <ReactLoading
              type={"spin"}
              color={"white"}
              height={20}
              width={20}
            />
          ) : (
            " Submit"
          )}{" "}
        </button>
      </div>
    </Model>
  );
}

export default Modaling;

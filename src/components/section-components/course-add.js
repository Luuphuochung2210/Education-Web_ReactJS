import React, {
  Component,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { EnvContext } from "../context/EnvContext";
import axios from "axios";
import imageCompression from "browser-image-compression";

export default function CourseAdd() {
  const { users, displayadd, envDispatch } = useContext(EnvContext);

  const [img, setImg] = useState();
  const [size, setSize] = useState();
  const [value, setValue] = useState();
  const titleRef = useRef();
  const discriptionRef = useRef();
  const curriculumRef = useRef();
  const durationRef = useRef();
  const enrollRef = useRef();
  const lectureRef = useRef();
  const priceRef = useRef();

  const handleAddCourse = (e) => {
    // console.log(titleRef.current.value);
    // console.log(discriptionRef.current.value);
    // console.log(curriculumRef.current.value);
    // console.log(durationRef.current.value);
    // console.log(enrollRef.current.value);
    // console.log(lectureRef.current.value);
    // console.log(priceRef.current.value);
    // console.log(img);
    // console.log(value);

    // axios
    //   .post(
    //     process.env.REACT_APP_API_URL + "/course/addCourse",
    //     {
    // user_id_: value,
    // title_: titleRef.current.value,
    // description_: discriptionRef.current.value,
    // curriculum_: curriculumRef.current.value,
    // duration_: durationRef.current.value,
    // enrolled_: enrollRef.current.value,
    // lectures_: lectureRef.current.value,
    // price_: priceRef.current.value,
    // image_: img,
    //     },
    //     { credential: true }
    //   )
    //   .then((res) => {
    //     alert("Add course success");
    //   });

    if (size < 800000 && size > 0) {
      axios.post(
        process.env.REACT_APP_API_URL + "/course/addCourse",
        {
          user_id_: value,
          title_: titleRef.current.value,
          description_: discriptionRef.current.value,
          curriculum_: curriculumRef.current.value,
          duration_: durationRef.current.value,
          enrolled_: enrollRef.current.value,
          lectures_: lectureRef.current.value,
          price_: priceRef.current.value,
          image_: img,
        },
        { credential: true },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Uploaded");
    } else {
      alert("File nặng, không up được");
    }
  };

  const handleExit = (e) => {
    console.log(displayadd);
    envDispatch({ type: "SET_DISPLAYADD", payload: false });
  };

  const handleAddImg = async (e) => {

    console.log(e.target.files[0]);
    setSize(e.target.files[0].size);
    const data = new FileReader();
    data.addEventListener("load", () => {
      setImg(data.result);
    });
    data.readAsDataURL(e.target.files[0]);

  };

  return (
    <div className="col-lg-8 mt-5 mt-lg-0">
      <form
        className="contact-form-inner  mt-5 mt-md-0"
        onSubmit={(e) => handleAddCourse(e)}
      >
        <div className="row">
          {/* TITLE  */}
          <div className="col-lg-12">
            <div className="single-input-inner style-bg-border">
              <input type="text" placeholder="Title" ref={titleRef} />
            </div>
          </div>
          {/* USER  */}
          <div className="col-12">
            <div className="single-input-inner style-bg-border">
              <select
                onChange={(e) => setValue(e.target.value)}
                defaultValue={value}
              >
                <option value="" disabled={true}>
                  Instructor
                </option>
                {Object.entries(users).map(([key]) =>
                  users[key].role === "teacher" ? (
                    <option key={key} value={users[key]._id}>
                      {users[key].firstname + " " + users[key].lastname}
                    </option>
                  ) : (
                    <></>
                  )
                )}
              </select>
            </div>
          </div>
          {/* IMG  */}
          <div className="col-12">
            <div>
              <input
                type="file"
                placeholder="Background"
                className="single-input-inner style-bg-border"
                onChange={(e) => handleAddImg(e)}
              />
            </div>
          </div>
          <div className="col-12">
            <div className="single-input-inner style-bg-border">
              <img src={img} width="370px" height="200px"></img>
            </div>
          </div>
          {/* DISCRIPTION  */}
          <div className="col-12">
            <div className="single-input-inner style-bg-border">
              <textarea
                placeholder="Discription"
                defaultValue={""}
                ref={discriptionRef}
              />
            </div>
          </div>
          {/* CURRICULUM  */}
          <div className="col-12">
            <div className="single-input-inner style-bg-border">
              <textarea
                placeholder="Curriculum"
                defaultValue={""}
                ref={curriculumRef}
              />
            </div>
          </div>
          {/* DURATION  */}
          <div className="col-12">
            <div className="single-input-inner style-bg-border">
              <input type="text" placeholder="Duration" ref={durationRef} />
            </div>
          </div>
          {/* ENROLL  */}
          <div className="col-12">
            <div className="single-input-inner style-bg-border">
              <input type="number" placeholder="Enrolled" ref={enrollRef} />
            </div>
          </div>
          {/* LECTURE  */}
          <div className="col-12">
            <div className="single-input-inner style-bg-border">
              <input type="text" placeholder="Lecture" ref={lectureRef} />
            </div>
          </div>
          {/* PRICE  */}
          <div className="col-12">
            <div className="single-input-inner style-bg-border">
              <input type="text" placeholder="Price" ref={priceRef} />
            </div>
          </div>
          <div className="col-6">
            <button className="btn btn-base">Add Course</button>
          </div>
          <div className="col-6">
            <button className="btn btn-base" onClick={(e) => handleExit(e)}>
              Exit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

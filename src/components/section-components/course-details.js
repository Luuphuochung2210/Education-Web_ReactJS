import React, { Component, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { EnvContext } from "../context/EnvContext";
import axios from "axios";

export default function CourseDetails() {
  let publicUrl = process.env.PUBLIC_URL + "/";
  const { users, envDispatch, courseiddisplay, allcourses } =
    useContext(EnvContext);

  const [course, setCourse] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [author, setAuthor] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    setIsloading(true);
    axios
      .get(process.env.REACT_APP_API_URL + "/course", { credential: true })
      .then((res) => {
        envDispatch({ type: "SET_ALLCOURSES", payload: res.data.data });
        setData(res.data.data);
        setIsloading(false);

        const userid =
          res.data.data[
            res.data.data.findIndex((course) => course._id === courseiddisplay)
          ].user_id;
        const name =
          users[users.findIndex((user) => user._id === userid)].firstname +
          " " +
          users[users.findIndex((user) => user._id === userid)].lastname;
        setAuthor(name);

        const temp = res.data.data.filter(
          (item) => item._id === courseiddisplay
        );
        console.log(temp[0]);
        setCourse(temp[0]);
      });
    //eslint-disable-next-line
  }, []);

  const handleEnroll = (e) => {
	console.log(e.currentTarget.id)
  };

  return isLoading === true ? (
    <div>Loading</div>
  ) : (
    <div className="course-single-area pd-top-120 pd-bottom-90">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            {/* DETAILS  */}
            <div className="course-course-detaila-inner">
              <div className="details-inner">
                <div className="emt-user">
                  <span className="u-thumb">
                    <img
                      src={publicUrl + "assets/img/author/1.png"}
                      alt="img"
                    />
                  </span>
                  <span className="align-self-center">{author}</span>
                </div>
                <h3 className="title">
                  <a href="">{}</a>
                </h3>
              </div>
              <div className="thumb">
                <img src={publicUrl + "assets/img/course/9.png"} alt="img" />
              </div>
              <div className="course-details-nav-tab text-center">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="tab1-tab"
                      data-toggle="tab"
                      href="#tab1"
                      role="tab"
                      aria-controls="tab1"
                      aria-selected="true"
                    >
                      Description
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="tab2-tab"
                      data-toggle="tab"
                      href="#tab2"
                      role="tab"
                      aria-controls="tab2"
                      aria-selected="false"
                    >
                      Curriculum
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="tab3-tab"
                      data-toggle="tab"
                      href="#tab3"
                      role="tab"
                      aria-controls="tab3"
                      aria-selected="false"
                    >
                      FAQ
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="tab4-tab"
                      data-toggle="tab"
                      href="#tab4"
                      role="tab"
                      aria-controls="tab4"
                      aria-selected="false"
                    >
                      Review
                    </a>
                  </li>
                </ul>
              </div>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="tab1"
                  role="tabpanel"
                  aria-labelledby="tab1-tab"
                >
                  <div className="course-details-content">
                    <p>{course.description}</p>
                    <div className="row pt-4">
                      {/* <div className="col-sm-6">
					  <ul className="single-list-wrap">
						<li className="single-list-inner style-check-box">
						  <i className="fa fa-check" /> Metus interdum metus
						</li>
						<li className="single-list-inner style-check-box">
						  <i className="fa fa-check" /> Ligula cur maecenas
						</li>
						<li className="single-list-inner style-check-box">
						  <i className="fa fa-check" /> Fringilla nulla
						</li>
					  </ul>
					</div> */}
                      {/* <div className="col-sm-6 mt-3 mt-sm-0">
					  <ul className="single-list-wrap">
						<li className="single-list-inner style-check-box">
						  <i className="fa fa-check" /> Metus interdum metus
						</li>
						<li className="single-list-inner style-check-box">
						  <i className="fa fa-check" /> Ligula cur maecenas
						</li>
						<li className="single-list-inner style-check-box">
						  <i className="fa fa-check" /> Fringilla nulla
						</li>
					  </ul>
					</div> */}
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="tab2"
                  role="tabpanel"
                  aria-labelledby="tab2-tab"
                >
                  <div className="course-details-content">
                    <h4 className="title">Overview</h4>
                    <p>{course.curriculum}</p>
                    <div id="accordion" className="accordion-area mt-4">
                      {/* {course.FAQ.map((q,index)=>{
						   <div className="card single-faq-inner style-no-border">
						   <div className="card-header" id="ff-one">
							 <h5 className="mb-0">
							   <button
								 className="btn-link"
								 data-toggle="collapse"
								 data-target="#f-one"
								 aria-expanded="true"
								 aria-controls="f-one"
							   >
							   {q.question}
								 <i className="fa fa-eye" />
							   </button>
							 </h5>
						   </div>
						   <div
							 id="f-one"
							 className="show collapse"
							 aria-labelledby="ff-one"
							 data-parent="#accordion"
						   >
							 <div className="card-body">
							   What does you dummy text of free available in market
							   printing has industry been industry's standard dummy
							   text ever.
							 </div>
						   </div>
						 </div>
					  })} */}
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="tab3"
                  role="tabpanel"
                  aria-labelledby="tab3-tab"
                >
                  <div className="course-details-content">
                    <h4 className="title">Overview</h4>
                    <p>
                      Khóa học tiếng Anh này được thiết kế đặc biệt cho người
                      lớn, phục vụ cho các cấp độ thành thạo từ người mới học
                      đến nâng cao. Khóa học nhằm nâng cao kỹ năng tiếng Anh của
                      người học một cách toàn diện, tập trung vào việc đọc,
                      viết, nghe và nói. Chương trình học được cấu trúc để cung
                      cấp một nền tảng vững chắc về ngữ pháp và từ vựng, đồng
                      thời cũng kết hợp các ngữ cảnh thực tế để làm cho trải
                      nghiệm học tập trở nên phù hợp và hấp dẫn hơn. Khóa học
                      bao gồm các hoạt động tương tác, thảo luận nhóm và nguồn
                      tài nguyên đa phương tiện để tạo ra một môi trường học tập
                      linh hoạt và hợp tác. Hơn nữa, khóa học cung cấp sự linh
                      hoạt với nhiều hình thức học như học trực tiếp, học trực
                      tuyến và tài liệu học tự học. Điều này cho phép người học
                      chọn hình thức phù hợp nhất với lịch trình và phong cách
                      học của họ. Dù bạn đang học tiếng Anh cho mục đích phát
                      triển cá nhân, thăng tiến trong sự nghiệp hay mục đích học
                      thuật, khóa học này cung cấp các công cụ và hướng dẫn cần
                      thiết để giúp bạn đạt được mục tiêu học tiếng Anh của
                      mình.
                    </p>
                    <div id="accordion-1" className="accordion-area mt-4">
                      <div className="card single-faq-inner style-header-bg">
                        <div className="card-header" id="ff-five">
                          <h5 className="mb-0">
                            <button
                              className="btn-link"
                              data-toggle="collapse"
                              data-target="#f-five"
                              aria-expanded="true"
                              aria-controls="f-five"
                            >
                              01. Đội ngũ giáo viên là ai ?
                              <i className="fa fa-eye" />
                            </button>
                          </h5>
                        </div>
                        <div
                          id="f-five"
                          className="show collapse"
                          aria-labelledby="ff-five"
                          data-parent="#accordion"
                        >
                          <div className="card-body">
                            Để được đồng hành cùng bạn, họ đã phải trải qua: 6
                            thử thách cam go để đánh giá từng kỹ năng. 98 tiếng
                            thực hiện đào tạo và kiểm tra sàng lọc. Chiến thắng
                            lịch sử với tỉ lệ chọi 1/10 hơn cả thi đại học. Và
                            cuối cùng để trở thành đội ngũ giáo viên tiếng Anh
                            với 100% có bằng giảng dạy Anh ngữ theo tiêu chuẩn
                            quốc tế: TESOL, CELTA hoặc tương đương với TEFL.
                          </div>
                        </div>
                      </div>
                      <div className="card single-faq-inner style-header-bg">
                        <div className="card-header" id="ff-six">
                          <h5 className="mb-0">
                            <button
                              className="btn-link collapsed"
                              data-toggle="collapse"
                              data-target="#f-six"
                              aria-expanded="true"
                              aria-controls="f-six"
                            >
                              02. Lợi ích của khóa học ?
                              <i className="fa fa-eye" />
                            </button>
                          </h5>
                        </div>
                        <div
                          id="f-six"
                          className="collapse"
                          aria-labelledby="ff-six"
                          data-parent="#accordion"
                        >
                          <div className="card-body">
                            - Phát triển ngôn ngữ, nắm bắt từ vựng đa dạng các
                            chủ đề trong cuộc sống. - Nắm rõ cấu trúc ngữ pháp
                            tiếng Anh - Giao tiếp trôi chảy với người nước ngoài
                            bằng tiếng Anh - Trang bị đủ kiến thức & kỹ năng
                            chinh
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="tab4"
                  role="tabpanel"
                  aria-labelledby="tab4-tab"
                >
                  <div className="ratings-list-inner mb-4">
                    <div className="row">
                      <div className="col-md-4 align-self-center text-center">
                        <div className="total-avarage-rating">
                          <h2>5.0</h2>
                          <div className="rating-inner">
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                          </div>
                          <p>Rated 5 out of 3 Ratings</p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <ul>
                          <li>
                            <a href="#">
                              <span className="counter-label">
                                <i className="fa fa-star" />5
                              </span>
                              <span className="progress-bar-inner">
                                <span className="progress">
                                  <span
                                    className="progress-bar"
                                    role="progressbar"
                                    aria-valuenow={100}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    style={{ width: "100%" }}
                                  />
                                </span>
                              </span>
                              <span className="counter-count">100%</span>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <span className="counter-label">
                                <i className="fa fa-star" />4
                              </span>
                              <span className="progress-bar-inner">
                                <span className="progress">
                                  <span
                                    className="progress-bar"
                                    role="progressbar"
                                    aria-valuenow={80}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    style={{ width: "0%" }}
                                  />
                                </span>
                              </span>
                              <span className="counter-count">0%</span>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <span className="counter-label">
                                <i className="fa fa-star" />3
                              </span>
                              <span className="progress-bar-inner">
                                <span className="progress">
                                  <span
                                    className="progress-bar"
                                    role="progressbar"
                                    aria-valuenow={0}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    style={{ width: "0%" }}
                                  />
                                </span>
                              </span>
                              <span className="counter-count">0%</span>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <span className="counter-label">
                                <i className="fa fa-star" />2
                              </span>
                              <span className="progress-bar-inner">
                                <span className="progress">
                                  <span
                                    className="progress-bar"
                                    role="progressbar"
                                    aria-valuenow={0}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    style={{ width: "0%" }}
                                  />
                                </span>
                              </span>
                              <span className="counter-count">0%</span>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <span className="counter-label">
                                <i className="fa fa-star" />1
                              </span>
                              <span className="progress-bar-inner">
                                <span className="progress">
                                  <span
                                    className="progress-bar"
                                    role="progressbar"
                                    aria-valuenow={0}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    style={{ width: "0%" }}
                                  />
                                </span>
                              </span>
                              <span className="counter-count">0%</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {
            <div className="col-lg-4">
              <div className="td-sidebar">
                <div className="widget widget_feature">
                  <h4 className="widget-title">Course Features</h4>
                  <ul>
                    <li>
                      <i className="fa fa-user" />
                      <span>Enrolled :</span> {course.enrolled} học sinh
                    </li>
                    <li>
                      <i className="fa fa-clock-o" />
                      <span>Duration :</span> {course.duration}
                    </li>
                    {/* <li>
					<i className="fa fa-clipboard" />
					<span>Lectures :</span> {course.lectures}
				  </li>
				  <li>
					<i className="fa fa-clone" />
					<span>Categories:</span> Technology
				  </li> */}
                    {/* <li>
					<i className="fa fa-tags" />
					<span>Tags:</span> Android, JavaScript
				  </li> */}
                    <li>
                      <i className="fa fa-clipboard" />
                      <span>Instructor:</span> {author}
                    </li>
                  </ul>
                  <div className="price-wrap text-center">
                    <h5>
                      Price:<span> {course.price} </span>
                    </h5>
				  	<Link
                      className="btn btn-base btn-radius"
                      to="contact"
					  id={course._id}
					  onClick={(e)=>handleEnroll(e)}
                    >
                      ENROLL COURSE
                    </Link>
                  </div>
                </div>
                <div className="widget widget_catagory">
                  <h4 className="widget-title">Trending Course</h4>
                  <div className="single-course-inner">
                    <div className="thumb">
                      <img
                        src={publicUrl + "assets/img/course/1.png"}
                        alt="img"
                      />
                    </div>
                    <div className="details">
                      <div className="details-inner">
                        <div className="emt-user">
                          <span className="u-thumb">
                            <img
                              src={publicUrl + "assets/img/author/1.png"}
                              alt="img"
                            />
                          </span>
                          <span className="align-self-center">Nancy Reyes</span>
                        </div>
                        <h6>
                          <a href="course-details.html">
                            Fox nymphs grab quick-jived waltz. Brick quiz whangs
                          </a>
                        </h6>
                      </div>
                      <div className="emt-course-meta">
                        <div className="row">
                          <div className="col-6">
                            <div className="rating">
                              <i className="fa fa-star" /> 4.3
                              <span>(23)</span>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="price text-right">
                              Price: <span>$54.00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
        <div className="row justify-content-center pd-top-100">
          <div className="col-lg-4 col-md-6">
            <div className="single-course-inner">
              <div className="thumb">
                <img src={publicUrl + "assets/img/course/1.png"} alt="img" />
              </div>
              <div className="details">
                <div className="details-inner">
                  <div className="emt-user">
                    <span className="u-thumb">
                      <img
                        src={publicUrl + "assets/img/author/1.png"}
                        alt="img"
                      />
                    </span>
                    <span className="align-self-center">
                      {/* {users[
					  users.findIndex(
						(user) => user._id === course[index].user_id
					  )
					].firstname +
					  " " +
					  users[
						users.findIndex(
						  (user) => user._id === course[index].user_id
						)
					  ].lastname} */}
                    </span>
                  </div>
                  <h6>
                    <Link to="/course-details">
                      Fox nymphs grab quick-jived waltz. Brick quiz whangs
                    </Link>
                  </h6>
                </div>
                <div className="emt-course-meta">
                  <div className="row">
                    <div className="col-6">
                      <div className="rating">
                        <i className="fa fa-star" /> 4.3
                        <span>(23)</span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="price text-right">
                        Price: <span>$54.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="single-course-inner">
              <div className="thumb">
                <img src={publicUrl + "assets/img/course/2.png"} alt="img" />
              </div>
              <div className="details">
                <div className="details-inner">
                  <div className="emt-user">
                    <span className="u-thumb">
                      <img
                        src={publicUrl + "assets/img/author/2.png"}
                        alt="img"
                      />
                    </span>
                    <span className="align-self-center">Joe Powell</span>
                  </div>
                  <h6>
                    <Link to="/course-details">
                      Aenean sed nibh a magna posuere tempo faucib
                    </Link>
                  </h6>
                </div>
                <div className="emt-course-meta">
                  <div className="row">
                    <div className="col-6">
                      <div className="rating">
                        <i className="fa fa-star" /> 4.3
                        <span>(23)</span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="price text-right">
                        Price: <span>$54.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="single-course-inner">
              <div className="thumb">
                <img src={publicUrl + "assets/img/course/3.png"} alt="img" />
              </div>
              <div className="details">
                <div className="details-inner">
                  <div className="emt-user">
                    <span className="u-thumb">
                      <img
                        src={publicUrl + "assets/img/author/3.png"}
                        alt="img"
                      />
                    </span>
                    <span className="align-self-center">Timothy Willis</span>
                  </div>
                  <h6>
                    <Link to="/course-details">
                      Praesent eu dolor eu orci vehicula euismod
                    </Link>
                  </h6>
                </div>
                <div className="emt-course-meta">
                  <div className="row">
                    <div className="col-6">
                      <div className="rating">
                        <i className="fa fa-star" /> 4.9
                        <span>(73)</span>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="price text-right">
                        Price: <span>$74.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import axios from "axios";
import { useState } from "react";
import React, { Component } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { EnvContext } from "../context/EnvContext";
import DataTable from "react-data-table-component";

export default function Manage() {
  let publicUrl = process.env.PUBLIC_URL + "/";
  const { users, login, envDispatch } = useContext(EnvContext);

  const [data, setData] = useState(users);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/users", { credential: true })
      .then((res) => {
        envDispatch({ type: "SET_USERS", payload: res.data.data });
      });
    console.log(users);
    setData(users);
  }, []);

  useEffect(() => {
    var newData = data;
    newData.map((data, index) => {
      return (data["stt"] = index + 1);
    });
    setData(newData);
    console.log(data);
  }, [data]);

  const paginationComponentOptions = {
    rowsPerPageText: "Số hàng",
    rangeSeparatorText: "đến",
    selectAllRowsItem: true,
    selectAllRowsItemText: "tất cả",
  };

  const column = [
    {
      name: "STT",
      selector: (row) => row.stt,
      // sortable: true,
      width: "60px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      with: "170px",
    },
    {
      name: "Lastname",
      selector: (row) => row.lastname,
      sortable: true,
      with: "50px",
    },
    {
      name: "Firstname",
      selector: (row) => row.firstname,
      sortable: true,
      with: "50px",
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "Delete",
      selector: (row) => (
        <div
          style={{ color: "red", cursor: "pointer" }}
          id={row.email}
          onClick={(e) => {
            deleteUser(e);
          }}
        >
          Xóa
        </div>
      ),
    },
  ];

  const deleteUser = (e) => {
    e.preventDefault();
    console.log(e.currentTarget.id);
    axios.post(
      process.env.REACT_APP_API_URL + "/users/deleteUser",
      {
        email: e.currentTarget.id,
      },
      {credential: true}
    )
    .then ((res) => {
        envDispatch({ type: "SET_USERS", payload: users });
    })
    alert("Account hasbeen removed")
    window.location.reload()
  };

  return (
    <div>
      <div className="contact-list pd-top-120 pd-bottom-90">
        <div className="container">
          <div className="row justify-content-center">
            <h2 className="title">Users List</h2>
            <div className="col-lg-12">
              <DataTable
                columns={column}
                data={data}
                pagination
                paginationComponentOptions={paginationComponentOptions}
              />
            </div>
            {/* <div className="col-lg-4">
                <div className="contact-list-inner">
                  <div className="media">
                    <div className="media-left">
                      <img
                        src={publicUrl + "assets/img/icon/17.png"}
                        alt="img"
                      />
                    </div>
                    <div className="media-body align-self-center">
                      <h5>Our Phone</h5>
                      <p>000 2324 39493</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="contact-list-inner">
                  <div className="media">
                    <div className="media-left">
                      <img
                        src={publicUrl + "assets/img/icon/18.png"}
                        alt="img"
                      />
                    </div>
                    <div className="media-body align-self-center">
                      <h5>Our Email</h5>
                      <p>name@website.com</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="contact-list-inner">
                  <div className="media">
                    <div className="media-left">
                      <img
                        src={publicUrl + "assets/img/icon/16.png"}
                        alt="img"
                      />
                    </div>
                    <div className="media-body align-self-center">
                      <h5>Our Address</h5>
                      <p>2 St, Loskia, amukara.</p>
                    </div>
                  </div>
                </div>
              </div> */}
          </div>
        </div>
      </div>
      {/* counter area start */}
      <div className="counter-area pd-bottom-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="section-title mb-0">
                <h6 className="sub-title right-line">Get in touch</h6>
                <h2 className="title">Write Us a Message</h2>
                <p className="content pb-3">
                  The quick, brown fox jumps over a lazy dog. DJs flock by when
                  MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds
                  jog,{" "}
                </p>
                <ul className="social-media style-base pt-3">
                  <li>
                    <a href="#">
                      <i className="fa fa-facebook" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-twitter" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-instagram" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-pinterest" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-linkedin" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-8 mt-5 mt-lg-0">
              <form className="contact-form-inner  mt-5 mt-md-0">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="single-input-inner style-bg-border">
                      <input type="text" placeholder="First Name" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="single-input-inner style-bg-border">
                      <input type="text" placeholder="Last Name" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="single-input-inner style-bg-border">
                      <input type="text" placeholder="Email" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="single-input-inner style-bg-border">
                      <input type="text" placeholder="Subject" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="single-input-inner style-bg-border">
                      <textarea placeholder="Message" defaultValue={""} />
                    </div>
                  </div>
                  <div className="single-input-inner style-bg-border">
                      <textarea placeholder="Message" defaultValue={""} />
                    </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* counter area end */}
      {/* contact area start */}
      <div className="contact-g-map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62703.628894074776!2d106.62013945252927!3d10.813086729573556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f218ed30895%3A0xd7ff822aa9ef6e94!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBIb2EgU2VuIChIU1Up!5e0!3m2!1svi!2s!4v1699433997738!5m2!1svi!2s" />
      </div>
    </div>
  );
}

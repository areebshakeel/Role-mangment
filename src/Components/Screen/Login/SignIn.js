import React, { Component } from "react";
import { connect } from "react-redux";
import * as firebase from "firebase/app";
import "firebase/auth";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import Company from "../Company";
import userData from "../../../Store/Action/index";

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      userObj: [],
      sub: false,
      data1: [],
    };
  }
  componentDidMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyAd7C7vZlvhY0BT3wza_lIP_YewMmywnEY",
      authDomain: "owais-1d9f6.firebaseapp.com",
      databaseURL: "https://owais-1d9f6.firebaseio.com",
      projectId: "owais-1d9f6",
      storageBucket: "owais-1d9f6.appspot.com",
      messagingSenderId: "267556268221",
      appId: "1:267556268221:web:57e64c0ee9871923",
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    firebase
      .firestore()
      .collection("user")
      .get()
      .then((data) => {
        const { data1 } = this.state;
        data.forEach((doc) => {
          for (let value in doc.data()) {
            // console.log(doc.data()[value]===10)
            if (doc.data()[value]===20) {
              console.log(doc.data()[value])
              data1.push(doc.data());
            }
          }
        });
        this.setState({
          data1,
        });
      });
  }
  write = (key, value) => {
    this.setState({
      [key]: value,
    });
  };
  login = () => {
    const { email, password, data1 } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Login successfull",
          showConfirmButton: false,
          timer: 1500,
        });
        const user = res.user;
        let role=10
        for (let value in data1) {
          console.log(data1[value])
          for (let val in data1[value]){
            console.log(data1[value][val])
            if(data1[value][val]===email){
              role=20  
            }
          }
          
        }
        console.log(role)

        let userObj = { email: user.email, userId: user.uid,role };
        this.setState({
          userObj,
        });
        let data = JSON.stringify(userObj);
        data1.map((item) => {
          if (role===20) {
            localStorage.setItem("userData", data);

          
            this.props.history.push({
              pathname: "/student",
              state: {
                user: this.state.userObj,
              },
            });
          } else {
            localStorage.setItem("userData", data);
            this.props.history.push({
              pathname: "/company",
              state: {
                user: this.state.userObj,
              },
            });

          }
        });

        this.props.updateUser(userObj);
      });
  };
  change = (e) => {
    e.preventDefault();
    this.props.history.push("/Signup");
  };
  render() {
    console.log(this.state.data1)
    return (
      <div className="container" style={{ backgroundColor: "lightgrey" }}>
        <h1 style={{ textAlign: "center" }}>SIGN IN</h1>
        <div style={{ paddingLeft: "40%" }}>
          <div className="row"></div>
          <div className="row" style={{ marginTop: "2rem " }}>
            <div className="col-sm-6">
              <p>Email</p>
              <input
                type="email"
                onChange={(e) => this.write("email", e.target.value)}
                placeholder="Email"
                className="form-control"
              />
            </div>
          </div>
          <div className="row" style={{ marginTop: "2rem " }}>
            <div className="col-sm-6">
              <p>password</p>

              <input
                type="password"
                onChange={(e) => this.write("password", e.target.value)}
                placeholder="Password"
                className="form-control"
              />
              <br />

              <button onClick={this.login} className="btn btn-success">
                SIGN IN
              </button>

              <br />
              <a href="" onClick={this.change}>
                {" "}
                Not have account?
              </a>
            </div>

            {this.state.sub ? <Company user={this.state.userObj} /> : null}
          </div>
        </div>
      </div>
    );
  }
}
const mapStatetToProps = () => {};
const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (userObj) => dispatch(userData(userObj)),
  };
};
export default connect(
  mapStatetToProps,
  mapDispatchToProps
)(withRouter(SignIn));

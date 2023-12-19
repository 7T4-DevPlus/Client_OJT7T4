/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import "mdbreact/dist/css/mdb.css";
import { useNavigate } from "react-router-dom";

import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import "./loginStyle.css";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../../contexts/constants";

import { AuthContext } from "../../contexts/authContext";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import { UserContext } from "../../contexts/userContext/userProvider";

const LoginPage = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const schema = yup
    .object({
      username: yup.string().required().trim(),
      password: yup.string().required().max(16).trim(),
    })
    .required();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // const {
  //   authState: { isAuthenticated },
  //   loginUser,
  // } = useContext(AuthContext);

  const HandleLoginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
      const userRes = await axios.get(`${apiUrl}/auth`);
      dispatch({ type: "SET_USER", payload: { user: userRes.data.user } });
      setLoading(false);
      navigate(`/`);
    } catch ({ response }) {
      setLoading(false);
      console.log("GOT ERROR: ", response.data.message);
      //HAnDLE ERROR HERE
    }
  };

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)) {
      navigate(`/`);
    }
  }, []);

  const onLogin = (data) => {
    setLoading(true);
    HandleLoginUser(data);
  };

  return (
    <MDBContainer fluid className="p-3 h-custom">
      <MDBRow>
        <MDBCol col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="Sample image"
          />
        </MDBCol>

        <MDBCol
          col="4"
          md="6"
          className="form-container"
          style={{ padding: "20px" }}
        >
          <div className="d-flex flex-row align-items-center justify-content-center">
            <p className="sign-in-text">Sign in with</p>
          </div>

          <form onSubmit={handleSubmit(onLogin)}>
            <Controller
              name="username"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <div>
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Username"
                    id="formControlLg"
                    type="text"
                    size="lg"
                    {...field}
                  />
                  {errors.username && (
                    <p className="error-message">
                      Username is a required field
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <div>
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    id="formControlLg"
                    type="password"
                    size="lg"
                    {...field}
                  />
                  {errors.password && (
                    <p className="error-message">
                      Password is a required field
                    </p>
                  )}
                </div>
              )}
            />
            <div className="checkbox-login-spacing">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
              <MDBBtn
                className="mb-0 px-5"
                size="lg"
                type="submit"
                disabled={loading}
                style={{
                  width: 140,
                  height: 50,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 0,
                }}
              >
                {!loading ? (
                  "login"
                ) : (
                  <div
                    className="spinner-border"
                    style={{ width: 25, height: 25 }}
                  ></div>
                )}
              </MDBBtn>
            </div>
          </form>

          <div className="d-flex justify-content-between mb-4">
            <a href="!#">Forgot password?</a>
          </div>

          <div className="text-center text-md-start mt-4 pt-2">
            <p className="small fw-bold mt-2 pt-1 mb-2">
              Don't have an account?{" "}
              <a href="#!" className="link-danger">
                Register
              </a>
            </p>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default LoginPage;

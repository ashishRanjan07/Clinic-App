import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const serverAddress = "http://10.10.9.206:5001/clinic-app/";
export const staticImageURL = "https://picsum.photos/300";
export const ProfileImageURL =
  "https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?s=1024x1024&w=is&k=20&c=iX0adGZVKv9wS5yrs0-hpFsJBnRAacZa1DcDZ0I9Bqk=";

export const VALIDATE_LOGIN = async (data) => {
  const url = `${serverAddress}login/`;

  const response = await axios
    .post(url, data)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  // console.log(response, "Line 17");
  return response;
};

export const GET_ALL_PATIENTS_LIST = async () => {
  const url = `${serverAddress}patient/get/all`;
  const response = await axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  console.log(response, "line 31");
  return response;
};

export const ADD_PATIENT = async (data) => {
  const url = `${serverAddress}patient/create`;
  const response = await axios
    .post(
      url,
      {
        ...data,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  console.log(response, "Line 51");
  return response;
};

export const GET_ALL_DOCTOR_LIST = async () => {
  const url = `${serverAddress}clinic-staff/get/doctors`;
  const response = await axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  console.log(response, "Line 65");
  return response;
};

export const CREATE_APPOINTMENT = async (data) => {
  const url = `${serverAddress}appointment/create`;
  const response = await axios
    .post(
      url,
      {
        ...data,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  console.log(response, "Line 85");
  return response;
};

export const GEt_APPOINtMENT_BY_DATE = async (data) => {
  const url = `${serverAddress}appointment/get/date?date=${data}`;
  const response = await axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  console.log(response, "Line 99");
  return response;
};

export const GET_ALL_STAFF_LIST = async () => {
  const url = `${serverAddress}clinic-staff/get/all`;
  const response = await axios
    .get(url, {
      headers: {
        "Content-Type": "applicaton/json",
      },
    })
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  console.log(response, "Line 113");
  return response;
};

export const GET_APPOINTMENT_BY_PATIENT_ID = async (data) => {
  const url = `${serverAddress}appointment/patient/id?patient_id=${data}`;
  const response = await axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  console.log(response, "Line 127");
  return response;
};

export const GET_PATIENTS_REPORT = async (data) => {
  const url = `${serverAddress}patient/report/get?id=${data}`;
  const response = await axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  console.log(response, "Line 141");
  return response;
};

export const CREATE_PRESCRIPTION = async (data) => {
  const url = `${serverAddress}patient/prescription/create`;
  const response = await axios
    .post(
      url,
      { ...data },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  console.log(response, "Line 159");
  return response;
};

export const GET_APPOINTMENTDETAILS_BY_APPOINTMENT_ID = async (data) => {
  const url = `${serverAddress}patient/prescription/get/appointment/id?appointment_id=${data}`;
  const response = await axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  console.log(response, "Line 173");
  return response;
};

export const GET_REPORT_FILE = async (data) => {
  const url = `${serverAddress}patient/report/get/single/file?file_path=${data}`;
  const response = await axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  console.log(response, "Line 187");
  return response;
};

export const CREATE_PATIENTS_REPORT = async (data) => {
  const url = `${serverAddress}patient/report/create`;
  try {
    const response = await axios.post(url, data);
    console.log(response.data, "Response from server");
    return response.data;
  } catch (error) {
    console.error("Error creating patient report:", error);
    return (
      error?.response?.data ?? {
        error: true,
        message: "An unknown error occurred",
      }
    );
  }
};

export const MARK_APPOINTMENT_VISITED = async (data) => {
  const url = `${serverAddress}appointment/visited?id=${data}`;
  const response = await axios
    .post(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  console.log(response, "Line 218");
  return response;
};

export const CREATE_APPOINTMENT2 = async (data) => {
  const url = `${serverAddress}appointment/create`;
  const response = await fetch(url, {
    method: "POST",
    body: data,
    headers: {},
  });
  console.log(response, "Line 229");
  return response;
};

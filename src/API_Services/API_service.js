import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { sendCodeOnEmail } from "./Auth_API";

//export const serverAddress = "http://10.10.9.206:5001/clinic-app/";
export const serverAddress = "https://api-dev.assertit.io/clinic/";
export const tempServerAddress =
  "https://24ed-122-172-80-219.ngrok-free.app/clinic/";
export const staticImageURL = "https://picsum.photos/300";
export const ProfileImageURL =
  "https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?s=1024x1024&w=is&k=20&c=iX0adGZVKv9wS5yrs0-hpFsJBnRAacZa1DcDZ0I9Bqk=";

export const VALIDATE_LOGIN = async (data) => {
  const url = `${serverAddress}login/`;

  const response = await axios
    .post(url, data)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  //  console.log(response, "Line 17");
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
  return response;
};

export const ADD_PATIENT = async (data) => {
  const url = `${serverAddress}patient/create`;
  const response = await axios
    .post(
      url,
      {
        body: { ...data },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  // console.log(response, "Line 51");
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
  console.log(data, "line 75");
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

export const GET_APPOINtMENT_BY_DATE = async (data) => {
  const url = `${serverAddress}appointment/get/date?${data}`;

  console.log("api url:", url);

  const response = await axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
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

export const GET_PATIENTS_BY_CLINIC_ID = async (data) => {
  const url = `${serverAddress}patient/get/all/patient/by/clinic?clinic_id=${data}`;
  const response = await axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
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

export const GET_ALL_APPOINTMENTS = async () => {
  const url = `${serverAddress}appointment/get/all`;
  const response = await axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  console.log("===============All Appointments List=========");
  console.log(response, "line 31");
  return response;
};

export const SEARCH_FORP_PATIENTS = async (value) => {
  const url = `${serverAddress}patient`;
  const response = await axios
    .post(url, value)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);

  console.log("Search for Patients:", response);
  return response;
};

export const SEND_CODE_ON_EMAIL = async (data) => {
  const url = `${serverAddress}login/forgot-password`;
  const response = await axios
    .post(url, data)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  return response;
};

export const GET_PRESCRIPTION_BY_PATIENT_ID = async (data) => {
  const url = `${tempServerAddress}patient/prescription/get/patient/id?patient_id=${data}`;
  const response = await axios
    .get(url, {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    })
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  console.log(response, "Line 187");
  return response;
};

export const FILTER_PATIENTS = async (params) => {
  console.log("kamal hasan", params);

  const url = `${serverAddress}patient/filter`;
  const response = await axios
    .get(url, {
      params,
    })
    .then((res) => res)
    .catch((error) => error?.response?.data);

  console.log("show response", response);

  return response;
};

export const GET_APPOINTMENT_HISTORY = async (data) => {
  console.log("line appointment", data);
  const url = `${serverAddress}patient/prescription/get/appointment/id?appointment_id=${data}`;
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

export const FILTER_APPOINTMENTS = async (params) => {
  console.log("bobby deol:", params);
  let url = `${serverAddress}appointment/filter`;
  let response = await axios
    .get(url, {
      params,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res)
    .catch((error) => error?.response?.data);

  console.log(response);
  return response;
};

export const ADD_PATIENT_APPOINTMENT = async (data) => {
  let url = `${serverAddress}patient/add/appointment/patient`;
  let response = await axios
    .post(url, data)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  return response;
};

export const UPDATE_PAYMENT_STATUS = async (data) => {
  const url = `${serverAddress}appointment/update/payment?appointment_id=${data}`;
  const response = await axios
    .get(url, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  return response;
};

export const GET_APPOINTMENT_FILTER = async (data) => {
  const { status, doctor_id, clinic_id } = data;
  const url = `${serverAddress}appointment/filter/by/status?status=${status}&doctor_id=${doctor_id}&clinic_id=${clinic_id}`;
  const response = await axios
    .get(url, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);

  return response;
};

export const UPDATE_APPOINTMENT_STATUS = async (data) => {
  // console.log(data,"Line 386")
  const url = `${serverAddress}appointment/update/${data?.id}`;
  const response = await axios
    .put(url, data?.updatedValue[0], {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  return response;
};

export const VERIFY_OTP = async (data) => {
  console.log(data, "Line 400");
  const url = `${serverAddress}login/verify-otp`;
  const response = await axios
    .post(url, data, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  return response;
};

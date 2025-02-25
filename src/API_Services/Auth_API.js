import {
  ADD_PATIENT,
  CREATE_APPOINTMENT,
  CREATE_APPOINTMENT2,
  CREATE_PATIENTS_REPORT,
  CREATE_PRESCRIPTION,
  GET_ALL_APPOINTMENTS,
  GET_ALL_DOCTOR_LIST,
  GET_ALL_PATIENTS_LIST,
  GET_ALL_STAFF_LIST,
  GET_APPOINTMENTDETAILS_BY_APPOINTMENT_ID,
  GET_APPOINTMENT_BY_PATIENT_ID,
  GET_PATIENTS_REPORT,
  GET_REPORT_FILE,
  GET_APPOINtMENT_BY_DATE,
  MARK_APPOINTMENT_VISITED,
  VALIDATE_LOGIN,
  SEND_CODE_ON_EMAIL,
  GET_PRESCRIPTION_BY_PATIENT_ID,
  UPDATE_PAYMENT_STATUS,
  GET_APPOINTMENT_FILTER,
  GET_PATIENTS_BY_CLINIC_ID,
  UPDATE_APPOINTMENT_STATUS,
  ADD_PATIENT_APPOINTMENT,
} from "./API_service";

export const validateLogin = async (data) => {
  try {
    const response = await VALIDATE_LOGIN(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error?.message;
  }
};

export const getAllPatientsList = async () => {
  try {
    const response = await GET_ALL_PATIENTS_LIST();
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error?.message;
  }
};

export const addPatients = async (data) => {
  try {
    const response = await ADD_PATIENT(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error?.message;
  }
};

export const getAllDoctorList = async () => {
  try {
    const response = await GET_ALL_DOCTOR_LIST();
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error?.message;
  }
};

export const createAppointment = async (data) => {
  try {
    const response = await CREATE_APPOINTMENT(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error?.message;
  }
};

export const dateWiseAppointment = async (data) => {
  console.log("======1111111=============");
  console.log(data);
  try {
    const response = await GET_APPOINtMENT_BY_DATE(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error?.message;
  }
};

export const getAllStaffList = async () => {
  try {
    const response = await GET_ALL_STAFF_LIST();
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error?.message;
  }
};

export const getAppointmentByPatinetId = async (data) => {
  try {
    const response = await GET_APPOINTMENT_BY_PATIENT_ID(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error?.message;
  }
};

export const getPatientReport = async (data) => {
  try {
    const response = await GET_PATIENTS_REPORT(data);
    if (!response) {
      return `can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error?.message;
  }
};

export const createPrescription = async (data) => {
  try {
    const response = await CREATE_PRESCRIPTION(data);
    if (!response) {
      return `can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const getAppointmentDetailsByAppointmentId = async (data) => {
  try {
    const response = await GET_APPOINTMENTDETAILS_BY_APPOINTMENT_ID(data);
    if (!response) {
      return `can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const getReportFile = async (data) => {
  try {
    const response = await GET_REPORT_FILE(data);
    if (!response) {
      return `can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const createPatinetsReport = async (data) => {
  try {
    const response = await CREATE_PATIENTS_REPORT(data);
    if (!response) {
      return `can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const markvisited = async (data) => {
  try {
    const response = await MARK_APPOINTMENT_VISITED(data);
    if (!response) {
      return `can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const createAppontment2 = async (data) => {
  try {
    const response = await CREATE_APPOINTMENT2(data);
    if (!response) {
      return `can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const getAllAppointments = async () => {
  try {
    const response = await GET_ALL_APPOINTMENTS();
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response?.allAppointment;
    }
  } catch (error) {
    return error?.message;
  }
};

export const sendCodeOnEmail = async (data) => {
  try {
    const response = await SEND_CODE_ON_EMAIL(data);
    if (!response) return `Can't connect to server`;
    else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (e) {
    return e?.message;
  }
};

export const getPrescriptionByPatientID = async (id) => {
  try {
    const response = await GET_PRESCRIPTION_BY_PATIENT_ID(id);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (e) {
    return e?.message;
  }
};

export const updatePaymentStatus = async (data) => {
  try {
    const response = await UPDATE_PAYMENT_STATUS(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (e) {
    return e?.message;
  }
};

export const getFilterAppointment = async (data) => {
  try {
    const response = await GET_APPOINTMENT_FILTER(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (e) {
    return e?.message;
  }
};

export const getPatientsByClinicId =  async(data) =>{
  try {
    const response = await GET_PATIENTS_BY_CLINIC_ID(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (e) {
    return e?.message;
  }
};


export const updateAppointmentStatus =  async(data) =>{
  // console.log(data,"Line 344")
  try {
    const response = await UPDATE_APPOINTMENT_STATUS(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (e) {
    return e?.message;
  }
};

export const addPatientsAppointment =  async(data) =>{
  // console.log(data,"Line 344")
  try {
    const response = await ADD_PATIENT_APPOINTMENT(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (e) {
    return e?.message;
  }
};
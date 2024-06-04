import {
  ADD_PATIENT,
  CREATE_APPOINTMENT,
  CREATE_APPOINTMENT2,
  CREATE_PATIENTS_REPORT,
  CREATE_PRESCRIPTION,
  GET_ALL_DOCTOR_LIST,
  GET_ALL_PATIENTS_LIST,
  GET_ALL_STAFF_LIST,
  GET_APPOINTMENTDETAILS_BY_APPOINTMENT_ID,
  GET_APPOINTMENT_BY_PATIENT_ID,
  GET_PATIENTS_REPORT,
  GET_REPORT_FILE,
  GEt_APPOINtMENT_BY_DATE,
  MARK_APPOINTMENT_VISITED,
  VALIDATE_LOGIN,
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
  try {
    const response = await GEt_APPOINtMENT_BY_DATE(data);
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
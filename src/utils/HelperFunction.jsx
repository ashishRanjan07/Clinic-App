export const getPatientDetails = (data) => {
    if (!data?._parts) return {}; // Return an empty object if data is not available
  
    let firstName = "";
    let middleName = "";
    let lastName = "";
    let phoneNumber = "";
    let email = "";
    let gender = "";
    let age = "";
    let address = "";
    let clinicId = "";

  
    data._parts.forEach(part => {
      switch (part[0]) {
        case "first_name":
          firstName = part[1];
          break;
        case "middle_name":
          middleName = part[1];
          break;
        case "last_name":
          lastName = part[1];
          break;
        case "phone_number":
          phoneNumber = part[1];
          break;
        case "email":
          email = part[1];
          break;
        case "gender":
          gender = part[1];
          break;
        case "age":
          age = part[1];
          break;
        case "address":
          address = part[1];
          break;
          case "clinic_id":
          clinicId = part[1];
          break;
        default:
          break;
      }
    });
  
    const fullName = `${firstName} ${middleName} ${lastName}`.trim(); // Combine names into full name
  
    return {
      fullName,    
      phoneNumber, 
      email,       
      gender,     
      age,        
      address,
      clinicId      
    };
  };
  

  // Utility function to format date and time
export const formatDateAndTime = (isoDateString) => {
  const selectedDate = new Date(isoDateString);
const day = String(selectedDate.getDate()).padStart(2, '0');
  const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); 
  const year = selectedDate.getFullYear();
  // Format the date as DD-MM-YYYY
  const formattedDate = `${year}-${month}-${day}`;

  // Extract hours and minutes
  const hours = selectedDate.getHours().toString().padStart(2, '0');
  const minutes = String(selectedDate.getMinutes()).padStart(2, '0');
  const seconds = String(selectedDate.getSeconds()).padStart(2, '0');
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  return { formattedDate, formattedTime };
};



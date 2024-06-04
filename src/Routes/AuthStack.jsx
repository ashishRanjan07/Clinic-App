import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../Screens/Auth/Splash/Splash';
import Welcome from '../Screens/Auth/Welcome/Welcome';
import Login from '../Screens/Auth/Login/Login';
import ForgetPassword from '../Screens/Auth/ForgetPassword/ForgetPassword';
import OTP from '../Screens/Auth/ForgetPassword/OTP';
import CreateNewPassword from '../Screens/Auth/ForgetPassword/CreateNewPassword';
import ChangeConfirmation from '../Screens/Auth/ForgetPassword/ChangeConfirmation';
import TabStack from './TabStack';
import DoctorAvailability from '../Components/Profile/DoctorAvailability';
import AppointmentForm from '../Components/Home/AppointmentForm';
import AddmedicalDetails from '../Components/Home/AddmedicalDetails';
import CreatePrescription from '../Components/Home/CreatePrescription';
import EditProfile from '../Components/Profile/EditProfile';
import EditAppointment from '../Components/Appointment/EditAppointment';
import AddAppointmentByPatientsSearch from '../Components/Home/AddAppointmentByPatientsSearch';
import AddNewPatient from '../Components/Patient/AddNewPatient';

const Stack= createNativeStackNavigator();
const AuthStack = () => {
  return (
   <Stack.Navigator>
    <Stack.Screen name='Splash' component={Splash} options={{headerShown:false}}/>
    <Stack.Screen name='Welcome' component={Welcome} options={{headerShown:false}}/>
    <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
    <Stack.Screen name='ForgetPassword' component={ForgetPassword} options={{headerShown:false}}/>
    <Stack.Screen name='OTP' component={OTP} options={{headerShown:false}}/>
    <Stack.Screen name='Create Password' component={CreateNewPassword} options={{headerShown:false}}/>
    <Stack.Screen name='Change Confirmation' component={ChangeConfirmation} options={{headerShown:false}}/>
    <Stack.Screen name='Bottom Navigation' component={TabStack} options={{headerShown:false}}/>
    <Stack.Screen name='Doctor availability' component={DoctorAvailability} options={{headerShown:false}}/>
    <Stack.Screen name='AppointmentForm' component={AppointmentForm} options={{headerShown:false}}/>
    <Stack.Screen name='Medical Details' component={AddmedicalDetails} options={{headerShown:false}}/>
    <Stack.Screen name='Create Prescription' component={CreatePrescription} options={{headerShown:false}}/>
    <Stack.Screen name='Edit Profile' component={EditProfile} options={{headerShown:false}}/>
    <Stack.Screen name='Edit Appointment' component={EditAppointment} options={{headerShown:false}}/>
    <Stack.Screen name='Add Appointment By Patients Search' component={AddAppointmentByPatientsSearch} options={{headerShown:false}}/>
    <Stack.Screen name='Add Patients' component={AddNewPatient} options={{headerShown:false}}/>
   </Stack.Navigator>
  )
}

export default AuthStack


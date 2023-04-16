import React  from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import Store from "./redux/store";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import { GoogleOAuthProvider } from '@react-oauth/google';
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';
import * as serviceworker from './serviceWorkerRegistration'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { BrowserRouter } from 'react-router-dom';
const options = {
  position: positions.TOP_RIGHT,
  timeout: 7000,
  offset: '40px',
  transition: transitions.SCALE,
 
  }
 
const AlertTemplate = ({ style, options, message, close }) => {

  let color 
  let border

      if(options.type==='info'){
           color = 'var(--bg-color)'
           
      }else if(options.type==='success'){
            color='green'
      }else if(options.type==="error"){ 
           color='red'
      }

  return (<section  style={style} className='alert'>
    {options.type === 'info' && <InfoIcon  sx={{color}}/>}
    {options.type === 'success' && <CheckCircleIcon   sx={{color}}/>}
      {options.type === 'error' && <ErrorIcon  sx={{color}}/>}
     <p style={{color}} >{message}</p>
    <button onClick={close}><CloseIcon sx={{color}}/></button>
  </section>
)}




ReactDOM.render(
  <BrowserRouter>
  <GoogleOAuthProvider clientId ="805522899938-362kfj0f5nqichi1qk7kdjpkr79mi44u.apps.googleusercontent.com">
  <Provider store={Store} >
     <AlertProvider template={AlertTemplate}  {...options}>
     <App  />
     </AlertProvider>  
  </Provider>
  </GoogleOAuthProvider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);


// reportWebVitals();
serviceworker.register()

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.css';
import App from './app';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from "redux";
import rootReducer from './modules';
import ReduxThunk from "redux-thunk";
import AuthService from './service/auth_service';

import setAuthorizationToken from "./utils/setAuthorizationToken";
import jwtDecode from "jwt-decode";
import registerServiceWorker from './registerServiceWorker';

import ImageUploader from './service/image_uploader';
import ImageFileInput from './components/image_file_input/image_file_input';



const authService = new AuthService();
const root = ReactDOM.createRoot(document.getElementById('root'));

// 이미지 업로드
const imageUploader = new ImageUploader();
const FileInput = props => (
<ImageFileInput {...props} imageUploader= {imageUploader}/>
);



// Redux 관리
const store = createStore( rootReducer, applyMiddleware(ReduxThunk));


// 리로드시에도 유지
if(localStorage.getItem("Authorization")){
  setAuthorizationToken(localStorage.getItem("Authorization"));
  store.dispatch({type:'LOG_IN', user: jwtDecode(localStorage.getItem("Authorization"))});
}
root.render(
    <Provider store={ store }>
    <App 
    authService={authService}
    imageUploader= {imageUploader} />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
registerServiceWorker();
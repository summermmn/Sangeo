// modules/user.js -  user 기능을 가진 리듀서

// 액션
//const LOG_IN = "user/LOG_IN";
//const LOG_OUT = "user/LOG_OUT";

// 액션 생성 함수
export function LogIn(user) {
    console.log(user);
    return {
        type: "LOG_IN",
        user: user,
    }
}

export function logOut() {
    return {
        type: "LOG_OUT",
        user: null
    }
}

// 초기값
const initialState = {
  user: null,
  isLogin: false,
};

// 리덕스 스토어값 변경
export default function userReducer(state = initialState, action) {
    switch(action.type) {
        case "LOG_IN":
            return {
                ...state, 
                user: action.user,
                isLogin: true
            };
        case "LOG_OUT":
            return{
                ...state, 
                user: null,
                isLogin: false
            };
        default:
            return state;
    }
}
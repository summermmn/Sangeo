//https://docs.openvidu.io/en/stable/tutorials/openvidu-insecure-react/ 기반으로 작성

import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { Component } from 'react';
import { useParams } from "react-router-dom";

import './ConferencePage.css';
import UserVideoComponent from '../components/conference/UserVideoComponent';
import UserModel from '../components/conference//user-model';
import Paint from '../components/conference/Paint';
import ChatComponent from '../components/conference//ChatComponent';
import styled from 'styled-components';


//MUI 
import IconButton from '@material-ui/core/IconButton';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import VideocamOffRoundedIcon from '@mui/icons-material/VideocamOffRounded';
import MicRoundedIcon from '@mui/icons-material/MicRounded';
import MicOffRoundedIcon from '@mui/icons-material/MicOffRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';


function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

var localUser = new UserModel();
var counselorId;
var counselorName;
var userId;
var userName;
let isUserrrr;

const OPENVIDU_SERVER_URL = 'https://i7e207.p.ssafy.io:8443';
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

class ConferencePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mySessionId: 'Session' + props.params.id,
            myUserName: undefined,
            session: undefined,
            mainStreamManager: undefined,
            publisher: undefined,
            subscriber: undefined,
            localUser: undefined,
            chatDisplay: 'none',
        };

        this.joinSession = this.joinSession.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
        this.onbeforeunload = this.onbeforeunload.bind(this);
        this.toggleCamera = this.toggleCamera.bind(this);
        this.toggleMic = this.toggleMic.bind(this);
        this.toggleChat = this.toggleChat.bind(this);
        this.checkNotification = this.checkNotification.bind(this);
        this.checkSize = this.checkSize.bind(this);
    }

    async componentDidMount() {
        window.addEventListener('beforeunload', this.onbeforeunload);


        // 컨퍼런스 입장 전, 유효한 스케줄 번호인지, 유효한 사용자인지 검사
        await axios.get(process.env.REACT_APP_DB_HOST + `/schedules/${this.props.params.id}`)
            .then(({ data }) => {
                console.log("then", data);
                counselorId = data.counselor.counselorId;
                counselorName = data.counselor.name;
                userId = data.user.userId;
                userName = data.user.name;
                // console.log("테스트트트트", counselorId, counselorName, userId, userName);
            }
            ).catch((err) => {
                // 에러가 뜨면 일괄적으로 없는 스케줄에 들어왔다고 생각..
                // console.warn("스케줄 조회에서 에러 발생", err);
                alert('등록된 상담 스케줄이 아닙니다');
                window.location.href = '/';
            });

        let isCounselor = false;
        let isUser = false;
        let responseCounselorId;
        let responseUserId;
        await axios.get(process.env.REACT_APP_DB_HOST + "/counselors/me")
            .then(({ data }) => {
                console.log("counselors", data);
                isCounselor = true;
                responseCounselorId = data.counselorId;
            }
            ).catch((err) => {
                // 접속한 사용자가 상담사가 아닌 경우(아무것도 하지 않음)
                if (err.response.status === 403);
                else console.log("403외 다른 에러 발생,,");
            });

        await axios.get(process.env.REACT_APP_DB_HOST + "/users/me")
            .then(({ data }) => {
                console.log("users", data);
                isUser = true;
                isUserrrr = true
                responseUserId = data.userId;
            }
            ).catch((err) => {
                // 접속한 사용자가 회원이 아닌 경우(아무것도 하지 않음)
                if (err.response.status === 403);
                else console.log("403외 다른 에러 발생,,");
            });



        if (!isUser && !isCounselor) {
            alert('로그인 이후 입장 가능합니다.');
            window.location.href = '/';
        }
        else if (!(counselorId === responseCounselorId || userId === responseUserId)) {
            alert('스케줄에 등록된 회원/상담사가 아닙니다.');
            window.location.href = '/';
        }

        if (isCounselor)
            this.setUserName(counselorName);
        if (isUser)
            this.setUserName(userName);

        //  var startTime;
        // 스케줄이 진짜 있는 스케줄인지 체크 (나중에 시간을 두고 만드는것도 괜찮을듯...)

        this.joinSession();
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
        this.leaveSession();
    }

    onbeforeunload(event) {
        this.leaveSession();
    }

    handleChangeSessionId(e) {
        this.setState({
            mySessionId: e.target.value,
        });
    }

    handleChangeUserName(e) {
        this.setState({
            myUserName: e.target.value,
        });
    }

    setSessionId(id) {
        this.setState({
            mySessionId: id,
        });
    }

    setUserName(name) {
        this.setState({
            myUserName: name,
        });
    }

    handleMainVideoStream(stream) {
        if (this.state.mainStreamManager !== stream) {
            this.setState({
                mainStreamManager: stream
            });
        }
    }

    setSubscriber(subscriber) {
        this.setState({
            subscriber,
        });
    }

    deleteSubscriber() {
        this.setSubscriber(undefined);
    }

    joinSession() {
        this.OV = new OpenVidu();

        //카메라,오디오 권한 요구
        var video = undefined;
        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(function (stream) {
            video = stream.getVideoTracks()[0].id;
            // console.log("테스트", video);
        })
        // --- 2) Init a session ---
        this.setState(
            { session: this.OV.initSession(), },
            () => {
                var mySession = this.state.session;

                // --- 3) Specify the actions when events take place in the session ---
                // On every new Stream received...

                // 1대 1 상담이므로 subscriber는 하나만 존재
                mySession.on('streamCreated', (event) => {
                    // Subscribe to the Stream to receive it. Second parameter is undefined
                    // so OpenVidu doesn't create an HTML video by its own
                    var subscriber = mySession.subscribe(event.stream, undefined);

                    // Update the state with the new subscribers
                    this.setState({
                        subscriber: subscriber,
                    });
                });

                // On every Stream destroyed...
                mySession.on('streamDestroyed', (event) => {
                    // Remove the stream from 'subscribers' array
                    this.deleteSubscriber();
                });

                // On every asynchronous exception...
                mySession.on('exception', (exception) => {
                    console.warn(exception);
                });

                // --- 4) Connect to the session with a valid user token ---

                // 'getToken' method is simulating what your server-side should do.
                // 'token' parameter should be retrieved and returned by your own backend
                this.getToken().then((token) => {
                    // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
                    // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
                    mySession
                        .connect(
                            token,
                            { clientData: this.state.myUserName },
                        )
                        .then(async () => {
                            var devices = await this.OV.getDevices();
                            var videoDevices = devices.filter(device => device.kind === 'videoinput');

                            // Vidoe input devie with deviceId '' not found 에러 해결
                            if (videoDevices[0].deviceId === '') {
                                console.log("에러 발생 !!! true인지 확인", videoDevices[0].deviceId === '');
                                videoDevices[0].deviceId = video;
                            }

                            // --- 5) Get your own camera stream ---
                            // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
                            // element: we will manage it on our own) and with the desired properties
                            let publisher = this.OV.initPublisher(undefined, {
                                audioSource: undefined, // The source of audio. If undefined default microphone
                                videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
                                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                                resolution: '640x480', // The resolution of your video
                                frameRate: 30, // The frame rate of your video
                                insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                                mirror: false, // Whether to mirror your local video or not
                            });

                            // --- 6) Publish your stream ---
                            mySession.publish(publisher);
                            localUser.setConnectionId(publisher.session.connection.connectionId);
                            localUser.setStreamManager(publisher);
                            localUser.setNickname(this.state.myUserName);

                            // Set the main video in the page to display our webcam and store our Publisher
                            this.setState({
                                currentVideoDevice: videoDevices[0],
                                mainStreamManager: publisher,
                                publisher: publisher,
                                localUser: localUser
                            });
                        })
                        .catch((error) => {
                            console.log('There was an error connecting to the session:', error.code, error.message);
                        });
                });
            },
        );
    }

    toggleCamera() {
        var publisher = this.state.publisher;
        publisher.publishVideo(!this.state.publisher.stream.videoActive);
        this.setState({ publisher: publisher });
    }
    toggleMic() {
        var publisher = this.state.publisher;
        publisher.publishAudio(!this.state.publisher.stream.audioActive);
        this.setState({ publisher: publisher });
    }
    toggleChat() {
        let display = this.state.chatDisplay;
        if (display === 'block') {
            display = 'none';
            this.setState({ chatDisplay: display });
        } else {
            display = 'block';
            console.log('chat', display);
            this.setState({ chatDisplay: display, messageReceived: false });
        }
        //this.updateLayout();
    }
    checkNotification(event) {
        this.setState({
            messageReceived: this.state.chatDisplay === 'none',
        });
    }
    checkSize() {
        if (document.getElementById('layout').offsetWidth <= 700 && !this.hasBeenUpdated) {
            this.toggleChat('none');
            this.hasBeenUpdated = true;
        }
        if (document.getElementById('layout').offsetWidth > 700 && this.hasBeenUpdated) {
            this.hasBeenUpdated = false;
        }
    }

    leaveSession() {
        // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
        const mySession = this.state.session;
        if (mySession) {
            mySession.disconnect();
        }
        this.OV = null;
        this.setState({
            session: undefined,
            subscribers: [],
            mySessionId: 'SessionA',
            myUserName: 'Participant' + Math.floor(Math.random() * 100),
            mainStreamManager: undefined,
            publisher: undefined
        });
        alert("상담을 종료합니다.");
        if (isUserrrr) {window.location.href = '/mypage';}
        else {window.location.href = '/counmypage';}
    }

    render() {
        const localUser = this.state.localUser;
        var chatDisplay = { display: this.state.chatDisplay };
        return (
            <div className="conference-container">
                {this.state.session !== undefined ? (
                    <div id="session">
                        {/* <div id="session-header">
                            <img src={"http://localhost:3001/sangeo_logo.png"} alt="상어 로고" />
                        </div> */}
                        <div className='session-body'>
                            <div id="video-container" className='col-md-3 col-xs-3'>
                                <div className="row">
                                    {this.state.subscriber !== undefined ? (
                                        // VideoContainer
                                        <VideoContainer>
                                            <UserVideoComponent
                                                streamManager={this.state.subscriber} />
                                        </VideoContainer>
                                    ) : null}                                </div>
                                <div className="row">
                                    {this.state.publisher !== undefined ? (
                                        <VideoContainer>
                                            <UserVideoComponent
                                                streamManager={this.state.publisher} />
                                            <div id="session-tools row" className='d-flex justify-content-center'>
                                                {this.state.publisher !== undefined && this.state.publisher.stream.videoActive ? (
                                                    <IconButton id="buttonToggleCamera" onClick={this.toggleCamera}>
                                                        <VideocamRoundedIcon />
                                                    </IconButton>
                                                ) : <IconButton id="buttonToggleCamera" onClick={this.toggleCamera}>
                                                    <VideocamOffRoundedIcon />
                                                </IconButton>}
                                                {this.state.publisher !== undefined && this.state.publisher.stream.audioActive ? (
                                                    <IconButton id="buttonToggleMic" onClick={this.toggleMic}>
                                                        <MicRoundedIcon />
                                                    </IconButton>
                                                ) : <IconButton id="buttonToggleMic" onClick={this.toggleMic}>
                                                    <MicOffRoundedIcon />
                                                </IconButton>}
                                                <IconButton id="buttonLeaveSession" onClick={this.leaveSession}>
                                                    <LogoutRoundedIcon />
                                                </IconButton>
                                            </div>
                                        </VideoContainer>
                                    ) : null}
                                </div>

                            </div>
                            <div className='col-md-9 col-xs-9 paint-container'>
                                <div id="canvas-container" >
                                    {localUser !== undefined && localUser.getStreamManager() !== undefined && (
                                        <div>
                                            <Paint user={localUser} />
                                            <div className="OT_root OT_publisher custom-class row chatbox sidebar" style={chatDisplay}>
                                                <ChatComponent
                                                    user={localUser}
                                                    chatDisplay={this.state.chatDisplay}
                                                    close={this.toggleChat}
                                                    messageReceived={this.checkNotification}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {localUser !== undefined && localUser.getStreamManager() !== undefined && (
                                    <MessageBorder>
                                        <IconButton id="buttonToggleChat" onClick={this.toggleChat}>
                                            <ChatRoundedIcon size="large" />
                                        </IconButton>
                                    </MessageBorder>
                                )}
                            </div>
                        </div>
                    </div>
                ) : null
                }
            </div>
        );
    }



    /**
     * --------------------------
     * SERVER-SIDE RESPONSIBILITY
     * --------------------------
     * These methods retrieve the mandatory user token from OpenVidu Server.
     * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
     * the API REST, openvidu-java-client or openvidu-node-client):
     *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
     *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
     *   3) The Connection.token must be consumed in Session.connect() method
     */

    getToken() {
        return this.createSession(this.state.mySessionId).then((sessionId) => this.createToken(sessionId));
    }

    createSession(sessionId) {
        return new Promise((resolve, reject) => {
            var data = JSON.stringify({ customSessionId: sessionId });
            axios
                .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
                    headers: {
                        Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    console.log('CREATE SESION', response);
                    resolve(response.data.id);
                })
                .catch((response) => {
                    var error = Object.assign({}, response);
                    if (error?.response?.status === 409) {
                        resolve(sessionId);
                    } else {
                        console.log(error);
                        console.warn(
                            'No connection to OpenVidu Server. This may be a certificate error at ' +
                            OPENVIDU_SERVER_URL,
                        );
                        if (
                            window.confirm(
                                'No connection to OpenVidu Server. This may be a certificate error at "' +
                                OPENVIDU_SERVER_URL +
                                '"\n\nClick OK to navigate and accept it. ' +
                                'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                                OPENVIDU_SERVER_URL +
                                '"',
                            )
                        ) {
                            window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
                        }
                    }
                });
        });
    }

    createToken(sessionId) {
        return new Promise((resolve, reject) => {
            var data = {};
            axios
                .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions/" + sessionId + "/connection", data, {
                    headers: {
                        Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    console.log('TOKEN', response);
                    resolve(response.data.token);
                })
                .catch((error) => reject(error));
        });
    }
}


const MessageBorder = styled.div`
position: absolute;
right: 20px;
bottom: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
`;

const VideoContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  border-radius: 18px;
  position: relative;
  background-color: white;
  margin-top: 10px;
  padding : 10px;
  margin-right: 5px;
`;

export default withParams(ConferencePage);

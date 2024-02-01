import { useEffect, useRef, useState } from 'react';
import './Paint.css';
import styled from 'styled-components';
import ImageUploader from '../../service/image_uploader';

const imageUploader = new ImageUploader();
function Paint(props) {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const cavasContainerRef = useRef();
  const colorPickRefs = useRef([]);
  const eraserRef = useRef();
  const trashBinRef = useRef();
  const downloadRef = useRef();


  const [isDrawing, setIsDrawing] = useState(false)
  const [lineWidth, setLineWidth] = useState()
  const [pickedColor, setPickedColor] = useState()

  // 이미지 저장 관련 state
  const [fileImage, setFileImage] = useState("");
  const [textValue, setTextValue] = useState("");
  const [imgName, setImgName] = useState("");
  const [imgURL, setImgURL] = useState("");

  const colors = [
    '#c0392b',
    '#e67e22',
    '#f1c40f',
    '#2ecc71',
    '#3498db',
    '#8e44ad',
    '#e84393',
    '#000000',
  ];

  let session = props.user.getStreamManager().stream.session;
  let id = props.user.connectionId;

  // console.log("최상위 : ", props);
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = cavasContainerRef.current.clientWidth;
    // canvas.height = cavasContainerRef.current.clientHeight;
    canvas.height = window.innerHeight - 200;  // 상단바 크기 150px로 고정

    const context = canvas.getContext("2d");
    context.lineCap = "round"
    context.strokeStyle = "black"
    context.lineWidth = lineWidth
    contextRef.current = context;

    // 처음 시작할때 흰 화면으로 초기화 했으면 좋겠음.. (상대도 초기화)
    fillWhiteRect();
    const data = {
      x: 0,
      y: 0,
      lineWidth: lineWidth,
      color: "#ffffff",
      isDrawing: false,
    };
    session.signal({
      data: JSON.stringify({ type: 'trash', id: id, payload: { ...data } }),
      type: 'draw',
    });
    session.on('signal:draw', (event) => {
      const data = JSON.parse(event.data);
      if (data.id !== id) {
        if (data.type === 'file') {
          // console.log("data 다 뜯어보기", data);
          peerDrawIamge(data.payload);
        } else if (data.type === 'trash') {
          fillWhiteRect();
        }
        else
          peerDrawing(data.payload);
      }
    });

    if (colorPickRefs.current) {
      colorPickRefs.current.map((element) =>
        element.addEventListener('click', (event) => {
          if (event.target) {
            onColorChange(event);
          }
        })
      );
    }
    if (eraserRef.current) {
      eraserRef.current.onclick = () => {
        changeColor("#FFFFFF"); //white
        setLineWidth(18);
        contextRef.current.lineWidth = lineWidth;
      };
    }
    if (trashBinRef.current) {
      trashBinRef.current.onclick = () => {
        fillWhiteRect();
        const data = {
          x: 0,
          y: 0,
          lineWidth: 10,
          color: "#ffffff",
          isDrawing: false,
        };
        session.signal({
          data: JSON.stringify({ type: 'trash', id: id, payload: { ...data } }),
          type: 'draw',
        });
      };
    }

    if (downloadRef.current) {
      downloadRef.current.onclick = () => onSaveClick();
    }

  }, [])



  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setLineWidth(lineWidth);
    setIsDrawing(true)
    const data = {
      x: offsetX,
      y: offsetY,
      lineWidth: lineWidth,
      color: pickedColor,
      isDrawing: false,
    };
    // console.log("startDrawing : ", props);
    session.signal({
      data: JSON.stringify({ type: 'start', id: id, payload: { ...data } }),
      type: 'draw',
    });

  }

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineWidth = lineWidth;
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
    const data = {
      x: offsetX,
      y: offsetY,
      lineWidth: lineWidth,
      color: pickedColor,
      isDrawing: true,
    };
    session.signal({
      data: JSON.stringify({ type: 'move', id: id, payload: { ...data } }),
      type: 'draw',
    });

  }

  const finishDrawing = () => {
    if (isDrawing)
      contextRef.current.stroke();
    setIsDrawing(false)
  }

  function peerDrawing(payload) {
    console.log("payload", payload);
    let context = contextRef.current;
    if (!context) return;
    setLineWidth(payload.lineWidth);
    context.lineWidth = payload.lineWidth;
    changeColor(payload.color);
    context.strokeStyle = payload.color;
    // context.lineCap = payload.lineCap;


    if (!payload.isDrawing) {
      context.beginPath();
      context.moveTo(payload.x, payload.y);
    } else {
      context.lineTo(payload.x, payload.y);
      context.stroke();
    }
  }

  function onLineWidthChange() {
    // console.log(event.target.value);
    // setLineWidth(event);
    // contextRef.current.lineWidth = lineWidth;
    var select = document.querySelector("select");
    var selected = document.querySelector("option:checked");

    console.log(selected.textContent);
    // var selectedFontSize = getComputedStyle(selected, null).getPropertyValue("font-size");
    // select.style.fontSize = selectedFontSize;
    // let width = selectedFontSize.substring(0, selectedFontSize.length - 2);
    let width = selected.textContent.substring(0, selected.textContent.length - 2);
    console.warn("width", width);
    setLineWidth(width);
    contextRef.current.lineWidth = lineWidth;
  }

  function onColorChange(event) {
    let color;
    if (event.target.value === undefined)
      color = event.target.id; // 팔레트에서 선택
    else
      color = event.target.value;
    changeColor(color);
  }

  const onFileChange = async (event) => {
    const file = event.target.files[0];

    setFileImage(URL.createObjectURL(file));
    const uploaded = await imageUploader.upload(file);
    // await console.warn("uploaded 확인하기 ,,,, " ,uploaded);
    await setImgName(uploaded.original_filename);
    await setImgURL(uploaded.url);
    // await console.log("gggg ", imgURL);
    await drawImage(uploaded.url, 0, 0, canvasRef.current.width, canvasRef.current.height);
    //상대방 화면에도 사진이 나오는지 확인 필요,,
    const data = {
      url: uploaded.url,
      moveToX: 0,
      moveToY: 0,
      width: canvasRef.current.width,
      height: canvasRef.current.height,
    };
    session.signal({
      file: file,
      data: JSON.stringify({ type: 'file', id: id, payload: { ...data } }),
      type: 'draw',
    });
  }

  function fillWhiteRect() {
    contextRef.current.fillStyle = "white";
    contextRef.current.lineWidth = lineWidth; //rectfill
    contextRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }

  function drawImage(imgURL, moveToX, moveToY, width, height) {
    // console.log(imgURL);//blob:http://127.0.0.1:5500/d605923f-931b-4b31-8193-8a5999056d9e
    const image = new Image();
    image.src = imgURL;
    image.crossOrigin = "anonymous";
    image.onload = function () {
      contextRef.current.drawImage(image, moveToX, moveToY, width, height);
    }
  }

  function peerDrawIamge(payload) {
    console.log("payload", payload);
    drawImage(payload.url, payload.moveToX, payload.moveToY, payload.width, payload.height);
  }

  function changeColor(color) {
    setPickedColor(color);
    contextRef.current.strokeStyle = color;
    const colorSelector = document.getElementById("color-select");
    //color 에서 현재 선택한 색깔 보여주기
    // console.log("호출 ----",color, colorSelector);
    colorSelector.value = color;
  }

  function onSaveClick() {
    const url = canvasRef.current.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = Date.now() + ".jpeg";
    a.click();
  }

  // function canvasClear() {
  //   console.log("상대방이 들어오면,, 캔버스를 초기화 ---- ");
  //   var context = canvasRef.context;
  //   if (!context) return;
  //   if (!canvasRef.current) return;
  //   context.clearRect(
  //     0,
  //     0,
  //     canvasRef.current.width,
  //     canvasRef.current.height
  //   );
  // }



  return (
    <div>
      <PickBox>
        <LineWidthSelector>
          {/* <input id="line-width" type="range" min="2" max="20" value={lineWidth} onChange={onLineWidthChange} step="2" /> */}
          {/* <select id="lineWidthOption" onChange={onLineWidthChange}>
            <option class="w1"><>&#9473;&#9473;&#9473;&#9473;</></option>
            <option class="w2"><>&#9473;&#9473;&#9473;&#9473;</></option>
            <option class="w3"><>&#9473;&#9473;&#9473;&#9473;</></option>
            <option class="w4"><>&#9473;&#9473;&#9473;&#9473;</></option>
            <option class="w5"><>&#9473;&#9473;&#9473;&#9473;</></option>
            <option class="w6"><>&#9473;&#9473;&#9473;&#9473;</></option>
          </select> */}
          <select id="lineWidthOption" onChange={onLineWidthChange}>
            <option class="w1"><>3px</></option>
            <option class="w2"><>6px</></option>
            <option class="w3"><>9px</></option>
            <option class="w4"><>12px</></option>
            <option class="w5"><>15px</></option>
            <option class="w6"><>18px</></option>
          </select>
        </LineWidthSelector>
        <ColorSelector>
          <input type="color" id="color-select" onChange={onColorChange} />
        </ColorSelector>
        {colors.map((color, i) => {
          return (
            <ColorPick
              id={color}
              key={i}
              color={color}
              ref={(element) => {
                if (element) {
                  colorPickRefs.current[i] = element;
                }
              }}
            />
          );
        })}
        <Eraser ref={eraserRef}>
          <svg width='24' height='24' xmlns='http://www.w3.org/2000/svg'>
            <path d='M5.662 23l-5.369-5.365c-.195-.195-.293-.45-.293-.707 0-.256.098-.512.293-.707l14.929-14.928c.195-.194.451-.293.707-.293.255 0 .512.099.707.293l7.071 7.073c.196.195.293.451.293.708 0 .256-.097.511-.293.707l-11.216 11.219h5.514v2h-12.343zm3.657-2l-5.486-5.486-1.419 1.414 4.076 4.072h2.829zm6.605-17.581l-10.677 10.68 5.658 5.659 10.676-10.682-5.657-5.657z' />
          </svg>
        </Eraser>


        <TrashBin ref={trashBinRef}>
          <svg xmlns="http://www.w3.org/2000/svg"
            width="0.266667in" height="0.266667in"
            viewBox="0 0 24 24">
            <path
              fill="none" stroke="black" stroke-width="2"
              d="M 14.25,9.00
           C 14.25,9.00 14.25,16.50 14.25,16.50M 9.75,9.00
           C 9.75,9.00 9.75,16.50 9.75,16.50M 9.75,2.25
           C 9.75,2.25 14.25,2.25 14.25,2.25M 2.25,5.25
           C 2.25,5.25 21.75,5.25 21.75,5.25M 18.75,5.25
           C 18.75,5.25 18.75,21.75 18.75,21.75
             18.75,21.75 5.25,21.75 5.25,21.75
             5.25,21.75 5.25,5.25 5.25,5.25
             5.25,5.25 18.75,5.25 18.75,5.25 Z" />
          </svg>
        </TrashBin>
        <ImageSelector>
          <label for="file">
            <svg xmlns="http://www.w3.org/2000/svg"
              width="0.266667in" height="0.266667in"
              viewBox="0 0 24 24">
              <path
                fill="none" stroke="black" stroke-width="1"
                d="M 23.59,0.83
           C 23.59,0.83 0.41,0.83 0.41,0.83
             0.19,0.83 0.00,1.01 0.00,1.24
             0.00,1.24 0.00,19.45 0.00,19.45
             0.00,19.68 0.19,19.86 0.41,19.86
             0.41,19.86 10.34,19.86 10.34,19.86
             10.57,19.86 10.76,19.68 10.76,19.45
             10.76,19.22 10.57,19.03 10.34,19.03
             10.34,19.03 0.83,19.03 0.83,19.03
             0.83,19.03 0.83,1.66 0.83,1.66
             0.83,1.66 23.17,1.66 23.17,1.66
             23.17,1.66 23.17,11.17 23.17,11.17
             23.17,11.40 23.36,11.59 23.59,11.59
             23.81,11.59 24.00,11.40 24.00,11.17
             24.00,11.17 24.00,1.24 24.00,1.24
             24.00,1.01 23.81,0.83 23.59,0.83 Z
           M 2.59,15.17
           C 2.67,15.26 2.78,15.31 2.90,15.31
             2.99,15.31 3.09,15.28 3.17,15.21
             3.17,15.21 9.92,9.26 9.92,9.26
             9.92,9.26 12.95,12.29 12.95,12.29
             13.11,12.45 13.37,12.45 13.53,12.29
             13.70,12.13 13.70,11.87 13.53,11.71
             13.53,11.71 12.78,10.95 12.78,10.95
             12.78,10.95 16.58,6.79 16.58,6.79
             16.58,6.79 21.24,11.06 21.24,11.06
             21.41,11.22 21.67,11.21 21.82,11.04
             21.98,10.87 21.96,10.61 21.80,10.45
             21.80,10.45 16.83,5.90 16.83,5.90
             16.75,5.83 16.64,5.79 16.53,5.79
             16.42,5.80 16.32,5.85 16.25,5.93
             16.25,5.93 12.19,10.37 12.19,10.37
             12.19,10.37 10.23,8.40 10.23,8.40
             10.08,8.25 9.83,8.24 9.66,8.39
             9.66,8.39 2.62,14.59 2.62,14.59
             2.45,14.74 2.43,15.00 2.59,15.17 Z
           M 8.93,5.61
           C 8.93,4.34 7.89,3.31 6.62,3.31
             5.35,3.31 4.32,4.34 4.32,5.61
             4.32,6.89 5.35,7.92 6.62,7.92
             7.89,7.92 8.93,6.89 8.93,5.61 Z
           M 5.14,5.61
           C 5.14,4.80 5.81,4.14 6.62,4.14
             7.44,4.14 8.10,4.80 8.10,5.61
             8.10,6.43 7.44,7.09 6.62,7.09
             5.81,7.09 5.14,6.43 5.14,5.61 Z
           M 12.83,23.17
           C 12.83,23.17 22.76,23.17 22.76,23.17
             22.76,23.17 22.76,13.24 22.76,13.24
             22.76,13.24 12.83,13.24 12.83,13.24
             12.83,13.24 12.83,23.17 12.83,23.17 Z
           M 13.66,14.07
           C 13.66,14.07 21.93,14.07 21.93,14.07
             21.93,14.07 21.93,22.34 21.93,22.34
             21.93,22.34 18.21,22.34 18.21,22.34
             18.21,22.34 18.21,17.14 18.21,17.14
             18.21,17.14 19.98,18.91 19.98,18.91
             19.98,18.91 20.57,18.33 20.57,18.33
             20.57,18.33 17.79,15.55 17.79,15.55
             17.79,15.55 15.02,18.33 15.02,18.33
             15.02,18.33 15.60,18.91 15.60,18.91
             15.60,18.91 17.38,17.14 17.38,17.14
             17.38,17.14 17.38,22.34 17.38,22.34
             17.38,22.34 13.66,22.34 13.66,22.34
             13.66,22.34 13.66,14.07 13.66,14.07 Z" />
            </svg>
          </label>
          <input type="file" accept="image/*" id="file" onChange={onFileChange} />
        </ImageSelector>
        <ImageDonwloader ref={downloadRef}>
          <svg xmlns="http://www.w3.org/2000/svg"
            width="0.266667in" height="0.266667in"
            viewBox="0 0 24 24">
            <path
              fill="none" stroke="black" stroke-width="2"
              d="M 11.53,18.74
           C 11.65,18.86 11.83,18.94 12.00,18.94
             12.17,18.94 12.35,18.87 12.47,18.74
             12.47,18.74 17.79,13.42 17.79,13.42
             18.05,13.16 18.05,12.74 17.79,12.48
             17.53,12.21 17.11,12.21 16.84,12.48
             16.84,12.48 12.67,16.65 12.67,16.65
             12.67,16.65 12.67,0.67 12.67,0.67
             12.67,0.30 12.37,0.00 12.00,0.00
             11.63,0.00 11.33,0.30 11.33,0.67
             11.33,0.67 11.33,16.65 11.33,16.65
             11.33,16.65 7.16,12.48 7.16,12.48
             6.89,12.21 6.47,12.21 6.21,12.48
             5.95,12.74 5.95,13.16 6.21,13.42
             6.21,13.42 11.53,18.74 11.53,18.74 Z
           M 21.11,22.66
           C 21.11,22.66 2.89,22.66 2.89,22.66
             2.52,22.66 2.23,22.96 2.23,23.33
             2.23,23.70 2.52,24.00 2.89,24.00
             2.89,24.00 21.11,24.00 21.11,24.00
             21.48,24.00 21.77,23.70 21.77,23.33
             21.77,22.96 21.48,22.66 21.11,22.66 Z" />
          </svg>
        </ImageDonwloader>
      </PickBox>
      <CanvasContainer ref={cavasContainerRef}>
        <canvas
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={finishDrawing}
          onMouseOut={finishDrawing}
          ref={canvasRef}
        />

      </CanvasContainer>

    </div>
  );
}


const PickBox = styled.div`
  position: relative;
  left: 50%;
  top: 15px;
  display: flex;
  transform: translate(-50%, 0);
  border: 1px solid rgba(0, 0, 0, 0.1);
box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
border-radius: 18px;
background-color: white;
width: 95%;
height : 50px;
align-items: center;
justify-content: center;
margin-right: 0px;
`;
const ColorPick = styled.div`
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  z-index: 999;
  background-color: ${(props) => props.color};
  margin-right: 5px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
`;
const Eraser = styled.div`
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;
const TrashBin = styled.div`
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;
const LineWidthSelector = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  margin-bottom: 10px;
`;
const ColorSelector = styled.div`
  cursor: pointer;
  width: 80px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;
const ImageSelector = styled.div`
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;

const ImageDonwloader = styled.div`
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;
const CanvasContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  width: 95%;
  height: 95%;
  border-radius: 18px;
  position: relative;
  background-color: white;
  margin-top: 30px;
  margin-left: 30px;
`;

export default Paint;

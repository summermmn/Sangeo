import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function PwModal({show, handleClose, setPassword, checkPassword}) {

  function onChangePassword(e){
    setPassword(e.target.value);
  }

  function onClickConfirm(){
    handleClose();
    checkPassword();
  }

  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>비밀번호를 확인할게요.</Modal.Title>
    </Modal.Header>
    <Modal.Body className='text-center'>
        <input type="password" className="text-center" placeholder='비밀번호 입력해주세요.' onChange={onChangePassword}></input>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={onClickConfirm}>
        확인
      </Button>
    </Modal.Footer>
  </Modal>
  );
}

export default PwModal;
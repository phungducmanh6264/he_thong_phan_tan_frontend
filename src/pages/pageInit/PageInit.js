import { Modal } from "react-bootstrap";
import styles from "./styles.module.scss";
import { useState } from "react";
import { InitDispatcherServer } from "@api/Api";
import { isIPAddress } from "@utils";

function PageInit() {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const [modalContent, setModalContent] = useState({
    title: "",
    content: "",
  });

  const [ip, setIp] = useState("");

  const handleSetDispatcherIP = () => {
    if (!isIPAddress(ip)) {
      handleShow({
        title: "Error",
        content: "ip invalid",
      });
      return;
    }
    InitDispatcherServer(
      ip,
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  return (
    <div className={styles.pageWrapper}>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalContent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>{modalContent.content}</div>
        </Modal.Body>
        <Modal.Footer>
          <button className={styles.button} onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
      <div className={styles.pageContent}>
        <div className={styles.form}>
          <input
            className={styles.txtInput}
            type="text"
            placeholder="Enter dispatcher server ip . . ."
            value={ip}
            onChange={(e) => {
              const _value = e.target.value;
              setIp(_value);
            }}
          />
          <button
            className={styles.button}
            onClick={() => {
              handleSetDispatcherIP();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default PageInit;

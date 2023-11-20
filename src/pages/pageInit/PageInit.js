import { Modal, Spinner } from "react-bootstrap";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { InitDispatcherServer } from "@api/Api";
import { isIPAddress } from "@utils";
import { useGlobal } from "@hooks";
import WaittingPanel from "@components/WaittingPanel/WaittingPanel";

function PageInit() {
  const [uGlobal, sUGlobal] = useGlobal();

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const [waitting, sWaitting] = useState(false);

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
    sWaitting(true);
    InitDispatcherServer(
      ip,
      (res) => {
        const _result = res.data;
        console.log(res);
        console.log(_result);
        if (_result === "success") {
          sUGlobal(() => ({ status: 1 }));
          sWaitting(false);
          return;
        }
        if (_result === "failed") {
          sWaitting(false);
          handleShow({ title: "Error", content: `Connect failed to ip ${ip}` });
          return;
        }
      },
      (err) => {
        console.log(err);
        handleShow({ title: "Error", content: "Init server failed!" });
      }
    );
  };

  useEffect(() => {
    console.log(uGlobal);
  }, [uGlobal]);

  useEffect(() => {
    console.log("PageInit did mount");

    return () => {
      console.log("PageInit un mount");
    };
  }, []);

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
      {waitting === false ? (
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
      ) : (
        <WaittingPanel content={"waitting . . ."} />
      )}
    </div>
  );
}

export default PageInit;

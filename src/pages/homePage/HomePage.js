import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { ExitsCS, GetInfo, SendRequest2CS } from "@api/Api";
import { Modal, Spinner } from "react-bootstrap";
import { convertTimestampToTime } from "@utils";

function HomePage() {
  const [serverInfo, sServerInfo] = useState();
  const [methodWaitting, sMTWT] = useState(false);

  useEffect(() => {
    const _timerId = setInterval(() => {
      GetInfo(
        (res) => {
          const _data = res.data;
          if (_data === "failed") {
          } else {
            sServerInfo(_data);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }, 1000);

    return () => {
      clearInterval(_timerId);
    };
  }, []);

  const sendRequest2CS = () => {
    sMTWT(true);
    SendRequest2CS(
      (res) => {
        sMTWT(false);
      },
      (err) => {
        sMTWT(false);
        handleShow({
          title: "Yêu cầu vào miền găng thất bại!",
          content: "Lỗi không xác định...",
        });
      }
    );
  };

  const exitsFromCS = () => {
    sMTWT(true);
    ExitsCS(
      (res) => {
        sMTWT(false);
      },
      (err) => {
        sMTWT(false);
        handleShow({
          title: "Yêu cầu thoát miền găng thất bại!",
          content: "Lỗi không xác định...",
        });
      }
    );
  };

  console.log(serverInfo?.myRequests);

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

  console.log(serverInfo);

  return (
    <>
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
      {serverInfo ? (
        <div className={styles.pageWrapper}>
          <div className={styles.pageContent}>
            <div className={styles.pageBody}>
              <div className={styles.hosts}>
                <div className={styles.title}>Hosts</div>
                <div className={styles.listhost}>
                  {serverInfo &&
                    serverInfo?.ipAllServer &&
                    serverInfo.ipAllServer.map((host, i) => (
                      <div className={styles.hostline} key={i}>
                        <div
                          className={
                            host.status === 0
                              ? `${styles.hostname}`
                              : `${styles.hostname} ${styles.active}`
                          }
                        >
                          {host.hostname}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className={styles.main}>
                <div className={styles.title}>Thông tin</div>
                <div className={styles.serverInfo}>
                  <div className={styles.groupInfo}>
                    <span className={styles.label}>Trạng thái: </span>
                    <span className={styles.value}>
                      {serverInfo.serverStatus === -1
                        ? "Lỗi"
                        : serverInfo.serverStatus === 0
                        ? "Đang rảnh"
                        : serverInfo.serverStatus === 1
                        ? "Đang yêu cầu vào miền găng"
                        : serverInfo.serverStatus === 2
                        ? "Đang trong miền găng"
                        : ""}
                    </span>
                  </div>
                  <div className={styles.groupInfo}>
                    <span className={styles.label}>IP: </span>
                    <span className={styles.value}>{serverInfo.serverIp}</span>
                  </div>
                </div>
                <div className={styles.serverMethod}>
                  {serverInfo.serverStatus === 0 &&
                    methodWaitting === false && (
                      <button
                        className={styles.button}
                        onClick={() => {
                          sendRequest2CS();
                        }}
                      >
                        Yêu cầu vào miền găng
                      </button>
                    )}
                  {serverInfo.serverStatus === 2 &&
                    methodWaitting === false && (
                      <button
                        className={styles.button}
                        onClick={() => {
                          exitsFromCS();
                        }}
                      >
                        Thoát khỏi miền găng
                      </button>
                    )}
                  {methodWaitting === true && <Spinner />}
                </div>
                <div className={styles.requests}>
                  <div className={styles.myRequest}>
                    {serverInfo?.myRequests.map((req, i) => (
                      <div key={i} className={styles.req}>
                        <div className={styles.ip}>{req.hostname}</div>
                        <div className={styles.more}>
                          <div className={styles.time}>
                            {convertTimestampToTime(req.timestamp)}
                          </div>
                          <div
                            className={
                              req.status === 0
                                ? `${styles.status}`
                                : `${styles.status} ${styles.active}`
                            }
                          >
                            {req.status === 0 ? "Đang đợi" : "Đã trả lời"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={styles.ortherRequest}>
                    {serverInfo?.ortherRequests.map((req, i) => (
                      <div key={i} className={styles.req}>
                        <div className={styles.ip}>{req.hostname}</div>
                        <div className={styles.more}>
                          <div className={styles.time}>
                            {convertTimestampToTime(req.timestamp)}
                          </div>
                          <div
                            className={
                              req.status === 0
                                ? `${styles.status}`
                                : `${styles.status} ${styles.active}`
                            }
                          >
                            {req.status === 0 ? "Đang đợi" : "Đã trả lời"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default HomePage;

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastMessage = () => {
  const { toastMessage } = useSelector((state) => state.ui);
  console.log("ToastMessage state:", toastMessage);

  useEffect(() => {
    if (toastMessage) {
      const { message, status } = toastMessage;
      const validStatuses = ["success", "error", "info", "warn"]; // 유효한 상태 정의

      // 상태가 유효한 toast 메서드인지 확인
      if (message && validStatuses.includes(status)) {
        toast[status](message, { theme: "colored" });
      } else {
        console.error(`Invalid status: ${status}`, toastMessage);
      }
    }
  }, [toastMessage]);

  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default ToastMessage;

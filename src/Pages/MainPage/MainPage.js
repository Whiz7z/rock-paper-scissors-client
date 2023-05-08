import React, { useEffect } from "react";
import styles from "./MainPage.module.scss";
import AllRoomsPanel from "../../Components/AllRoomsPanel/AllRoomsPanel";
import { useUser } from "../../zustand/store";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const { user, logout } = useUser((state) => state);
  const navigate = useNavigate();
  // if (!sessionStorage.getItem("userData")) {
  // }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <button
          className={styles.log_out_btn}
          onClick={() => {
            logout();
            navigate("/auth");
          }}
        >
          Log Out
        </button>
        <AllRoomsPanel />
      </div>
    </div>
  );
};

export default MainPage;

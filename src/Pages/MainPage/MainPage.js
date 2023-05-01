import React from "react";
import styles from "./MainPage.module.scss";
import AllRoomsPanel from "../../Components/AllRoomsPanel/AllRoomsPanel";

const MainPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <button className={styles.log_out_btn}>Log Out</button>
        <AllRoomsPanel />
      </div>
    </div>
  );
};

export default MainPage;

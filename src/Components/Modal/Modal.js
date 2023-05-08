import React from "react";
import styles from "./Modal.module.scss";
import {
  FaRegHandPaper,
  FaRegHandRock,
  FaRegHandScissors,
} from "react-icons/fa";
import { useGame, useUser } from "../../zustand/store";

const Modal = () => {
  const { lastMatch, setLastMatch } = useGame((state) => state);
  const { user } = useUser((state) => state);

  const you = lastMatch["you"];

  const opp = lastMatch["opp"];
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.my_block}>
          <h3>You</h3>
          <div>
            {you === "scissors" ? (
              <FaRegHandScissors className={styles.scissors} />
            ) : you === "rock" ? (
              <FaRegHandRock />
            ) : (
              <FaRegHandPaper />
            )}
          </div>
        </div>
        <div className={styles.opp_block}>
          <h3>Opponent</h3>
          <div>
            {opp === "scissors" ? (
              <FaRegHandScissors className={styles.scissors} />
            ) : opp === "rock" ? (
              <FaRegHandRock />
            ) : (
              <FaRegHandPaper />
            )}
          </div>
        </div>

        <button className={styles.close_btn} onClick={() => setLastMatch(null)}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;

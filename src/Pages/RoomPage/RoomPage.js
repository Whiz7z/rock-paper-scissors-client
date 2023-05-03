import React from "react";
import styles from "./RoomPage.module.scss";
import { useParams, Link } from "react-router-dom";
import {
  FaRegHandPaper,
  FaRegHandRock,
  FaRegHandScissors,
} from "react-icons/fa";

const RoomPage = () => {
  const { roomId } = useParams();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Link to="/" className={styles.go_back_btn}>
          Exit room
        </Link>
        <div className={styles.game_block}>
          <div className={styles.opponent_part}>
            <h2 className={styles.opponent_name}>Opponent Name</h2>
          </div>
          <div className={styles.player_part}>
            <p>Make a move</p>
            <div className={styles.moves}>
              <div className={`${styles.move} ${styles.paper_move}`}>
                <FaRegHandPaper />
              </div>
              <div className={`${styles.move} ${styles.rock_move}`}>
                <FaRegHandRock />
              </div>
              <div className={`${styles.move} ${styles.scissors_move}`}>
                <FaRegHandScissors />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;

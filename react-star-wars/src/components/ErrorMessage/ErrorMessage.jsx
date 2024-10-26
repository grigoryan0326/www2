import video from "./Video/han-solo.mp4"
import styles from "./ErrorMessage.module.scss"
import UiVideo from "../UI/UiVideo/UiVideo"

const ErrorMessage = () => {
  return (
    <div>
      <p className={styles.text}>
        The dark side of the force has won. <br />
        We can't display data. <br />
        Come back when we fix everything.
      </p>
      <UiVideo
        src={video}
        classes={styles.video}
        playbackRate={1}
      />
    </div>
  )
}
export default ErrorMessage

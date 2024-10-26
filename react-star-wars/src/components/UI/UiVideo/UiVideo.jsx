import cn from "classnames"
import PropTypes from "prop-types"
import styles from "./UiVideo.module.scss"
import { useEffect } from "react"
import { useRef } from "react"

const UiVideo = ({ src, classes, playbackRate = 1 }) => {
  const videoRef = useRef(null)

  useEffect(() => {
    videoRef.current.playbackRate = playbackRate
  }, [playbackRate])

  return (
    <div>
      <video
        ref={videoRef}
        className={cn(styles.video, classes)}
        autoPlay
        loop
        muted
      >
        <source src={src} />
      </video>
    </div>
  )
}

UiVideo.propTypes = {
  src: PropTypes.string,
  classes: PropTypes.string,
  playbackRate: PropTypes.number,
}

export default UiVideo

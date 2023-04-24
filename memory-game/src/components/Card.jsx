import { useState } from "react";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import { useSpring, animated } from "react-spring";

function Card({ image, onClick }) {
  const [flipped, setFlipped] = useState(false);

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const handleClick = () => {
    setFlipped(true);
    onClick();
  };

  return (
    <div className="card" onClick={handleClick}>
      <animated.div
        className="card-front"
        style={{ opacity: opacity.to((o) => 1 - o), transform }}>
        <RiCheckboxBlankCircleLine size={64} />
      </animated.div>
      <animated.div
        className="card-back"
        style={{
          opacity,
          transform: transform.to((t) => `${t} rotateY(180deg)`),
        }}>
        <img src={image} alt="Card" />
        <RiCheckboxCircleLine size={32} className="check-icon" />
      </animated.div>
    </div>
  );
}

export default Card;

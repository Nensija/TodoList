import "./styles.css";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function TittleComp() {
  return (
    <div className="TitleView">
      <FontAwesomeIcon className="TitleIconStyle" icon={faListCheck} />
    </div>
  );
}

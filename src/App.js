import "./styles.css";
import TittleComp from "./TittleComp";
import ToodoWiewComp from "./ToodoWiewComp";

export default function App() {
  return (
    <div className="MainWiew">
      <TittleComp />
      <ToodoWiewComp />
    </div>
  );
}

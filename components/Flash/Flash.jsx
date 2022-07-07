import { MdError, MdDone } from "react-icons/md";

const Flash = ({ type, text }) => {
  return (
    <div className={`Flash ${type}`}>
      {type === "error" && <MdError className="success" />}
      {type === "success" && <MdDone className="success" />}
      <p>{text}</p>
    </div>
  );
};

export default Flash;

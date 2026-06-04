import { IoMdArrowRoundBack } from "react-icons/io";

function LectureHeader({
  lectureTitle,
  lectureDescription,
  navigate,
}) {
  return (
    <div className="st-lecture-top">
      <div>
        <div className="back-btn">
          <IoMdArrowRoundBack
            onClick={() => navigate(-1)}
          />
        </div>

        <h1>{lectureTitle}</h1>
        <p>{lectureDescription}</p>
      </div>
    </div>
  );
}

export default LectureHeader;
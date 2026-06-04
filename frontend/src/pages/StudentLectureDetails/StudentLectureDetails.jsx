import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../utils/api";
import { useUser } from "../../context/UserContext";

import LectureHeader from "./LectureHeader";
import LectureTabs from "./LectureTabs";
import VideoTab from "./VideoTab";
import ResourceTab from "./ResourceTab";
import QuizTab from "./QuizTab";
import QuizModal from "./QuizModal";

function StudentLectureDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const { user } = useUser();

  const lectureId = params.lectureId;
  const courseId =
    typeof params.courseId === "string"
      ? params.courseId
      : params.courseId?._id;
  
  const [activeTab, setActiveTab] = useState("video");

  const [lectureTitle, setLectureTitle] = useState("");
  const [lectureDescription, setLectureDescription] = useState("");

  const [quizzes, setQuizzes] = useState([]);

  const [fileResources, setFileResources] = useState([]);
  const [textResources, setTextResources] = useState([]);

  const [openQuiz, setOpenQuiz] = useState(null);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showCompletedScreen, setShowCompleteScreen] = useState(false);

  const IMAGE_API_URL = "http://localhost:4000/uploads/";

  const LECTURE_VIDEO_URL = `http://localhost:4000/api/v1/lectures/video/stream/${lectureId}`;

  async function getLectureDetails() {
    try {
      const response = await api.get(`/lectures/${lectureId}`);

      if (response.data?.success) {
        const data = response.data.data;

        setLectureTitle(data.title);
        setLectureDescription(data.description);

        setQuizzes(data.quizes || []);

        const materials = data.materials || [];

        setFileResources(materials.filter((item) => item.type === "file"));

        setTextResources(materials.filter((item) => item.type === "text"));
      }
    } catch (err) {
      console.log(err);

      toast.error(err?.response?.data?.message || "Internal Server Error");
    }
  }

  const [quizProgress, setQuizProgress] = useState([]);

  async function getQuizProgress() {
    const response = await api.get(
      `/progress/quiz-progress/${user._id}/${courseId}`,
    );

    if (response.data.success) {
      setQuizProgress(response.data.data);
    }
  }

  useEffect(() => {
    getLectureDetails();
  }, []);

  useEffect(() => {
    if (user?._id) {
      getQuizProgress();
    }
  }, [user]);

  useEffect(() => {
    const totalQuestions = openQuiz?.questions?.length || 0;

    setAnswers(new Array(totalQuestions).fill(-1));
  }, [openQuiz]);

  function handleFileOpen(fileUrl) {
    window.open(IMAGE_API_URL + fileUrl, "_blank");
  }

  function markAnswer(optionIndex) {
    const updatedAnswers = [...answers];

    updatedAnswers[currentQuestionNumber] = optionIndex;

    setAnswers(updatedAnswers);
  }

  function calculateScore() {
    if (!openQuiz) return 0;

    let score = 0;

    openQuiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++;
      }
    });

    return score;
  }

  async function handleSubmitQuiz() {
    try {
      const score = calculateScore();

      const payload = {
        quizId: openQuiz._id,
        type: "normal",
        courseId,
        studentId: user._id,
        score,
      };

      const response = await api.post("/progress/submit-quiz", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response?.data?.success) {
        setShowCompleteScreen(true);
      }
    } catch (err) {
      console.log(err);

      toast.error(err?.response?.data?.message || "Internal Server Error");
    }
  }

  return (
    <div className="st-lecture-details-page">
      <LectureHeader
        lectureTitle={lectureTitle}
        lectureDescription={lectureDescription}
        navigate={navigate}
      />

      <LectureTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "video" && (
        <VideoTab lectureVideoUrl={LECTURE_VIDEO_URL} />
      )}

      {activeTab === "quiz" && (
        <QuizTab
          quizzes={quizzes}
          setOpenQuiz={setOpenQuiz}
          setCurrentQuestionNumber={setCurrentQuestionNumber}
          setShowCompleteScreen={setShowCompleteScreen}
          quizProgress={quizProgress}
        />
      )}

      {activeTab === "resources" && (
        <ResourceTab
          textResouces={textResources}
          fileResouces={fileResources}
          handleFileOpen={handleFileOpen}
        />
      )}

      <QuizModal
        openQuiz={openQuiz}
        setOpenQuiz={setOpenQuiz}
        currentQuestionNumber={currentQuestionNumber}
        setCurrentQuestionNumber={setCurrentQuestionNumber}
        answers={answers}
        markAnswer={markAnswer}
        handleSubmitQuiz={handleSubmitQuiz}
        showCompletedScreen={showCompletedScreen}
        setShowCompleteScreen={setShowCompleteScreen}
        calculateScore={calculateScore}
      />
    </div>
  );
}

export default StudentLectureDetails;

import { FaCheckCircle, FaRedo, FaTrophy } from "react-icons/fa";

function QuizTab({
  quizzes,
  quizProgress,
  setOpenQuiz,
  setCurrentQuestionNumber,
  setShowCompleteScreen,
}) {
  function getQuizResult(quizId) {
    const attempts = quizProgress.filter((item) => item.quiz?._id === quizId);

    if (!attempts.length) {
      return null;
    }

    return attempts.sort(
      (a, b) => new Date(b.attemptedAt) - new Date(a.attemptedAt),
    )[0];
  }

  return (
    <div className="quiz-page">
      <div className="quiz-grid">
        {quizzes.map((quiz, index) => {
          const attempt = getQuizResult(quiz._id);

          const attempted = !!attempt;

          return (
            <div className="quiz-card">
              <div className="quiz-card-content">
                <div className="quiz-card-top">
                  <div className="quiz-badge">Quiz #{index + 1}</div>

                  {attempted && (
                    <div className="quiz-completed">
                      <FaCheckCircle />
                      Completed
                    </div>
                  )}
                </div>

                <h3>{quiz.title}</h3>

                <div className="quiz-meta">
                  <span>
                    {quiz.questions?.length}
                    Questions
                  </span>
                </div>

                {attempted ? (
                  <div className="quiz-score-box">
                    <div className="quiz-score">
                      <FaTrophy />
                      {attempt.score}
                    </div>

                    <small>
                      Last Attempt:{" "}
                      {new Date(attempt.attemptedAt).toLocaleDateString()}
                    </small>
                  </div>
                ) : (
                  <div className="quiz-pending">Ready to start</div>
                )}

                <button
                  className="quiz-start-btn"
                  onClick={() => {
                    setOpenQuiz(quiz);
                    setCurrentQuestionNumber(0);
                    setShowCompleteScreen(false);
                  }}
                >
                  {attempted ? (
                    <>
                      <FaRedo />
                      Reattempt Quiz
                    </>
                  ) : (
                    "Start Quiz"
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default QuizTab;

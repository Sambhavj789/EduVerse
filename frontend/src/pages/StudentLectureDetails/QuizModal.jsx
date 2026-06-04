import { FaCheckCircle } from "react-icons/fa";

function QuizModal({
  openQuiz,
  setOpenQuiz,
  currentQuestionNumber,
  setCurrentQuestionNumber,
  answers,
  markAnswer,
  handleSubmitQuiz,
  showCompletedScreen,
  setShowCompleteScreen,
  calculateScore,
}) {
  if (!openQuiz) return null;

  const totalQuestions =
    openQuiz?.questions?.length || 0;

  const currentQuestion =
    openQuiz?.questions?.[
      currentQuestionNumber
    ];

  const handleNext = () => {
    if (
      currentQuestionNumber <
      totalQuestions - 1
    ) {
      setCurrentQuestionNumber(
        (prev) => prev + 1
      );
    }
  };

  const handlePrev = () => {
    if (currentQuestionNumber > 0) {
      setCurrentQuestionNumber(
        (prev) => prev - 1
      );
    }
  };

  const closeModal = () => {
    setOpenQuiz(null);
    setShowCompleteScreen(false);
    setCurrentQuestionNumber(0);
  };

  return (
    <div className="slq-overlay">
      <div className="slq-modal">

        {/* HEADER */}

        <div className="slq-header">
          <div>
            <h2>{openQuiz.title}</h2>

            {!showCompletedScreen && (
              <p>
                Question{" "}
                {currentQuestionNumber + 1}
                {" / "}
                {totalQuestions}
              </p>
            )}
          </div>

          <button
            className="slq-close-btn"
            onClick={closeModal}
          >
            ✕
          </button>
        </div>

        {!showCompletedScreen ? (
          <>
            {/* PROGRESS */}

            <div className="slq-progress">
              <div
                className="slq-progress-fill"
                style={{
                  width: `${
                    ((currentQuestionNumber +
                      1) /
                      totalQuestions) *
                    100
                  }%`,
                }}
              />
            </div>

            {/* QUESTION */}

            <div className="slq-question-card">
              <h3>
                {currentQuestion?.question}
              </h3>

              <div className="slq-options">
                {currentQuestion?.options?.map(
                  (option, index) => (
                    <div
                      key={index}
                      className={`slq-option ${
                        answers[
                          currentQuestionNumber
                        ] === index
                          ? "slq-option-active"
                          : ""
                      }`}
                      onClick={() =>
                        markAnswer(index)
                      }
                    >
                      <div className="slq-option-content">
                        <span>
                          {String.fromCharCode(
                            65 + index
                          )}
                        </span>

                        <p>{option}</p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* FOOTER */}

            <div className="slq-footer">

              <button
                className="slq-nav-btn"
                disabled={
                  currentQuestionNumber === 0
                }
                onClick={handlePrev}
              >
                Previous
              </button>

              {currentQuestionNumber <
              totalQuestions - 1 ? (
                <button
                  className="slq-primary-btn"
                  onClick={handleNext}
                >
                  Next Question
                </button>
              ) : (
                <button
                  className="slq-submit-btn"
                  onClick={
                    handleSubmitQuiz
                  }
                >
                  Submit Quiz
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            {/* RESULT SCREEN */}

            <div className="slq-result-screen">

              <div className="slq-result-top">
                <FaCheckCircle />

                <h1>
                  Quiz Completed
                </h1>

                <h2>
                  {calculateScore()} /{" "}
                  {totalQuestions}
                </h2>

                <p>
                  You answered{" "}
                  {calculateScore()} out
                  of {totalQuestions}
                  questions correctly.
                </p>
              </div>

              <div className="slq-answer-list">

                {openQuiz.questions.map(
                  (
                    question,
                    index
                  ) => {
                    const isCorrect =
                      answers[index] ===
                      question.correctAnswer;

                    return (
                      <div
                        key={index}
                        className={`slq-answer-card ${
                          isCorrect
                            ? "slq-correct-card"
                            : "slq-wrong-card"
                        }`}
                      >
                        <h3>
                          Q{index + 1}.{" "}
                          {
                            question.question
                          }
                        </h3>

                        <p>
                          <strong>
                            Correct
                            Answer:
                          </strong>{" "}
                          {
                            question
                              .options[
                              question.correctAnswer
                            ]
                          }
                        </p>

                        <p>
                          <strong>
                            Your
                            Answer:
                          </strong>{" "}
                          {answers[
                            index
                          ] !== -1
                            ? question
                                .options[
                                answers[
                                  index
                                ]
                              ]
                            : "Not Answered"}
                        </p>

                        {question.explanation && (
                          <div className="slq-explanation">
                            <strong>
                              Explanation
                            </strong>

                            <p>
                              {
                                question.explanation
                              }
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  }
                )}
              </div>

              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent:
                    "center",
                }}
              >
                <button
                  className="slq-primary-btn"
                  onClick={
                    closeModal
                  }
                >
                  Close Quiz
                </button>
              </div>

            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default QuizModal;
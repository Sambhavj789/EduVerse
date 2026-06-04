function QuizTab({
  quizzes,
  setOpenQuiz,
  setCurrentQuestionNumber,
  setShowCompleteScreen,
}) {
  return (
    <div className="tab-content">

      <div className="items-list">
        {quizzes.map(
          (quiz, index) => (
            <div
              className="list-card"
              key={index}
            >
              <div>
                <h3>{quiz.title}</h3>
                <p>
                  Quiz #{index + 1}
                </p>
              </div>

              <button
                className="attempt-quiz-button"
                onClick={() => {
                  setOpenQuiz(quiz);
                  setCurrentQuestionNumber(
                    0
                  );
                  setShowCompleteScreen(
                    false
                  );
                }}
              >
                Attempt Quiz
              </button>
            </div>
          )
        )}
      </div>

    </div>
  );
}

export default QuizTab;
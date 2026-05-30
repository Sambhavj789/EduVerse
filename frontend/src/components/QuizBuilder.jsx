import React, { useState } from "react";
import "./QuizBuilder.css";
import { FaPlus, FaTrash, FaCheckCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";

function QuizBuilder() {
  const [questions, setQuestions] = useState([]);
  const [quizData, setQuizData] = useState({
    title: "",
    totalMarks: 0,
    difficulty: "easy",
  });
  const [questionData, setQuestionData] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    explanation: "",
    marks: 0,
  });
  const params = useParams();
  const lectureId = params.lectureId;

  // Handle Question Change
  function handleOptionChange(index, value) {
    const updatedOptions = [...questionData.options];

    updatedOptions[index] = value;

    setQuestionData({
      ...questionData,
      options: updatedOptions,
    });
  }

  // Add Question
  function handleAddQuestion(e) {
    e.preventDefault();

    const newQuestion = {
      ...questionData,
    };

    setQuestions([...questions, newQuestion]);

    setQuestionData({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    });
  }

  // Delete Question
  function handleDeleteQuestion(index) {
    const updatedQuestions = questions.filter((_, i) => i !== index);

    setQuestions(updatedQuestions);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setQuizData({ ...quizData, [name]: value });
  }

  async function handleSaveQuiz() {
    try {
      const data = {
        lecture: lectureId,
        title: quizData.title,
        totalMarks: quizData.totalMarks,
        difficulty: quizData.difficulty,
        questions: questions,
      };

      const response = await api.post("/quizes/create", data, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data?.success) {
        toast.success("Quiz Created Successfully");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Internal Server Error");
    }
  }

  return (
    <div className="quiz-builder-page">
      {/* Header */}
      <div className="quiz-top">
        <div>
          <h1>Quiz Builder</h1>

          <p>Create interactive quizzes for your lecture</p>
        </div>
      </div>

      {/* Question Progress */}
      <div className="questions-progress-wrapper">
        <div className="questions-progress">
          {questions.map((_, index) => {
            return (
              <div className="question-step completed-step" key={index}>
                Q{index + 1}
              </div>
            );
          })}

          <div className="question-step active-step">
            Q{questions.length + 1}
          </div>
        </div>

        <button className="save-quiz-btn" onClick={handleSaveQuiz}>
          Save Quiz
        </button>
      </div>

      {/* Form */}
      <div className="quiz-form-card">
        <div className="form-group">
          <label htmlFor="">Quiz Title</label>
          <input
            type="text"
            placeholder="Enter Quiz Title"
            name="title"
            value={quizData.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Total Marks</label>
          <input
            type="number"
            placeholder="Enter Total Marks"
            name="totalMarks"
            value={quizData.totalMarks}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="difficulty">Select Difficulty</label>
          <select
            name="difficulty"
            id="difficulty"
            value={quizData.difficulty}
            onChange={handleChange}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <h2>Add Question</h2>

        <form onSubmit={handleAddQuestion}>
          {/* Question */}
          <div className="form-group">
            <label>Question</label>

            <textarea
              rows="4"
              placeholder="Enter your question"
              value={questionData.question}
              onChange={(e) =>
                setQuestionData({
                  ...questionData,
                  question: e.target.value,
                })
              }
              required
            />
          </div>

          {/* Options */}
          <div className="options-grid">
            {questionData.options.map((option, index) => {
              return (
                <div
                  className={
                    questionData.correctAnswer === index
                      ? "option-card active-option"
                      : "option-card"
                  }
                  key={index}
                >
                  <div className="option-top">
                    <h3>Option {index + 1}</h3>

                    <button
                      type="button"
                      className="correct-btn"
                      onClick={() =>
                        setQuestionData({
                          ...questionData,
                          correctAnswer: index,
                        })
                      }
                    >
                      <FaCheckCircle />
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder={`Enter option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    required
                  />

                  {questionData.correctAnswer === index && (
                    <p className="correct-label">Correct Answer</p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Explanation */}
          <div className="form-group">
            <label htmlFor="">Explanation</label>
            <textarea
              name="explanation"
              value={questionData.explanation}
              onChange={(e) => {
                setQuestionData({
                  ...questionData,
                  explanation: e.target.value,
                });
              }}
              placeholder="Enter Explanation for this answer"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="">Marks</label>
            <input
              type="number"
              value={questionData.marks}
              onChange={(e) => {
                setQuestionData({ ...questionData, marks: e.target.value });
              }}
            />
          </div>

          <button className="add-question-btn">
            <FaPlus />
            Add Question
          </button>
        </form>
      </div>

      {/* Added Questions */}
      <div className="saved-questions">
        <h2>Created Questions</h2>

        {questions.map((question, index) => {
          return (
            <div className="saved-question-card" key={index}>
              <div className="saved-question-top">
                <h3>
                  Q{index + 1}. {question.question}
                </h3>

                <button
                  className="delete-btn"
                  onClick={() => handleDeleteQuestion(index)}
                >
                  <FaTrash />
                </button>
              </div>

              <div className="saved-options">
                {question.options.map((option, optionIndex) => {
                  return (
                    <div
                      className={
                        question.correctAnswer === optionIndex
                          ? "saved-option correct-option"
                          : "saved-option"
                      }
                      key={optionIndex}
                    >
                      {option}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default QuizBuilder;

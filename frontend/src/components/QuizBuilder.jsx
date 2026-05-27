import React, { useState } from "react";
import "./QuizBuilder.css";
import {
    FaPlus,
    FaTrash,
    FaCheckCircle
} from "react-icons/fa";

function QuizBuilder() {

    const [questions, setQuestions] = useState([]);

    const [questionData, setQuestionData] = useState({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0
    });

    // Handle Question Change
    function handleOptionChange(index, value) {

        const updatedOptions = [...questionData.options];

        updatedOptions[index] = value;

        setQuestionData({
            ...questionData,
            options: updatedOptions
        });
    }

    // Add Question
    function handleAddQuestion(e) {

        e.preventDefault();

        const newQuestion = {
            ...questionData
        };

        setQuestions([...questions, newQuestion]);

        setQuestionData({
            question: "",
            options: ["", "", "", ""],
            correctAnswer: 0
        });
    }

    // Delete Question
    function handleDeleteQuestion(index) {

        const updatedQuestions = questions.filter(
            (_, i) => i !== index
        );

        setQuestions(updatedQuestions);
    }

    return (
        <div className="quiz-builder-page">

            {/* Header */}
            <div className="quiz-top">

                <div>
                    <h1>Quiz Builder</h1>

                    <p>
                        Create interactive quizzes for your lecture
                    </p>
                </div>

            </div>

            {/* Question Progress */}
            {/* Question Progress */}
            <div className="questions-progress-wrapper">

                <div className="questions-progress">

                    {
                        questions.map((_, index) => {

                            return (
                                <div
                                    className="question-step completed-step"
                                    key={index}
                                >
                                    Q{index + 1}
                                </div>
                            )
                        })
                    }

                    <div className="question-step active-step">
                        Q{questions.length + 1}
                    </div>

                </div>

                <button className="save-quiz-btn">
                    Save Quiz
                </button>

            </div>

            {/* Form */}
            <div className="quiz-form-card">

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
                                    question: e.target.value
                                })
                            }
                            required
                        />

                    </div>

                    {/* Options */}
                    <div className="options-grid">

                        {
                            questionData.options.map((option, index) => {

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

                                            <h3>
                                                Option {index + 1}
                                            </h3>

                                            <button
                                                type="button"
                                                className="correct-btn"
                                                onClick={() =>
                                                    setQuestionData({
                                                        ...questionData,
                                                        correctAnswer: index
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
                                            onChange={(e) =>
                                                handleOptionChange(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />

                                        {
                                            questionData.correctAnswer === index && (
                                                <p className="correct-label">
                                                    Correct Answer
                                                </p>
                                            )
                                        }

                                    </div>
                                )
                            })
                        }

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

                {
                    questions.map((question, index) => {

                        return (
                            <div
                                className="saved-question-card"
                                key={index}
                            >

                                <div className="saved-question-top">

                                    <h3>
                                        Q{index + 1}. {question.question}
                                    </h3>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            handleDeleteQuestion(index)
                                        }
                                    >

                                        <FaTrash />

                                    </button>

                                </div>

                                <div className="saved-options">

                                    {
                                        question.options.map((option, optionIndex) => {

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
                                            )
                                        })
                                    }

                                </div>

                            </div>
                        )
                    })
                }

            </div>

        </div>
    );
}

export default QuizBuilder;
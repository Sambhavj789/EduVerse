import React, { useEffect, useState } from "react";
import "./QuizBuilder.css";
import {
    FaPlus,
    FaTrash,
    FaCheckCircle
} from "react-icons/fa";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";

function QuizBuilder() {
    const { lectureId } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const quizId = searchParams.get("quizId");
    const [quizTitle, setQuizTitle] = useState("");
    const [difficulty, setDifficulty] = useState("easy");

    const [questions, setQuestions] = useState([]);

    const [questionData, setQuestionData] = useState({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        explanation: "",
        marks: 1
    });

    useEffect(() => {
        async function loadQuiz() {
            if (!quizId) {
                return;
            }

            try {
                const response = await api.get(`/quizes/lecture/${lectureId}`);
                const currentQuiz = (response.data?.data || []).find((quiz) => quiz._id === quizId);
                if (currentQuiz) {
                    setQuizTitle(currentQuiz.title);
                    setDifficulty(currentQuiz.difficulty || "easy");
                    setQuestions(currentQuiz.questions || []);
                }
            }
            catch (err) {
                toast.error(err?.response?.data?.message || "Unable to load quiz");
            }
        }

        loadQuiz();
    }, [lectureId, quizId]);

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

        if (!newQuestion.correctAnswer) {
            toast.error("Select the correct option first");
            return;
        }

        setQuestions([...questions, newQuestion]);

        setQuestionData({
            question: "",
            options: ["", "", "", ""],
            correctAnswer: "",
            explanation: "",
            marks: 1
        });
    }

    // Delete Question
    function handleDeleteQuestion(index) {

        const updatedQuestions = questions.filter(
            (_, i) => i !== index
        );

        setQuestions(updatedQuestions);
    }

    async function handleSaveQuiz() {
        if (!quizTitle.trim()) {
            toast.error("Quiz title is required");
            return;
        }

        if (!questions.length) {
            toast.error("Add at least one question");
            return;
        }

        const payload = {
            lecture: lectureId,
            title: quizTitle,
            difficulty,
            questions,
            totalMarks: questions.reduce((sum, question) => sum + Number(question.marks || 1), 0)
        };

        try {
            const response = quizId
                ? await api.put("/quizes", { ...payload, quiz: quizId })
                : await api.post("/quizes/create", payload);

            if (response.data?.success) {
                toast.success(response.data.message);
                navigate(-1);
            }
        }
        catch (err) {
            toast.error(err?.response?.data?.message || "Unable to save quiz");
        }
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

                    <div className="form-group" style={{ marginTop: "20px" }}>
                        <label>Quiz Title</label>
                        <input
                            type="text"
                            placeholder="Enter quiz title"
                            value={quizTitle}
                            onChange={(e) => setQuizTitle(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Difficulty</label>
                        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
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

                <button className="save-quiz-btn" onClick={handleSaveQuiz}>
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
                                            questionData.correctAnswer === option
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
                                                        correctAnswer: option
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
                                            questionData.correctAnswer === option && (
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

                    <div className="form-group">

                        <label>Explanation</label>

                        <textarea
                            rows="3"
                            placeholder="Explain the answer briefly"
                            value={questionData.explanation}
                            onChange={(e) =>
                                setQuestionData({
                                    ...questionData,
                                    explanation: e.target.value
                                })
                            }
                        />

                    </div>

                    <div className="form-group">

                        <label>Marks</label>

                        <input
                            type="number"
                            min="1"
                            value={questionData.marks}
                            onChange={(e) =>
                                setQuestionData({
                                    ...questionData,
                                    marks: Number(e.target.value) || 1
                                })
                            }
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
                                                        question.correctAnswer === option
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

                                {question.explanation ? <p style={{ marginTop: "12px" }}>{question.explanation}</p> : null}

                            </div>
                        )
                    })
                }

            </div>

        </div>
    );
}

export default QuizBuilder;

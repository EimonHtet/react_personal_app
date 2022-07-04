export default function getQuiz(){
    var quiz={
        "id":1, "type":"QUIZ", "title": "DOM Quiz?",
        "description": "Take this Quiz for DOM",
        "browserTitle": "DOM Quiz?",
        "introduction": "Let start DOM Quiz",
        "numOfQuestions": 2,
    } 
    var questions = [
        {
            "id":1, "type": "TRUE_FALSE", "level": 1, 
            "question": "The display value of DOM elements is either inline or block.",
            "answers": [
                {"id":1, "ur_answer": "Classes", "advise": "None", "status":0},
                {"id":2, "ur_answer": "Objects", "advise": "None", "status":0},
                {"id":3, "ur_answer": "Tables", "advise": "None", "status":0}
            ],
            "correct": 2, "explanation": "Answer is Object"
        },
        {
            "id":2, "type": "TRUE_FALSE", "level": 1, 
            "question": "DOM represents a webpage in what way?",
            "answers": [
                {"id":1, "ur_answer": "Dynamic Structure", "advise": "None", "status":0},
                {"id":2, "ur_answer": "Recrusive Structure ", "advise": "None", "status":0},
                {"id":3, "ur_answer": "Tree-like Structure", "advise": "None", "status":0}
            ],
            "correct": 3, "explanation": "Answer is Tree-like Structure"
        },
    ]
    quiz.questions=questions;
    return quiz;
}
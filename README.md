# Further Works

### 5. Create Interview

The user can create a new interview by selecting:

* **Job Role**
* **Experience Level**
* **Number of Questions**

---

### 6. AI Question Generation

The backend sends a prompt to an AI model such as **Gemini** or **OpenAI** to generate interview questions based on the user's selections.

### Example Questions

* What is the Virtual DOM?
* Explain `useEffect` in React.
* What is the difference between Redux and Context API?

The generated questions will be stored in **MongoDB** for the interview session.

---

### 7. Answer Questions

The simplest version of the interview will follow a question-by-question format:

* Display one question at a time
* User types their answer
* Click **Next** to move to the next question

> Webcam, voice input, and other advanced interview features are not included in the initial version.

---

### 8. Submit Interview

After answering all questions, the user can click **Finish Interview**.

The backend sends the following data to Gemini/OpenAI:

* Interview Questions
* User Answers

The AI evaluates the answers and returns:

* **Score**
* **Feedback**
* **Suggestions for Improvement**

---

### 9. Results Page

After the interview is evaluated, the user can view their results.

### Example

**Overall Score:** 84%

### Strengths

* ✔ React Hooks
* ✔ State Management

### Needs Improvement

* ✖ Performance Optimization

### Recommendation

Practice concepts such as `React.memo` and lazy loading to improve performance optimization skills.

---

### 10. Interview History

Users can view their previous interviews and their results.

### Example

| Interview  | Score | Date    |
| ---------- | ----: | ------- |
| React      |   85% | 10 June |
| Node.js    |   78% | 15 June |
| JavaScript |   91% | 20 June |

The user can click on an interview to view its complete details, including:

* Questions
* Answers
* Score
* AI feedback
* Suggestions

---

### 11. Basic Admin

The system will provide basic administrative functionality.

### Admin can:

* View registered users
* View user interviews
* Delete inappropriate data using **soft delete**
* View basic system statistics

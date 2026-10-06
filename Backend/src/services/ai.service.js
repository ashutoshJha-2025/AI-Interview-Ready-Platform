import { GoogleGenAI } from "@google/genai";
import * as z from "zod";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

const interviewQuestionsJsonSchema = {
    type: "object",
    properties: {
        questions: {
            type: "array",
            description: "Interview questions in the order they should be asked.",
            items: {
                type: "object",
                properties: {
                    question: {
                        type: "string",
                        description: "A clear, role-specific interview question."
                    },
                    idealAnswer: {
                        type: "string",
                        description:
                            "A concise answer guide describing the key points a strong response should cover."
                    }
                },
                required: ["question", "idealAnswer"]
            }
        }
    },
    required: ["questions"]
};

const evaluationJsonSchema = {
    type: "object",
    properties: {
        strengths: {
            type: "array",
            description: "Key strengths shown by the candidate across the answers.",
            items: {
                type: "string"
            }
        },
        improvements: {
            type: "array",
            description: "Specific improvements or gaps to focus on for the candidate.",
            items: {
                type: "string"
            }
        },
        overallScore: {
            type: "number",
            description: "Overall score from 0 to 100 based on the quality of the answers."
        }
    },
    required: ["strengths", "improvements", "overallScore"]
};

const interviewQuestionsSchema = z.fromJSONSchema(
    interviewQuestionsJsonSchema
);

const interviewEvaluationSchema = z.fromJSONSchema(
    evaluationJsonSchema
);

async function generateInterviewQuestions(jobRole, difficulty, numberOfQuestions, experienceLevel, description) {
    if (
        !Number.isInteger(numberOfQuestions) ||
        numberOfQuestions < 1 ||
        numberOfQuestions > 15
    ) {
        throw new RangeError(
            "numberOfQuestions must be an integer between 1 and 15"
        );
    }

    if (!jobRole || !difficulty || !experienceLevel || !description) {
        throw new Error(
            "jobRole, difficulty, experienceLevel and description are required"
        );
    }

    const experienceDescription = experienceLevel === "Fresher"
        ? "Fresher"
        : experienceLevel.endsWith("years")
            ? experienceLevel
            : `${experienceLevel} years of experience`;

    const prompt = `
            You are an AI interviewer.

            Generate exactly ${numberOfQuestions} interview questions based on the following interview requirements:
            Job Role: ${jobRole}
            Difficulty: ${difficulty}
            Experience Level: ${experienceDescription}
            Job Description:
            ${description}
                    
            Instructions:  
            1. Generate exactly ${numberOfQuestions} distinct interview questions.
            2. Questions must be directly relevant to the job role.
            3. Questions must match the specified difficulty level.
            4. Questions must be appropriate for the candidate's experience level.
            5. Use the job description to understand the required skills, responsibilities and technologies.
            6. Include a suitable mix of technical, practical and role-specific questions where appropriate.
            7. Avoid duplicate or very similar questions.
            8. For every question, provide a concise ideal answer guide.
            9. The ideal answer should contain the important points a strong candidate should mention.
            10. Do not answer the questions as the candidate.
            11. Return only the requested JSON structure.
    `;

    const interaction = await ai.interactions.create({
        model: "gemini-3.5-flash-lite",
        input: prompt,
        response_format: {
            type: "text",
            mime_type: "application/json",
            schema: interviewQuestionsJsonSchema
        }
    });

    const { questions } = interviewQuestionsSchema.parse(
        JSON.parse(interaction.output_text)
    );

    return questions.map(({ question, idealAnswer }, index) => ({
        question,
        idealAnswer,
        order: index + 1
    }));
}

async function evaluateInterviewAnswers(questions = []) {
    if (!Array.isArray(questions) || questions.length === 0) {
        throw new Error("At least one question answer is required for evaluation");
    }

    const normalizedQuestions = questions.map(({ question, idealAnswer, userAnswer, order }) => ({
        order,
        question,
        idealAnswer,
        userAnswer: userAnswer ?? ""
    }));

    const prompt = `
        You are an expert interview evaluator.
        Compare the candidate answer against the ideal answer for each question.
        Evaluate the quality of the responses across clarity, depth, relevance, structure, and confidence.

        Questions:
        ${JSON.stringify(normalizedQuestions, null, 2)}

        Instructions:
        1. Return a JSON object with three keys: strengths, improvements, overallScore.
        2. strengths must be an array of 3-5 concise bullet-like statements about the candidate's strengths.
        3. improvements must be an array of 3-5 concise suggestions to improve.
        4. overallScore must be a number between 0 and 100.
        5. Keep the analysis realistic and based on the actual answers.
        6. Return only valid JSON and no extra text.
    `;

    const interaction = await ai.interactions.create({
        model: "gemini-3.5-flash-lite",
        input: prompt,
        response_format: {
            type: "text",
            mime_type: "application/json",
            schema: evaluationJsonSchema
        }
    });

    const output = interviewEvaluationSchema.parse(
        JSON.parse(interaction.output_text)
    );

    const strengths = Array.isArray(output.strengths) ? output.strengths : [];
    const improvements = Array.isArray(output.improvements) ? output.improvements : [];
    const overallScore = Number.isFinite(output.overallScore)
        ? Math.min(100, Math.max(0, Math.round(output.overallScore)))
        : 0;

    return {
        strengths,
        improvements,
        overallScore,
    };
}

export { generateInterviewQuestions, evaluateInterviewAnswers };

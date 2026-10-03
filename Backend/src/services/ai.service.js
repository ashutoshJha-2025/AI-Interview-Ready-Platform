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

const interviewQuestionsSchema = z.fromJSONSchema(
    interviewQuestionsJsonSchema
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

export { generateInterviewQuestions };

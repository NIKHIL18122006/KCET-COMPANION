import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API,
});

const explainQuestion = async (question) => {
  const imageUrl = question.media?.questionImage;
  const hasImage = Boolean(imageUrl);

  const model = hasImage
    ? "qwen/qwen3.6-27b"
    : "openai/gpt-oss-120b";

  const prompt = `
Subject: ${question.subject}
Chapter: ${question.chapter || "Not Specified"}

Question:
${question.question}

Options:
A. ${question.option_a}
B. ${question.option_b}
C. ${question.option_c}
D. ${question.option_d}

Correct Answer: ${question.correct_answer}

Explain this question for a KCET student.

Rules:
- Keep the explanation short, crisp, and easy to understand.
- Explain only the key concept and reasoning required.
- Use 2-5 short steps if needed.
- Clearly explain why the correct answer is correct.
- Mention other options only if necessary.
- Do not repeat the question or options.
- Avoid unnecessary theory or background information.
- Keep the response under 100 words.
- Use Markdown only when useful.
- Use $...$ for inline LaTeX.
- Use $$...$$ for displayed LaTeX.
- Do not use tables unless absolutely necessary.
`;

  let content;

  if (hasImage) {
    content = [
      {
        type: "text",
        text: prompt,
      },
      {
        type: "image_url",
        image_url: {
          url: imageUrl,
        },
      },
    ];
  } else {
    content = prompt;
  }

  const completion = await groq.chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content: `
You are a concise KCET tutor.

Give accurate and easy-to-understand explanations.

Rules:
- Be short and direct.
- Focus only on the key reasoning.
- Do not add unnecessary information.
- Use Markdown only when useful.
- Use $...$ for inline mathematics.
- Use $$...$$ for displayed mathematics.
- Never escape | in Markdown tables.
- Never wrap the response in a code block.
`,
      },
      {
        role: "user",
        content,
      },
    ],
  });

  return completion.choices[0].message.content;
};

export default { explainQuestion };
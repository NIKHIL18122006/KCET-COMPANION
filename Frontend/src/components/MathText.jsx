import { MathJax } from "better-react-mathjax";

export default function MathText({ text }) {
  return (
    <MathJax dynamic>
      {text}
    </MathJax>
  );
}
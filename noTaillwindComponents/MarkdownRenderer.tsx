import React from "react";
import "./MarkDownRenderer.css";
import Markdown from "markdown-to-jsx";
type Props = {
  children: string;
};

const MarkdownRenderer = ({ children }: Props) => {
  return <Markdown>{children}</Markdown>;
};

export default MarkdownRenderer;

import { pipeline } from "@xenova/transformers";

let summarizer: any | null = null;

export const loadSummarizer = async () => {
  if (!summarizer) {
    summarizer = await pipeline("summarization");
    console.log("Summarizer pipeline loaded");
  }
  return summarizer;
};

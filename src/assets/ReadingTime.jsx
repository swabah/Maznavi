export const  ReadingTime = (content) => {
    const wordsPerMinute = 1200; // Adjust this value based on your preference.
    const wordCount = content?.split(/\s+/).length;
    const readingTime = Math?.ceil(wordCount / wordsPerMinute);
    return readingTime;
  }
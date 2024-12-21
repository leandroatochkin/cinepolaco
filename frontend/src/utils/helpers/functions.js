export function splitTextAtClosestParagraph(text) {
    // Split the text by paragraphs (assuming paragraphs are separated by new lines)
    const paragraphs = text.split("\n");
    const totalLength = text.length;
    const midpoint = totalLength / 2;
  
    let currentLength = 0;
    let splitIndex = 0;
  
    // Find the paragraph closest to the midpoint
    for (let i = 0; i < paragraphs.length; i++) {
      currentLength += paragraphs[i].length + 1; // Add 1 for the newline character
      if (currentLength >= midpoint) {
        splitIndex = i;
        break;
      }
    }
  
    // Join the paragraphs before and after the split point
    const firstPart = paragraphs.slice(0, splitIndex + 1).join("\n");
    const secondPart = paragraphs.slice(splitIndex + 1).join("\n");
  
    return [firstPart, secondPart];
  }
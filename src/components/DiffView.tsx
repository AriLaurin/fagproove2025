import React from 'react';
import * as diff from 'diff';
import html2pdf from 'html2pdf.js/dist/html2pdf.min.js';

interface DiffViewProps {
  text1: string;
  text2: string;
}

export const DiffView: React.FC<DiffViewProps> = ({ text1, text2 }) => {
  const getDiff = () => {
    const differences = diff.diffWords(text1, text2);
    return differences.map((part, index) => {
      const style = part.added 
        ? { backgroundColor: 'var(--added-bg)', color: 'var(--added-text)' }
        : part.removed 
        ? { backgroundColor: 'var(--removed-bg)', color: 'var(--removed-text)' }
        : {};
      return (
        <span key={index} style={style}>
          {part.value}
        </span>
      );
    });
  };

  return (
    <div className="diff-container">
      <div className="diff-view" role="region" aria-label="Text comparison results">
        {getDiff()}
      </div>
    </div>
  );
}; 
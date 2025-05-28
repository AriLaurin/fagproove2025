import { useState } from 'react';
import * as diff from 'diff';
import './index.css';

export function TextComparator() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

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
    <div className="text-comparator">
      <div className="input-container">
        <div className="text-area-wrapper">
          <h3>Original Tekst</h3>
          <textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="Skriv original tekst her..."
            rows={15}
            aria-label="Original text input"
          />
        </div>
        <div className="text-area-wrapper">
          <h3>Endret Tekst</h3>
          <textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Skriv endret tekst her..."
            rows={15}
            aria-label="Endret text input"
          />
        </div>
      </div>
      <div className="diff-container">
        <h3>Sammenlign Endringer</h3>
        <div className="diff-view" role="region" aria-label="Text comparison results">
          {getDiff()}
        </div>
      </div>
    </div>
  );
} 
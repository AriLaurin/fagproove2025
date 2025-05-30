import React from 'react';
import { TextComparison } from '../services/api';

interface SavedComparisonsProps {
  comparisons: TextComparison[];
  onLoadComparison: (comparison: TextComparison) => void;
  onDeleteComparison: (id: string, event: React.MouseEvent) => void;
}

export const SavedComparisons: React.FC<SavedComparisonsProps> = ({
  comparisons,
  onLoadComparison,
  onDeleteComparison
}) => {
  if (comparisons.length === 0) return null;

  return (
    <div className="saved-comparisons">
      <h3>Lagrede Sammenligninger</h3>
      <ul>
        {comparisons.map((comparison) => (
          <li 
            key={comparison._id}
            onClick={() => onLoadComparison(comparison)}
            className="saved-comparison-item"
          >
            <span className="comparison-date">
              {new Date(comparison.createdAt).toLocaleString()}
            </span>
            <button
              onClick={(e) => onDeleteComparison(comparison._id, e)}
              className="delete-button"
              aria-label="Delete comparison"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}; 
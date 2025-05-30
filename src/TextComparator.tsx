import { useState } from 'react';
import { api, TextComparison } from './services/api';
import { TextInput } from './components/TextInput';
import { DiffView } from './components/DiffView';
import { SavedComparisons } from './components/SavedComparisons';
import html2pdf from 'html2pdf.js/dist/html2pdf.min.js';
import './index.css';

export function TextComparator() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [savedComparisons, setSavedComparisons] = useState<TextComparison[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveComparison = async () => {
    if (!text1 || !text2) {
      setError('Please enter both texts to compare');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const savedComparison = await api.createComparison(text1, text2);
      setSavedComparisons([savedComparison, ...savedComparisons]);
      setError(null);
    } catch (err) {
      setError('Failed to save comparison');
      console.error('Error saving comparison:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSavedComparisons = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const comparisons = await api.getComparisons();
      setSavedComparisons(comparisons);
    } catch (err) {
      setError('Failed to load saved comparisons');
      console.error('Error loading comparisons:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadComparison = (comparison: TextComparison) => {
    setText1(comparison.originalText);
    setText2(comparison.comparedText);
  };

  const deleteComparison = async (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setIsLoading(true);
    setError(null);

    try {
      await api.deleteComparison(id);
      setSavedComparisons(savedComparisons.filter(comp => comp._id !== id));
    } catch (err) {
      setError('Failed to delete comparison');
      console.error('Error deleting comparison:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const exportToPDF = () => {
    const element = document.querySelector('.diff-view');
    if (!element) return;

    const opt = {
      margin: 1,
      filename: 'text-comparison.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="text-comparator">
      <div className="input-container">
        <TextInput
          value={text1}
          onChange={setText1}
          label="Original Tekst"
          placeholder="Skriv original tekst her..."
          ariaLabel="Original text input"
        />
        <TextInput
          value={text2}
          onChange={setText2}
          label="Endret Tekst"
          placeholder="Skriv endret tekst her..."
          ariaLabel="Endret text input"
        />
      </div>
      <div className="diff-container">
        <h3>Sammenlign Endringer</h3>
        <DiffView text1={text1} text2={text2} />
        <div className="actions">
          <button 
            onClick={saveComparison} 
            disabled={isLoading || !text1 || !text2}
            className="save-button"
          >
            {isLoading ? 'Lagrer...' : 'Lagre Sammenligning'}
          </button>
          <button 
            onClick={loadSavedComparisons} 
            disabled={isLoading}
            className="load-button"
          >
            {isLoading ? 'Laster...' : 'Last Lagrede Sammenligninger'}
          </button>
          <button 
            onClick={exportToPDF}
            className="export-button"
            aria-label="Export comparison to PDF"
          >
            Last ned som PDF
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
        <SavedComparisons
          comparisons={savedComparisons}
          onLoadComparison={loadComparison}
          onDeleteComparison={deleteComparison}
        />
      </div>
    </div>
  );
} 
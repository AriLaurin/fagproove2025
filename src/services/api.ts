const API_URL = 'http://localhost:5000/api';

export interface TextComparison {
  _id: string;
  originalText: string;
  comparedText: string;
  createdAt: string;
}

export const api = {
  // Get all text comparisons
  async getComparisons(): Promise<TextComparison[]> {
    try {
      const response = await fetch(`${API_URL}/comparisons`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to fetch comparisons');
      }
      return response.json();
    } catch (error) {
      console.error('Error in getComparisons:', error);
      throw error;
    }
  },

  // Create a new text comparison
  async createComparison(originalText: string, comparedText: string): Promise<TextComparison> {
    try {
      const response = await fetch(`${API_URL}/comparisons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalText, comparedText }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to create comparison');
      }

      return response.json();
    } catch (error) {
      console.error('Error in createComparison:', error);
      throw error;
    }
  },

  // Delete a text comparison
  async deleteComparison(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/comparisons/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to delete comparison');
      }
    } catch (error) {
      console.error('Error in deleteComparison:', error);
      throw error;
    }
  }
}; 
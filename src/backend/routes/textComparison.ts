import express from 'express';
import { TextComparison } from '../models/TextComparison';

const router = express.Router();

// Get all text comparisons
router.get('/', async (req, res) => {
  try {
    const comparisons = await TextComparison.find().sort({ createdAt: -1 });
    res.json(comparisons);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comparisons' });
  }
});

// Create a new text comparison
router.post('/', async (req, res) => {
  try {
    const { originalText, comparedText } = req.body;

    if (!originalText || !comparedText) {
      return res.status(400).json({ message: 'Both originalText and comparedText are required' });
    }

    const newComparison = new TextComparison({
      originalText,
      comparedText
    });

    const savedComparison = await newComparison.save();
    res.status(201).json(savedComparison);
  } catch (error: any) {
    res.status(400).json({ message: 'Error creating comparison' });
  }
});

// Get a specific text comparison
router.get('/:id', async (req, res) => {
  try {
    const comparison = await TextComparison.findById(req.params.id);
    if (!comparison) {
      return res.status(404).json({ message: 'Comparison not found' });
    }
    res.json(comparison);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comparison' });
  }
});

// Delete a text comparison
router.delete('/:id', async (req, res) => {
  try {
    const deletedComparison = await TextComparison.findByIdAndDelete(req.params.id);
    if (!deletedComparison) {
      return res.status(404).json({ message: 'Comparison not found' });
    }
    res.json({ message: 'Comparison deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comparison' });
  }
});

export default router; 
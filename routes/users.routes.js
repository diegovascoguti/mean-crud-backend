import { Router } from 'express';
import User from '../models/user.model.js';

const router = Router();

// GET /api/users
router.get('/', async (_req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// POST /api/users
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body || {};
    if (!name || !email) return res.status(400).json({ error: 'name and email are required' });
    const created = await User.create({ name, email });
    res.status(201).json(created);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'email already exists' });
    res.status(500).json({ error: 'Error creating user' });
  }
});

// PUT /api/users/:id
router.put('/:id', async (req, res) => {
  try {
    const { name, email } = req.body || {};
    if (!name || !email) return res.status(400).json({ error: 'name and email are required' });
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'user not found' });
    res.json(updated);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'email already exists' });
    res.status(500).json({ error: 'Error updating user' });
  }
});

// DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'user not found' });
    res.json({ message: 'user deleted' });
  } catch {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

export default router;

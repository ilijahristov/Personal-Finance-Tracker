const express = require('express');
const router = express.Router();

const supabase = require('../db/supabase');

// POST - create new transaction
router.post('/', async (req, res) => {
    const { amount, type, category, description, date } = req.body;

    const { data, error } = await supabase
    .from('transactions')
    .insert([{ amount, type, category, description, date }])
    .select();

    if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});


// GET /transactions - get all
router.get('/', async (req, res) => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false });
  
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
  });


router.get('/:id', async (req, res) => {
    const { id } = req.params;
  
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', id)
      .single();
  
    if (error) return res.status(404).json({ error: 'Transaction not found' });
    res.status(200).json(data);
  });


// PUT /transactions/:id - update
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { amount, type, category, description, date } = req.body;
  
    const { data, error } = await supabase
      .from('transactions')
      .update({ amount, type, category, description, date })
      .eq('id', id)
      .select();
  
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data[0]);
  });


// DELETE /transactions/:id - delete
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);
  
    if (error) return res.status(500).json({ error: error.message });
    res.status(204).send();
  });

module.exports = router;
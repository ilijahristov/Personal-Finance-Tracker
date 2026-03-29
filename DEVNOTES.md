// routes/transactions.js
const express = require('express');
const router = express.Router();
const supabase = require('../db/supabase');

// POST /transactions - create
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
    .order('date', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
});

// GET /transactions/:id - get one
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
```

---

**A few things worth noting:**

`.select()` after `insert` and `update` — without this Supabase returns nothing back, just an empty response. This tells it to return the created/updated row.

`.single()` on the GET by ID — tells Supabase you expect exactly one row, returns an object instead of an array. If nothing is found it throws an error which you catch as a 404.

`.eq('id', id)` — this is your `WHERE id = $1`, remember. Safe and parameterized under the hood.

The status codes matter:
| Code | Meaning |
|---|---|
| 201 | Created successfully |
| 200 | OK, here's your data |
| 204 | Deleted, nothing to return |
| 404 | Couldn't find it |
| 500 | Something broke on the server |

---

**Test each route with Postman or Thunder Client** (VS Code extension) before touching React:
```
POST   /transactions        body: { amount, type, category, description, date }
GET    /transactions
GET    /transactions/:id
PUT    /transactions/:id    body: { fields to update }
DELETE /transactions/:id
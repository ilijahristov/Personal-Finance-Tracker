const express = require('express')
const bcrypt = require('bcryptjs')
const supabase = require('../db/supabase')
const jwt = require('jsonwebtoken')

const router = express.Router()



// POST - register new user
router.post('/signup', async (req, res) => {

    try {
        // validate request body and hash password
        const { name, email, password } = req.body

        // check if all fields are present
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields' })
        }

        // check if email is already in use
        const { data, error } = await supabase.from('users').select('*').eq('email', email).maybeSingle();
        if (!error) {
            return res.status(400).json({ error: 'Email already in use' })
        }
        

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // insert user into database
            const { data: newUser, error: newUserError } = await supabase.from('users').insert({ name, email, password_hash: hashedPassword }).select();
            if (newUserError) throw newUserError
        else {
            res.status(201).json({ message: 'User created successfully' })
        }

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// POST - login user
router.post('/login', async (req, res) => {
    try {
        const {email, password } = req.body

        // check if all fields are present
        if (!email || !password) {
            return res.status(400).json({ error: 'Missing required fields' })
        }
        
        // get user from database
        const { data, error } = await supabase.from('users').select('*').eq('email', email).single();

        if (error) throw error
        else {
            // compare password with hashed password
            const isPasswordValid = await bcrypt.compare(password, data.password_hash)
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid password' })
            }
            else {
                // generate JWT token
                const token = jwt.sign({ userid: data.id, email: data.email, name: data.name }, process.env.JWT_KEY, { expiresIn: '7d' })
                res.status(200).json({ message: 'Login successful', token: token })
            }
        }

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
    

})


module.exports = router;
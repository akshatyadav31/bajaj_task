const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Helper function for user_id format
const makeUserId = (name, dob) => {
  // Remove leading/trailing whitespace, lowercase, replace inner spaces with underscores
  return name.trim().toLowerCase().replace(/\s+/g, "_") + "_" + dob;
};

app.post('/bfhl', (req, res) => {
  try {
    // Fill in your details here
    const full_name = "Akshat Yadav";
    const dob = "31082003";
    const email = "akshatyadav2022@vitbhopal.ac.in";
    const roll_number = "21BCE10012";

    // Data extraction
    const data = Array.isArray(req.body.data) ? req.body.data : [];

    // Utility functions
    const isNumber = str => /^\d+$/.test(str);
    const isAlphabet = str => /^[a-zA-Z]+$/.test(str);
    const isSpecial = str => !isNumber(str) && !isAlphabet(str);

    let even_numbers = [], odd_numbers = [], alphabets = [], special_characters = [];
    let sum = 0, concat = "";

    data.forEach(item => {
      const s = String(item);
      if (isNumber(s)) {
        if (parseInt(s) % 2 === 0) even_numbers.push(s);
        else odd_numbers.push(s);
        sum += parseInt(s);
      } else if (isAlphabet(s)) {
        alphabets.push(s.toUpperCase());
        concat += s;
      } else if (isSpecial(s)) {
        special_characters.push(s);
      }
    });

    // Function to concatenate alphabets in reverse, alternating caps
    function altCapsReverse(str) {
      let out = "";
      const arr = str.split('').reverse();
      for (let i = 0; i < arr.length; i++) {
        out += i % 2 === 0 ? arr[i].toUpperCase() : arr[i].toLowerCase();
      }
      return out;
    }

    res.status(200).json({
      is_success: true,
      user_id: makeUserId(full_name, dob),
      email,
      roll_number,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string: altCapsReverse(concat)
    });
  } catch (err) {
    res.status(500).json({ is_success: false, error: err.message });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});

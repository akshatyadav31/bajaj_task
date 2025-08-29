module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ is_success: false, error: "Method Not Allowed" });
  }

  try {
    // Parse body for raw Vercel serverless environments
    let body = req.body;
    if (!body || Object.keys(body).length === 0) {
      // Body may not be parsed, handle manually
      let data = "";
      await new Promise(resolve => {
        req.on("data", chunk => { data += chunk; });
        req.on("end", resolve);
      });
      body = data ? JSON.parse(data) : {};
    }

    // Your user details
    const full_name = "Akshat Yadav";
    const dob = "31082003";
    const email = "akshatyadav2022@vitbhopal.ac.in";
    const roll_number = "21BCE10012";

    // Extract and process input
    const inputArray = Array.isArray(body.data) ? body.data : [];

    const isNumber = str => /^\d+$/.test(str);
    const isAlphabet = str => /^[a-zA-Z]+$/.test(str);
    const isSpecial = str => !isNumber(str) && !isAlphabet(str);

    let even_numbers = [], odd_numbers = [], alphabets = [], special_characters = [];
    let sum = 0, concat = "";

    inputArray.forEach(item => {
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

    function altCapsReverse(str) {
      let out = "";
      const arr = str.split('').reverse();
      for (let i = 0; i < arr.length; i++) {
        out += i % 2 === 0 ? arr[i].toUpperCase() : arr[i].toLowerCase();
      }
      return out;
    }

    const user_id = full_name.trim().toLowerCase().replace(/\s+/g, "_") + "_" + dob;

    res.status(200).json({
      is_success: true,
      user_id,
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
};

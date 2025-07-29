const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

const USER_DETAILS = {
    user_id: "palash_manna_31102003",
    email: "palash1256.be22@chitkarauniversity.edu.in",
    roll_number: "2211981256"
};

function categorizeData(data) {
    const result = {
        odd_numbers: [],
        even_numbers: [],
        alphabets: [],
        special_characters: [],
        sum: 0
    };

    data.forEach(item => {
        // Check if item is a number
        if ((typeof item === 'number') || (typeof item === 'string' && item.trim() !== '' && typeof +item === 'number' && +item === +item)) {
            const num = parseInt(item);
            result.sum += num;

            if (num % 2 === 0) {
                result.even_numbers.push(item.toString());
            } else {
                result.odd_numbers.push(item.toString());
            }
        }
        // Check if item is alphabetic
        else if (typeof item === 'string' && item.length === 1 && ((item >= 'a' && item <= 'z') || (item >= 'A' && item <= 'Z'))) {
            result.alphabets.push(item.toUpperCase());
        }
        // Everything else is special character
        else {
            result.special_characters.push(item);
        }
    });

    return result;
}


function createConcatString(data) {
    const alphabets = [];
    data.forEach(item => {
        if (typeof item === 'string') {
            for (let char of item) {
                if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
                    alphabets.push(char);
                }
            }
        }
    });

    // Reverse the array
    alphabets.reverse();
    let result = '';
    for (let i = 0; i < alphabets.length; i++) {
        if (i % 2 === 0) {
            result += alphabets[i].toUpperCase();
        } else {
            result += alphabets[i].toLowerCase();
        }
    }
    return result;
}

//    /bfhl endpoint
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        console.log("Body data", data);

        // Validate input
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input: 'data' must be an array"
            });
        }

        // Process the data
        const categorized = categorizeData(data);
        const concatString = createConcatString(data);

        // Prepare response
        const response = {
            is_success: true,
            user_id: USER_DETAILS.user_id,
            email: USER_DETAILS.email,
            roll_number: USER_DETAILS.roll_number,
            odd_numbers: categorized.odd_numbers,
            even_numbers: categorized.even_numbers,
            alphabets: categorized.alphabets,
            special_characters: categorized.special_characters,
            sum: categorized.sum.toString(),
            concat_string: concatString
        };
        console.log(data)
        res.status(200).json(response);

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            is_success: false,
            error: "Internal server error"
        });
    }
});

// GET endpoint for /bfhl
app.get('/', (req, res) => {
    res.status(200).json({
        "Name:" : "Palash Manna"
    });
});
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        "Name:": "Palash Manna",
        "email":"palash1256.be22@chitkarauniversity.edu.in"
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

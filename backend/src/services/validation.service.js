/**
 * Input Validation Service
 * 
 * Requirements for valid entry:
 * - Must be in format "X->Y" where X and Y are single uppercase letters [A-Z]
 * - X and Y must not be the same letter (e.g., A->A is invalid)
 * - Trim spaces before processing
 */

const validateInputData = (data) => {
    const validEdges = [];
    const invalidEntries = [];

    if (!Array.isArray(data)) {
        throw new Error("Input data must be an array");
    }

    const regex = /^[A-Z]->[A-Z]$/;

    data.forEach(item => {
        if (typeof item !== 'string') {
            invalidEntries.push(item);
            return;
        }

        // Trim spaces first
        const trimmedItem = item.trim();

        // Validate format
        if (regex.test(trimmedItem)) {
            const x = trimmedItem[0];
            const y = trimmedItem[3];

            // Ensure source and destination are different
            if (x !== y) {
                validEdges.push(trimmedItem);
            } else {
                invalidEntries.push(trimmedItem);
            }
        } else {
            invalidEntries.push(trimmedItem);
        }
    });

    return {
        validEdges,
        invalidEntries
    };
};

module.exports = {
    validateInputData
};

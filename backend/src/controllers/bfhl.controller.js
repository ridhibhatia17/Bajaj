const { validateInputData } = require('../services/validation.service');
const { detectDuplicateEdges } = require('../services/duplicate.service');
const { buildHierarchy } = require('../services/hierarchy.service');
const { generateSummary } = require('../services/summary.service');

/**
 * Handles the POST /bfhl request.
 * Integrates all processing services for the final response.
 */
const handlePostBfhl = (req, res) => {
    try {
        const { data } = req.body;

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                message: 'Invalid input format. Expected an array in "data".'
            });
        }

        // 1. Validation Service (Filter format rules)
        const { validEdges, invalidEntries } = validateInputData(data);

        // 2. Duplicate Edge Detection
        const { uniqueEdges, duplicateEdges } = detectDuplicateEdges(validEdges);

        // 3. Hierarchy Builder
        const hierarchies = buildHierarchy(uniqueEdges);

        // 4. Summary Generator
        const summary = generateSummary(uniqueEdges);

        // 5. Final Response
        res.status(200).json({
            is_success: true,
            user_id: "ridhibhatia_ddmmyyyy",
            email_id: "your_college_email@xyz.com",
            college_roll_number: "YOUR_ROLL_NUMBER",
            hierarchies: hierarchies,
            invalid_entries: invalidEntries,
            duplicate_edges: duplicateEdges,
            summary: summary
        });
    } catch (error) {
        console.error('Error in handlePostBfhl:', error);
        res.status(500).json({
            is_success: false,
            message: 'Internal server error'
        });
    }
};

/**
 * Handles the GET /bfhl request.
 */
const handleGetBfhl = (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
};

module.exports = {
    handlePostBfhl,
    handleGetBfhl
};

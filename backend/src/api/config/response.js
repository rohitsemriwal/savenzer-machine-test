// Template for the api response
class ApiResponse {
    static success(res, data, message="") {
        return res.json({ success: true, data: data, message: message });
    }
    static error(res, message) {
        return res.json({ success: false, message: message });
    }
}

module.exports = ApiResponse;
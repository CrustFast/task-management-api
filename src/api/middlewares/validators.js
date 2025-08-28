const { body, validationResult } = require('express-validator');

// Middleware untuk menangani error validasi
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Jika ada error, kirim respons 400 dengan detail error
    return res.status(400).json({ errors: errors.array() });
  }
  next(); // Jika tidak ada error, lanjutkan ke controller
};

// Aturan validasi untuk membuat task baru
const createTaskValidator = [
  // title tidak boleh kosong
  body('title')
    .notEmpty()
    .withMessage('Title is required and cannot be empty'),

  // priority harus salah satu dari nilai yang diizinkan
  body('priority')
    .isIn(['Low', 'Medium', 'High'])
    .withMessage('Priority must be one of: Low, Medium, High'),

  // deadline harus dalam format tanggal ISO8601 (YYYY-MM-DDTHH:mm:ss.sssZ)
  body('deadline')
    .isISO8601()
    .toDate()
    .withMessage('Deadline must be a valid ISO 8601 date'),

  // Setelah semua aturan dijalankan, panggil handler untuk memeriksa hasilnya
  handleValidationErrors,
];

// Aturan validasi untuk memperbarui task (semua field opsional)
const updateTaskValidator = [
  body('title')
    .optional()
    .notEmpty()
    .withMessage('Title cannot be empty'),

  body('priority')
    .optional()
    .isIn(['Low', 'Medium', 'High'])
    .withMessage('Priority must be one of: Low, Medium, High'),

  body('deadline')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Deadline must be a valid ISO 8601 date'),
    
  handleValidationErrors,
];

module.exports = {
  createTaskValidator,
  updateTaskValidator,
};

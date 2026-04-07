const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const os = require("os");

const { uploadDocument } = require("../controllers/documentController");

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, os.tmpdir());
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

router.post("/upload/:conversationId", protect, upload.single("document"), uploadDocument);

module.exports = router;

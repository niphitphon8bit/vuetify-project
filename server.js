const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./papers.db');
const multer = require('multer');
const app = express();
const fs = require('fs');
const cors = require('cors');

app.use(cors());

// use dist as a frontend for a frontend server
app.use(serveStatic(path.join(__dirname, 'dist')));

// create path of folder upload files
const uploadDir = path.join(__dirname, 'uploads', 'research_papers');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
// define upload directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/research_papers/'); // Define the directory where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Name the file as a combination of the current timestamp and its original name
  }
});
const upload = multer({ storage: storage });

// create table of isnt exist with name papers
db.run("CREATE TABLE IF NOT EXISTS papers (id INTEGER PRIMARY KEY, filename TEXT, filepath TEXT, upload_date TEXT)");

// upload paper post method
app.post('/upload-paper', upload.single('file'), (req, res) => {
  const { filename, path } = req.file;
  const uploadDate = new Date().toISOString();
  db.run("INSERT INTO papers (filename, filepath, upload_date) VALUES (?, ?, ?)", [filename, path, uploadDate], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'File uploaded successfully!', id: this.lastID });
  });
});

// get all paper
app.get('/list-papers', (req, res) => {
  db.all("SELECT * FROM papers", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // res.json(rows);
    res.json({ items: rows });
  });
});

// get list paper by parameter
app.get('/list-papers', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
  const sortBy = req.query.sortBy || 'id'; // default sort by 'id'
  const sortOrder = req.query.sortOrder || 'asc'; // default sort order is ascending

  const offset = (page - 1) * itemsPerPage;

  const query = `
    SELECT * FROM papers
    ORDER BY ${sortBy} ${sortOrder}
    LIMIT ? OFFSET ?
  `;

  db.all(query, [itemsPerPage, offset], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ items: rows });
  });
});

// get all paper list count
app.get('/list-papers-count', (req, res) => {
  db.get("SELECT COUNT(*) as total FROM papers", [], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ total: row.total });
  });
});

// delete paper by Id
app.delete('/delete-paper/:id', (req, res) => {
  const paperId = req.params.id;
  db.get("SELECT filepath FROM papers WHERE id = ?", [paperId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (row) {
      if (fs.existsSync(row.filepath)) {
        fs.unlinkSync(row.filepath);
      } else {
        console.log('File does not exist:', row.filepath);
      }
      // fs.unlinkSync(row.filepath); // Delete the file
      db.run("DELETE FROM papers WHERE id = ?", [paperId], (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'File deleted successfully!' });
      });
    } else {
      res.status(404).json({ message: 'File not found!' });
    }
  });
});

app.post('/cleanup-records', (req, res) => {
  let deletedCount = 0;

  // Fetch all records from the database
  db.all("SELECT id, filepath FROM papers", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Check each file and delete the record if the file doesn't exist
    rows.forEach(row => {
      if (!fs.existsSync(row.filepath)) {
        db.run("DELETE FROM papers WHERE id = ?", [row.id], (err) => {
          if (err) {
            console.error(`Error deleting record for id ${row.id}:`, err.message);
          } else {
            deletedCount++;
          }
        });
      }
    });

    // Return the cleanup summary
    res.json({ message: `Cleanup completed. ${deletedCount} records deleted.` });
  });
});

// running on port 8080
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Server started on ' + port);
});

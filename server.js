require('dotenv').config();
const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./papers.db');
const multer = require('multer');
const app = express();
const fs = require('fs');
const cors = require('cors');

// let isDev;
// if (process.env.VITE_BACKEND_URL.includes('localhost')) {
//   isDev = "http://localhost:8080";
// } else {
//   isDev = "https://vuetify-app-fefe20b91493.herokuapp.com/";
// }

const allowedOrigins = ['http://localhost:3000', 'https://vuetify-app-fefe20b91493.herokuapp.com'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(serveStatic(path.join(__dirname, 'dist')));

const uploadDir = path.join(__dirname, 'uploads', 'research_papers');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/research_papers/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage }).array('files', 10);

// create table of isnt exist with name papers
db.run("CREATE TABLE IF NOT EXISTS papers (id INTEGER PRIMARY KEY, filename TEXT, filepath TEXT, upload_date TEXT)");

app.post('/upload-papers', upload, (req, res) => {
  const uploadDate = new Date().toISOString();
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  const insertQueries = files.map(file => {
    return new Promise((resolve, reject) => {
      db.run("INSERT INTO papers (filename, filepath, upload_date) VALUES (?, ?, ?)", [file.filename, file.path, uploadDate], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  });

  Promise.all(insertQueries)
    .then(ids => {
      res.json({ message: 'Files uploaded successfully!', ids: ids });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
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
// app.get('/list-papers', (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
//   const sortBy = req.query.sortBy || 'id';
//   const sortOrder = req.query.sortOrder === 'desc' ? 'desc' : 'asc'; // Ensure only 'asc' or 'desc' is used

//   const offset = (page - 1) * itemsPerPage;

//   const query = `
//     SELECT * FROM papers
//     ORDER BY ? ?
//     LIMIT ? OFFSET ?
//   `;

//   db.all(query, [sortBy, sortOrder, itemsPerPage, offset], (err, rows) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.json({ items: rows });
//   });
// });

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

// This should be placed after all your other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// running on port 8080
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Server started on ' + port);
});

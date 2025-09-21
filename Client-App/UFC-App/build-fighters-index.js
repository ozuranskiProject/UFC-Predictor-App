const fs = require('fs'); 
const path = require('path'); 

console.log('build-fighters-index.js: starting…'); // debug

const SRC_DIR = path.resolve(__dirname, '..', '..', 'scraped_data'); 

const OUT_FILE = path.resolve(__dirname, 'fighters-index.json'); 

console.log('SRC_DIR =', SRC_DIR); 
console.log('OUT_FILE =', OUT_FILE);

// Error case: scraped_data folder missing
if (!fs.existsSync(SRC_DIR) || !fs.statSync(SRC_DIR).isDirectory()) {   
  console.error('X scraped_data folder not found at:', SRC_DIR); 
  process.exit(1); 
}

// Read all .json files from scraped_data
const all = fs.readdirSync(SRC_DIR); 
const files = all.filter(f => f.toLowerCase().endsWith('.json')); 
console.log(`Found ${files.length} JSON files in scraped_data.`); 

if (files.length === 0) {                                     
  console.error('X No .json files found. Nothing to build.'); 
  fs.writeFileSync(OUT_FILE, '[]');                           
  process.exit(1);                                            
}

// Process each file
const fighters = []; 
files.forEach((file, i) => {                 
  const fullPath = path.join(SRC_DIR, file); //basically fuse file and path to form path to specific file, i.e scraped_data/ + conor-mcgregor.json
  try { 
    const raw = fs.readFileSync(fullPath, 'utf8'); 
    const data = JSON.parse(raw); 

    const nameFromFile = file.replace(/\.json$/i, '').replace(/-/g, ' '); 
    
    fighters.push({
    ...data, 
    id: String(i + 1), 
    });

  } catch (err) { 
    console.warn(` oops Skipping ${file}: ${err.message}`);
  }
});

fs.writeFileSync(OUT_FILE, JSON.stringify(fighters, null, 2));  
console.log(`Wrote ${fighters.length} fighters to ${OUT_FILE}`); 

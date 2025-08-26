const fs = require('fs'); //fs is a tool set that lets you manipulate files
const path = require('path'); //path lets you find and use file paths
//tried to understand why these are the way they are and not imports, ig its just because their old is what im getting lol

console.log('build-fighters-index.js: starting…'); // I need to do this stuff more often, it really helped here when trying to debug

const SRC_DIR = "../../Scraper/scraped_data"; // hard coded path to scraped_data folder
//could not get it to work without hardcoding, hopefully this isn't "improper" or comes to bite me in the arse later
//SRC DIR => "folder directory"

const OUT_FILE = path.resolve(__dirname, 'fighters-index.json'); //*dirname is a special variable, IS absolute path just with the file
//path.resolve is a special function, FINDS absolute path just with the file
//also... out_file... output file... yeah

console.log('SRC_DIR =', SRC_DIR); //again, good practice when working through this hellfire shit
console.log('OUT_FILE =', OUT_FILE);

if (!fs.existsSync(SRC_DIR) || !fs.statSync(SRC_DIR).isDirectory()) { //is there no path here? OR is there no folder here?  
  console.error('X scraped_data folder not found at:', SRC_DIR); 
  process.exit(1); //break but with error code 1
}

const all = fs.readdirSync(SRC_DIR); //yoink folder contents
const files = all.filter(f => f.toLowerCase().endsWith('.json')); //format all the same (shouldnt be NEEDED but whatever)
console.log(`Found ${files.length} JSON files in scraped_data.`); 

if (files.length === 0) {                                     //if nothing is found
  console.error('X No .json files found. Nothing to build.'); //say so
  fs.writeFileSync(OUT_FILE, '[]');                           // make output file blank
  process.exit(1);                                            // break with error code 1
}

// Build index (pain in the ass section)
const fighters = []; //list of fighters
files.forEach((file, i) => {                 //iterate through each file in folder assigning index as you go
  const fullPath = path.join(SRC_DIR, file); //basically fuse file and path to form path to specific file, i.e scraped_data/ + conor-mcgregor.json
  try { //uhhh... try... incase of any errors
    const raw = fs.readFileSync(fullPath, 'utf8'); //take raw file contents
    const data = JSON.parse(raw); //turn that into usable data

    const nameFromFile = file.replace(/\.json$/i, '').replace(/-/g, ' '); //remove hyphens and ".json" from file name
    // Start with all original data
    fighters.push({
    ...data, // include everything from the JSON file (record, win_methods, bio, fight_stats, etc.)
    id: String(i + 1), //assign incremented id
    });

  } catch (err) { //error case
    console.warn(` oops Skipping ${file}: ${err.message}`);
  }
});

fs.writeFileSync(OUT_FILE, JSON.stringify(fighters, null, 2)); //write fighters as json to output file 
console.log(`Wrote ${fighters.length} fighters to ${OUT_FILE}`);

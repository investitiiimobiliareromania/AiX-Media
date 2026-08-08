/* eslint-disable */
const fs = require('fs');
const path = require('path');

const prohibitedPatterns = [
  /Elena\s+Popescu/i,
  /Alexandru\s+Ionescu/i,
  /Dr?\.\s+Sorin\s+Moldovan/i,
  /Mihai\s+Stoica/i,
  /Dan\s+Radu/i,
  /Romania's\s+Bloomberg/i,
  /24\/7/i,
  /Updated\s+Real-Time/i,
  /Live\s+market\s+data/i,
  /Live\s+BVB/i,
  /Live\s+BNR/i,
  /18,420\.5/i,
  /4\.9765/i,
  /4\.5830/i,
  /5\.58%/i,
  /2,348\.4/i,
  /84\.72/i,
  /2\.81/i,
];

let issues = [];

function searchFile(filePath) {
  try {
    // Ignore the checker script itself to avoid false positives on pattern definitions
    if (filePath.includes('content-integrity-check.js')) {
      return;
    }
    const content = fs.readFileSync(filePath, 'utf8');
    prohibitedPatterns.forEach(pat => {
      if (pat.test(content)) {
        issues.push(`${filePath}: matches ${pat}`);
      }
    });
  } catch (error) {
    // Ignore read errors
  }
}

function walk(dir) {
  try {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        walk(fullPath);
      } else {
        const ext = path.extname(fullPath);
        if (['.ts', '.tsx', '.js', '.jsx', '.md'].includes(ext)) {
          searchFile(fullPath);
        }
      }
    });
  } catch (error) {
    // Ignore walk errors
  }
}

// targetDir will be 'src' when run from the root, or we can target the 'src' directory relative to repository root
// Since we run the script as 'node ./src/scripts/content-integrity-check.js', process.cwd() is the repository root.
const targetDir = path.join(process.cwd(), 'src');
walk(targetDir);

if (issues.length > 0) {
  console.error('Content integrity issues found:');
  issues.forEach(i => console.error(i));
  process.exit(1);
} else {
  console.log('No content integrity issues found.');
  process.exit(0);
}

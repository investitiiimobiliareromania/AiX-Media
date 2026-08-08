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
  /Real-Time\s+BVB/i,
  /Real-Time\s+BNR/i,
  /Lorem\s+ipsum/i,
  /TODO/i,
  /FIXME/i,
  /Bloomberg-style/i,
  /FT\s+Terminal/i,
  /example\.com/i,
  /fake\s+expert/i,
  /fake\s+journalist/i,
];

let issues = [];

// Load central YouTube catalog
const ytConfigPath = path.join(process.cwd(), 'src/config/youtube.ts');
let verifiedYtIds = [];
if (fs.existsSync(ytConfigPath)) {
  const ytContent = fs.readFileSync(ytConfigPath, 'utf8');
  const matches = ytContent.match(/id:\s*['"]([A-Za-z0-9_-]{11})['"]/g);
  if (matches) {
    verifiedYtIds = matches.map(m => m.match(/['"]([A-Za-z0-9_-]{11})['"]/)[1]);
  }
}

function searchFile(filePath) {
  try {
    // Ignore the checker script and the config file itself
    if (filePath.includes('content-integrity-check.js') || filePath.includes('youtube.ts')) {
      return;
    }
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Prohibited word patterns
    prohibitedPatterns.forEach(pat => {
      if (pat.test(content)) {
        issues.push(`${filePath}: matches prohibited pattern ${pat}`);
      }
    });

    // 2. YouTube Video ID authorization check
    const ytIdPatterns = [
      /youtube\.com\/embed\/([A-Za-z0-9_-]{11})/g,
      /youtube-nocookie\.com\/embed\/([A-Za-z0-9_-]{11})/g,
      /youtu\.be\/([A-Za-z0-9_-]{11})/g,
      /youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})/g,
      /youtubeId:\s*['"]([A-Za-z0-9_-]{11})['"]/g,
    ];

    ytIdPatterns.forEach(pat => {
      let match;
      pat.lastIndex = 0;
      while ((match = pat.exec(content)) !== null) {
        const id = match[1];
        if (!verifiedYtIds.includes(id)) {
          issues.push(`${filePath}: Found unauthorized YouTube Video ID "${id}". All videos must be defined in the central config (src/config/youtube.ts).`);
        }
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

// 1. Walk through the src directory
const targetDir = path.join(process.cwd(), 'src');
walk(targetDir);

// 2. Verify BVB Companies dataset for provenance metadata
const bvbDataPath = path.join(process.cwd(), 'src/lib/bvb-data.ts');
if (fs.existsSync(bvbDataPath)) {
  const fileContent = fs.readFileSync(bvbDataPath, 'utf8');
  
  // Verify BVB Companies have source, sourceUrl, reportedAt, retrievedAt, and isin
  const entries = fileContent.split('id: "comp-');
  for (let i = 1; i < entries.length; i++) {
    const entry = entries[i];
    const tickerMatch = entry.match(/symbol:\s*"([^"]+)"/);
    const ticker = tickerMatch ? tickerMatch[1] : `Entry #${i}`;
    
    if (!entry.includes('source:')) {
      issues.push(`BVB Data Integrity: ${ticker} is missing 'source' metadata.`);
    }
    if (!entry.includes('sourceUrl:')) {
      issues.push(`BVB Data Integrity: ${ticker} is missing 'sourceUrl' metadata.`);
    }
    if (!entry.includes('reportedAt:')) {
      issues.push(`BVB Data Integrity: ${ticker} is missing 'reportedAt' metadata.`);
    }
    if (!entry.includes('retrievedAt:')) {
      issues.push(`BVB Data Integrity: ${ticker} is missing 'retrievedAt' metadata.`);
    }
    if (!entry.includes('isin:')) {
      issues.push(`BVB Data Integrity: ${ticker} is missing 'isin' metadata.`);
    }
  }
} else {
  issues.push(`BVB Data Integrity: bvb-data.ts was not found at ${bvbDataPath}`);
}

// 3. Verify that there are no "Live" or "Real-Time" claims in market-data.ts
const marketDataPath = path.join(process.cwd(), 'src/lib/market-data.ts');
if (fs.existsSync(marketDataPath)) {
  const content = fs.readFileSync(marketDataPath, 'utf8');
  if (/live/i.test(content) && !/status:\s*"live"/i.test(content) && !/isDelayed/i.test(content)) {
    if (content.includes('label: "Live"') || content.includes('title: "Live"')) {
      issues.push(`Market Data Integrity: Prohibited 'Live' label found in market-data.ts`);
    }
  }
}

if (issues.length > 0) {
  console.error('Content integrity issues found:');
  issues.forEach(i => console.error(i));
  process.exit(1);
} else {
  console.log('No content integrity issues found. BVB company and YouTube video provenance checks passed.');
  process.exit(0);
}

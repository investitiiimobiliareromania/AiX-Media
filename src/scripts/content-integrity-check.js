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
  /24\/7\s+Live/i,
  /ON\s+AIR/i,
  /Updated\s+Real-Time/i,
  /Live\s+market\s+data/i,
  /Live\s+BVB/i,
  /Live\s+BNR/i,
  /Real-Time\s+BVB/i,
  /Real-Time\s+BNR/i,
  /Lorem\s+ipsum/i,
  /\bTODO\b/i,
  /\bFIXME\b/i,
  /Bloomberg-style/i,
  /FT\s+Terminal/i,
  /example\.com/i,
  /fake\s+expert/i,
  /fake\s+journalist/i,
  /localhost:3000/i,
];

let issues = [];

// 1. Central YouTube video validation
const ytConfigPath = path.join(process.cwd(), 'src/config/youtube.ts');
let verifiedYtIds = [];
if (fs.existsSync(ytConfigPath)) {
  const ytContent = fs.readFileSync(ytConfigPath, 'utf8');
  const matches = ytContent.match(/id:\s*['"]([A-Za-z0-9_-]{11})['"]/g);
  if (matches) {
    verifiedYtIds = matches.map(m => m.match(/['"]([A-Za-z0-9_-]{11})['"]/)[1]);
  }
}

// Ensure featured video PzPo7wbtUB4 exists
if (!verifiedYtIds.includes('PzPo7wbtUB4')) {
  issues.push("YouTube Video Integrity: Featured video ID 'PzPo7wbtUB4' is missing from src/config/youtube.ts");
}

function searchFile(filePath) {
  try {
    if (filePath.includes('content-integrity-check.js') || filePath.includes('youtube.ts')) {
      return;
    }
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Prohibited word patterns
    prohibitedPatterns.forEach(pat => {
      if (pat.test(content)) {
        issues.push(`${filePath}: matches prohibited pattern ${pat}`);
      }
    });

    // YouTube Video ID authorization check
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

// Walk through the src directory
const targetDir = path.join(process.cwd(), 'src');
walk(targetDir);

// 2. Verify Centralized Data Provenance Registry
const provPath = path.join(process.cwd(), 'src/lib/data-provenance.ts');
if (!fs.existsSync(provPath)) {
  issues.push("Provenance Registry Failure: src/lib/data-provenance.ts does not exist.");
} else {
  const provContent = fs.readFileSync(provPath, 'utf8');
  if (!provContent.includes('bnr-eur-ron') || !provContent.includes('ancpi-national-transactions')) {
    issues.push("Provenance Registry Failure: Core metrics missing from data-provenance.ts.");
  }
}

// 3. Numeric Claim & Provenance Scanner for BVB Dataset
const bvbDataPath = path.join(process.cwd(), 'src/lib/bvb-data.ts');
if (fs.existsSync(bvbDataPath)) {
  const fileContent = fs.readFileSync(bvbDataPath, 'utf8');
  const entries = fileContent.split('id: "comp-');
  for (let i = 1; i < entries.length; i++) {
    const entry = entries[i];
    const tickerMatch = entry.match(/symbol:\s*"([^"]+)"/);
    const ticker = tickerMatch ? tickerMatch[1] : `Entry #${i}`;
    
    if (!entry.includes('source:')) {
      issues.push(`Numeric Claim Provenance: ${ticker} is missing 'source' provenance metadata.`);
    }
    if (!entry.includes('sourceUrl:')) {
      issues.push(`Numeric Claim Provenance: ${ticker} is missing 'sourceUrl' provenance metadata.`);
    }
    if (!entry.includes('reportedAt:')) {
      issues.push(`Numeric Claim Provenance: ${ticker} is missing 'reportedAt' timestamp.`);
    }
    if (!entry.includes('retrievedAt:')) {
      issues.push(`Numeric Claim Provenance: ${ticker} is missing 'retrievedAt' timestamp.`);
    }
    if (!entry.includes('isin:')) {
      issues.push(`Numeric Claim Provenance: ${ticker} is missing 'isin' code.`);
    }
    if (!entry.includes('reportedPeriod:')) {
      issues.push(`Numeric Claim Provenance: ${ticker} is missing 'reportedPeriod' definition.`);
    }
  }
} else {
  issues.push(`Provenance Failure: bvb-data.ts not found.`);
}

// 4. Numeric Claim & Provenance Scanner for Real Estate Dataset
const reDataPath = path.join(process.cwd(), 'src/lib/real-estate-data.ts');
if (fs.existsSync(reDataPath)) {
  const reContent = fs.readFileSync(reDataPath, 'utf8');
  if (!reContent.includes('source:') || !reContent.includes('sourceUrl:') || !reContent.includes('referencePeriod:')) {
    issues.push(`Numeric Claim Provenance: Real estate dataset missing provenance attributes.`);
  }
}

// 5. Numeric Claim & Provenance Scanner for Market Data Dataset
const marketDataPath = path.join(process.cwd(), 'src/lib/market-data.ts');
if (fs.existsSync(marketDataPath)) {
  const mContent = fs.readFileSync(marketDataPath, 'utf8');
  if (!mContent.includes('source:') || !mContent.includes('BNR_XML_URL') || !mContent.includes('BNR_FINANCIAL_INFO_URL')) {
    issues.push(`Numeric Claim Provenance: Market data dataset missing official BNR provenance URLs.`);
  }
}

if (issues.length > 0) {
  console.error('Content integrity & numeric claim provenance issues found:');
  issues.forEach(i => console.error(` ✗ ${i}`));
  process.exit(1);
} else {
  console.log('✓ All numeric claim provenance, central data-provenance manifest, and YouTube authorizations verified.');
  process.exit(0);
}

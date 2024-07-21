const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create a temporary directory for the commits
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

// Change to the temporary directory
process.chdir(tempDir);

// Initialize a new git repository
execSync('git init');

// Create commits for each day in the past year
const now = new Date();
for (let i = 365; i >= 0; i--) {
  const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
  const isoDate = date.toISOString().substring(0, 10);
  fs.writeFileSync('temp.txt', `Commit for ${isoDate}`);
  execSync('git add temp.txt');
  execSync(`git commit -m "Commit for ${isoDate}" --date="${isoDate}T12:00:00"`);
}

// Add remote and push commits to the GitHub repository
const remoteUrl = 'https://github.com/Jaipal-003/contributions.js';
execSync(`git remote add origin ${remoteUrl}`);
execSync('git branch -M main');
execSync('git push -u origin main --force');

// Clean up
process.chdir(__dirname);
fs.rmdirSync(tempDir, { recursive: true });

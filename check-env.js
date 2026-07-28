const fs = require('fs');
console.log('Environment Check...');

if (fs.existsSync('package.json')) {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log('\nPackage.json contents:');
  console.log('Name:', pkg.name);
  console.log('Description:', pkg.description);
  console.log('Dependencies:', Object.keys(pkg.dependencies));
} else {
  console.log('package.json does not exist');
}

console.log('\nEnvironment check complete');
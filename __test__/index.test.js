const { generatePages } = require('../index');
const fs = require('fs');

describe('generatePages', () => {
  it('should generate 10 pages with correct content', async () => {
    await generatePages();

    // Check that the correct number of files were generated
    const files = fs.readdirSync('.');
    expect(files.filter(name => name.startsWith('page')).length).toEqual(10);

    for (let i = 1; i <= 10; i++) {
      const fileName = `page${i}.html`;

      // Check that the file exists
      expect(fs.existsSync(fileName)).toBeTruthy();

      const fileContents = fs.readFileSync(fileName, 'utf8');

      // Check that the file contains the correct title
      expect(fileContents).toContain(`<title>Sb - Assignment</title>`);
    }
  }, 15000);
});

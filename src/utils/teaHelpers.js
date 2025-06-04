/**
 * Extract the filename part of a `.tea` path.
 * @param {string} filePath Full file path.
 * @returns {string|null} Filename without extension or null when not matched.
 */
function extractFileName(filePath) {
  const match = /\/([^/]+)\.tea$/u.exec(filePath);
  return match ? match[1] : null;
}
module.exports = { extractFileName };

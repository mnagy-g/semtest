module.exports = {
  branches: ['master'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING']
        }
      }
    ],
    [
      '@semantic-release/exec',
      {
        publishCmd: 'export PUBLISH=123',
        successCmd: 'export SUCCESS=123',
        failCmd: 'export FAIL=123',
      }
    ],
  ]
};

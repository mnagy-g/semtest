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
        publishCmd: 'echo "TAG_STATUS=PUBLISH" >> $GITHUB_OUTPUT',
        successCmd: 'echo "TAG_STATUS=SUCCESS" >> $GITHUB_OUTPUT',
        failCmd: 'echo "TAG_STATUS=FAIL" >> $GITHUB_OUTPUT',
      }
    ],
  ]
};

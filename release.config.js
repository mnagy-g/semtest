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
        publishCmd: 'echo "STATUS=PUBLISH" >> $GITHUB_OUTPUT',
        successCmd: 'echo "STATUS=SUCCESS" >> $GITHUB_OUTPUT',
        failCmd: 'echo "STATUS=FAIL" >> $GITHUB_OUTPUT',
      }
    ],
  ]
};

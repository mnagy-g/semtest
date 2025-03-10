const getIcon = (status) => {
  switch (status) {
    case 'passed':
      return ':white_check_mark:';
    case 'failed':
      return ':x:';
    default:
      return ':warning:';
  }
};

export const getSuitesReport = () => {
  const suites = [{
    "name": "UI Test - Alerts dashboard"
    , "passed": 2, "failed": 0, "failedTests": []
  }, {
    "name": "UI Test - Brand management",
    "passed": 5,
    "failed": 0,
    "failedTests": []
  }, {
    "name": "UI Test - Concerns",
    "passed": 6,
    "failed": 0,
    "failedTests": []
  }, {
    "name": "UI Test - Districts",
    "passed": 12,
    "failed": 0,
    "failedTests": []
  }, { "name": "UI Test - Workshop", "passed": 28, "failed": 0, "failedTests": [] }];

  return suites;
};

export const generateSummary = (summary, suites, total) => {
  summary.addRaw('# Tests Report', true);
  summary.addRaw(
    [
      `:clock3: 2min 15s`,
      `:information_source: ${total.passed + total.failed}`,
      `:white_check_mark: ${total.passed}`,
      `:x: ${total.failed}`,
    ].join('\t'),
    true,
  );

  summary.addSeparator();

  summary.write();
};

export const generateSlackMessage = (suites, total) => {
  const blocks = [];

  blocks.push({ type: 'header', text: { type: 'plain_text', text: 'E2E tests report' } });

  blocks.push({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: [
        `:clock3: 2min 15s`,
        `:information_source: ${total.passed + total.failed}`,
        `:white_check_mark: ${total.passed}`,
        `:x: ${total.failed}`,
      ].join('\t'),
    },
  });

  blocks.push({ type: 'divider' });

  return blocks;
};

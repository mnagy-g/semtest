import { getRawCommitsStream } from 'git-raw-commits';
import { parseCommitsStream } from 'conventional-commits-parser';
import { writeChangelogStream } from 'conventional-changelog-writer';
import createPreset from 'conventional-changelog-conventionalcommits';

export default async function doStuff(github, context) {
  const { repo, owner } = context.repo;

  const { data: release } = await github.rest.repos.getLatestRelease({
    owner,
    repo,
  });

  const preset = await createPreset();

  const commits = await new Promise((resolve, reject) => {
    const result = [];

    getRawCommitsStream({ from: release ? release.tag_name : '', to: 'v1.19.0' })
      .pipe(parseCommitsStream(preset.parser))
      .pipe(writeChangelogStream(undefined, preset.writer))
      .on('data', (data) => result.push(data))
      .on('end', () => resolve(result))
      .on('error', reject)
  });

  console.log(commits.join('\n'));
}

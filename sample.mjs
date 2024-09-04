import { getRawCommitsStream } from 'git-raw-commits';
import { parseCommitsStream } from 'conventional-commits-parser';
import { writeChangelogStream } from 'conventional-changelog-writer';
import createPreset from 'conventional-changelog-conventionalcommits';

export default async ({ github, context, tagName }) => {
  const { repo, owner } = context.repo;

  const { data: release } = await github.rest.repos.getLatestRelease({
    owner,
    repo,
  });

  const preset = await createPreset();

  const commits = await new Promise((resolve, reject) => {
    const result = [];

    getRawCommitsStream({ from: release ? release.tag_name : '', to: tagName })
      .pipe(parseCommitsStream(preset.parser))
      .pipe(writeChangelogStream(undefined, preset.writer))
      .on('data', (data) => result.push(data))
      .on('end', () => resolve(result))
      .on('error', reject)
  });

  await github.rest.repos.createRelease({
    owner,
    repo,
    name: tagName,
    tag_name: tagName,
    body: commits.join('\n')
  });
}

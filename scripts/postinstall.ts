import { spawnSync } from 'node:child_process';

const command = process.platform === 'win32' ? 'where.exe' : 'which';
const lookup = spawnSync(command, ['gbrain'], { stdio: 'ignore' });

if (lookup.status !== 0) {
  console.error('[gbrain] postinstall skipped. If installed via bun install -g github:...: run `gbrain doctor` and `gbrain apply-migrations --yes` manually. See https://github.com/garrytan/gbrain/issues/218');
  process.exit(0);
}

const migration = spawnSync('gbrain', ['apply-migrations', '--yes', '--non-interactive'], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

process.exit(migration.status ?? 1);


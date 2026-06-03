import {
  filesystem,
  fortunes,
  links,
  profile,
  projects,
  skills,
} from '../data/portfolioData';

export type ThemeName = 'green' | 'blue' | 'amber';

export type OutputTone = 'muted' | 'accent' | 'warning' | 'success';

export type OutputLine =
  | { type: 'text'; text: string; tone?: OutputTone }
  | { type: 'help'; groups: HelpGroup[] }
  | { type: 'list'; title?: string; items: string[] }
  | { type: 'table'; rows: Array<[string, string]> }
  | { type: 'links'; links: Array<{ label: string; url: string }> }
  | {
      type: 'projects';
      projects: typeof projects;
    }
  | {
      type: 'skills';
      skills: typeof skills;
    }
  | { type: 'pre'; text: string; tone?: OutputTone };

export type CommandResult = {
  lines: OutputLine[];
  action?: 'clear';
  theme?: ThemeName;
};

type HelpGroup = {
  title: string;
  commands: Array<{
    command: string;
    description: string;
  }>;
};

const commandGroups: HelpGroup[] = [
  {
    title: 'Core',
    commands: [
      { command: 'help', description: 'Show this command overview.' },
      { command: 'about', description: 'Professional profile and focus.' },
      { command: 'skills', description: 'Skills grouped by discipline.' },
      { command: 'projects', description: 'Portfolio project cards.' },
      { command: 'experience', description: 'Current role and background.' },
      { command: 'contact', description: 'Contact and profile links.' },
      { command: 'links', description: 'GitHub and LinkedIn.' },
    ],
  },
  {
    title: 'Filesystem',
    commands: [
      { command: 'ls', description: 'List available fake files.' },
      { command: 'cat about.txt', description: 'Read the about file.' },
      { command: 'cat skills.txt', description: 'Read the skills file.' },
      { command: 'cat projects.txt', description: 'Read the projects file.' },
      { command: 'cat contact.txt', description: 'Read the contact file.' },
    ],
  },
  {
    title: 'Terminal',
    commands: [
      { command: 'clear', description: 'Clear command output and keep the intro.' },
      { command: 'history', description: 'Show your local command history.' },
      { command: 'whoami', description: 'Print the active identity.' },
      { command: 'neofetch', description: 'Show system-style portfolio info.' },
      { command: 'theme green', description: 'Switch to the green accent theme.' },
      { command: 'theme blue', description: 'Switch to the blue accent theme.' },
      { command: 'theme amber', description: 'Switch to the amber accent theme.' },
    ],
  },
  {
    title: 'Lab',
    commands: [
      { command: 'fortune', description: 'Print a small engineering fortune.' },
      { command: 'cowsay', description: 'Classic terminal easter egg.' },
      { command: 'sudo', description: 'Try elevated permissions.' },
      { command: 'matrix', description: 'Show a clean packet-trace easter egg.' },
      { command: 'rm -rf /', description: 'Run a harmless fake safety check.' },
    ],
  },
];

const asciiLogo = String.raw`
 ____    _    ____ _____   ____   ___  _____ _     ____
| __ )  / \  |  _ \_   _| |  _ \ / _ \| ____| |   / ___|
|  _ \ / _ \ | |_) || |   | |_) | | | |  _| | |   \___ \
| |_) / ___ \|  _ < | |   |  _ <| |_| | |___| |___ ___) |
|____/_/   \_\_| \_\|_|   |_| \_\\___/|_____|_____|____/
`;

const cowsay = String.raw`
 _________________________________
< Engineering first. Noise last. >
 ---------------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
`;

const matrixTrace = [
  'trace: eth0 -> plc-segment -> historian -> dashboard',
  'packet: modbus/tcp metadata inspected',
  'signal: anomaly threshold nominal',
  'status: no drama, just observability',
];

export function createBootLines(): OutputLine[] {
  return [
    { type: 'pre', text: asciiLogo, tone: 'accent' },
    { type: 'text', text: 'Booting bartroels.be secure portfolio shell...', tone: 'muted' },
    { type: 'text', text: 'Loading OT security profile... ok', tone: 'success' },
    { type: 'text', text: 'Mounting fake filesystem... ok', tone: 'success' },
    {
      type: 'table',
      rows: [
        ['Name', profile.name],
        ['Role', `${profile.role} @ ${profile.company}`],
        ['Focus', 'OT Security / Automation / Networking'],
      ],
    },
    {
      type: 'text',
      text: 'Welcome to bartroels.be. Type help to inspect available commands.',
      tone: 'accent',
    },
  ];
}

export function runCommand(input: string, history: string[]): CommandResult {
  const trimmed = input.trim();
  const command = trimmed.toLowerCase();

  if (!trimmed) {
    return { lines: [] };
  }

  if (command.startsWith('theme')) {
    return handleTheme(command);
  }

  if (command.startsWith('cat ')) {
    return handleCat(trimmed);
  }

  if (command.startsWith('sudo')) {
    return {
      lines: [
        { type: 'text', text: 'Nice try. Permission denied.', tone: 'warning' },
        { type: 'text', text: 'This portfolio shell runs with least privilege by design.', tone: 'muted' },
      ],
    };
  }

  switch (command) {
    case 'help':
      return {
        lines: [{ type: 'help', groups: commandGroups }],
      };
    case 'about':
      return {
        lines: [
          { type: 'text', text: profile.about },
          {
            type: 'text',
            text: 'Use skills, projects or contact for a more focused view.',
            tone: 'muted',
          },
        ],
      };
    case 'skills':
      return { lines: [{ type: 'skills', skills }] };
    case 'projects':
      return { lines: [{ type: 'projects', projects }] };
    case 'experience':
      return {
        lines: [
          {
            type: 'table',
            rows: [
              ['Current role', `${profile.role} @ ${profile.company}`],
              ['Background', 'Infrastructure engineering, networking and software automation'],
              ['Engineering style', 'Practical tooling, readable dashboards and reliable systems'],
              ['Interests', 'OT security, industrial networks, AI, data pipelines and monitoring'],
            ],
          },
        ],
      };
    case 'contact':
      return {
        lines: [
          { type: 'links', links },
          { type: 'text', text: `Mail placeholder: ${profile.email}`, tone: 'muted' },
        ],
      };
    case 'links':
      return { lines: [{ type: 'links', links }] };
    case 'clear':
      return { lines: [], action: 'clear' };
    case 'whoami':
      return {
        lines: [
          { type: 'text', text: `${profile.name} - ${profile.role} @ ${profile.company}` },
          { type: 'text', text: profile.tagline, tone: 'muted' },
        ],
      };
    case 'ls':
      return {
        lines: [
          {
            type: 'pre',
            text: Object.keys(filesystem).join('    '),
            tone: 'accent',
          },
        ],
      };
    case 'history':
      return {
        lines: [
          {
            type: 'list',
            title: 'Command history',
            items: history.length ? history.map((item, index) => `${index + 1}. ${item}`) : ['No commands yet.'],
          },
        ],
      };
    case 'neofetch':
      return {
        lines: [
          { type: 'pre', text: asciiLogo, tone: 'accent' },
          {
            type: 'table',
            rows: [
              ['OS', 'bartroels.be'],
              ['Role', profile.role],
              ['Company', profile.company],
              ['Focus', 'OT Security / Automation / Networking'],
              ['Location', profile.location],
              ['Shell', 'portfolio-terminal'],
            ],
          },
        ],
      };
    case 'fortune':
      return {
        lines: [
          {
            type: 'text',
            text: fortunes[Math.floor(Math.random() * fortunes.length)],
            tone: 'accent',
          },
        ],
      };
    case 'cowsay':
      return { lines: [{ type: 'pre', text: cowsay, tone: 'muted' }] };
    case 'matrix':
      return {
        lines: [
          { type: 'text', text: 'Entering packet trace mode...', tone: 'accent' },
          ...matrixTrace.map<OutputLine>((text) => ({ type: 'text', text, tone: 'muted' })),
        ],
      };
    case 'rm -rf /':
      return {
        lines: [
          { type: 'text', text: 'Simulating destructive command...', tone: 'warning' },
          { type: 'text', text: 'Permission denied. Filesystem is fake and read-only.', tone: 'success' },
          { type: 'text', text: 'Recovery status: nothing happened.', tone: 'muted' },
        ],
      };
    default:
      return {
        lines: [
          {
            type: 'text',
            text: `Command not found: ${trimmed}`,
            tone: 'warning',
          },
          { type: 'text', text: 'Type help for available commands.', tone: 'muted' },
        ],
      };
  }
}

function handleCat(input: string): CommandResult {
  const fileName = input.slice(4).trim().toLowerCase();
  const lines = filesystem[fileName];

  if (!lines) {
    return {
      lines: [
        { type: 'text', text: `cat: ${fileName || '<empty>'}: No such file`, tone: 'warning' },
        { type: 'text', text: 'Use ls to list available files.', tone: 'muted' },
      ],
    };
  }

  return {
    lines: lines.map<OutputLine>((text) => ({ type: 'text', text })),
  };
}

function handleTheme(command: string): CommandResult {
  const [, selected] = command.split(/\s+/);
  const allowedThemes: ThemeName[] = ['green', 'blue', 'amber'];

  if (!selected) {
    return {
      lines: [
        { type: 'text', text: 'Usage: theme green | theme blue | theme amber', tone: 'muted' },
      ],
    };
  }

  if (!allowedThemes.includes(selected as ThemeName)) {
    return {
      lines: [
        { type: 'text', text: `Unknown theme: ${selected}`, tone: 'warning' },
        { type: 'text', text: 'Available themes: green, blue, amber', tone: 'muted' },
      ],
    };
  }

  return {
    theme: selected as ThemeName,
    lines: [
      {
        type: 'text',
        text: `Theme switched to ${selected}.`,
        tone: 'success',
      },
    ],
  };
}

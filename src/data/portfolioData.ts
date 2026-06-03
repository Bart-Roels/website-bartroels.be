export type SkillCategory = {
  name: string;
  items: string[];
};

export type Project = {
  name: string;
  status: 'active' | 'concept' | 'lab';
  summary: string;
  stack: string[];
};

export type LinkItem = {
  label: string;
  url: string;
};

export const profile = {
  name: 'Bart Roels',
  role: 'Project Engineer OT Cyber Security',
  company: 'Equans',
  location: 'Belgium',
  promptUser: 'bart',
  promptHost: 'portfolio',
  tagline:
    'Automation-driven engineer with a passion for IT, networking and cyber security.',
  about:
    "I'm Bart Roels, a Project Engineer OT Cyber Security at Equans. I'm driven by automation, engineering and the challenge of connecting IT, networking and cyber security in practical, reliable solutions. I enjoy building tools, dashboards, scripts and systems that make complex technical environments easier to understand, monitor and improve. My interests include OT security, industrial networks, infrastructure, data pipelines, AI-assisted workflows and automation.",
  email: 'hello@bartroels.be',
};

export const skills: SkillCategory[] = [
  {
    name: 'OT Cyber Security',
    items: [
      'Industrial network security',
      'Asset visibility and segmentation',
      'Secure remote access concepts',
      'Practical risk reduction in operational environments',
    ],
  },
  {
    name: 'Networking',
    items: [
      'Infrastructure engineering',
      'Routing and switching fundamentals',
      'Network troubleshooting',
      'Reliable connectivity for industrial systems',
    ],
  },
  {
    name: 'Automation',
    items: [
      'PowerShell and scripting workflows',
      'Process automation',
      'Tooling for repetitive engineering tasks',
      'API-driven integrations',
    ],
  },
  {
    name: 'Web Development',
    items: [
      'React and TypeScript interfaces',
      'Dashboard design',
      'Clean frontend architecture',
      'Static site delivery',
    ],
  },
  {
    name: 'Data / AI',
    items: [
      'Data pipelines',
      'AI-assisted workflows',
      'Technical reporting',
      'Structured data transformation',
    ],
  },
  {
    name: 'Monitoring / Dashboards',
    items: [
      'Operational visibility',
      'Telemetry-driven dashboards',
      'Alerting concepts',
      'Readable status and health views',
    ],
  },
];

export const projects: Project[] = [
  {
    name: 'OT Visibility Dashboard',
    status: 'concept',
    summary:
      'A dashboard concept for making industrial network assets, status and security signals easier to inspect.',
    stack: ['React', 'TypeScript', 'APIs', 'Monitoring'],
  },
  {
    name: 'Automation Script Toolkit',
    status: 'lab',
    summary:
      'Reusable scripts and workflows that reduce repetitive infrastructure and engineering tasks.',
    stack: ['PowerShell', 'Automation', 'Documentation'],
  },
  {
    name: 'Network Health Console',
    status: 'concept',
    summary:
      'Terminal-inspired status views for connectivity, inventory and operational checks.',
    stack: ['Networking', 'Telemetry', 'Dashboards'],
  },
  {
    name: 'AI-Assisted Engineering Workflows',
    status: 'active',
    summary:
      'Experiments with structured prompts, data transformation and engineering productivity workflows.',
    stack: ['AI', 'Data pipelines', 'Process design'],
  },
];

export const links: LinkItem[] = [
  {
    label: 'GitHub',
    url: 'https://github.com/Bart-Roels',
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/bart-roels/',
  },
];

export const filesystem: Record<string, string[]> = {
  'about.txt': [
    profile.about,
  ],
  'skills.txt': skills.map(
    (category) => `${category.name}: ${category.items.join(', ')}`,
  ),
  'projects.txt': projects.map(
    (project) =>
      `${project.name} [${project.status}] - ${project.summary} Stack: ${project.stack.join(', ')}`,
  ),
  'contact.txt': [
    `GitHub: ${links[0].url}`,
    `LinkedIn: ${links[1].url}`,
    `Mail: ${profile.email}`,
  ],
};

export const fortunes = [
  'Reliable automation beats heroic manual recovery.',
  'The best alert is the one that tells you exactly what changed.',
  'Document the fix while the context is still warm.',
  'Industrial systems reward calm, boring reliability.',
  'Measure twice, deploy once, monitor always.',
  'Security improves fastest when engineering and operations share the same view.',
];

import type { OutputLine, OutputTone } from '../lib/commands';

type CommandOutputProps = {
  line: OutputLine;
};

export function CommandOutput({ line }: CommandOutputProps) {
  switch (line.type) {
    case 'text':
      return <p className={toneClass(line.tone)}>{line.text}</p>;
    case 'pre':
      return <pre className={toneClass(line.tone)}>{line.text}</pre>;
    case 'help':
      return (
        <div className="help-panel">
          {line.groups.map((group) => (
            <section key={group.title} className="help-group">
              <h3>{group.title}</h3>
              <ul>
                {group.commands.map((item) => (
                  <li key={item.command}>
                    <code>{item.command}</code>
                    <span>{item.description}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      );
    case 'list':
      return (
        <div className="output-group">
          {line.title ? <p className="output-title">{line.title}</p> : null}
          <ul className="command-list">
            {line.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      );
    case 'table':
      return (
        <dl className="info-table">
          {line.rows.map(([label, value]) => (
            <div key={label} className="info-row">
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      );
    case 'links':
      return (
        <div className="link-list">
          {line.links.map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
              {link.label}
              <span>{link.url}</span>
            </a>
          ))}
        </div>
      );
    case 'skills':
      return (
        <div className="skill-grid">
          {line.skills.map((category) => (
            <article key={category.name} className="terminal-card">
              <h3>{category.name}</h3>
              <ul>
                {category.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      );
    case 'projects':
      return (
        <div className="project-grid">
          {line.projects.map((project) => (
            <article key={project.name} className="terminal-card">
              <div className="card-heading">
                <h3>{project.name}</h3>
                <span>{project.status}</span>
              </div>
              <p>{project.summary}</p>
              <div className="stack-list">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      );
  }
}

function toneClass(tone?: OutputTone) {
  return tone ? `output-line output-${tone}` : 'output-line';
}

import { useEffect, useMemo, useRef, useState } from 'react';
import { CommandInput } from './CommandInput';
import { CommandOutput } from './CommandOutput';
import { profile } from '../data/portfolioData';
import {
  createBootLines,
  runCommand,
  type OutputLine,
  type ThemeName,
} from '../lib/commands';

type Entry =
  | {
      id: string;
      kind: 'system';
      lines: OutputLine[];
    }
  | {
      id: string;
      kind: 'command';
      command: string;
      lines: OutputLine[];
    };

const HISTORY_KEY = 'bartroels-terminal-history';
const THEME_KEY = 'bartroels-terminal-theme';

export function Terminal() {
  const [entries, setEntries] = useState<Entry[]>(() => [createSystemEntry()]);
  const [history, setHistory] = useState<string[]>(() => loadHistory());
  const [theme, setTheme] = useState<ThemeName>(() => loadTheme());
  const [startedAt] = useState(() => Date.now());
  const [uptime, setUptime] = useState('00:00');
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  const prompt = useMemo(
    () => `${profile.promptUser}@${profile.promptHost}:~$`,
    [],
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(-60)));
  }, [history]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
      const seconds = (elapsed % 60).toString().padStart(2, '0');
      setUptime(`${minutes}:${seconds}`);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [startedAt]);

  useEffect(() => {
    terminalBodyRef.current?.scrollTo({
      top: terminalBodyRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [entries]);

  function handleCommand(command: string) {
    const normalized = command.trim();
    const nextHistory = normalized ? [...history, normalized].slice(-60) : history;
    const result = runCommand(normalized, nextHistory);

    if (result.theme) {
      setTheme(result.theme);
    }

    if (result.action === 'clear') {
      setEntries([createSystemEntry()]);
      setHistory(nextHistory);
      return;
    }

    setEntries((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        kind: 'command',
        command,
        lines: result.lines,
      },
    ]);
    setHistory(nextHistory);
  }

  return (
    <div className="terminal-window" onClick={() => focusInput()}>
      <header className="terminal-header">
        <div className="window-controls" aria-hidden="true">
          <span className="control close" />
          <span className="control minimize" />
          <span className="control maximize" />
        </div>
        <div className="terminal-tabs" role="tablist" aria-label="Terminal sessions">
          <button className="terminal-tab active" type="button">
            portfolio.sh
          </button>
          <button className="terminal-tab" type="button">
            ot-security.log
          </button>
        </div>
        <div className="terminal-host">bartroels.be</div>
      </header>

      <div className="terminal-body" ref={terminalBodyRef}>
        {entries.map((entry) => (
          <section key={entry.id} className="terminal-entry">
            {entry.kind === 'command' ? (
              <p className="command-echo">
                <span>{prompt}</span> {entry.command}
              </p>
            ) : null}
            <div className="entry-output">
              {entry.lines.map((line, index) => (
                <CommandOutput key={`${entry.id}-${index}`} line={line} />
              ))}
            </div>
          </section>
        ))}
        <CommandInput prompt={prompt} history={history} onSubmit={handleCommand} />
      </div>

      <footer className="status-bar">
        <span>uptime {uptime}</span>
        <span>{profile.role}</span>
        <span>{profile.location}</span>
        <span>theme {theme}</span>
      </footer>
    </div>
  );
}

function createSystemEntry(): Entry {
  return {
    id: crypto.randomUUID(),
    kind: 'system',
    lines: createBootLines(),
  };
}

function focusInput() {
  document.getElementById('terminal-input')?.focus();
}

function loadHistory(): string[] {
  try {
    const saved = localStorage.getItem(HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function loadTheme(): ThemeName {
  const saved = localStorage.getItem(THEME_KEY);
  return saved === 'blue' || saved === 'amber' || saved === 'green' ? saved : 'green';
}

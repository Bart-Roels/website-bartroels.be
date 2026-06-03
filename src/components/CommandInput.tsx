import { KeyboardEvent, useEffect, useRef, useState } from 'react';

type CommandInputProps = {
  prompt: string;
  history: string[];
  onSubmit: (command: string) => void;
};

export function CommandInput({ prompt, history, onSubmit }: CommandInputProps) {
  const [value, setValue] = useState('');
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSubmit(value);
      setValue('');
      setHistoryIndex(null);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!history.length) return;

      const nextIndex =
        historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setValue(history[nextIndex]);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndex === null) return;

      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(null);
        setValue('');
        return;
      }

      setHistoryIndex(nextIndex);
      setValue(history[nextIndex]);
    }
  }

  return (
    <form
      className="command-input-row"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(value);
        setValue('');
        setHistoryIndex(null);
      }}
    >
      <label className="terminal-prompt" htmlFor="terminal-input">
        {prompt}
      </label>
      <input
        ref={inputRef}
        id="terminal-input"
        autoComplete="off"
        autoCapitalize="none"
        spellCheck={false}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Terminal command input"
      />
    </form>
  );
}

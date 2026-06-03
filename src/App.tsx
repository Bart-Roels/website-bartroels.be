import { Terminal } from './components/Terminal';

export default function App() {
  return (
    <main className="app-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <section className="terminal-stage" aria-label="Bart Roels portfolio terminal">
        <Terminal />
      </section>
    </main>
  );
}

import styles from './SearchBar.module.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
  total: number;
  loading: boolean;
}

export function SearchBar({ value, onChange, total, loading }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrap}>
        <svg className={styles.icon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          className={styles.input}
          type="text"
          placeholder="Поиск по имени..."
          value={value}
          onChange={e => onChange(e.target.value)}
          autoComplete="off"
          spellCheck={false}
        />
        {value && (
          <button className={styles.clear} onClick={() => onChange('')} aria-label="Очистить">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}
      </div>
      <span className={styles.count}>
        {loading ? 'Загрузка...' : `Найдено пользователей: ${total}`}
      </span>
    </div>
  );
}

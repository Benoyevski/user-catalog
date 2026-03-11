import { useUsers } from './hooks/useUsers';
import { UserCard } from './components/UserCard';
import { SearchBar } from './components/SearchBar';
import { Pagination } from './components/Pagination';
import styles from './App.module.css';

export default function App() {
  const { users, total, page, loading, error, query, setQuery, setPage, totalPages } = useUsers();

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.title}>
            <h1>Каталог пользователей</h1>
            <span className={styles.subtitle}>Просматривайте и ищите пользователей в нашем каталоге</span>
          </div>
          <SearchBar value={query} onChange={setQuery} total={total} loading={loading} />
        </div>
      </header>

      <main className={styles.main}>
        {error && (
          <div className={styles.error}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </div>
        )}

        {loading && !users.length ? (
          <div className={styles.grid}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={styles.skeleton} />
            ))}
          </div>
        ) : users.length === 0 && !loading ? (
          <div className={styles.empty}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
            </svg>
            <p>Пользователи не найдены{query ? ` по запросу «${query}»` : ''}</p>
          </div>
        ) : (
          <div className={`${styles.grid} ${loading ? styles.dimmed : ''}`}>
            {users.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}

        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </main>
    </div>
  );
}

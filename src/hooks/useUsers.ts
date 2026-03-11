import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchUsers, searchUsers } from '../api/users';
import type { User } from '../types';

const PAGE_SIZE = 12;

interface UseUsersReturn {
  users: User[];
  total: number;
  page: number;
  loading: boolean;
  error: string | null;
  query: string;
  setQuery: (q: string) => void;
  setPage: (p: number) => void;
  totalPages: number;
}

export function useUsers(): UseUsersReturn {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQueryRaw] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const setQuery = useCallback((q: string) => {
    setQueryRaw(q);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(q);
      setPage(1);
    }, 350);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const skip = (page - 1) * PAGE_SIZE;
    const request = debouncedQuery
      ? searchUsers(debouncedQuery, PAGE_SIZE, skip)
      : fetchUsers(PAGE_SIZE, skip);

    request
      .then(data => {
        if (!cancelled) {
          setUsers(data.users);
          setTotal(data.total);
        }
      })
      .catch(err => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [debouncedQuery, page]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return { users, total, page, loading, error, query, setQuery, setPage, totalPages };
}

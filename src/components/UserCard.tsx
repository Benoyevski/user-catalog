import type { User } from '../types';
import styles from './UserCard.module.css';

interface Props {
  user: User;
}

export function UserCard({ user }: Props) {
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <article className={styles.card}>
      <div className={styles.avatar}>
        <img src={user.image} alt={fullName} loading="lazy" />
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{fullName}</h3>
        <span className={styles.username}>@{user.username}</span>
        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <span className={styles.metaLabel}>Почта</span>
            {user.email}
          </span>
          <span className={styles.metaItem}>
            <span className={styles.metaLabel}>Тел.</span>
            {user.phone}
          </span>
          <span className={styles.metaItem}>
            <span className={styles.metaLabel}>Город</span>
            {user.address.city}, {user.address.country}
          </span>
        </div>
        <div className={styles.company}>
          <span className={styles.jobTitle}>{user.company.title}</span>
          <span className={styles.companyName}>{user.company.name}</span>
        </div>
      </div>
      <div className={styles.badge}>
        {user.age} · {user.gender === 'male' ? 'М' : 'Ж'}
      </div>
    </article>
  );
}

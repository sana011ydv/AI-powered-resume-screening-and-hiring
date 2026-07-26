import { Bell, Search } from 'lucide-react';
import styles from './Topbar.module.css';

const Topbar = () => {
  return (
    <header className={styles.topbar}>
      <div className={styles.searchContainer}>
        <Search className={styles.searchIcon} size={20} />
        <input 
          type="text" 
          placeholder="Search candidates, jobs..." 
          className={styles.searchInput}
        />
      </div>

      <div className={styles.actions}>
        <button className={styles.iconButton}>
          <Bell size={20} />
          <span className={styles.badge}></span>
        </button>
        <div className={styles.profile}>
          <img 
            src="https://ui-avatars.com/api/?name=Admin+User&background=2563eb&color=fff" 
            alt="Profile" 
            className={styles.avatar}
          />
          <div className={styles.profileInfo}>
            <span className={styles.name}>Jane Doe</span>
            <span className={styles.role}>HR Manager</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;

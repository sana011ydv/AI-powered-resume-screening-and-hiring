import { useState, useEffect } from 'react';
import { User, Settings as SettingsIcon, Webhook, Key, Mail, Calendar, Database, Moon, Sun, Save } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import styles from './Settings.module.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isDark, setIsDark] = useState(false);

  // Check initial theme
  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className={styles.formGroupList}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>First Name</label>
                <input type="text" defaultValue="Jane" className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label>Last Name</label>
                <input type="text" defaultValue="Doe" className={styles.input} />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Email Address</label>
              <input type="email" defaultValue="jane.doe@screensmart.ai" className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label>Company Name</label>
              <input type="text" defaultValue="ScreenSmart Inc." className={styles.input} />
            </div>
            <div className={styles.themeToggleRow}>
              <div>
                <h4>Dark Mode</h4>
                <p>Toggle the appearance of the application.</p>
              </div>
              <Button variant="outline" onClick={toggleTheme}>
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </Button>
            </div>
          </div>
        );
      
      case 'integrations':
        return (
          <div className={styles.integrationList}>
            <Card className={styles.integrationCard}>
              <div className={styles.integrationHeader}>
                <div className={styles.integrationIcon} style={{ background: '#10a37f20', color: '#10a37f' }}>
                  <Key size={24} />
                </div>
                <div className={styles.integrationInfo}>
                  <h4>OpenAI API</h4>
                  <p>Used for AI resume screening and insights.</p>
                </div>
                <Badge variant="success">Connected</Badge>
              </div>
              <div className={styles.integrationAction}>
                <input type="password" value="sk-........................" readOnly className={styles.input} />
                <Button variant="outline">Edit</Button>
              </div>
            </Card>

            <Card className={styles.integrationCard}>
              <div className={styles.integrationHeader}>
                <div className={styles.integrationIcon} style={{ background: '#ea433520', color: '#ea4335' }}>
                  <Mail size={24} />
                </div>
                <div className={styles.integrationInfo}>
                  <h4>Gmail</h4>
                  <p>Send interview invitations to candidates.</p>
                </div>
                <Badge variant="success">Connected</Badge>
              </div>
              <div className={styles.integrationAction}>
                <span className={styles.integrationText}>jane.doe@screensmart.ai</span>
                <Button variant="outline">Disconnect</Button>
              </div>
            </Card>

            <Card className={styles.integrationCard}>
              <div className={styles.integrationHeader}>
                <div className={styles.integrationIcon} style={{ background: '#4285f420', color: '#4285f4' }}>
                  <Calendar size={24} />
                </div>
                <div className={styles.integrationInfo}>
                  <h4>Google Calendar</h4>
                  <p>Sync interviews and find available slots.</p>
                </div>
                <Badge variant="warning">Syncing...</Badge>
              </div>
              <div className={styles.integrationAction}>
                <span className={styles.integrationText}>jane.doe@screensmart.ai</span>
                <Button variant="outline">Reconnect</Button>
              </div>
            </Card>

            <Card className={styles.integrationCard}>
              <div className={styles.integrationHeader}>
                <div className={styles.integrationIcon} style={{ background: '#34a85320', color: '#34a853' }}>
                  <Database size={24} />
                </div>
                <div className={styles.integrationInfo}>
                  <h4>Google Sheets</h4>
                  <p>Export candidate data automatically.</p>
                </div>
                <Badge variant="neutral">Not Connected</Badge>
              </div>
              <div className={styles.integrationAction}>
                <Button>Connect Sheets</Button>
              </div>
            </Card>
          </div>
        );

      case 'webhooks':
        return (
          <div className={styles.formGroupList}>
            <div className={styles.webhookStatus}>
              <div className={styles.statusIndicator}>
                <div className={styles.statusDot} style={{ background: 'var(--color-success)' }} />
                <span>Webhook endpoint is healthy (n8n integration active)</span>
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label>Resume Screening Endpoint URL (POST)</label>
              <div className={styles.inputWithBtn}>
                <input type="text" defaultValue="https://shaaniyada011zf.app.n8n.cloud/webhook-test/Resume-screening/" className={styles.input} />
                <Button variant="outline">Test</Button>
              </div>
              <p className={styles.helpText}>This webhook is triggered when a new JD and resumes are uploaded.</p>
            </div>
            
            <div className={styles.formGroup}>
              <label>Webhook Secret Key</label>
              <input type="password" defaultValue="whsec_1234567890abcdef" className={styles.input} />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>Manage your account preferences and integrations.</p>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.sidebar}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'general' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('general')}
          >
            <User size={18} /> General Profile
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'integrations' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('integrations')}
          >
            <SettingsIcon size={18} /> Integrations (AI/Email)
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'webhooks' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('webhooks')}
          >
            <Webhook size={18} /> Webhooks (n8n)
          </button>
        </div>

        <Card className={styles.contentArea}>
          <div className={styles.contentHeader}>
            <h3>
              {activeTab === 'general' && 'General Profile'}
              {activeTab === 'integrations' && 'Integrations'}
              {activeTab === 'webhooks' && 'Webhook Configuration'}
            </h3>
            <Button size="sm"><Save size={16} /> Save Changes</Button>
          </div>
          
          <div className={styles.tabContent}>
            {renderTabContent()}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;

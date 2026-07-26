import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import styles from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.formContainer}
        >
          <div className={styles.header}>
            <div className={styles.logoIcon}>SA</div>
            <h2>Welcome back</h2>
            <p>Enter your details to access ScreenSmart AI.</p>
          </div>

          <form onSubmit={handleLogin} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Email</label>
              <div className={styles.inputWrapper}>
                <Mail className={styles.inputIcon} size={18} />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Password</label>
              <div className={styles.inputWrapper}>
                <Lock className={styles.inputIcon} size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className={styles.forgotPassword}>
              <a href="#">Forgot password?</a>
            </div>

            <Button type="submit" fullWidth size="lg">
              Sign In <ArrowRight size={18} />
            </Button>
            
            <div className={styles.divider}>
              <span>or</span>
            </div>

            <Button type="button" variant="outline" fullWidth size="lg" className={styles.googleBtn}>
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} />
              Continue with Google
            </Button>
          </form>
        </motion.div>
      </div>
      
      <div className={styles.rightPanel}>
        <div className={styles.glassCard}>
          <Card glass className={styles.promoCard}>
            <h3>AI-Powered Recruitment</h3>
            <p>Screen hundreds of resumes in seconds. Let our AI find the perfect fit for your open roles.</p>
            <div className={styles.statsRow}>
              <div className={styles.stat}>
                <h4>98%</h4>
                <span>Accuracy</span>
              </div>
              <div className={styles.stat}>
                <h4>10x</h4>
                <span>Faster</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;

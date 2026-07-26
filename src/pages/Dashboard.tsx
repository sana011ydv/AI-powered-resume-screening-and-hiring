import { motion, type Variants } from 'framer-motion';
import { 
  Users, 
  UserCheck, 
  UserPlus, 
  UserMinus, 
  Calendar,
  Clock,
  Briefcase,
  TrendingUp,
  BrainCircuit,
  ArrowUpRight
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import styles from './Dashboard.module.css';

// Dummy Data
const scoreData = [
  { name: '90-100', count: 12 },
  { name: '80-89', count: 25 },
  { name: '70-79', count: 42 },
  { name: '60-69', count: 18 },
  { name: '<60', count: 5 },
];

const distributionData = [
  { name: 'Strong Fit', value: 35, color: 'var(--color-success)' },
  { name: 'Possible Fit', value: 45, color: 'var(--color-warning)' },
  { name: 'Not Fit', value: 20, color: 'var(--color-danger)' },
];

const activityData = [
  { id: 1, type: 'upload', text: 'Sarah Jenkins uploaded 15 resumes for Frontend Developer', time: '10 mins ago', icon: Briefcase, color: 'var(--color-primary)' },
  { id: 2, type: 'ai', text: 'AI completed screening for Backend Engineer role', time: '1 hour ago', icon: BrainCircuit, color: 'var(--color-secondary)' },
  { id: 3, type: 'interview', text: 'Interview scheduled with Michael Chen', time: '2 hours ago', icon: Calendar, color: 'var(--color-success)' },
  { id: 4, type: 'email', text: 'Rejection emails sent to 5 candidates', time: '3 hours ago', icon: Clock, color: 'var(--color-text-muted)' },
];

const scheduleData = [
  { id: 1, candidate: 'Emily Davis', role: 'UX Designer', time: '10:00 AM', type: 'Technical' },
  { id: 2, candidate: 'James Wilson', role: 'Frontend Dev', time: '11:30 AM', type: 'Cultural Fit' },
  { id: 3, candidate: 'Anna Smith', role: 'Product Manager', time: '02:00 PM', type: 'Final Round' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
};

const KPICard = ({ title, value, icon: Icon, trend, colorClass }: any) => (
  <motion.div variants={itemVariants}>
    <Card className={styles.kpiCard}>
      <div className={styles.kpiHeader}>
        <div className={`${styles.iconWrapper} ${colorClass}`}>
          <Icon size={24} />
        </div>
        <span className={styles.trend}>
          <TrendingUp size={16} /> {trend}
        </span>
      </div>
      <div className={styles.kpiBody}>
        <h3>{value}</h3>
        <p>{title}</p>
      </div>
    </Card>
  </motion.div>
);

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Overview</h1>
          <p className={styles.subtitle}>Welcome back! Here's what's happening with your hiring process.</p>
        </div>
        <Button>
          <UserPlus size={18} /> Add New Job
        </Button>
      </div>

      <motion.div 
        className={styles.kpiGrid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <KPICard title="Total Candidates" value="2,845" icon={Users} trend="+12%" colorClass={styles.primaryIcon} />
        <KPICard title="Strong Fit" value="842" icon={UserCheck} trend="+5%" colorClass={styles.successIcon} />
        <KPICard title="Possible Fit" value="1,204" icon={UserPlus} trend="+2%" colorClass={styles.warningIcon} />
        <KPICard title="Not Fit" value="799" icon={UserMinus} trend="-3%" colorClass={styles.dangerIcon} />
        <KPICard title="Interviews" value="156" icon={Calendar} trend="+18%" colorClass={styles.secondaryIcon} />
      </motion.div>

      <div className={styles.mainGrid}>
        <div className={styles.chartsColumn}>
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <Card className={styles.chartCard}>
              <div className={styles.cardHeader}>
                <h3>AI Resume Scores</h3>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              <div className={styles.chartWrapper}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scoreData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
                    <Tooltip cursor={{ fill: 'var(--color-bg-main)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                    <Bar dataKey="count" fill="url(#colorGradient)" radius={[4, 4, 0, 0]} />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={1}/>
                        <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          <div className={styles.splitGrid}>
            <motion.div variants={itemVariants} initial="hidden" animate="visible">
              <Card className={styles.chartCard}>
                <div className={styles.cardHeader}>
                  <h3>Candidate Distribution</h3>
                </div>
                <div className={styles.chartWrapper}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={distributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {distributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className={styles.legend}>
                    {distributionData.map((item, i) => (
                      <div key={i} className={styles.legendItem}>
                        <div className={styles.legendDot} style={{ backgroundColor: item.color }} />
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} initial="hidden" animate="visible">
              <Card className={styles.chartCard} glass>
                <div className={styles.cardHeader}>
                  <h3 className={styles.aiTitle}><BrainCircuit size={20} className="text-gradient" /> AI Insights</h3>
                </div>
                <div className={styles.insightsList}>
                  <div className={styles.insightItem}>
                    <div className={styles.insightBullet} />
                    <p><strong>Frontend Developers</strong> have a 25% higher match rate this week.</p>
                  </div>
                  <div className={styles.insightItem}>
                    <div className={styles.insightBullet} />
                    <p>Candidates lacking <em>React</em> experience are scoring below 60.</p>
                  </div>
                  <div className={styles.insightItem}>
                    <div className={styles.insightBullet} />
                    <p>Time-to-hire has decreased by 4 days using AI screening.</p>
                  </div>
                </div>
                <Button variant="outline" fullWidth className={styles.insightBtn}>
                  View Full Report <ArrowUpRight size={16} />
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>

        <div className={styles.sideColumn}>
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <Card className={styles.listCard}>
              <div className={styles.cardHeader}>
                <h3>Upcoming Interviews</h3>
                <Button variant="ghost" size="sm">Schedule</Button>
              </div>
              <div className={styles.scheduleList}>
                {scheduleData.map(item => (
                  <div key={item.id} className={styles.scheduleItem}>
                    <div className={styles.scheduleTime}>
                      <Clock size={14} /> {item.time}
                    </div>
                    <div className={styles.scheduleInfo}>
                      <h4>{item.candidate}</h4>
                      <p>{item.role} &bull; {item.type}</p>
                    </div>
                    <Button variant="outline" size="sm">Join</Button>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <Card className={styles.listCard}>
              <div className={styles.cardHeader}>
                <h3>Recent Activity</h3>
              </div>
              <div className={styles.timeline}>
                {activityData.map((item, index) => (
                  <div key={item.id} className={styles.timelineItem}>
                    <div className={styles.timelineLine} style={{ display: index === activityData.length - 1 ? 'none' : 'block' }} />
                    <div className={styles.timelineIcon} style={{ color: item.color, backgroundColor: `${item.color}20` }}>
                      <item.icon size={16} />
                    </div>
                    <div className={styles.timelineContent}>
                      <p>{item.text}</p>
                      <span>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

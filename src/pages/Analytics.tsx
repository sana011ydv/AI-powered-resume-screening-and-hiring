
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { Target, Users, TrendingUp, Activity } from 'lucide-react';
import { Card } from '../components/ui/Card';
import styles from './Analytics.module.css';

const hiringFunnelData = [
  { stage: 'Resumes Screened', count: 1200 },
  { stage: 'Strong Fit', count: 400 },
  { stage: 'Interviewed', count: 150 },
  { stage: 'Offers Extended', count: 25 },
  { stage: 'Hired', count: 18 },
];

const topSkillsData = [
  { skill: 'React', count: 450 },
  { skill: 'TypeScript', count: 380 },
  { skill: 'Node.js', count: 310 },
  { skill: 'AWS', count: 220 },
  { skill: 'Python', count: 180 },
];

const missingSkillsData = [
  { skill: 'GraphQL', count: 280 },
  { skill: 'Docker', count: 210 },
  { skill: 'Kubernetes', count: 150 },
  { skill: 'Figma', count: 120 },
  { skill: 'Rust', count: 90 },
];

const scoreTrendData = [
  { month: 'Jan', avgScore: 65 },
  { month: 'Feb', avgScore: 68 },
  { month: 'Mar', avgScore: 72 },
  { month: 'Apr', avgScore: 71 },
  { month: 'May', avgScore: 75 },
  { month: 'Jun', avgScore: 79 },
];

const KPICard = ({ title, value, subValue, icon: Icon, color }: any) => (
  <Card className={styles.kpiCard}>
    <div className={styles.kpiIconWrapper} style={{ backgroundColor: `${color}20`, color }}>
      <Icon size={24} />
    </div>
    <div className={styles.kpiContent}>
      <p className={styles.kpiTitle}>{title}</p>
      <h3 className={styles.kpiValue}>{value}</h3>
      <span className={styles.kpiSubValue} style={{ color: subValue.startsWith('+') ? 'var(--color-success)' : 'var(--color-danger)' }}>
        {subValue} from last month
      </span>
    </div>
  </Card>
);

const Analytics = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Analytics & Reporting</h1>
        <p className={styles.subtitle}>Deep dive into your hiring metrics and AI performance.</p>
      </div>

      <div className={styles.kpiGrid}>
        <KPICard title="Average AI Score" value="74.5" subValue="+2.1%" icon={Activity} color="var(--color-primary)" />
        <KPICard title="Time to Hire" value="18 Days" subValue="-4 Days" icon={TrendingUp} color="var(--color-success)" />
        <KPICard title="Offer Acceptance" value="82%" subValue="+5%" icon={Target} color="var(--color-warning)" />
        <KPICard title="Total Processed" value="12,450" subValue="+1,200" icon={Users} color="var(--color-secondary)" />
      </div>

      <div className={styles.mainGrid}>
        <Card className={styles.chartCard}>
          <div className={styles.cardHeader}>
            <h3>Hiring Funnel</h3>
          </div>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hiringFunnelData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorFunnel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="stage" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorFunnel)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className={styles.chartCard}>
          <div className={styles.cardHeader}>
            <h3>Average Candidate Score Trend</h3>
          </div>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scoreTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} domain={[50, 100]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="avgScore" stroke="var(--color-secondary)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className={styles.mainGrid}>
        <Card className={styles.chartCard}>
          <div className={styles.cardHeader}>
            <h3>Top Matched Skills</h3>
          </div>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={topSkillsData} margin={{ top: 0, right: 10, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-border)" />
                <XAxis type="number" axisLine={false} tickLine={false} />
                <YAxis dataKey="skill" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip cursor={{ fill: 'var(--color-bg-main)' }} />
                <Bar dataKey="count" fill="var(--color-success)" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className={styles.chartCard}>
          <div className={styles.cardHeader}>
            <h3>Most Missing Skills</h3>
          </div>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={missingSkillsData} margin={{ top: 0, right: 10, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-border)" />
                <XAxis type="number" axisLine={false} tickLine={false} />
                <YAxis dataKey="skill" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip cursor={{ fill: 'var(--color-bg-main)' }} />
                <Bar dataKey="count" fill="var(--color-danger)" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;

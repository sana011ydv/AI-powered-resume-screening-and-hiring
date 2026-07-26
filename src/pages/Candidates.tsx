import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MoreVertical, X, Download, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import styles from './Candidates.module.css';

// Dummy Data
const candidatesData = [
  {
    id: 1,
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Emily+Davis&background=2563eb&color=fff',
    score: 95,
    tier: 'Strong Fit',
    matchedSkills: ['React', 'TypeScript', 'Figma', 'UI/UX'],
    missingSkills: ['GraphQL'],
    status: 'Interview Scheduled',
    justification: 'Emily strongly matches the JD requirements. She has 5 years of experience in React and TypeScript. Her background in UI/UX design perfectly aligns with the hybrid nature of this role. Only missing GraphQL experience which is noted as a nice-to-have.',
    experience: [
      { role: 'Senior Frontend Developer', company: 'TechCorp', duration: '2020 - Present' },
      { role: 'UI Developer', company: 'DesignWorks', duration: '2017 - 2020' }
    ],
    education: 'BS Computer Science, Stanford University'
  },
  {
    id: 2,
    name: 'James Wilson',
    email: 'j.wilson@example.com',
    avatar: 'https://ui-avatars.com/api/?name=James+Wilson&background=7c3aed&color=fff',
    score: 78,
    tier: 'Possible Fit',
    matchedSkills: ['JavaScript', 'React', 'Node.js'],
    missingSkills: ['TypeScript', 'Figma'],
    status: 'Screening',
    justification: 'Solid engineering background with Node.js and React. Lacks the TypeScript experience mandated by the JD. Might require ramp-up time for the design aspects (Figma).',
    experience: [
      { role: 'Fullstack Engineer', company: 'StartupInc', duration: '2021 - Present' },
      { role: 'Web Developer', company: 'AgencyX', duration: '2019 - 2021' }
    ],
    education: 'BA Information Systems, NYU'
  },
  {
    id: 3,
    name: 'Michael Chen',
    email: 'mchen99@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=10b981&color=fff',
    score: 45,
    tier: 'Not Fit',
    matchedSkills: ['JavaScript', 'HTML/CSS'],
    missingSkills: ['React', 'TypeScript', 'Node.js', 'Figma'],
    status: 'Rejected',
    justification: 'Candidate is too junior for this role. Missing core requirements including React and TypeScript. Experience is primarily in vanilla JavaScript and basic web development.',
    experience: [
      { role: 'Junior Web Developer', company: 'LocalBiz', duration: '2022 - Present' }
    ],
    education: 'Bootcamp Graduate, CodeCore'
  }
];

const getTierColor = (tier: string) => {
  switch (tier) {
    case 'Strong Fit': return 'success';
    case 'Possible Fit': return 'warning';
    case 'Not Fit': return 'danger';
    default: return 'neutral';
  }
};

const CircularProgress = ({ value }: { value: number }) => {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  
  let color = 'var(--color-success)';
  if (value < 80) color = 'var(--color-warning)';
  if (value < 60) color = 'var(--color-danger)';

  return (
    <div className={styles.progressRing}>
      <svg height="40" width="40">
        <circle
          stroke="var(--color-border)"
          fill="transparent"
          strokeWidth="4"
          r={radius}
          cx="20"
          cy="20"
        />
        <motion.circle
          stroke={color}
          fill="transparent"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
          r={radius}
          cx="20"
          cy="20"
        />
      </svg>
      <span className={styles.progressValue}>{value}</span>
    </div>
  );
};

const Candidates = () => {
  const [search, setSearch] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRow = (id: number) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Candidates</h1>
          <p className={styles.subtitle}>Review and manage AI-screened candidates.</p>
        </div>
      </div>

      <Card className={styles.tableCard}>
        <div className={styles.tableControls}>
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search candidates by name, email, or skills..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline"><Filter size={18} /> Filters</Button>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: '40px' }}></th>
                <th>Candidate</th>
                <th>Score</th>
                <th>Tier</th>
                <th>Matched Skills</th>
                <th>Missing Skills</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidatesData.map(candidate => (
                <React.Fragment key={candidate.id}>
                  <tr className={styles.tableRow} onClick={() => setSelectedCandidate(candidate)}>
                    <td onClick={(e) => { e.stopPropagation(); toggleRow(candidate.id); }} className={styles.expandCell}>
                      {expandedRows.includes(candidate.id) ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </td>
                    <td>
                      <div className={styles.profileCell}>
                        <img src={candidate.avatar} alt={candidate.name} className={styles.avatar} />
                        <div>
                          <div className={styles.name}>{candidate.name}</div>
                          <div className={styles.email}>{candidate.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <CircularProgress value={candidate.score} />
                    </td>
                    <td>
                      <Badge variant={getTierColor(candidate.tier) as any}>{candidate.tier}</Badge>
                    </td>
                    <td>
                      <div className={styles.skillsList}>
                        {candidate.matchedSkills.slice(0, 2).map((skill, i) => (
                          <span key={i} className={styles.skillTag}>{skill}</span>
                        ))}
                        {candidate.matchedSkills.length > 2 && (
                          <span className={styles.skillMore}>+{candidate.matchedSkills.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className={styles.skillsList}>
                        {candidate.missingSkills.slice(0, 2).map((skill, i) => (
                          <span key={i} className={`${styles.skillTag} ${styles.missingSkill}`}>{skill}</span>
                        ))}
                        {candidate.missingSkills.length > 2 && (
                          <span className={styles.skillMore}>+{candidate.missingSkills.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className={styles.statusText}>{candidate.status}</span>
                    </td>
                    <td>
                      <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); }}>
                        <MoreVertical size={18} />
                      </Button>
                    </td>
                  </tr>
                  {/* Expandable Row */}
                  <AnimatePresence>
                    {expandedRows.includes(candidate.id) && (
                      <tr>
                        <td colSpan={8} className={styles.expandedCellWrapper}>
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className={styles.expandedContent}
                          >
                            <div className={styles.aiJustification}>
                              <div className={styles.aiHeader}>
                                <Star size={16} className="text-gradient" />
                                <strong>AI Justification</strong>
                              </div>
                              <p>{candidate.justification}</p>
                            </div>
                          </motion.div>
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Candidate Details Drawer */}
      <AnimatePresence>
        {selectedCandidate && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.drawerOverlay}
              onClick={() => setSelectedCandidate(null)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={styles.drawer}
            >
              <div className={styles.drawerHeader}>
                <h2>Candidate Details</h2>
                <Button variant="ghost" size="sm" onClick={() => setSelectedCandidate(null)}>
                  <X size={20} />
                </Button>
              </div>
              
              <div className={styles.drawerContent}>
                <div className={styles.drawerProfile}>
                  <img src={selectedCandidate.avatar} alt={selectedCandidate.name} className={styles.drawerAvatar} />
                  <div>
                    <h3>{selectedCandidate.name}</h3>
                    <p>{selectedCandidate.email}</p>
                    <div className={styles.drawerScoreRow}>
                      <Badge variant={getTierColor(selectedCandidate.tier) as any}>{selectedCandidate.tier}</Badge>
                      <span className={styles.drawerScore}>Score: {selectedCandidate.score}/100</span>
                    </div>
                  </div>
                </div>

                <div className={styles.drawerSection}>
                  <h4><Star size={16} /> AI Explanation</h4>
                  <div className={styles.drawerAiBox}>
                    {selectedCandidate.justification}
                  </div>
                </div>

                <div className={styles.drawerSection}>
                  <h4>Skills Analysis</h4>
                  <div className={styles.skillGroups}>
                    <div className={styles.skillGroup}>
                      <h5>Matched ({selectedCandidate.matchedSkills.length})</h5>
                      <div className={styles.skillsList}>
                        {selectedCandidate.matchedSkills.map((skill: string, i: number) => (
                          <span key={i} className={styles.skillTag}>{skill}</span>
                        ))}
                      </div>
                    </div>
                    <div className={styles.skillGroup}>
                      <h5>Missing ({selectedCandidate.missingSkills.length})</h5>
                      <div className={styles.skillsList}>
                        {selectedCandidate.missingSkills.map((skill: string, i: number) => (
                          <span key={i} className={`${styles.skillTag} ${styles.missingSkill}`}>{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.drawerSection}>
                  <h4>Experience</h4>
                  <div className={styles.timelineList}>
                    {selectedCandidate.experience.map((exp: any, i: number) => (
                      <div key={i} className={styles.timelineListItem}>
                        <div className={styles.timelineListDot} />
                        <div className={styles.timelineListContent}>
                          <h5>{exp.role}</h5>
                          <p>{exp.company} &bull; {exp.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.drawerSection}>
                  <h4>Education</h4>
                  <p className={styles.educationText}>{selectedCandidate.education}</p>
                </div>
              </div>

              <div className={styles.drawerFooter}>
                <Button variant="outline" fullWidth><Download size={18} /> Download Resume</Button>
                <Button fullWidth>Schedule Interview</Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Candidates;

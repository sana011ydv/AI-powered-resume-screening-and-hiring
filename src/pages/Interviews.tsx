import { useState } from 'react';
import { format, addDays, startOfWeek, addWeeks, subWeeks, isSameDay } from 'date-fns';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Video, Mail, Calendar as CalendarIcon, CheckCircle2, X } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import styles from './Interviews.module.css';

// Dummy Data
const interviewsData = [
  { id: 1, candidate: 'Emily Davis', role: 'UX Designer', date: new Date(), time: '10:00 AM', duration: '45m', type: 'Google Meet', status: 'Confirmed' },
  { id: 2, candidate: 'James Wilson', role: 'Frontend Dev', date: new Date(), time: '11:30 AM', duration: '60m', type: 'Zoom', status: 'Pending' },
  { id: 3, candidate: 'Anna Smith', role: 'Product Manager', date: addDays(new Date(), 1), time: '02:00 PM', duration: '45m', type: 'Google Meet', status: 'Confirmed' },
];

const Interviews = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // New Invite State
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);

  const nextWeek = () => setCurrentDate(addWeeks(currentDate, 1));
  const prevWeek = () => setCurrentDate(subWeeks(currentDate, 1));

  // Generate Week Days
  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setInviteSent(true);
    setTimeout(() => {
      setInviteSent(false);
      setShowInviteForm(false);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Interviews</h1>
          <p className={styles.subtitle}>Manage your schedule and send interview invitations.</p>
        </div>
        <Button onClick={() => setShowInviteForm(true)}>
          <CalendarIcon size={18} /> Schedule Interview
        </Button>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.calendarColumn}>
          <Card className={styles.calendarCard}>
            <div className={styles.calendarHeader}>
              <h3>{format(currentDate, 'MMMM yyyy')}</h3>
              <div className={styles.calendarNav}>
                <Button variant="ghost" size="sm" onClick={prevWeek}><ChevronLeft size={20} /></Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>Today</Button>
                <Button variant="ghost" size="sm" onClick={nextWeek}><ChevronRight size={20} /></Button>
              </div>
            </div>

            <div className={styles.weekGrid}>
              {weekDays.map((day, idx) => {
                const isSelected = isSameDay(day, selectedDate);
                const isToday = isSameDay(day, new Date());
                const hasInterview = interviewsData.some(i => isSameDay(i.date, day));

                return (
                  <div 
                    key={idx} 
                    className={`${styles.dayColumn} ${isSelected ? styles.selectedDay : ''}`}
                    onClick={() => setSelectedDate(day)}
                  >
                    <div className={styles.dayName}>{format(day, 'EEE')}</div>
                    <div className={`${styles.dayNumber} ${isToday ? styles.todayNumber : ''}`}>
                      {format(day, 'd')}
                    </div>
                    {hasInterview && <div className={styles.dayDot} />}
                  </div>
                );
              })}
            </div>

            <div className={styles.scheduleList}>
              <h4 className={styles.scheduleTitle}>
                Schedule for {format(selectedDate, 'MMM do, yyyy')}
              </h4>
              
              {interviewsData.filter(i => isSameDay(i.date, selectedDate)).length > 0 ? (
                interviewsData.filter(i => isSameDay(i.date, selectedDate)).map(interview => (
                  <div key={interview.id} className={styles.interviewCard}>
                    <div className={styles.interviewTime}>
                      <strong>{interview.time}</strong>
                      <span>{interview.duration}</span>
                    </div>
                    <div className={styles.interviewDivider} />
                    <div className={styles.interviewDetails}>
                      <div className={styles.interviewHeaderRow}>
                        <h4>{interview.candidate}</h4>
                        <Badge variant={interview.status === 'Confirmed' ? 'success' : 'warning' as any}>
                          {interview.status}
                        </Badge>
                      </div>
                      <p>{interview.role}</p>
                      <div className={styles.interviewMeta}>
                        <span className={styles.metaItem}><Video size={14} /> {interview.type}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.emptyState}>
                  <p>No interviews scheduled for this date.</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {showInviteForm && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={styles.formColumn}
          >
            <Card className={styles.formCard}>
              {inviteSent ? (
                <div className={styles.successState}>
                  <CheckCircle2 size={48} className="text-gradient" />
                  <h3>Invitation Sent!</h3>
                  <p>The candidate will receive an email with the calendar invite.</p>
                </div>
              ) : (
                <>
                  <div className={styles.formHeader}>
                    <h3>Send Invitation</h3>
                    <Button variant="ghost" size="sm" onClick={() => setShowInviteForm(false)}><X size={20} /></Button>
                  </div>
                  <form onSubmit={handleSendInvite} className={styles.inviteForm}>
                    <div className={styles.formGroup}>
                      <label>Candidate Email</label>
                      <div className={styles.inputWrapper}>
                        <Mail size={16} className={styles.inputIcon} />
                        <input type="email" required placeholder="candidate@example.com" />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Role</label>
                      <input type="text" required placeholder="e.g. UX Designer" className={styles.basicInput} />
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>Date</label>
                        <input type="date" required className={styles.basicInput} defaultValue={format(selectedDate, 'yyyy-MM-dd')} />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Time</label>
                        <input type="time" required className={styles.basicInput} />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Duration</label>
                      <select className={styles.basicInput} defaultValue="45">
                        <option value="30">30 Minutes</option>
                        <option value="45">45 Minutes</option>
                        <option value="60">1 Hour</option>
                        <option value="90">1.5 Hours</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Suggested Slots (AI)</label>
                      <div className={styles.suggestedSlots}>
                        <span className={styles.slotTag}>Today 2:00 PM</span>
                        <span className={styles.slotTag}>Tomorrow 10:00 AM</span>
                        <span className={styles.slotTag}>Tomorrow 3:30 PM</span>
                      </div>
                    </div>

                    <Button type="submit" fullWidth className={styles.submitBtn}>
                      Send Invitation
                    </Button>
                  </form>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Interviews;

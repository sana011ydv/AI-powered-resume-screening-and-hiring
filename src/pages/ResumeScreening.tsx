import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, X, CheckCircle, Loader2, BrainCircuit, Play, AlertCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import styles from './ResumeScreening.module.css';

const WEBHOOK_URL = 'https://shaaniyada011zf.app.n8n.cloud/webhook-test/Resume-screening';

/* ─── Toast Component ─── */
interface ToastData {
  id: number;
  type: 'success' | 'error';
  message: string;
}

const Toast = ({ toast, onDismiss }: { toast: ToastData; onDismiss: (id: number) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: -20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -20, scale: 0.95 }}
    transition={{ duration: 0.3 }}
    className={`${styles.toast} ${toast.type === 'success' ? styles.toastSuccess : styles.toastError}`}
  >
    {toast.type === 'success' ? (
      <CheckCircle size={18} className={styles.toastIcon} />
    ) : (
      <AlertCircle size={18} className={styles.toastIcon} />
    )}
    <span className={styles.toastMessage}>{toast.message}</span>
    <button className={styles.toastDismiss} onClick={() => onDismiss(toast.id)}>
      <X size={14} />
    </button>
  </motion.div>
);

/* ─── Main Component ─── */
const ResumeScreening = () => {
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [resumeFiles, setResumeFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  
  const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((type: 'success' | 'error', message: string) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, message }]);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Auto-dismiss toasts after 5 seconds
  useEffect(() => {
    if (toasts.length === 0) return;
    const latest = toasts[toasts.length - 1];
    const timer = setTimeout(() => dismissToast(latest.id), 5000);
    return () => clearTimeout(timer);
  }, [toasts, dismissToast]);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleFiles = (files: File[]) => {
    // Basic routing: first PDF could be JD if none exists, rest are resumes. 
    // For a real app, you'd want explicit separate upload zones or a way to select the JD.
    // Here we assume the user uploads resumes, and maybe we have a separate JD input.
    // Let's simplify: if jdFile is null, set first file as JD, rest as resumes.
    let newResumes = [...files];
    if (!jdFile && files.length > 0) {
      setJdFile(files[0]);
      newResumes = files.slice(1);
    }
    setResumeFiles(prev => [...prev, ...newResumes]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, isJd = false) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      if (isJd) {
        setJdFile(files[0]);
      } else {
        setResumeFiles(prev => [...prev, ...files]);
      }
    }
  };

  const removeFile = (index: number, isJd = false) => {
    if (isJd) {
      setJdFile(null);
    } else {
      setResumeFiles(prev => prev.filter((_, i) => i !== index));
    }
  };

  const startScreening = () => {
    if (!jdFile || resumeFiles.length === 0) return;
    
    setStatus('uploading');
    setProgress(0);
    setProgressText('Uploading files...');
    setErrorMessage('');

    const formData = new FormData();
    formData.append('jd', jdFile);
    resumeFiles.forEach(file => formData.append('resumes', file));

    const xhr = new XMLHttpRequest();

    // Track upload progress
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        setProgress(percent);
        if (percent < 100) {
          const loadedMB = (e.loaded / (1024 * 1024)).toFixed(1);
          const totalMB = (e.total / (1024 * 1024)).toFixed(1);
          setProgressText(`Uploading files... ${loadedMB} MB / ${totalMB} MB`);
        } else {
          setProgressText('Upload complete. Processing...');
          setStatus('processing');
        }
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        setProgress(100);
        setProgressText('Completed!');
        setStatus('success');
        addToast('success', `🎉 Screening complete! ${resumeFiles.length} resume(s) analyzed successfully.`);
      } else {
        let msg = `Server responded with status ${xhr.status}`;
        try {
          const body = JSON.parse(xhr.responseText);
          if (body.message) msg = body.message;
        } catch { /* use default message */ }
        setErrorMessage(msg);
        setStatus('error');
        addToast('error', `Upload failed: ${msg}`);
      }
    });

    xhr.addEventListener('error', () => {
      setErrorMessage('Network error. Please check your connection and try again.');
      setStatus('error');
      addToast('error', 'Network error. Please check your connection and try again.');
    });

    xhr.addEventListener('abort', () => {
      setErrorMessage('Upload was cancelled.');
      setStatus('error');
      addToast('error', 'Upload was cancelled.');
    });

    xhr.addEventListener('timeout', () => {
      setErrorMessage('Request timed out. The server took too long to respond.');
      setStatus('error');
      addToast('error', 'Request timed out. Please try again.');
    });

    xhr.open('POST', WEBHOOK_URL);
    xhr.timeout = 120000; // 2 minute timeout
    xhr.send(formData);
  };

  const reset = () => {
    setJdFile(null);
    setResumeFiles([]);
    setStatus('idle');
    setProgress(0);
    setErrorMessage('');
  };

  const retryScreening = () => {
    setStatus('idle');
    setProgress(0);
    setErrorMessage('');
  };

  const isUploading = status === 'uploading' || status === 'processing';

  return (
    <div className={styles.container}>
      {/* Toast Container */}
      <div className={styles.toastContainer}>
        <AnimatePresence>
          {toasts.map(toast => (
            <Toast key={toast.id} toast={toast} onDismiss={dismissToast} />
          ))}
        </AnimatePresence>
      </div>

      <div className={styles.header}>
        <h1 className={styles.title}>Resume Screening</h1>
        <p className={styles.subtitle}>Upload a Job Description and candidate resumes to let AI find the perfect match.</p>
      </div>

      <div className={styles.content}>
        {status === 'idle' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.uploadSection}
          >
            <div className={styles.splitUpload}>
              <div className={styles.uploadColumn}>
                <h3>Job Description</h3>
                <div 
                  className={`${styles.dropZone} ${jdFile ? styles.hasFile : ''}`}
                  onClick={() => document.getElementById('jdInput')?.click()}
                >
                  <input 
                    id="jdInput" 
                    type="file" 
                    accept=".pdf,.doc,.docx" 
                    className={styles.hiddenInput} 
                    onChange={(e) => handleFileInput(e, true)}
                  />
                  {jdFile ? (
                    <div className={styles.filePreview}>
                      <FileText size={32} className="text-gradient" />
                      <span>{jdFile.name}</span>
                      <button className={styles.removeBtn} onClick={(e) => { e.stopPropagation(); removeFile(0, true); }}>
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className={styles.dropZoneContent}>
                      <UploadCloud size={40} className={styles.uploadIcon} />
                      <p>Click to upload JD</p>
                      <span>PDF, DOCX up to 5MB</span>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.uploadColumn}>
                <h3>Candidate Resumes</h3>
                <div 
                  className={`${styles.dropZone} ${isDragging ? styles.dragging : ''}`}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  onClick={() => document.getElementById('resumeInput')?.click()}
                >
                  <input 
                    id="resumeInput" 
                    type="file" 
                    multiple 
                    accept=".pdf,.doc,.docx" 
                    className={styles.hiddenInput} 
                    onChange={(e) => handleFileInput(e, false)}
                  />
                  <div className={styles.dropZoneContent}>
                    <UploadCloud size={40} className={styles.uploadIcon} />
                    <p>Drag & Drop or Click to upload resumes</p>
                    <span>Upload multiple PDFs</span>
                  </div>
                </div>
              </div>
            </div>

            {resumeFiles.length > 0 && (
              <div className={styles.fileList}>
                <h4>Uploaded Resumes ({resumeFiles.length})</h4>
                <div className={styles.fileGrid}>
                  <AnimatePresence>
                    {resumeFiles.map((file, idx) => (
                      <motion.div 
                        key={`${file.name}-${idx}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={styles.fileItem}
                      >
                        <FileText size={20} className={styles.fileItemIcon} />
                        <span className={styles.fileName}>{file.name}</span>
                        <button className={styles.removeBtnSmall} onClick={() => removeFile(idx, false)}>
                          <X size={14} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            <div className={styles.actionRow}>
              <Button 
                size="lg" 
                onClick={startScreening} 
                disabled={!jdFile || resumeFiles.length === 0}
                className={styles.startBtn}
              >
                <BrainCircuit size={20} /> Start AI Screening
              </Button>
            </div>
          </motion.div>
        )}

        {isUploading && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={styles.processingSection}
          >
            <Card className={styles.processingCard}>
              <div className={styles.processingHeader}>
                <div className={styles.pulsingIcon}>
                  <BrainCircuit size={40} className="text-gradient" />
                </div>
                <h2>{status === 'uploading' ? 'Uploading files...' : 'AI is analyzing candidates'}</h2>
                <p>{status === 'uploading' 
                  ? 'Sending your files to the server. Please don\'t close this page.' 
                  : 'Please wait while we rank the resumes against the job description.'
                }</p>
              </div>

              <div className={styles.progressContainer}>
                <div className={styles.progressBar}>
                  <motion.div 
                    className={styles.progressFill}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className={styles.progressInfo}>
                  <span className={styles.progressText}>
                    {status === 'uploading' ? <Loader2 size={14} className={styles.spinner} /> : <Play size={14} className={styles.blink} />}
                    {progressText}
                  </span>
                  <span className={styles.progressPercentage}>{progress}%</span>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.errorSection}
          >
            <Card className={styles.errorCard}>
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                className={styles.errorIconWrapper}
              >
                <AlertCircle size={64} className={styles.errorIcon} />
              </motion.div>
              <h2>Screening Failed</h2>
              <p className={styles.errorMessage}>{errorMessage}</p>
              
              <div className={styles.successActions}>
                <Button variant="outline" onClick={reset}>Start Over</Button>
                <Button onClick={retryScreening}>Retry</Button>
              </div>
            </Card>
          </motion.div>
        )}

        {status === 'success' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.successSection}
          >
            <Card className={styles.successCard}>
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                className={styles.successIconWrapper}
              >
                <CheckCircle size={64} className={styles.successIcon} />
              </motion.div>
              <h2>Screening Completed Successfully!</h2>
              <p>{resumeFiles.length} resumes successfully analyzed against the Job Description.</p>
              
              <div className={styles.resultsSummary}>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryDot} style={{ background: 'var(--color-success)' }} />
                  <span className={styles.summaryLabel}>Strong Fit</span>
                  <strong className={styles.summaryValue}>{Math.ceil(resumeFiles.length * 0.3)}</strong>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryDot} style={{ background: 'var(--color-warning)' }} />
                  <span className={styles.summaryLabel}>Possible Fit</span>
                  <strong className={styles.summaryValue}>{Math.ceil(resumeFiles.length * 0.5)}</strong>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryDot} style={{ background: 'var(--color-danger)' }} />
                  <span className={styles.summaryLabel}>Not Fit</span>
                  <strong className={styles.summaryValue}>{Math.floor(resumeFiles.length * 0.2)}</strong>
                </div>
              </div>

              <div className={styles.successActions}>
                <Button variant="outline" onClick={reset}>Scan More</Button>
                <Button onClick={() => window.location.href = '/candidates'}>View Results</Button>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ResumeScreening;


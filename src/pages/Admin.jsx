import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiExternalLink, FiLock, FiLogOut, FiTrash2, FiKey, FiEye, FiEyeOff } from 'react-icons/fi';
import PageBanner from '../components/PageBanner.jsx';
import {
  addVisionMessage,
  clearVisionMessages,
  deleteVisionMessage,
  getVisionMessages,
  getToken,
  loginAdmin,
  logoutAdmin,
  changeAdminPassword,
} from '../lib/visionStore.js';
import './Admin.css';

export default function Admin() {
  const [authed, setAuthed] = useState(Boolean(getToken()));
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [heading, setHeading] = useState('');
  const [body, setBody] = useState('');
  const [messages, setMessages] = useState([]);
  const [justSaved, setJustSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const loadMessages = async () => {
    try {
      setMessages(await getVisionMessages());
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (authed) loadMessages();
  }, [authed]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setBusy(true);
    try {
      await loginAdmin(passwordInput);
      setAuthed(true);
      setPasswordInput('');
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setAuthed(false);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordMessage('');
    setPasswordError('');

    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }

    setChangingPassword(true);

    try {
      await changeAdminPassword(currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordMessage('Password changed successfully. Please sign in again with your new password.');

      // The backend invalidates all sessions after a password change.
      window.setTimeout(() => setAuthed(false), 1200);
    } catch (err) {
      setPasswordError(err.message);
    } finally {
      setChangingPassword(false);
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!heading.trim() || !body.trim()) return;
    setBusy(true);
    setError('');
    try {
      await addVisionMessage({ heading, body });
      await loadMessages();
      setHeading('');
      setBody('');
      setJustSaved(true);
      window.dispatchEvent(new Event('oracle-vision-updated'));
      window.setTimeout(() => setJustSaved(false), 2500);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this published message?')) return;
    try {
      await deleteVisionMessage(id);
      await loadMessages();
    } catch (err) { setError(err.message); }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Delete ALL published Vision messages? This cannot be undone.')) return;
    try {
      await clearVisionMessages();
      setMessages([]);
    } catch (err) { setError(err.message); }
  };

  if (!authed) {
    return (
      <>
        <PageBanner eyebrow="Admin" title="Owner Sign In" crumbs={[{ label: 'Admin' }]} />
        <section className="section admin-login">
          <div className="container admin-login__wrap">
            <motion.form className="admin-login__card" onSubmit={handleLogin} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="admin-login__icon"><FiLock /></span>
              <h2>Owner Access</h2>
              <p>Sign in to publish messages to the public Vision page.</p>
              <div className="field">
                <label htmlFor="admin-password">Password</label>
                <input id="admin-password" type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} autoFocus required />
                {authError && <span className="field__error">{authError}</span>}
              </div>
              <button type="submit" className="btn btn-primary admin-login__submit" disabled={busy}>{busy ? 'Signing In...' : 'Sign In'}</button>
              {/* <p className="admin-login__note">Set <code>ADMIN_PASSWORD</code> in the backend <code>.env</code> file.</p> */}
            </motion.form>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageBanner eyebrow="Admin" title="Vision Management" crumbs={[{ label: 'Admin' }]} />
      <section className="section admin-panel">
        <div className="container admin-panel__grid">
          <motion.form className="admin-panel__form" onSubmit={handlePublish} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="admin-panel__form-head">
              <h2>Publish a New Vision Message</h2>
              <button type="button" className="admin-panel__logout" onClick={handleLogout}><FiLogOut /> Sign Out</button>
            </div>
            <p className="admin-panel__desc">Every publish creates a new database record. Previous messages are never overwritten.</p>
            <div className="field">
              <label htmlFor="vision-heading">Message Heading</label>
              <input id="vision-heading" type="text" value={heading} onChange={(e) => setHeading(e.target.value)} maxLength={120} placeholder="e.g. A Message From Our Founder" required />
            </div>
            <div className="field">
              <label htmlFor="vision-body">Message</label>
              <textarea id="vision-body" rows={9} value={body} onChange={(e) => setBody(e.target.value)} maxLength={5000} placeholder="Write your message here..." required />
              <span className="admin-panel__count">{body.length} / 5000</span>
            </div>
            <div className="admin-panel__actions">
              <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? 'Publishing...' : 'Publish Message'}</button>
              <Link to="/vision" className="btn-text admin-panel__preview-link">View Vision Page <FiExternalLink /></Link>
              <button type="button" className="btn btn-outline" onClick={handleClearAll}><FiTrash2 /> Clear All</button>
            </div>
            {justSaved && <motion.p className="admin-panel__saved" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}><FiCheckCircle /> Message stored in MySQL successfully.</motion.p>}
            {error && <p className="field__error">{error}</p>}
          </motion.form>

          <motion.section
            className="admin-password-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="admin-password-card__head">
              <span className="admin-password-card__icon"><FiKey /></span>
              <div>
                <span className="section-label">SECURITY</span>
                <h2>Change Admin Password</h2>
              </div>
            </div>

            <p className="admin-password-card__desc">
              Change the website owner's password. The new password is securely
              hashed and stored in MySQL.
            </p>

            <form onSubmit={handleChangePassword} className="admin-password-form">
              <div className="field">
                <label htmlFor="current-admin-password">Current Password</label>
                <div className="password-input">
                  <input
                    id="current-admin-password"
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="password-input__toggle"
                    onClick={() => setShowCurrentPassword((value) => !value)}
                    aria-label={showCurrentPassword ? 'Hide current password' : 'Show current password'}
                  >
                    {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="field">
                <label htmlFor="new-admin-password">New Password</label>
                <div className="password-input">
                  <input
                    id="new-admin-password"
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    minLength={8}
                    maxLength={200}
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    required
                  />
                  <button
                    type="button"
                    className="password-input__toggle"
                    onClick={() => setShowNewPassword((value) => !value)}
                    aria-label={showNewPassword ? 'Hide new password' : 'Show new password'}
                  >
                    {showNewPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="field">
                <label htmlFor="confirm-admin-password">Confirm New Password</label>
                <div className="password-input">
                  <input
                    id="confirm-admin-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    minLength={8}
                    maxLength={200}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="password-input__toggle"
                    onClick={() => setShowConfirmPassword((value) => !value)}
                    aria-label={showConfirmPassword ? 'Hide password confirmation' : 'Show password confirmation'}
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary admin-password-submit" disabled={changingPassword}>
                <FiKey />
                {changingPassword ? 'Changing Password...' : 'Change Password'}
              </button>

              {passwordMessage && (
                <motion.p className="admin-panel__saved" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <FiCheckCircle /> {passwordMessage}
                </motion.p>
              )}

              {passwordError && <p className="field__error">{passwordError}</p>}
            </form>
          </motion.section>

          <aside className="admin-panel__history">
            <div className="admin-panel__history-head">
              <div><span className="section-label">DATABASE</span><h2>Published Messages</h2></div>
              <span className="admin-panel__badge">{messages.length}</span>
            </div>
            {messages.length === 0 ? <p className="admin-panel__empty">No messages published yet.</p> : messages.map((message) => (
              <article className="admin-message" key={message.id}>
                <div className="admin-message__top"><span>{new Date(message.createdAt).toLocaleString()}</span><button type="button" onClick={() => handleDelete(message.id)} aria-label="Delete message"><FiTrash2 /></button></div>
                <h3>{message.heading}</h3>
                <p>{message.body}</p>
              </article>
            ))}
          </aside>
        </div>
      </section>
    </>
  );
}

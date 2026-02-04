'use client';

import { useState, useRef } from 'react';
import { createEvent, deleteEvent, updateEvent, createTeamMember, deleteTeamMember, updateTeamMember, verifyAdminPassword } from './actions';
import { Trash2, Plus, Upload, Edit, X } from 'lucide-react';
import { format } from 'date-fns';

interface AdminDashboardProps {
    events: any[];
    team: any[];
}

export default function AdminDashboard({ events, team }: AdminDashboardProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('events');

    // Event Form State
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        coverImage: '',
        summary: '',
        fullDescription: '',
        existingImages: [] as string[],
        newImages: [] as string[],
    });
    const [uploading, setUploading] = useState(false);

    // Team Form State
    const [teamFormData, setTeamFormData] = useState({
        name: '',
        position: '',
        photoUrl: '',
    });
    const [isEditingTeam, setIsEditingTeam] = useState(false);
    const [editTeamId, setEditTeamId] = useState<string | null>(null);

    // Refs for file inputs
    const coverInputRef = useRef<HTMLInputElement>(null);
    const galleryInputRef = useRef<HTMLInputElement>(null);
    const teamPhotoRef = useRef<HTMLInputElement>(null);

    const checkAuth = async () => {
        const isValid = await verifyAdminPassword(password);
        if (isValid) setIsAuthenticated(true);
        else alert('Incorrect password');
    };

    const resetForm = () => {
        setFormData({
            title: '',
            date: '',
            coverImage: '',
            summary: '',
            fullDescription: '',
            existingImages: [],
            newImages: [],
        });
        setIsEditing(false);
        setEditId(null);
    };

    const resetTeamForm = () => {
        setTeamFormData({ name: '', position: '', photoUrl: '' });
        setIsEditingTeam(false);
        setEditTeamId(null);
        if (teamPhotoRef.current) teamPhotoRef.current.value = '';
    };

    const handleEdit = (event: any) => {
        setIsEditing(true);
        setEditId(event.id);
        setFormData({
            title: event.title,
            date: format(new Date(event.date), 'yyyy-MM-dd'),
            coverImage: event.coverImage,
            summary: event.summary,
            fullDescription: event.fullDescription,
            existingImages: event.images || [],
            newImages: [],
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleEditTeam = (member: any) => {
        setIsEditingTeam(true);
        setEditTeamId(member.id);
        setTeamFormData({
            name: member.name,
            position: member.position,
            photoUrl: member.photoUrl
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'cover' | 'gallery') => {
        if (!e.target.files?.length) return;
        setUploading(true);

        try {
            const files = Array.from(e.target.files);
            const uploadedUrls: string[] = [];

            for (const file of files) {
                const data = new FormData();
                data.append('file', file);

                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: data,
                });
                const json = await res.json();
                if (json.success) {
                    uploadedUrls.push(json.url);
                } else {
                    alert(`Upload failed: ${json.message}`);
                }
            }

            if (field === 'cover') {
                setFormData(prev => ({ ...prev, coverImage: uploadedUrls[0] }));
            } else {
                setFormData(prev => ({ ...prev, newImages: [...prev.newImages, ...uploadedUrls] }));
            }
        } catch (err) {
            console.error(err);
            alert('Error uploading file');
        } finally {
            setUploading(false);
        }
    };

    const handleTeamUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        setUploading(true);
        try {
            const file = e.target.files[0];
            const data = new FormData();
            data.append('file', file);

            const res = await fetch('/api/upload', { method: 'POST', body: data });
            const json = await res.json();
            if (json.success) {
                setTeamFormData(prev => ({ ...prev, photoUrl: json.url }));
            } else {
                alert('Upload failed');
            }
        } catch (err) {
            console.error(err);
            alert('Error uploading');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('date', formData.date);
        data.append('coverImage', formData.coverImage);
        data.append('summary', formData.summary);
        data.append('fullDescription', formData.fullDescription);

        if (isEditing && editId) {
            data.append('id', editId);
            formData.existingImages.forEach(img => data.append('existingImages', img));
            if (formData.newImages.length > 0) {
                data.append('newImages', formData.newImages.join(','));
            }
            await updateEvent(data);
        } else {
            if (formData.coverImage) {
                if (formData.newImages.length > 0) {
                    data.append('images', formData.newImages.join(','));
                }
                await createEvent(data);
            } else {
                alert("Please upload a cover image");
                return;
            }
        }

        resetForm();
    };

    const handleTeamSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', teamFormData.name);
        data.append('position', teamFormData.position);
        data.append('photoUrl', teamFormData.photoUrl);

        if (isEditingTeam && editTeamId) {
            data.append('id', editTeamId);
            await updateTeamMember(data);
        } else {
            if (!teamFormData.photoUrl) {
                alert('Please upload a photo');
                return;
            }
            await createTeamMember(data);
        }
        resetTeamForm();
    };

    if (!isAuthenticated) {
        return (
            <div className="container" style={{ paddingTop: '8rem', maxWidth: '400px' }}>
                <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Admin Login</h1>
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '4px' }} />
                    <button className="btn-primary" style={{ width: '100%' }} onClick={checkAuth}>Login</button>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '4rem 2rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>Admin Dashboard</h1>

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <button className={activeTab === 'events' ? 'btn-primary' : ''} style={{ padding: '0.5rem 1rem', background: activeTab === 'events' ? '' : 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '4px' }} onClick={() => setActiveTab('events')}>Events</button>
                <button className={activeTab === 'team' ? 'btn-primary' : ''} style={{ padding: '0.5rem 1rem', background: activeTab === 'team' ? '' : 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '4px' }} onClick={() => setActiveTab('team')}>Team</button>
            </div>

            <div className="glass-panel" style={{ padding: '2rem' }}>
                {activeTab === 'events' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2>{isEditing ? 'Edit Event' : 'Add New Event'}</h2>
                            {isEditing && <button onClick={resetForm} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>Cancel Edit</button>}
                        </div>

                        <form onSubmit={handleSubmit} style={{ marginBottom: '4rem', display: 'grid', gap: '1rem', maxWidth: '600px' }}>
                            <input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="Event Title" required style={{ padding: '0.5rem' }} />
                            <input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} required style={{ padding: '0.5rem' }} />

                            {/* Cover Image Upload */}
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Cover Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileUpload(e, 'cover')}
                                        ref={coverInputRef}
                                        style={{ color: 'white' }}
                                    />
                                </div>
                                {formData.coverImage && <img src={formData.coverImage} alt="Cover" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />}
                            </div>

                            <textarea value={formData.summary} onChange={e => setFormData({ ...formData, summary: e.target.value })} placeholder="Short Summary" required style={{ padding: '0.5rem', minHeight: '80px' }} />
                            <textarea value={formData.fullDescription} onChange={e => setFormData({ ...formData, fullDescription: e.target.value })} placeholder="Full Description" required style={{ padding: '0.5rem', minHeight: '150px' }} />

                            {/* Gallery Upload */}
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Gallery Images</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => handleFileUpload(e, 'gallery')}
                                    ref={galleryInputRef}
                                    style={{ color: 'white', marginBottom: '1rem' }}
                                />

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {/* Existing Images */}
                                    {formData.existingImages.map((img, idx) => (
                                        <div key={`exist-${idx}`} style={{ position: 'relative' }}>
                                            <img src={img} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                                            <button type="button" onClick={() => setFormData(prev => ({ ...prev, existingImages: prev.existingImages.filter((_, i) => i !== idx) }))} style={{ position: 'absolute', top: -5, right: -5, background: 'red', borderRadius: '50%', border: 'none', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}><X size={12} /></button>
                                        </div>
                                    ))}
                                    {/* New Images */}
                                    {formData.newImages.map((img, idx) => (
                                        <div key={`new-${idx}`} style={{ position: 'relative' }}>
                                            <img src={img} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '2px solid var(--color-accent-gold)' }} />
                                            <button type="button" onClick={() => setFormData(prev => ({ ...prev, newImages: prev.newImages.filter((_, i) => i !== idx) }))} style={{ position: 'absolute', top: -5, right: -5, background: 'red', borderRadius: '50%', border: 'none', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}><X size={12} /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button type="submit" disabled={uploading} className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: uploading ? 0.7 : 1 }}>
                                {isEditing ? <Edit size={18} /> : <Plus size={18} />}
                                {uploading ? 'Uploading...' : (isEditing ? 'Update Event' : 'Add Event')}
                            </button>
                        </form>

                        <h3>Existing Events</h3>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {events.map((event) => (
                                <div key={event.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem' }}>{event.title}</h3>
                                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>{format(new Date(event.date), 'dd MMM yyyy')}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button onClick={() => handleEdit(event)} style={{ background: '#3b82f6', border: 'none', color: 'white', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }}>
                                            <Edit size={18} />
                                        </button>
                                        <button onClick={() => deleteEvent(event.id)} style={{ background: 'red', border: 'none', color: 'white', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }}>
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'team' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2>{isEditingTeam ? 'Edit Team Member' : 'Add Team Member'}</h2>
                            {isEditingTeam && <button onClick={resetTeamForm} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>Cancel Edit</button>}
                        </div>

                        <form onSubmit={handleTeamSubmit} style={{ marginBottom: '4rem', display: 'grid', gap: '1rem', maxWidth: '600px' }}>
                            <input value={teamFormData.name} onChange={e => setTeamFormData({ ...teamFormData, name: e.target.value })} placeholder="Name" required style={{ padding: '0.5rem' }} />
                            <input value={teamFormData.position} onChange={e => setTeamFormData({ ...teamFormData, position: e.target.value })} placeholder="Position" required style={{ padding: '0.5rem' }} />

                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Photo</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleTeamUpload}
                                        ref={teamPhotoRef}
                                        style={{ color: 'white' }}
                                    />
                                </div>
                                {teamFormData.photoUrl && <img src={teamFormData.photoUrl} alt="Preview" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }} />}
                            </div>

                            <button type="submit" disabled={uploading} className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: uploading ? 0.7 : 1 }}>
                                {isEditingTeam ? <Edit size={18} /> : <Plus size={18} />}
                                {uploading ? 'Uploading...' : (isEditingTeam ? 'Update Member' : 'Add Member')}
                            </button>
                        </form>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                            {team.map((member) => (
                                <div key={member.id} style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', textAlign: 'center', position: 'relative' }}>
                                    <img src={member.photoUrl} alt={member.name} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 0.5rem' }} />
                                    <h3 style={{ fontSize: '1rem' }}>{member.name}</h3>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--color-accent-gold)' }}>{member.position}</p>

                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                                        <button onClick={() => handleEditTeam(member)} style={{ background: '#3b82f6', border: 'none', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', cursor: 'pointer' }}>
                                            <Edit size={14} />
                                        </button>
                                        <button onClick={() => deleteTeamMember(member.id)} style={{ background: 'red', border: 'none', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', cursor: 'pointer' }}>
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

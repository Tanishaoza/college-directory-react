import React, { useMemo, useState } from "react";
import "./App.css";

// Sample colleges data
const SAMPLE_COLLEGES = [
  // Government Colleges
  { id: 1, name: 'IIT Bombay', address: 'Powai, Mumbai', city: 'Mumbai', state: 'Maharashtra', type: 'Government', streams: ['Engineering','Science'], cutoff: 95, facilities: { hostel: true, wifi: true, labs: true, library: true } },
  { id: 2, name: 'Government Degree College, Mumbai Central', address: 'Marine Lines, Mumbai', city: 'Mumbai', state: 'Maharashtra', type: 'Government', streams: ['Arts','Science','Commerce'], cutoff: 65, facilities: { hostel: true, wifi: true, labs: true, library: true } },
  { id: 3, name: 'Government Science College, Andheri', address: 'Andheri West, Mumbai', city: 'Mumbai', state: 'Maharashtra', type: 'Government', streams: ['Science'], cutoff: 70, facilities: { hostel: true, wifi: false, labs: true, library: true } },
  { id: 4, name: 'Government College of Engineering, Pune', address: 'Shivajinagar, Pune', city: 'Pune', state: 'Maharashtra', type: 'Government', streams: ['Engineering'], cutoff: 75, facilities: { hostel: true, wifi: true, labs: true, library: true } },
  { id: 5, name: 'University of Kashmir', address: 'Hazratbal, Srinagar', city: 'Srinagar', state: 'Jammu & Kashmir', type: 'Government', streams: ['Arts','Science','Commerce','Law'], cutoff: 75, facilities: { hostel: true, wifi: true, labs: true, library: true } },
  { id: 6, name: 'Delhi College of Arts & Commerce', address: 'University of Delhi, Delhi', city: 'Delhi', state: 'Delhi', type: 'Government', streams: ['Arts','Commerce'], cutoff: 72, facilities: { hostel: false, wifi: true, labs: false, library: true } },
  { id: 7, name: 'Government Engineering College, Mysore', address: 'Mysore', city: 'Mysore', state: 'Karnataka', type: 'Government', streams: ['Engineering'], cutoff: 67, facilities: { hostel: true, wifi: true, labs: true, library: true } },
  { id: 8, name: 'Government College of Engineering, Salem', address: 'Salem', city: 'Salem', state: 'Tamil Nadu', type: 'Government', streams: ['Engineering'], cutoff: 70, facilities: { hostel: true, wifi: true, labs: true, library: true } },

  // Private Colleges
  { id: 9, name: 'St. Xavier’s College', address: 'Fort, Mumbai', city: 'Mumbai', state: 'Maharashtra', type: 'Private', streams: ['Arts','Science','Commerce'], cutoff: 85, facilities: { hostel: false, wifi: true, labs: true, library: true } },
  { id: 10, name: 'K. J. Somaiya College of Engineering', address: 'Vidyanagar, Mumbai', city: 'Mumbai', state: 'Maharashtra', type: 'Private', streams: ['Engineering'], cutoff: 78, facilities: { hostel: true, wifi: true, labs: true, library: true } },
  { id: 11, name: 'Thakur College of Engineering & Technology', address: 'Thakur Village, Kandivali East', city: 'Mumbai', state: 'Maharashtra', type: 'Private', streams: ['Engineering'], cutoff: 70, facilities: { hostel: true, wifi: true, labs: true, library: true } },
  { id: 12, name: 'Pillai College of Engineering', address: 'Panvel, Navi Mumbai', city: 'Navi Mumbai', state: 'Maharashtra', type: 'Private', streams: ['Engineering'], cutoff: 72, facilities: { hostel: true, wifi: true, labs: true, library: true } },
  { id: 13, name: 'Symbiosis International University', address: 'Lavale, Pune', city: 'Pune', state: 'Maharashtra', type: 'Private', streams: ['Management','Law','Engineering'], cutoff: 80, facilities: { hostel: true, wifi: true, labs: true, library: true } },
  { id: 14, name: 'Christ University', address: 'Hosur Road, Bangalore', city: 'Bangalore', state: 'Karnataka', type: 'Private', streams: ['Arts','Commerce','Science','Law','Management'], cutoff: 82, facilities: { hostel: true, wifi: true, labs: true, library: true } },
  { id: 15, name: 'SRM Institute of Science and Technology', address: 'Kattankulathur, Chennai', city: 'Chennai', state: 'Tamil Nadu', type: 'Private', streams: ['Engineering','Science','Management'], cutoff: 78, facilities: { hostel: true, wifi: true, labs: true, library: true } },
  { id: 16, name: 'Amity University', address: 'Noida, Uttar Pradesh', city: 'Noida', state: 'Uttar Pradesh', type: 'Private', streams: ['Management','Engineering','Law'], cutoff: 75, facilities: { hostel: true, wifi: true, labs: true, library: true } },
  { id: 17, name: 'Lovely Professional University', address: 'Phagwara, Punjab', city: 'Phagwara', state: 'Punjab', type: 'Private', streams: ['Engineering','Management','Science','Arts'], cutoff: 70, facilities: { hostel: true, wifi: true, labs: true, library: true } },
  { id: 18, name: 'Ashoka University', address: 'Sonepat, Haryana', city: 'Sonepat', state: 'Haryana', type: 'Private', streams: ['Arts','Science','Management'], cutoff: 78, facilities: { hostel: true, wifi: true, labs: true, library: true } },
];

// States and types for filters
const STATES = ['All States','Maharashtra','Jammu & Kashmir','Delhi','Karnataka','Tamil Nadu','Uttar Pradesh','Punjab','Haryana'];
const TYPES = ['All Types','Government','Private'];

export default function CollegeDirectory() {
  const [query, setQuery] = useState('');
  const [stream, setStream] = useState('all');
  const [state, setState] = useState('all');
  const [collegeType, setCollegeType] = useState('all');

  // Filtering colleges
  const filtered = useMemo(() => {
    return SAMPLE_COLLEGES.filter(c => {
      if (query && !(`${c.name} ${c.address} ${c.city} ${c.state}`).toLowerCase().includes(query.toLowerCase())) return false;
      if (stream !== 'all' && !c.streams.includes(stream)) return false;
      if (state !== 'all' && c.state !== state) return false;
      if (collegeType !== 'all' && c.type !== collegeType) return false;
      return true;
    });
  }, [query, stream, state, collegeType]);

  return (
    <div className="app-container">
      <header className="header">
        <h1>🎓 College Finder</h1>
        <p>Find Government and Private colleges across India.</p>
      </header>

      <section className="filters">
        <input
          type="text"
          placeholder="🔍 Search colleges..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <select value={stream} onChange={e => setStream(e.target.value)}>
          <option value="all">All Streams</option>
          <option value="Arts">Arts</option>
          <option value="Science">Science</option>
          <option value="Commerce">Commerce</option>
          <option value="Law">Law</option>
          <option value="Engineering">Engineering</option>
          <option value="Management">Management</option>
        </select>
        <select value={state} onChange={e => setState(e.target.value)}>
          {STATES.map(s => <option key={s} value={s === 'All States' ? 'all' : s}>{s}</option>)}
        </select>
        <select value={collegeType} onChange={e => setCollegeType(e.target.value)}>
          {TYPES.map(t => <option key={t} value={t === 'All Types' ? 'all' : t}>{t}</option>)}
        </select>
      </section>

      <section className="cards-container">
        {filtered.length === 0 && <p>No colleges found.</p>}
        {filtered.map(col => (
          <div key={col.id} className="card">
            <h2>{col.name}</h2>
            <p className="location">
              {col.address ? `${col.address}, ${col.state}` : `${col.city}, ${col.state}`}
            </p>
            <p><b>Type:</b> {col.type}</p>
            <p><b>Streams:</b> {col.streams.join(', ')}</p>
            <p><b>Cutoff:</b> {col.cutoff}%</p>
            <div className="facilities">
              {col.facilities.hostel && <span className="facility-badge hostel">🏫 Hostel</span>}
              {col.facilities.wifi && <span className="facility-badge wifi">📶 WiFi</span>}
              {col.facilities.labs && <span className="facility-badge labs">🔬 Labs</span>}
              {col.facilities.library && <span className="facility-badge library">📚 Library</span>}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

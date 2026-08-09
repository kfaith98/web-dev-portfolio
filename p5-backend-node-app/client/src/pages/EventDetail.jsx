import { useState, useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { EventsContext } from '../context/EventsContext';
import SupplierCard from '../components/SupplierCard';
import SupplierModal from '../components/SupplierModal';
import {
  CATEGORIES,
  STATUSES,
  formatPeso,
  formatDate,
} from '../data/constants';
import { getArrangements } from '../api';
import styles from '../css/EventDetail.module.css';

// EventDetail.jsx
function EventDetail() {
  const { id } = useParams();
  const { state } = useContext(EventsContext);
  const [isOpen, setIsOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [arrangements, setArrangements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadArrangements() {
      try {
        const data = await getArrangements(id);
        setArrangements(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadArrangements();
  }, [id]);

  const event = state.find((e) => e._id === id);

  if (!event) {
    return 'Event not found.';
  }

  const suppliers = arrangements;

  const supplierStatus = STATUSES.map(
    (status) =>
      `${suppliers.filter((s) => s.status === status).length} ${status}`,
  );

  const visibleSuppliers = suppliers
    .filter(
      (s) =>
        (!categoryFilter || s.supplierId.category === categoryFilter) &&
        (!statusFilter || s.status === statusFilter),
    )
    .sort((a, b) => {
      if (sortKey === 'category') {
        return a.supplierId.category.localeCompare(b.supplierId.category);
      } else if (sortKey === 'status') {
        return STATUSES.indexOf(a.status) - STATUSES.indexOf(b.status);
      } else {
        return 0;
      }
    });

  const handleEmptyStates = () => {
    if (visibleSuppliers.length === 0 && suppliers.length > 0) {
      return 'No suppliers match these filters.';
    } else if (visibleSuppliers.length === 0) {
      return 'No suppliers yet for this event.';
    }
  };

  const totalBudget = suppliers.reduce(
    (sum, s) => sum + (s.budget || 0),
    0,
  );

  return (
    <div>
      <div className={styles['btn-back']}>
        <Link to="/" className={`btn-look ${styles['back-link']}`}>
          ← Back to events
        </Link>
      </div>

      <div className={styles['event-body']}>
        <div className={styles['left-column']}>
          <div className={styles['event-card']}>
            <div>
              <h1>{event.name}</h1>
              <p>Date: {formatDate(event.date)}</p>
              <p>Venue: {event.venue}</p>
              <p>Total Cost: {formatPeso(totalBudget)}</p>
            </div>

            <div className={styles['event-summary']}>
              <p className={styles['total-suppliers']}>
                {suppliers.length} total supplier
                {suppliers.length !== 1 && 's'}
              </p>
              <p>{supplierStatus.join(' · ')}</p>
            </div>
          </div>

          <div className={styles['filter-sort-section']}>
            <div>
              <label htmlFor="filter">Filter by:</label>
              <select
                id="filter"
                name="category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                id="filter-status"
                name="status"
                aria-label="Filter by status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Statuses</option>
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="sort">Sort by:</label>

              <select
                id="sort"
                name="sort"
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value)}
              >
                <option value="">Select option…</option>
                <option value="category">Category</option>
                <option value="status">Status</option>
              </select>
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className={`btn-primary ${styles['add-supplier']}`}
            >
              Add Supplier
            </button>
          </div>
        </div>

        <div className={styles['right-column']}>
          {visibleSuppliers.length === 0 ? (
            <div className="empty-state">
              <p>{handleEmptyStates()}</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 12 }}>
              {visibleSuppliers.map((supplier) => (
                <SupplierCard
                  key={supplier._id}
                  supplier={supplier}
                  eventId={event._id}
                />
              ))}
            </div>
          )}

          {isOpen && (
            <SupplierModal
              eventId={event._id}
              onClose={() => setIsOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDetail;

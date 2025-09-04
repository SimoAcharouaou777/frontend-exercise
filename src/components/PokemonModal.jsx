import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closePokemonModal } from '../store/actions';
import Loader from './Loader';

function PokemonModal() {
  const dispatch = useDispatch();
  const { open, name, loading, data, error } = useSelector(s => s.details);

  if (!open) return null;

  const sprite = data?.sprites?.other?.['official-artwork']?.front_default || data?.sprites?.front_default;

  return (
    <div className="modal-backdrop" onClick={() => dispatch(closePokemonModal())}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="name" style={{ fontSize: 20 }}>{name}</div>
          <button className="btn" onClick={() => dispatch(closePokemonModal())}>Close</button>
        </div>

        {loading && <div className="center" style={{ padding: 16 }}><Loader /></div>}
        {error && <div style={{ color: '#fca5a5' }}>Error: {error}</div>}

        {data && !loading && (
          <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 16 }}>
            {sprite ? <img src={sprite} alt={data.name} width="160" height="160" /> : <div className="center muted">No image</div>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {data.types?.map((t) => <span key={t.type.name} className="badge">type: {t.type.name}</span>)}
              </div>
              <div className="muted">Height: {data.height} — Weight: {data.weight}</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {data.abilities?.map(a => <span key={a.ability.name} className="badge">ability: {a.ability.name}</span>)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PokemonModal;

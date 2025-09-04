import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonsRequest } from "../store/actions";
import PokemonCard from "./PokemonCard";
import Loader from "./Loader";

function PokemonGrid() {
    const dispatch = useDispatch();
    const { items, loading, next } = useSelector(s => s.list);
    const sentinelRef = useRef(null);

    // Initial load
    useEffect(() => { dispatch(fetchPokemonsRequest()); }, [dispatch]);

    // Infinit Scroll
    useEffect(() => {
        const el = sentinelRef.current;
        if (!el) return;
        const obs = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && !loading && next) {
                dispatch(fetchPokemonsRequest());
            }
        }, { rootMargin: '120px' });
        obs.observe(el);
        return () => obs.disconnect();
    }, [dispatch, loading, next]);

    return (
        <>
            <div className="grid" data-testid="grid">
                {items.map(p => <PokemonCard key={p.name} name={p.name} />)}
            </div>

            <div className="sentinel center" ref={sentinelRef}>
                {loading ? <Loader /> : (next ? <span className="muted">Scroll to load more…</span> : <span className="muted">End</span>)}
            </div>
        </>
    );
}

export default PokemonGrid;
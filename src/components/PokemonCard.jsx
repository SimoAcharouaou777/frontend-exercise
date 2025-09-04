import React from "react";
import { useDispatch } from "react-redux";
import { openPokemonModal } from "../store/actions.js";

export default function PokemonCard({ name }) {
    const dispatch = useDispatch();
    return (
        <div className="card" onClick={() => dispatch(openPokemonModal(name))} role="button" tabIndex={0}>
            <div className="name">{name}</div>
            <div className="muted"> Click for details</div>
        </div>
    );
}
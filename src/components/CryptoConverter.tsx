// src/components/CryptoConverter.tsx
import { useState } from 'react';
import { cryptoService } from '../services/api';
import type { ConversionResponseDto } from '../services/api';

export function CryptoConverter() {
    const [fromCoin, setFromCoin] = useState('bitcoin');
    const [toCoin, setToCoin] = useState('usd');
    const [amount, setAmount] = useState<number>(1);
    const [result, setResult] = useState<ConversionResponseDto | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleConvert = async (e: React.FormEvent) => {
        e.preventDefault();
        if (amount <= 0) return;

        try {
            setLoading(true);
            setError(null);
            // Consumimos tu endpoint /converter
            const data = await cryptoService.convertCrypto(fromCoin, toCoin, amount);
            setResult(data);
        } catch (err) {
            console.error('Error al convertir:', err);
            setError('Error al calcular la conversión.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8 backdrop-blur">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
                💱 Conversor de Divisas
            </h3>

            <form onSubmit={handleConvert} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                {/* Input Cantidad */}
                <div>
                    <label className="block text-xs text-slate-400 mb-1 font-medium">Cantidad</label>
                    <input
                        type="number"
                        step="any"
                        min="0.00000001"
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 font-mono focus:outline-none focus:border-emerald-500 text-sm"
                    />
                </div>

                {/* Select Desde */}
                <div>
                    <label className="block text-xs text-slate-400 mb-1 font-medium">De</label>
                    <select
                        value={fromCoin}
                        onChange={(e) => setFromCoin(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500 text-sm"
                    >
                        <option value="bitcoin">Bitcoin (BTC)</option>
                        <option value="ethereum">Ethereum (ETH)</option>
                        <option value="solana">Solana (SOL)</option>
                        <option value="cardano">Cardano (ADA)</option>
                    </select>
                </div>

                {/* Select Hacia */}
                <div>
                    <label className="block text-xs text-slate-400 mb-1 font-medium">A</label>
                    <select
                        value={toCoin}
                        onChange={(e) => setToCoin(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500 text-sm"
                    >
                        <option value="usd">USD ($)</option>
                        <option value="bitcoin">Bitcoin (BTC)</option>
                        <option value="ethereum">Ethereum (ETH)</option>
                    </select>
                </div>

                {/* Botón de envío */}
                <button
                    type="submit"
                    disabled={loading || amount <= 0}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-800 text-slate-950 disabled:text-slate-600 font-bold py-2 px-4 rounded-lg transition-colors text-sm h-[38px]"
                >
                    {loading ? 'Calculando...' : 'Convertir'}
                </button>
            </form>

            {/* Resultados del Endpoint */}
            {error && <p className="text-rose-400 text-xs mt-3">{error}</p>}

            {result && !error && (
                <div className="mt-4 p-4 bg-slate-950/60 border border-slate-800/80 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 animate-fadeIn">
                    <div>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Resultado Calculado</p>
                        <p className="text-lg font-mono font-bold text-slate-100 mt-0.5">
                            {amount.toLocaleString('en-US', { maximumFractionDigits: 8 })} <span className="text-xs text-slate-400 uppercase">{result.fromCoin}</span> ={' '}
                            <span className="text-emerald-400">
                                {result.result.toLocaleString('en-US', {
                                    minimumFractionDigits: result.toCoin === 'usd' ? 2 : 8,
                                    maximumFractionDigits: result.toCoin === 'usd' ? 2 : 8
                                })}
                            </span>{' '}
                            <span className="text-xs text-emerald-500 uppercase">{result.toCoin}</span>
                        </p>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono text-right sm:self-end">
                        Timestamp: {result.timestamp}
                    </div>
                </div>
            )}
        </div>
    );
}
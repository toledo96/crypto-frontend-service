// src/components/CryptoTable.tsx
import type { CoinMarketDto } from '../services/api';

interface CryptoTableProps {
    markets: CoinMarketDto[];
    onSelectCoin: (id: string) => void;
    selectedCoinId: string | null;
}

export function CryptoTable({ markets, onSelectCoin, selectedCoinId }: CryptoTableProps) {
    return (
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/80 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        <th className="py-4 px-6">Activo</th>
                        <th className="py-4 px-6 text-right">Precio</th>
                        <th className="py-4 px-6 text-right">Variación (24h)</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                    {markets.map((coin) => {
                        const price = coin.currentPrice ?? (coin as any).current_price ?? 0;
                        const percentage = coin.priceChangePercentage24h ?? (coin as any).price_change_percentage_24h ?? 0;
                        const isPositive = percentage >= 0;
                        const isSelected = coin.id === selectedCoinId;

                        return (
                            <tr
                                key={coin.id}
                                onClick={() => onSelectCoin(coin.id)}
                                className={`transition-colors cursor-pointer ${isSelected ? 'bg-emerald-950/30 border-l-2 border-emerald-400' : 'hover:bg-slate-800/40'
                                    }`}
                            >
                                <td className="py-4 px-6 flex items-center gap-3 font-medium">
                                    <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full object-cover" />
                                    <span>{coin.name}</span>
                                    <span className="text-xs uppercase text-slate-500 font-bold">{coin.symbol}</span>
                                </td>
                                <td className="py-4 px-6 text-right font-mono font-semibold text-slate-200">
                                    ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </td>
                                <td className={`py-4 px-6 text-right font-mono font-medium ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {isPositive ? '+' : ''}{percentage.toFixed(2)}%
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
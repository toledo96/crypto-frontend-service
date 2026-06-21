import { useEffect, useState } from 'react';
import { cryptoService } from '../services/api';
import type { CoinDetailResponseDto } from '../services/api';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

interface CryptoDetailProps {
    coinId: string;
}

export function CryptoDetail({ coinId }: CryptoDetailProps) {
    const [detail, setDetail] = useState<CoinDetailResponseDto | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true);
                const data = await cryptoService.getCoinDetails(coinId);
                setDetail(data);
            } catch (err) {
                console.error('Error al traer detalles:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [coinId]);

    if (loading) {
        return <div className="text-slate-400 text-center py-12 animate-pulse">Cargando análisis de mercado...</div>;
    }

    if (!detail) return null;

    // Formateamos los [timestamp, precio] que vienen de tu List<List<Double>> para Recharts
    const chartData = detail.chartPrices?.map(([timestamp, price]) => ({
        date: new Date(timestamp).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
        precio: price,
    })) || [];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 animate-fadeIn">
            {/* Tarjeta de Información General */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-emerald-400">
                            Perfil Activo
                        </span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-100 mb-2">{detail.name} ({detail.symbol.toUpperCase()})</h2>

                    {/* Renderizado seguro del Map<String, Object> o descripción */}
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-6 mb-4">
                        {detail.marketData?.description || `Análisis detallado e histórico de precios para la cotización de ${detail.name}.`}
                    </p>
                </div>

                <div className="border-t border-slate-800 pt-4 text-xs text-slate-500">
                    Datos provistos en tiempo real. Caché sincronizada.
                </div>
            </div>

            {/* Gráfica del Histórico de Precios */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Historial de Precios</h3>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorPrecio" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
                            <YAxis
                                stroke="#64748b"
                                fontSize={11}
                                domain={['auto', 'auto']}
                                tickLine={false}
                                tickFormatter={(val) => `$${val.toLocaleString()}`}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                                labelStyle={{ color: '#94a3b8', fontSize: '12px' }}
                                itemStyle={{ color: '#34d399', fontSize: '13px', fontWeight: 'bold' }}
                            />
                            <Area type="monotone" dataKey="precio" stroke="#34d399" strokeWidth={2} fillOpacity={1} fill="url(#colorPrecio)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
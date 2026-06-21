import { useEffect, useState } from 'react';
import { cryptoService } from './services/api';
import type {  CoinMarketDto } from './services/api';
import { CryptoTable } from './components/CryptoTable';
import { CryptoDetail } from './components/CryptoDetail';
import { CryptoConverter } from './components/CryptoConverter';

function App() {
  const [markets, setMarkets] = useState<CoinMarketDto[]>([]);
  const [selectedCoinId, setSelectedCoinId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        setLoading(true);
        // Consumimos tu endpoint /markets
        const data = await cryptoService.getMarkets('usd');
        setMarkets(data);
        setError(null);
      } catch (err) {
        setError('No se pudo conectar con el backend de Spring Boot. ¿Está encendido?');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarkets();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
      {/* Encabezado */}
      <header className="max-w-6xl mx-auto mb-8 border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div>
          <h1 className="text-3xl font-extrabold text-emerald-400 tracking-tight">
            🚀 Crypto Service Dashboard
          </h1>
          <p className="text-slate-400 mt-1 text-sm">
            Precios del mercado de criptomonedas en tiempo real.
          </p>
        </div>
        <div className="text-xs text-slate-500 font-medium font-mono">
          Última actualización: {new Date().toLocaleTimeString()}
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-6xl mx-auto">
        {loading && (
          <div className="flex justify-center items-center py-12 text-emerald-400 font-medium animate-pulse">
            Cargando datos del mercado 
          </div>
        )}

        {error && (
          <div className="bg-rose-950/40 border border-rose-800 text-rose-300 p-4 rounded-lg mb-6 max-w-xl mx-auto text-center">
            ⚠ {error}
          </div>
        )}

        {!loading && !error && (
          <>

            {/*Componente Conversor */}
            <CryptoConverter />

            {/* Tabla de Criptomonedas */}
            <CryptoTable 
            markets={markets} 
            onSelectCoin={setSelectedCoinId} 
            selectedCoinId={selectedCoinId}             
            />

            {/* Detalles de la Criptomoneda Seleccionada , solo renderizar si hay una seleccionada */}
            {selectedCoinId && (
              <CryptoDetail coinId={selectedCoinId} />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App

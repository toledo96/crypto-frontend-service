import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// 1. Configuracion del cliente de Axios
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000, // Tiempo de espera para las solicitudes
    headers: {
        "Content-Type": "application/json",
    },
});

// 2. Definicion de  las interfaces para que TypeScript conozca la estructura de tus DTOs de Java
export interface CoinMarketDto {
    id: string;
    symbol: string;
    name: string;
    image: string;
    currentPrice: number;
    marketCap: number;
    marketCapRank: number;
    priceChangePercentage24h: number;
}

export interface CoinDetailResponseDto {
    id: string;
    name: string;
    symbol: string;
    marketData: Record<string, any>;
    chartPrices: [number, number][];
}

export interface CoinChartDto {
    prices: [number, number][];
}

export interface ConversionResponseDto {
    fromCoin: string;
    toCoin: string;
    amount: number;
    result: number;
    timestamp: number;
}

// 3. Exportacion de las funciones del servicio totalmente tipadas
export const cryptoService = {
    getMarkets: async (currency: string = "usd"): Promise<CoinMarketDto[]> => {
        const response = await api.get<CoinMarketDto[]>("/markets", {
            params: { currency },
        });
        return response.data;
    },

    getCoinDetails: async (coinId: string): Promise<CoinDetailResponseDto> => {
        const response = await api.get<CoinDetailResponseDto>(
            `/coins/${coinId}/details`,
        );
        return response.data;
    },

    convertCrypto: async (
        from: string,
        to: string,
        amount: number,
    ): Promise<ConversionResponseDto> => {
        const response = await api.get<ConversionResponseDto>("/converter", {
            params: { from, to, amount },
        });
        return response.data;
    },
};

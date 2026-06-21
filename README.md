# 🚀 Crypto Service Dashboard - Frontend

Una interfaz moderna, responsiva y reactiva desarrollada en **React** y **TypeScript** para el monitoreo de criptomonedas en tiempo real, análisis de gráficos históricos y conversión precisa de divisas.

Este proyecto actúa como la capa de presentación que consume los servicios de nuestra arquitectura backend en Spring Boot.

---

## 🛠️ Tecnologías Utilizadas

* **React 18** & **TypeScript** (Tipado estricto de DTOs).
* **Vite** (Herramienta de construcción ultra rápida).
* **Tailwind CSS** (Estilizado moderno con soporte nativos para Dark Mode).
* **Recharts** (Gráficas vectoriales interactivas en SVG).
* **Axios** (Cliente HTTP para el consumo asíncrono de APIs).

---

## 💡 Características Principales

* **Mercados en Tiempo Real:** Tabla interactiva con ordenamiento de activos, precios actuales y porcentaje de variación en las últimas 24 horas.
* **Análisis Gráfico Dinámico:** Al hacer clic en cualquier fila de la tabla, se conecta al endpoint de detalles para renderizar una gráfica de área interactiva (`[timestamp, precio]`) con el histórico de la moneda.
* **Conversor Preciso (`/converter`):** Formulario integrado con validación de datos que calcula conversiones de cripto a fiat (y viceversa) interactuando con la lógica matemática del backend.

---

## ⚙️ Configuración e Instalación

1. Clona este repositorio:
   ```bash
   git clone [https://github.com/toledo96/crypto-frontend-service.git](https://github.com/toledo96/crypto-frontend-service.git)
  ```

2. Instala las dependencias de Node:
  ```
    npm install
  ```

3. Configura las variables de entorno (asegúrate de apuntar a tu backend de Spring Boot). Crea un archivo .env en la raíz:
  ```
  
    Fragmento de código
  
  VITE_API_BASE_URL=http://localhost:8080/api
  
  ```

4. Levanta el servidor de desarrollo:
  ```
    npm run dev
  ```

🔗 Proyecto Completo (Arquitectura Fullstack)
Este frontend requiere del ecosistema backend para funcionar. Puedes consultar el repositorio del servidor, la lógica de caché en Redis y las pruebas unitarias aquí:
👉 [https://github.com/toledo96/crypto-backend-service]
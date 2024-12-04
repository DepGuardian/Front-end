export const PagosSim = {
  alquiler: {
    proximoPago: 790.0,
    fechaVencimiento: "30/09/2024",
  },
  servicios: [
    { id: 1, nombre: "Luz", icon: "flash", color: "yellow" },
    { id: 2, nombre: "Internet", icon: "wifi", color: "blue" },
    { id: 3, nombre: "Agua", icon: "water", color: "cyan" },
  ],
  serviciosTotal: {
    precio: 250.0,
    fechaVencimiento: "25/09/2024",
    deuda: 0.0,
  },
  metodosPago: [
    { id: 1, logo: "https://example.com/bcp.png" },
    { id: 2, logo: "https://example.com/bbva.png" },
    { id: 3, logo: "https://example.com/mercadopago.png" },
    { id: 4, logo: "https://example.com/falabella.png" },
    { id: 5, logo: "https://example.com/paypal.png" },
  ],
};

export default PagosSim;

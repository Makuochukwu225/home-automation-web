# Home Automation Dashboard

A **Next.js** client component for managing and monitoring IoT devices via **WebSocket** and fallback **REST API**.

This dashboard connects to a WebSocket server to display devices, control their pins, and receive real-time updates. If the WebSocket connection is unavailable, it automatically falls back to fetching device data through a REST API.

---

## Features

- **Real-time device updates** via WebSocket
- **Fallback API fetch** for device data
- **Optimistic UI updates** when toggling pins
- **Reconnection logic** on WebSocket disconnection
- **Display device status** (online/offline)
- **Display pin states** (ON/OFF)
- **Display sensor data** (e.g., temperature, humidity)

---

## Technologies Used

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- WebSocket API
- REST API (fallback)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/home-automation-dashboard.git
cd home-automation-dashboard

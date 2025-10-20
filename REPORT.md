# Laporan Praktikum #4
### Web Service Development Methodologies (AGILE)

**Nama/NIM**: <Aisyah Safitri> / 230104040117
**Kelas**: <TI23B>
**Repo**: https://github.com/ayycee/P4-AGILE-230104040117
**Tanggal**: 20-10-2025

---
## 1. Tujuan Praktikum
[cite_start]Mendemonstrasikan siklus **Agile (Mini-Sprint)** untuk layanan web[cite: 9]:
- [cite_start]Design-First (OpenAPI) → Mock-First (Prism) → Test-First (Jest) → Implementasi (GREEN)[cite: 10, 74].
- [cite_start]CI (lint + typecheck + test) menggunakan GitHub Actions[cite: 11, 29].
- [cite_start]Hardening (observability & security)[cite: 12, 30].

---
## 2. Ringkasan Arsitektur
- [cite_start]**Services**: `order-service` & `notification-service`[cite: 21].
- [cite_start]**Kontrak**: `openapi/api.yaml` (Lulus lint 0 error)[cite: 22].
- [cite_start]**Testing**: Jest + Supertest[cite: 16].
- [cite_start]**CI**: GitHub Actions (`.github/workflows/ci.yml`)[cite: 29].
- [cite_start]**Observability**: Pino (JSON Logging) & `x-correlation-id`[cite: 18].
- [cite_start]**Security**: Auth Bearer (dummy), Helmet, Rate-Limit, Validasi (Zod)[cite: 17].

---
## 3. Hasil Utama & Bukti
- **Lint OpenAPI**: **LULUS (0 error, 0 warning)**.
- **Unit Test**: **LULUS (2 Suites, 5 tests passed)**.
- **CI (GitHub Actions)**: **HIJAU**. Lihat *screenshot* di `docs/ci_pass.png`.

#### Bukti Eksekusi (Log)
- **Mock-First Bukti**: Lihat di dalam folder `mock_logs/`.
- **Hardening Bukti**: Lihat di dalam folder `hardening_logs/`.

---
## 4. Verifikasi Skenario Hardening
| Skenario | Endpoint | Ekspektasi | Status | Bukti |
|---|---|---|---|---|
| 201 Created | `POST /orders` | 201 + `x-correlation-id` | ✅ | `hardening_logs/201_orders.txt` |
| 401 Unauthorized | `POST /orders` (tanpa bearer) | 401 `{message:"Unauthorized"}` | ✅ | `hardening_logs/401_orders.txt` |
| 400 Validation Error | `POST /orders` (quantity=0) | 400 `{message:"ValidationError"}` | ✅ | `hardening_logs/400_orders_validation.txt` |
| 400 Bad JSON | `POST /orders` (JSON rusak) | 400 `{message:"InvalidJSON"}` | ✅ | `hardening_logs/400_orders_badjson.txt` |
| 200 OK | `GET /notifications` | 200 `{data:[], total:n}` | ✅ | `hardening_logs/200_notifications.txt` |
| Security Headers | Response 200/201 | Helmet headers (CSP, X-Frame, dll) | ✅ | Lihat isi file log 200/201 |
| Redaksi Log | Log di Terminal | `authorization: [REDACTED]` | ✅ | Lihat output `npm test` |

---
## 5. Cara Reproduksi
```bash
# 1. Install dependencies
npm ci

# 2. Jalankan services di terminal terpisah
npm run dev:orders   # Port: 5002
npm run dev:notif    # Port: 5003

# 3. Jalankan pengecekan
npm test
npx spectral lint openapi/api.yaml
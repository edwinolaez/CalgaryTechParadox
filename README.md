# Calgary Tech Paradox v1.2

**A Market Intelligence Dashboard for Emerging Developers**

## 📊 The Concept

This project visualizes the "Junior Bottleneck" in Calgary's tech sector, comparing the supply of new graduates from **SAIT, UofC, and MRU** against the actual entry-level job demand.

## 🛠️ The Tech Stack

- **Orchestration:** [Dagster](https://dagster.io/) (Python)
- **Data Logic:** Pandas & Matplotlib
- **API:** GraphQL (Dagster Metadata Engine)
- **Frontend:** Next.js 15 (Turbopack)
- **Styling:** Tailwind CSS

## 🚀 Key Features

- **Live Sync:** Dashboard pulls metadata directly from Dagster's GraphQL endpoint.
- **Automated Insights:** Calculates a real-time "Tension Ratio" showing grads-per-job.
- **Data Lineage:** Full bronze-silver-gold asset pipeline.

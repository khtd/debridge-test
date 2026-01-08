# DLN Dashboard

Production-ready dashboard for **deBridge Liquidity Network (Solana)**: indexing, aggregation, and visualization of order events.

---

## Architecture
![Data flow](./data-flow.png)

- **Indexer**: scans Solana blocks, parses `OrderCreated` and `OrderFulfilled` events, stores them in the database.  
- **Aggregator**:  
  1. Completes orders with USD price  
  2. Calculates daily USD volume for created and fulfilled orders  
- **API**: exposes endpoints like `/api/daily-volume`  
- **Frontend**: SPA with interactive charts and date picker 

## Technologies

- **Backend**: Node.js + Hono + Effect.ts
- **Frontend**: React + Vite + Recharts + Nginx  
- **Database**: PostgreSQL  
- **Blockchain**: Solana (`@solana/web3.js` + `@coral-xyz/anchor`)  
- **DevOps**: Docker + docker-compose 

## Key Decisions

- **Price fetching** is mocked for test purposes instead of real CoinGecko API.  
- Aggregation runs in two layers: USD price enrichment, and daily volume computation.   
- Healthchecks included for DB and API
- All configuration (ports, DB URL) is environment-based via `.env`.  

## Running Locally
1. Clone the repository:
2. Create .env file (see `.env.example`)
3. Start services:
``` bash
docker-compose up --build -d
```

### IDL usage

DLN IDLs are included as a git submodule pointing to
https://github.com/debridge-finance/abis-and-idls

The submodule is pinned to a specific commit to ensure
deterministic parsing behavior.

####
How to update IDL
``` bash
git submodule update --init --recursive
```

IDL in the repo is not compatible with @coral-xyz/anchor v0.30 and higher, so it is not possible to use it with `solana-tx-parser-public`. I took liberty to update the IDl through anchor convert cli [doc](https://www.anchor-lang.com/docs/updates/release-notes/0-30-1#idl-convert-command)

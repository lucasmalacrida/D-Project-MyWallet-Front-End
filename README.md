# MyWallet (Front)

Front-end for MyWallet, a website for a virtual wallet.

## About

MyWallet is a web browser application where you can save and visualize the transactions of your wallet, that is, your cash flow.
Link to the deployed site : https://d-project-my-wallet-front-end.vercel.app/

## How to run for development

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Populate `.env` file based on `.env.example`. `VITE_API_URL` should point to your API server (driven.t-back)

4. Run the back-end in a development environment:

```bash
npm run start
```

## Building and starting for production

```bash
npm run build
npm start
```

## What to do when add new ENV VARIABLES

- Add them to `.env.example` file
- Add them to your local `.env` file

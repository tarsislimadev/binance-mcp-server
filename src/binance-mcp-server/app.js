#!/usr/bin/env node

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { CallToolRequestSchema, ListToolsRequestSchema } = require('@modelcontextprotocol/sdk/types.js');
const Binance = require('binance-api-node').default;
require('dotenv').config();

class BinanceMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'binance-mcp-server',
        version: '0.1.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.binance = null;
    this.isAuthenticated = false;
    this.setupToolHandlers();
    this.setupErrorHandling();
  }

  async initializeBinance() {
    const apiKey = process.env.BINANCE_API_KEY;
    const apiSecret = process.env.BINANCE_API_SECRET;

    if (!apiKey || !apiSecret) {
      throw new Error('BINANCE_API_KEY and BINANCE_API_SECRET must be set in environment variables');
    }

    this.binance = Binance({
      apiKey,
      apiSecret,
      test: process.env.BINANCE_TESTNET === 'true',
    });

    // Test connection
    try {
      await this.binance.accountInfo();
      this.isAuthenticated = true;
      console.error('✅ Successfully connected to Binance API');
    } catch (error) {
      throw new Error(`Failed to authenticate with Binance: ${error.message}`);
    }
  }

  setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'get_account_info',
            description: 'Get account information including balances and trading status',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'get_ticker_price',
            description: 'Get current price for a specific trading pair',
            inputSchema: {
              type: 'object',
              properties: {
                symbol: {
                  type: 'string',
                  description: 'Trading pair symbol (e.g., BTCUSDT)',
                },
              },
              required: ['symbol'],
            },
          },
          {
            name: 'get_ticker_24hr',
            description: 'Get 24hr ticker price change statistics for a symbol',
            inputSchema: {
              type: 'object',
              properties: {
                symbol: {
                  type: 'string',
                  description: 'Trading pair symbol (e.g., BTCUSDT)',
                },
              },
              required: ['symbol'],
            },
          },
          {
            name: 'get_order_book',
            description: 'Get order book depth for a trading pair',
            inputSchema: {
              type: 'object',
              properties: {
                symbol: {
                  type: 'string',
                  description: 'Trading pair symbol (e.g., BTCUSDT)',
                },
                limit: {
                  type: 'number',
                  description: 'Number of orders to return (5, 10, 20, 50, 100, 500, 1000, 5000)',
                  default: 100,
                },
              },
              required: ['symbol'],
            },
          },
          {
            name: 'get_recent_trades',
            description: 'Get recent trades for a trading pair',
            inputSchema: {
              type: 'object',
              properties: {
                symbol: {
                  type: 'string',
                  description: 'Trading pair symbol (e.g., BTCUSDT)',
                },
                limit: {
                  type: 'number',
                  description: 'Number of trades to return (max 1000)',
                  default: 500,
                },
              },
              required: ['symbol'],
            },
          },
          {
            name: 'place_order',
            description: 'Place a new order on Binance',
            inputSchema: {
              type: 'object',
              properties: {
                symbol: {
                  type: 'string',
                  description: 'Trading pair symbol (e.g., BTCUSDT)',
                },
                side: {
                  type: 'string',
                  enum: ['BUY', 'SELL'],
                  description: 'Order side',
                },
                type: {
                  type: 'string',
                  enum: ['LIMIT', 'MARKET', 'STOP_LOSS', 'STOP_LOSS_LIMIT', 'TAKE_PROFIT', 'TAKE_PROFIT_LIMIT', 'LIMIT_MAKER'],
                  description: 'Order type',
                },
                quantity: {
                  type: 'string',
                  description: 'Order quantity',
                },
                price: {
                  type: 'string',
                  description: 'Order price (required for LIMIT orders)',
                },
                timeInForce: {
                  type: 'string',
                  enum: ['GTC', 'IOC', 'FOK'],
                  description: 'Time in force (default: GTC)',
                  default: 'GTC',
                },
              },
              required: ['symbol', 'side', 'type', 'quantity'],
            },
          },
          {
            name: 'cancel_order',
            description: 'Cancel an existing order',
            inputSchema: {
              type: 'object',
              properties: {
                symbol: {
                  type: 'string',
                  description: 'Trading pair symbol (e.g., BTCUSDT)',
                },
                orderId: {
                  type: 'number',
                  description: 'Order ID to cancel',
                },
              },
              required: ['symbol', 'orderId'],
            },
          },
          {
            name: 'get_open_orders',
            description: 'Get all open orders for a symbol or all symbols',
            inputSchema: {
              type: 'object',
              properties: {
                symbol: {
                  type: 'string',
                  description: 'Trading pair symbol (optional, if not provided returns all open orders)',
                },
              },
            },
          },
          {
            name: 'get_order_history',
            description: 'Get order history for a symbol',
            inputSchema: {
              type: 'object',
              properties: {
                symbol: {
                  type: 'string',
                  description: 'Trading pair symbol (e.g., BTCUSDT)',
                },
                limit: {
                  type: 'number',
                  description: 'Number of orders to return (max 1000)',
                  default: 500,
                },
              },
              required: ['symbol'],
            },
          },
          {
            name: 'get_klines',
            description: 'Get candlestick/kline data for a symbol',
            inputSchema: {
              type: 'object',
              properties: {
                symbol: {
                  type: 'string',
                  description: 'Trading pair symbol (e.g., BTCUSDT)',
                },
                interval: {
                  type: 'string',
                  enum: ['1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '8h', '12h', '1d', '3d', '1w', '1M'],
                  description: 'Kline interval',
                  default: '1h',
                },
                limit: {
                  type: 'number',
                  description: 'Number of klines to return (max 1000)',
                  default: 500,
                },
              },
              required: ['symbol'],
            },
          },
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        if (!this.isAuthenticated) {
          await this.initializeBinance();
        }

        switch (name) {
          case 'get_account_info':
            return await this.getAccountInfo();
          case 'get_ticker_price':
            return await this.getTickerPrice(args.symbol);
          case 'get_ticker_24hr':
            return await this.getTicker24hr(args.symbol);
          case 'get_order_book':
            return await this.getOrderBook(args.symbol, args.limit);
          case 'get_recent_trades':
            return await this.getRecentTrades(args.symbol, args.limit);
          case 'place_order':
            return await this.placeOrder(args);
          case 'cancel_order':
            return await this.cancelOrder(args.symbol, args.orderId);
          case 'get_open_orders':
            return await this.getOpenOrders(args.symbol);
          case 'get_order_history':
            return await this.getOrderHistory(args.symbol, args.limit);
          case 'get_klines':
            return await this.getKlines(args.symbol, args.interval, args.limit);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error.message}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  async getAccountInfo() {
    const accountInfo = await this.binance.accountInfo();
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(accountInfo, null, 2),
        },
      ],
    };
  }

  async getTickerPrice(symbol) {
    const price = await this.binance.prices({ symbol });
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(price, null, 2),
        },
      ],
    };
  }

  async getTicker24hr(symbol) {
    const ticker = await this.binance.dailyStats({ symbol });
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(ticker, null, 2),
        },
      ],
    };
  }

  async getOrderBook(symbol, limit = 100) {
    const orderBook = await this.binance.book({ symbol, limit });
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(orderBook, null, 2),
        },
      ],
    };
  }

  async getRecentTrades(symbol, limit = 500) {
    const trades = await this.binance.trades({ symbol, limit });
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(trades, null, 2),
        },
      ],
    };
  }

  async placeOrder(orderParams) {
    const order = await this.binance.order({
      symbol: orderParams.symbol,
      side: orderParams.side,
      type: orderParams.type,
      quantity: orderParams.quantity,
      price: orderParams.price,
      timeInForce: orderParams.timeInForce || 'GTC',
    });
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(order, null, 2),
        },
      ],
    };
  }

  async cancelOrder(symbol, orderId) {
    const result = await this.binance.cancelOrder({ symbol, orderId });
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }

  async getOpenOrders(symbol) {
    const orders = await this.binance.openOrders({ symbol });
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(orders, null, 2),
        },
      ],
    };
  }

  async getOrderHistory(symbol, limit = 500) {
    const orders = await this.binance.allOrders({ symbol, limit });
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(orders, null, 2),
        },
      ],
    };
  }

  async getKlines(symbol, interval = '1h', limit = 500) {
    const klines = await this.binance.candles({ symbol, interval, limit });
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(klines, null, 2),
        },
      ],
    };
  }

  setupErrorHandling() {
    this.server.onerror = (error) => {
      console.error('[MCP Error]', error);
    };

    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('🚀 Binance MCP Server started successfully');
  }
}

// Start the server
const server = new BinanceMCPServer();
server.run().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

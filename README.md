# Binance MCP Server 🚀

A robust Model Context Protocol (MCP) server implementation that enables AI agents to seamlessly interact with the Binance cryptocurrency exchange. This server provides a standardized interface for accessing real-time market data, executing trading operations, and managing cryptocurrency portfolios through AI-driven applications.

## 🎯 Overview

The Binance MCP Server bridges the gap between AI agents and the Binance exchange by implementing the Model Context Protocol standard. It allows AI applications to perform sophisticated cryptocurrency trading operations, market analysis, and portfolio management tasks through a secure and standardized API interface.

## ✨ Key Features

- **🔐 Secure Authentication**: API key-based authentication with Binance for secure access
- **📊 Real-time Market Data**: Live price feeds, order book data, and comprehensive market statistics
- **💹 Trading Operations**: Support for placing, modifying, and canceling orders across spot markets
- **📈 Portfolio Management**: Account balance tracking, position monitoring, and order history
- **🛡️ Risk Management**: Built-in safeguards and validation mechanisms for trading operations
- **🤖 AI Integration**: Seamless integration with AI agents and frameworks through MCP standard
- **📈 Technical Analysis**: Candlestick/kline data for chart analysis and trading strategies

## 🛠️ Installation

### Prerequisites
- Node.js >= 18.0.0
- Binance API credentials (API Key and Secret)

### Setup

1. **Clone the repository**:
```bash
git clone https://github.com/tarsislimadev/binance-mcp-server.git
cd binance-mcp-server/src/binance-mcp-server
```

2. **Install dependencies**:
```bash
npm install
```

3. **Configure environment**:
Create a `.env` file in the project root with your Binance API credentials:
```env
BINANCE_API_KEY=your_api_key_here
BINANCE_API_SECRET=your_api_secret_here
BINANCE_TESTNET=true  # Optional: set to true for testnet
```

## 🚀 Usage

### Starting the Server

Start the MCP server:
```bash
npm start
# or
node app.js
```

The server will listen for connections via standard input/output (STDIO) and be ready to handle requests from AI agents.

### Development Mode

For development:
```bash
npm run dev
```

## 🔧 Available MCP Tools

The server provides the following tools for AI agents:

### 📊 Market Data Tools

#### `get_ticker_price`
Get current price for a specific trading pair.
```json
{
  "symbol": "BTCUSDT"
}
```

#### `get_ticker_24hr`
Get 24hr ticker price change statistics for a symbol.
```json
{
  "symbol": "BTCUSDT"
}
```

#### `get_order_book`
Get order book depth for a trading pair.
```json
{
  "symbol": "BTCUSDT",
  "limit": 100
}
```

#### `get_recent_trades`
Get recent trades for a trading pair.
```json
{
  "symbol": "BTCUSDT",
  "limit": 500
}
```

#### `get_klines`
Get candlestick/kline data for technical analysis.
```json
{
  "symbol": "BTCUSDT",
  "interval": "1h",
  "limit": 500
}
```

### 💹 Trading Tools

#### `place_order`
Place a new order on Binance.
```json
{
  "symbol": "BTCUSDT",
  "side": "BUY",
  "type": "LIMIT",
  "quantity": "0.001",
  "price": "50000",
  "timeInForce": "GTC"
}
```

#### `cancel_order`
Cancel an existing order.
```json
{
  "symbol": "BTCUSDT",
  "orderId": 123456789
}
```

#### `get_open_orders`
Get all open orders for a symbol or all symbols.
```json
{
  "symbol": "BTCUSDT"  // Optional: omit for all symbols
}
```

#### `get_order_history`
Get order history for a symbol.
```json
{
  "symbol": "BTCUSDT",
  "limit": 500
}
```

### 📈 Portfolio Management

#### `get_account_info`
Get account information including balances and trading status.
```json
{}
```

## 🔧 AI Agent Integration

This MCP server enables AI agents to:

- **Market Analysis**: Fetch real-time and historical market data for analysis
- **Automated Trading**: Execute trading strategies with various order types
- **Portfolio Monitoring**: Track account balances and positions in real-time
- **Risk Management**: Monitor open orders and implement stop-loss strategies
- **Technical Analysis**: Access candlestick data for chart analysis
- **Order Management**: Place, modify, and cancel orders programmatically

## 📋 Order Types Supported

- **LIMIT**: Place orders at specific price levels
- **MARKET**: Execute orders at current market price
- **STOP_LOSS**: Stop-loss orders for risk management
- **STOP_LOSS_LIMIT**: Stop-loss with limit price
- **TAKE_PROFIT**: Take-profit orders
- **TAKE_PROFIT_LIMIT**: Take-profit with limit price
- **LIMIT_MAKER**: Post-only limit orders

## ⏰ Time in Force Options

- **GTC** (Good Till Canceled): Order remains active until filled or canceled
- **IOC** (Immediate or Cancel): Order must be filled immediately or canceled
- **FOK** (Fill or Kill): Order must be filled completely or canceled

## 📊 Kline Intervals

Available intervals for candlestick data:
- `1m`, `3m`, `5m`, `15m`, `30m`
- `1h`, `2h`, `4h`, `6h`, `8h`, `12h`
- `1d`, `3d`, `1w`, `1M`

## 🛡️ Security Features

- **Environment Variables**: Secure credential storage
- **API Key Validation**: Automatic connection testing
- **Error Handling**: Comprehensive error management
- **Input Validation**: Parameter validation for all tools
- **Testnet Support**: Safe testing environment

## 🐳 Docker Support

The project includes Docker configuration for easy deployment:

```bash
docker-compose up
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This software is for educational and research purposes. Cryptocurrency trading involves substantial risk of loss. Use at your own risk and never trade with money you cannot afford to lose.

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/tarsislimadev/binance-mcp-server/issues)
- **Documentation**: [Project Wiki](https://github.com/tarsislimadev/binance-mcp-server/wiki)

## 🔗 Related Projects

- [Model Context Protocol](https://github.com/modelcontextprotocol)
- [Binance API Documentation](https://binance-docs.github.io/apidocs/)
- [binance-api-node](https://github.com/binance-exchange/binance-api-node)

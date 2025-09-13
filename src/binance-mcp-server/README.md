# [@tarsislimadev/binance-mcp-server](https://github.com/tarsislimadev/binance-mcp-server)

A robust Model Context Protocol (MCP) server implementation that enables AI agents to seamlessly interact with the Binance cryptocurrency exchange. This server provides a standardized interface for accessing real-time market data, executing trading operations, and managing cryptocurrency portfolios through AI-driven applications.

## Quick Start

This server follows the Model Context Protocol (MCP) specification and can be integrated with any MCP-compatible client. The server communicates via stdio transport.

### Example MCP Client Configuration

If you're using an MCP client, you can configure it to use this server:

```json
{
  "mcpServers": {
    "binance": {
      "command": "npx",
      "args": ["-y", "@tarsislimadev/binance-mcp-server"],
      "env": {
        "BINANCE_TESTNET": "false"
      }
    }
  }
}
```

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **Issues**: [GitHub Issues](https://github.com/tarsislimadev/binance-mcp-server/issues)
- **NPM Package**: [@tarsislimadev/binance-mcp-server](https://www.npmjs.com/package/@tarsislimadev/binance-mcp-server)
- **Repository**: [GitHub Repository](https://github.com/tarsislimadev/binance-mcp-server)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Disclaimer

This software is for educational and informational purposes only. Cryptocurrency trading involves substantial risk of loss and is not suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to trade cryptocurrency, you should carefully consider your investment objectives, level of experience, and risk appetite.

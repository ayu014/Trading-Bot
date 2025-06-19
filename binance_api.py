import requests

def fetch_binance_symbols():
    """Fetch all trading symbols from Binance"""
    try:
        response = requests.get('https://api.binance.com/api/v3/exchangeInfo')
        data = response.json()
        symbols = [s['symbol'] for s in data['symbols'] if s['status'] == 'TRADING']
        # print(symbols)
        return symbols[:50]  # Limit to first 50 for simplicity
    except Exception as e:
        print("API_Error")
        return []

# fetch_binance_symbols()

def get_binance_price(symbol):
    """Get current price for a specific symbol"""
    # print(symbol)
    try:
        url = f'https://api.binance.com/api/v3/ticker/price?symbol={symbol}'
        response = requests.get(url)
        data = response.json()
        return float(data['price'])
        
    except Exception as e:
        return None
    
get_binance_price("NEOBTC")
Tokenization lets customers make repeat payments without re-entering card details. Merchants can initiate future online transactions using the stored tokenized card information via Merchant Initiated Transaction set as online terminal. 

How it works:

- **Initial payment:** Set `enforceTokenization` to `true` when creating the order
- **Save the token:** Store the token from the order response
- **Future payments:** Use the saved token for merchant-initiated transactions through the online payment terminal
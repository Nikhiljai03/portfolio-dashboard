# Challenges I Faced

# Problem - Tata Consumer's code in the sheet (532540) actually belongs to TCS. the market cap in the sheet was about ₹13 lakh crore, which is TCS's size.
# Fix: used the correct code, 500800.

# Problem: asking Yahoo for 532174.BO returned no data. tested all 26 stocks. Only the NSE ticker names worked.
# added a yahooSymbol field with the ticker name, for example ICICIBANK.NS

# Problem: LTIMindtree is now listed as LTM, and Savani Financials is now Mantra Capital, so the old symbols returned nothing
# Used the current symbols LTM.NS, 511577.BO


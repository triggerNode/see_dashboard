# Metrics Guide for {s}ee Dashboard

This document explains the financial metrics and calculations used in {s}ee Dashboard for Roblox game development studios.

## 🎯 Overview

{s}ee Dashboard provides comprehensive financial intelligence specifically designed for Roblox developers. All metrics are calculated to give you true insight into your game's profitability and performance.

## 💰 Core Financial Metrics

### Net Profit (USD)

**The most important metric for any game developer**

```
Net Profit = (Total Robux Revenue × DevEx Rate) + Direct USD Revenue
           - (Total Robux Costs × DevEx Rate) - Total USD Costs
```

**Components:**

-   **Total Robux Revenue**: All Robux earned from Game Passes, Dev Products, and Premium Payouts
-   **DevEx Rate**: Current Developer Exchange rate (approximately $0.0035 per Robux)
-   **Direct USD Revenue**: Revenue from sponsorships, partnerships, or other non-Robux sources
-   **Total Robux Costs**: Marketing spend and other costs paid in Robux
-   **Total USD Costs**: External costs like software subscriptions, contractor payments, etc.

### Gross Revenue (USD)

**Total income before expenses**

```
Gross Revenue = (Total Robux Revenue × DevEx Rate) + Direct USD Revenue
```

### Total Costs (USD)

**All expenses converted to USD**

```
Total Costs = (Total Robux Costs × DevEx Rate) + Total USD Costs
```

### Effective Take-Home Rate

**Your actual revenue share after marketplace fees**

```
Effective Revenue Share = (Robux Revenue After Marketplace Fee × DevEx Rate)
                        / (Gross Robux Revenue / 0.7 × Avg Robux Purchase Price USD)
```

This metric shows your true revenue share compared to Roblox's 30% marketplace fee.

## 📊 Dashboard-Specific Metrics

### Ecommerce Dashboard

#### Revenue Source Breakdown

Tracks where your money comes from:

-   **Game Pass Revenue**: One-time purchases
-   **Dev Product Revenue**: Consumable purchases
-   **Premium Payouts**: Revenue from Premium subscribers
-   **Direct USD Revenue**: External revenue sources

#### Top Monetizing Items

Shows which of your game assets generate the most revenue, helping you focus development efforts.

### Analytics Dashboard

#### Daily Active Users (DAU) Correlation

```
Correlation(Net Profit, Daily Active Users)
```

Shows how player engagement directly impacts your bottom line.

#### Project Profit & Loss (P&L)

```
Project Net Profit = Project Gross Revenue - Allocated Shared Costs - Project-Direct Costs
```

**Allocation Method:**

-   Shared costs (studio rent, general software licenses) are allocated based on development time spent on each project
-   Direct costs (project-specific assets, marketing) are attributed directly

### Project Dashboard

#### Developer Cost Breakdown

```
Cost per Category = SUM(Logged Dev Hours × Hourly Rate) by category
```

**Categories:**

-   Programming
-   Art & Design
-   Game Design
-   Marketing
-   Quality Assurance
-   Management

#### Monthly Burn Rate

```
Monthly Burn Rate = Fixed Monthly Salaries + Avg Monthly Contractor Costs
                  + Avg Monthly Software Subscriptions
```

Critical for runway calculation and financial planning.

### Marketing Dashboard

#### Return on Ad Spend (ROAS)

```
ROAS = (Revenue from Ad-Acquired Users - Ad Spend USD) / Ad Spend USD
```

Shows the effectiveness of your marketing campaigns.

## 🔧 Configuration

### Setting Up Metrics

1. **Configure DevEx Rate**

    - Update the current rate in your settings
    - Historical rates are maintained for accurate back-calculations

2. **Manual Cost Entry**

    - Use the cost entry forms to track external expenses
    - Categorize costs for proper attribution

3. **Revenue Attribution**
    - Set up tracking for different revenue sources
    - Configure project allocation rules

### Metric Refresh Frequencies

| Metric          | Refresh Frequency | Source               |
| --------------- | ----------------- | -------------------- |
| Net Profit      | Daily             | Calculated           |
| DAU             | Daily             | Roblox Analytics API |
| Developer Costs | Real-time         | Manual entry         |
| Revenue Data    | Daily             | Roblox Analytics API |
| Ad Spend        | Manual            | Manual entry         |

## 📈 Understanding Your Data

### Revenue Trends

-   **Upward Trend**: Growing player base or improved monetization
-   **Downward Trend**: Declining engagement or market saturation
-   **Seasonal Patterns**: School holidays, summer breaks, etc.

### Cost Analysis

-   **High Developer Costs**: May indicate inefficient processes or need for tooling
-   **Marketing ROI**: Track which campaigns generate the best return
-   **Operational Efficiency**: Monitor burn rate vs. revenue growth

### Profitability Insights

-   **Profit Margins**: Track percentage of revenue that becomes profit
-   **Break-even Analysis**: Understand minimum revenue needed to cover costs
-   **Growth Investment**: Balance current profit vs. investment in growth

## 🎮 Game Development Specific Metrics

### Player Lifetime Value (LTV)

```
Player LTV = Average Revenue per Player / Player Churn Rate
```

### Player Acquisition Cost (PAC)

```
PAC = Total Marketing Spend / Number of New Players Acquired
```

### Development Cost per Player

```
Development Cost per Player = Total Development Costs / Total Players
```

## 🔍 Advanced Calculations

### Revenue Forecasting

Based on historical data and growth trends:

```
Forecasted Revenue = Current Monthly Revenue × (1 + Growth Rate)^Months
```

### Profitability Projections

```
Future Profit = Forecasted Revenue - (Fixed Costs + Variable Costs × Revenue)
```

### Studio Valuation Metrics

```
Monthly Recurring Revenue (MRR) = Consistent monthly revenue
Annual Recurring Revenue (ARR) = MRR × 12
```

## 📋 Best Practices

### Data Quality

1. **Regular Updates**: Keep DevEx rates current
2. **Complete Cost Tracking**: Don't miss external expenses
3. **Accurate Time Logging**: Essential for proper cost allocation
4. **Revenue Attribution**: Properly categorize all income sources

### Analysis Workflow

1. **Daily Monitoring**: Check key metrics daily
2. **Weekly Reviews**: Analyze trends and patterns
3. **Monthly Planning**: Use insights for strategic decisions
4. **Quarterly Assessments**: Review and adjust metric configurations

### Common Pitfalls

-   **Ignoring Hidden Costs**: Platform fees, payment processing, etc.
-   **Inaccurate Time Tracking**: Leads to poor cost allocation
-   **Mixing Personal and Business Expenses**: Keep them separate
-   **Not Accounting for Taxes**: Factor in income tax implications

## 🚀 Optimization Strategies

### Revenue Optimization

-   Focus development on highest-performing game features
-   Optimize pricing based on player response
-   Improve conversion rates for free-to-paid players

### Cost Optimization

-   Identify and eliminate wasteful spending
-   Negotiate better rates for recurring services
-   Improve development efficiency to reduce labor costs

### Profitability Improvement

-   Balance feature development with monetization
-   Optimize marketing spend for best ROAS
-   Consider revenue diversification strategies

## 🔄 DevEx Rate Source & Calculation

Starting **2024-07-02**, the DevEx (Developer Exchange) rate is pulled automatically from the official Roblox _Exchange Robux for Real Money_ FAQ every 24 hours by a Supabase Edge Function (`scrapeDevexRate`).

### How we calculate the rate

1. The function downloads the FAQ HTML and extracts the USD amount for **100 000 Robux** (e.g. `$350.00`).
2. The value is divided by `100 000` to yield the USD-per-Robux rate.
3. A new record is stored in the `public.devex_rates` table with the source URL and timestamp.
4. All financial metrics that rely on currency conversion pick the **latest** rate via the `/api/devex/latest` endpoint (10 min cache).

If the scrape fails, the system safely falls back to the historical average of **$0.0035 / Robux** until the next successful run.

> ℹ️ Historical rate snapshots allow retro-active financial calculations to stay accurate even when Roblox changes the payout value.

---

This metrics guide helps you make data-driven decisions for your Roblox game development studio. For specific implementation questions, refer to our [technical documentation](../ARCHITECTURE.md).

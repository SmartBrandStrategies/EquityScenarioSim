# Cap Table Simulator

A sophisticated cap table simulator designed to model partnership negotiations and understand the financial impact of bringing on new partners. Adjust deal structures, vesting schedules, and performance milestones to see real-time effects on ownership percentages and exit payouts.

## Features

- **Two Partnership Paths**: Compare different deal structures (Path A and Path B)
- **Flexible Investment Vehicles**: Model priced rounds or SAFEs with custom valuations
- **Milestone-Based Vesting**: Performance equity that unlocks based on real business milestones
- **Dynamic Cap Table**: Live visualization of ownership distribution as you adjust parameters
- **Exit Calculator**: Simulate exit payouts at different valuations
- **Strategic Guardrails**: Built-in warnings for common deal structure pitfalls
  - Partner equity caps (max 12%)
  - Minimum employee option pool (min 8%)
- **Founder Flexibility**: Model multiple founders with custom equity splits

## Getting Started

### Prerequisites

- Node.js (v18+)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd EquityScenarioSim
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to the URL shown in the terminal (typically `http://localhost:5173`)

## Development

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build locally

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS

## Project Structure

- `App.tsx` - Main application component with core cap table logic
- `components/` - Reusable UI components
- `types.ts` - TypeScript type definitions
- `index.tsx` - Application entry point

## How It Works

The simulator allows you to:
1. **Select a partnership path** with different vesting and equity terms
2. **Configure investment terms** (amount, valuation, vehicle type)
3. **Set up founders** with initial equity splits
4. **Track milestones** to unlock performance-based equity
5. **Monitor the cap table** in real-time as values change
6. **Compare exit outcomes** across different scenarios

## Credits

Designed & Powered by [smartbrandstrategies.com](https://smartbrandstrategies.com)

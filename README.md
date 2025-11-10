# Cap Table Simulator

A sophisticated cap table simulator designed to model partnership negotiations and understand the financial impact of bringing on new partners. Adjust deal structures, vesting schedules, and performance milestones to see real-time effects on ownership percentages and exit payouts.

## Features

### Core Modeling
- **Two Partnership Paths**: Compare different deal structures (Path A and Path B)
- **Flexible Investment Vehicles**: Model priced rounds or SAFEs with custom valuations
- **Milestone-Based Vesting**: Performance equity that unlocks based on real business milestones
- **Dynamic Cap Table**: Live visualization of ownership distribution as you adjust parameters
- **Founder Flexibility**: Model multiple founders with custom equity splits

### Analysis & Planning
- **Exit Waterfall**: Detailed exit scenario modeling with conservative/base/optimistic cases
- **Milestone Timeline**: Interactive visualization of vesting schedule and performance milestones
- **Pool Target Planning**: Set desired option pool percentage with actionable recommendations
- **Equity Breakdown**: Clear visualization of partner, founder, and pool equity distribution
- **Exit Payouts**: Calculate exact dollar amounts each stakeholder receives at different valuations

### Scenario Management
- **Save Scenarios**: Store deal structures with names and descriptions
- **Scenario History**: Access saved scenarios with timestamps
- **Quick Comparison**: Foundation for comparing multiple deal structures
- **Persistent Storage**: Scenarios saved in browser for future reference

### Safety & Guardrails
- **Strategic Guardrails**: Built-in warnings for common deal structure pitfalls
  - Partner equity caps (max 12%)
  - Minimum employee option pool (min 8%)
  - Founder concentration risks
  - Founder equity disparity checks
- **Health Indicators**: Visual feedback on option pool adequacy

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
6. **Plan your option pool** target and get recommendations
7. **Model exit scenarios** with different valuations
8. **Visualize vesting timeline** and milestone achievements
9. **Save scenarios** for later reference and comparison

## Interface Layout

The app uses a responsive 4-column design:

- **Column 1: Inputs & Configuration** - Set up the founders, timeline, and milestones
- **Column 2: Deal Configuration** - Configure investment terms, investment vehicle, and option pool targets
- **Column 3: Outcomes & Analysis** - View comparison summaries, scenario details, and vesting timeline
- **Column 4: Exit Analysis & Management** - Model exit scenarios, calculate payouts, and save/manage scenarios

On smaller screens, columns stack responsively for optimal viewing.

## License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

MIT License means you can:
- ✅ Use commercially
- ✅ Modify the code
- ✅ Distribute copies
- ✅ Use privately
- ✅ Sublicense

The only requirement is to include the original license and copyright notice.

## Contributing

Contributions are welcome! Feel free to:
- Submit issues for bugs or feature requests
- Fork the repository and submit pull requests
- Share improvements and enhancements

## Open Source

This project is fully open sourced and available for anyone to use, modify, and distribute. The source code is maintained on GitHub and welcomes community contributions.

## Credits

- **Original Design & Development**: [smartbrandstrategies.com](https://smartbrandstrategies.com)
- **Technology Stack**: React 19, TypeScript, Vite, Tailwind CSS
- **Community**: Thanks to all contributors and users

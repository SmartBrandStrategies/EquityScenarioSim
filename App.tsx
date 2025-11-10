import React, { useState, useMemo } from 'react';
import PathSelector from './components/PathSelector';
import CapTableView from './components/CapTableView';
import VestingClock from './components/VestingClock';
import MilestoneControls from './components/MilestoneControls';
import PartnerCapitalInfusion from './components/JaviersCapitalInfusion';
import ExitCalculator from './components/ExitCalculator';
import Warnings from './components/Warnings';
import ComparisonPanel from './components/ComparisonPanel';
import FounderSetup from './components/FounderSetup';
import { Path, Milestones, CapTableEntry, InvestmentVehicle, Founder } from './types';

const initialFounders: Founder[] = [
  { id: '1', name: 'Founder 1', equity: 45 },
  { id: '2', name: 'Founder 2', equity: 45 },
];

function App() {
  // State Management
  const [selectedPath, setSelectedPath] = useState<Path>('A');
  const [monthsElapsed, setMonthsElapsed] = useState<number>(0);
  const [milestones, setMilestones] = useState<Milestones>({
    capitalRaised: false,
    mrrTarget: false,
  });
  const [investment, setInvestment] = useState<number>(50000);
  const [investmentVehicle, setInvestmentVehicle] = useState<InvestmentVehicle>('priced');
  const [preMoneyValuation, setPreMoneyValuation] = useState<number>(300000);
  const [valuationCap, setValuationCap] = useState<number>(550000);
  const [founders, setFounders] = useState<Founder[]>(initialFounders);
  
  // Constants
  const STRATEGIC_CAP = 12; // Partner's equity should not exceed 12%
  const POOL_MINIMUM = 8; // Unallocated pool should be at least 8%

  // Memoized Calculations
  const calculations = useMemo(() => {
    // Investment-based Equity
    let investmentEquity = 0;
    let investmentTooltipPrefix = '';
    if (investmentVehicle === 'priced') {
      const postMoneyValuation = preMoneyValuation + investment;
      investmentEquity = (investment / postMoneyValuation) * 100;
      investmentTooltipPrefix = `Purchased (Priced Round): ${investmentEquity.toFixed(2)}%`;
    } else { // 'safe'
      investmentEquity = (investment / valuationCap) * 100;
      investmentTooltipPrefix = `From SAFE: ${investmentEquity.toFixed(2)}%`;
    }

    // Path-dependent variables
    const vestingPeriod = selectedPath === 'A' ? 24 : 48;
    const cliff = selectedPath === 'A' ? 3 : 12;
    const baseGrant = 5.0;
    
    // Performance Equity (Path B only)
    let performanceGrant = 0;
    if (selectedPath === 'B') {
      if (milestones.capitalRaised) performanceGrant += 2.5;
      if (milestones.mrrTarget) performanceGrant += 2.5;
    }
    const totalGrantEquity = baseGrant + performanceGrant;

    // Vesting Calculation
    const cliffMet = monthsElapsed >= cliff;
    const vestedGrantPercentage = cliffMet ? (monthsElapsed / vestingPeriod) : 0;
    // Cap vesting at 100% of the grant
    const vestedGrantEquity = totalGrantEquity * Math.min(vestedGrantPercentage, 1);
    
    const partnerTotalEquity = investmentEquity + vestedGrantEquity;

    // Dilution Calculation
    const dilutionFactor = 1 - (partnerTotalEquity / 100);
    
    const dilutedFounders = founders.map(f => ({
      ...f,
      dilutedEquity: f.equity * dilutionFactor,
    }));
    const totalDilutedFounderEquity = dilutedFounders.reduce((sum, f) => sum + f.dilutedEquity, 0);

    const unallocatedPool = 100 - totalDilutedFounderEquity - partnerTotalEquity;

    // Cap Table Data
    const founderEntries: CapTableEntry[] = dilutedFounders.map(founder => ({
      shareholder: founder.name,
      equity: founder.dilutedEquity,
      color: 'hsl(142.1 76.2% 46.5%)',
      tooltip: "Founder"
    }));

    const capTableData: CapTableEntry[] = [
      ...founderEntries,
      { 
        shareholder: 'Partner',
        equity: partnerTotalEquity,
        color: selectedPath === 'A' ? 'hsl(221.2 83.2% 53.3%)' : 'hsl(346.8 77.2% 49.8%)',
        tooltip: `${investmentTooltipPrefix}, Vested Grant: ${vestedGrantEquity.toFixed(2)}%`
      },
      { shareholder: 'Unallocated Pool', equity: unallocatedPool, color: 'hsl(220 8.9% 46.1%)', tooltip: "Reserved for future hires and advisors. This is often called an 'Employee Option Pool' and is critical for attracting talent." },
    ];
    
    const partnerTotalPotentialEquity = investmentEquity + totalGrantEquity;
    
    const foundersForExitCalc = dilutedFounders.map(f => ({ name: f.name, dilutedEquity: f.dilutedEquity }));

    return {
      capTableData,
      foundersForExitCalc,
      partnerTotalEquity,
      unallocatedPool,
      partnerTotalPotentialEquity,
    };
  }, [selectedPath, monthsElapsed, milestones, investment, preMoneyValuation, investmentVehicle, valuationCap, founders]);

  const { capTableData, foundersForExitCalc, partnerTotalEquity, unallocatedPool, partnerTotalPotentialEquity } = calculations;

  // Strategic Guardrail Checks
  const isPartnerOverCap = partnerTotalPotentialEquity > STRATEGIC_CAP;
  const isPoolTooSmall = unallocatedPool < POOL_MINIMUM;

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Equity Scenario Modeler</h1>
          <p className="mt-3 text-lg text-gray-400 max-w-3xl mx-auto">This tool helps you understand the financial impact of bringing on a new partner. Adjust the sliders and settings below to see how different deal structures affect your company's ownership (cap table) and potential exit payouts.</p>
        </header>

        <div className="max-w-md mx-auto mb-8">
          <PathSelector selectedPath={selectedPath} setSelectedPath={setSelectedPath} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Controls */}
          <div className="lg:col-span-1 space-y-8">
            <VestingClock 
              monthsElapsed={monthsElapsed}
              setMonthsElapsed={setMonthsElapsed}
              selectedPath={selectedPath}
            />
            <MilestoneControls 
              milestones={milestones}
              setMilestones={setMilestones}
              isDisabled={selectedPath === 'A'}
            />
          </div>

          {/* Middle Column: Core Deal & Cap Table */}
          <div className="lg:col-span-1 space-y-8">
            <FounderSetup founders={founders} setFounders={setFounders} />
            <PartnerCapitalInfusion 
              investment={investment}
              setInvestment={setInvestment}
              preMoneyValuation={preMoneyValuation}
              setPreMoneyValuation={setPreMoneyValuation}
              investmentVehicle={investmentVehicle}
              setInvestmentVehicle={setInvestmentVehicle}
              valuationCap={valuationCap}
              setValuationCap={setValuationCap}
            />
            <CapTableView data={capTableData} title="Live Cap Table" />
          </div>

          {/* Right Column: Outcomes & Warnings */}
          <div className="lg:col-span-1 space-y-8">
            <ComparisonPanel
                selectedPath={selectedPath}
                partnerTotalPotentialEquity={partnerTotalPotentialEquity}
            />
            <ExitCalculator
              selectedPath={selectedPath}
              partnerVestedEquity={partnerTotalEquity}
              founders={foundersForExitCalc}
            />
             <Warnings
                isPartnerOverCap={isPartnerOverCap}
                isPoolTooSmall={isPoolTooSmall}
                partnerTotalPotentialEquity={partnerTotalPotentialEquity}
                unallocatedPool={unallocatedPool}
                selectedPath={selectedPath}
                milestones={milestones}
                monthsElapsed={monthsElapsed}
            />
          </div>
        </div>
        <footer className="text-center py-8 text-gray-500 text-sm">
            Designed & Powered by <a href="https://smartbrandstrategies.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 underline transition-colors">smartbrandstrategies.com</a>
        </footer>
      </div>
    </div>
  );
}

export default App;

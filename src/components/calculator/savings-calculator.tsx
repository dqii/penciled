"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface CalculatorInputs {
  // Baseline clinic metrics
  activePatients: number;
  noShowRate: number;
  cancellationRate: number;
  avgVisitsPerPatient: number;
  avgRevenuePerVisit: number;
  cancellationFee: number;
  cancellationFeeApplicationRate: number;
  noShowFee: number;
  costPerReminderText: number;
  monthlySalaryPerFrontOffice: number;
  numberOfFrontOfficeEmployees: number;

  // Front office performance
  avgPlanOfCareScheduled: number;
  currentCancellationBackfillRate: number;
  noShowFeeCollectionRate: number;
  cancellationFeeCollectionRate: number;

  // Penciled features (toggles)
  calendarInvites: boolean;
  automatedReviewCollection: boolean;
  automatedReminders: boolean;
  automatedWaitlist: boolean;
  automatedPlanOfCare: boolean;
  automatedRescheduling: boolean;
  automatedNoShowFeeCollection: boolean;
  automatedCancellationFeeCollection: boolean;
}

interface CalculatorResults {
  withoutPenciled: {
    visitsScheduled: number;
    visitsOccurred: number;
    revenue: number;
    cancellationFeesCollected: number;
    noShowFeesCollected: number;
    totalRevenue: number;
    frontOfficeStaffExpense: number;
    reminderTextExpense: number;
    totalCosts: number;
    netRevenue: number;
  };
  withPenciled: {
    activePatients: number;
    visitsScheduled: number;
    visitsOccurred: number;
    revenue: number;
    cancellationFeesCollected: number;
    noShowFeesCollected: number;
    totalRevenue: number;
    frontOfficeStaffExpense: number;
    reminderTextExpense: number;
    totalCosts: number;
    netRevenue: number;
    cancellationRate: number;
    noShowRate: number;
    planOfCareScheduled: number;
    cancellationBackfillRate: number;
    noShowFeeCollectionRate: number;
    cancellationFeeCollectionRate: number;
    frontOfficeStaff: number;
    reminderTexts: number;
  };
  savingsPerMonth: number;
}

export function SavingsCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    activePatients: 250,
    noShowRate: 10,
    cancellationRate: 20,
    avgVisitsPerPatient: 10,
    avgRevenuePerVisit: 80,
    cancellationFee: 35,
    cancellationFeeApplicationRate: 50,
    noShowFee: 100,
    costPerReminderText: 0.02,
    monthlySalaryPerFrontOffice: 3000,
    numberOfFrontOfficeEmployees: 3,
    avgPlanOfCareScheduled: 40,
    currentCancellationBackfillRate: 10,
    noShowFeeCollectionRate: 30,
    cancellationFeeCollectionRate: 20,
    calendarInvites: true,
    automatedReviewCollection: true,
    automatedReminders: true,
    automatedWaitlist: true,
    automatedPlanOfCare: true,
    automatedRescheduling: true,
    automatedNoShowFeeCollection: true,
    automatedCancellationFeeCollection: true,
  });

  const [results, setResults] = useState<CalculatorResults | null>(null);

  useEffect(() => {
    calculateResults();
  }, [inputs]);

  const calculateResults = () => {
    const baseVisits = 1000; // Monthly visits baseline

    // Without Penciled calculations
    const withoutVisitsScheduled = baseVisits;
    const withoutCancellations =
      withoutVisitsScheduled * (inputs.cancellationRate / 100);
    const withoutNoShows =
      (withoutVisitsScheduled - withoutCancellations) *
      (inputs.noShowRate / 100);
    const withoutVisitsOccurred =
      withoutVisitsScheduled - withoutCancellations - withoutNoShows;
    const withoutRevenue = withoutVisitsOccurred * inputs.avgRevenuePerVisit;

    const withoutCancellationFees =
      withoutCancellations *
      (inputs.cancellationFeeApplicationRate / 100) *
      inputs.cancellationFee *
      (inputs.cancellationFeeCollectionRate / 100);
    const withoutNoShowFees =
      withoutNoShows *
      inputs.noShowFee *
      (inputs.noShowFeeCollectionRate / 100);

    const withoutFrontOfficeExpense =
      inputs.monthlySalaryPerFrontOffice * inputs.numberOfFrontOfficeEmployees;
    const withoutReminderExpense = baseVisits * inputs.costPerReminderText;

    // With Penciled calculations - apply improvements
    let withActivePatients = inputs.activePatients;
    let withVisitsScheduled = baseVisits;
    let withCancellationRate = inputs.cancellationRate;
    let withNoShowRate = inputs.noShowRate;
    let withPlanOfCareScheduled = inputs.avgPlanOfCareScheduled;
    let withCancellationBackfillRate = inputs.currentCancellationBackfillRate;
    let withNoShowFeeCollectionRate = inputs.noShowFeeCollectionRate;
    let withCancellationFeeCollectionRate =
      inputs.cancellationFeeCollectionRate;
    let withFrontOfficeStaff = inputs.numberOfFrontOfficeEmployees;
    let withReminderTexts = baseVisits;

    // Apply feature impacts
    if (inputs.automatedReviewCollection) {
      withActivePatients += inputs.activePatients * 0.1; // 10% increase
    }

    if (inputs.calendarInvites) {
      withCancellationRate *= 0.9; // 10% reduction
      withNoShowRate *= 0.8; // 20% reduction
    }

    if (inputs.automatedReminders) {
      withCancellationRate *= 0.75; // 25% reduction
      withNoShowRate *= 0.6; // 40% reduction
      withReminderTexts = 0; // No manual texts needed
    }

    if (inputs.automatedRescheduling) {
      withCancellationRate *= 0.8; // 20% reduction
      withVisitsScheduled *= 1.1; // 10% increase in scheduled visits
    }

    if (inputs.automatedWaitlist) {
      withCancellationBackfillRate += 50; // 50% point increase
    }

    if (inputs.automatedPlanOfCare) {
      withPlanOfCareScheduled += withPlanOfCareScheduled * 0.3; // 30% increase
      withVisitsScheduled *= 1.4; // 40% increase in scheduled visits
    }

    if (inputs.automatedNoShowFeeCollection) {
      withNoShowFeeCollectionRate = 90; // 200% improvement to 90%
    }

    if (inputs.automatedCancellationFeeCollection) {
      withCancellationFeeCollectionRate = 80; // 300% improvement to 80%
    }

    // Reduce front office staff need
    if (inputs.automatedReminders && inputs.automatedWaitlist) {
      withFrontOfficeStaff = Math.max(
        1,
        inputs.numberOfFrontOfficeEmployees - 1
      ); // -33% staff
    }

    // Calculate with Penciled results
    const withCancellations =
      withVisitsScheduled * (withCancellationRate / 100);
    const withBackfilled =
      withCancellations * (withCancellationBackfillRate / 100);
    const withActualCancellations = withCancellations - withBackfilled;
    const withNoShows =
      (withVisitsScheduled - withActualCancellations) * (withNoShowRate / 100);
    const withVisitsOccurred =
      withVisitsScheduled - withActualCancellations - withNoShows;
    const withRevenue = withVisitsOccurred * inputs.avgRevenuePerVisit;

    const withCancellationFees =
      withActualCancellations *
      (inputs.cancellationFeeApplicationRate / 100) *
      inputs.cancellationFee *
      (withCancellationFeeCollectionRate / 100);
    const withNoShowFees =
      withNoShows * inputs.noShowFee * (withNoShowFeeCollectionRate / 100);

    const withFrontOfficeExpense =
      inputs.monthlySalaryPerFrontOffice * withFrontOfficeStaff;
    const withReminderExpense = withReminderTexts * inputs.costPerReminderText;

    setResults({
      withoutPenciled: {
        visitsScheduled: Math.round(withoutVisitsScheduled),
        visitsOccurred: Math.round(withoutVisitsOccurred),
        revenue: Math.round(withoutRevenue),
        cancellationFeesCollected: Math.round(withoutCancellationFees),
        noShowFeesCollected: Math.round(withoutNoShowFees),
        totalRevenue: Math.round(
          withoutRevenue + withoutCancellationFees + withoutNoShowFees
        ),
        frontOfficeStaffExpense: Math.round(withoutFrontOfficeExpense),
        reminderTextExpense: Math.round(withoutReminderExpense),
        totalCosts: Math.round(
          withoutFrontOfficeExpense + withoutReminderExpense
        ),
        netRevenue: Math.round(
          withoutRevenue +
            withoutCancellationFees +
            withoutNoShowFees -
            withoutFrontOfficeExpense -
            withoutReminderExpense
        ),
      },
      withPenciled: {
        activePatients: Math.round(withActivePatients),
        visitsScheduled: Math.round(withVisitsScheduled),
        visitsOccurred: Math.round(withVisitsOccurred),
        revenue: Math.round(withRevenue),
        cancellationFeesCollected: Math.round(withCancellationFees),
        noShowFeesCollected: Math.round(withNoShowFees),
        totalRevenue: Math.round(
          withRevenue + withCancellationFees + withNoShowFees
        ),
        frontOfficeStaffExpense: Math.round(withFrontOfficeExpense),
        reminderTextExpense: Math.round(withReminderExpense),
        totalCosts: Math.round(withFrontOfficeExpense + withReminderExpense),
        netRevenue: Math.round(
          withRevenue +
            withCancellationFees +
            withNoShowFees -
            withFrontOfficeExpense -
            withReminderExpense
        ),
        cancellationRate: Math.round(withCancellationRate),
        noShowRate: Math.round(withNoShowRate),
        planOfCareScheduled: Math.round(withPlanOfCareScheduled),
        cancellationBackfillRate: Math.min(
          100,
          Math.round(withCancellationBackfillRate)
        ),
        noShowFeeCollectionRate: Math.round(withNoShowFeeCollectionRate),
        cancellationFeeCollectionRate: Math.round(
          withCancellationFeeCollectionRate
        ),
        frontOfficeStaff: withFrontOfficeStaff,
        reminderTexts: Math.round(withReminderTexts),
      },
      savingsPerMonth: Math.round(
        withRevenue +
          withCancellationFees +
          withNoShowFees -
          withFrontOfficeExpense -
          withReminderExpense -
          (withoutRevenue +
            withoutCancellationFees +
            withoutNoShowFees -
            withoutFrontOfficeExpense -
            withoutReminderExpense)
      ),
    });
  };

  const handleInputChange = (
    field: keyof CalculatorInputs,
    value: number | boolean
  ) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Input Section */}
      <Card className="p-6 bg-card/50 backdrop-blur">
        <h3 className="text-lg font-semibold mb-6">
          Tell us about your clinic
        </h3>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-4">
              Baseline clinic metrics
            </h4>
            <div className="space-y-4">
              <div>
                <Label htmlFor="activePatients">Active patients</Label>
                <Input
                  id="activePatients"
                  type="number"
                  value={inputs.activePatients}
                  onChange={(e) =>
                    handleInputChange(
                      "activePatients",
                      parseInt(e.target.value) || 0
                    )
                  }
                />
              </div>

              <div>
                <Label htmlFor="noShowRate">No show rate (%)</Label>
                <Input
                  id="noShowRate"
                  type="number"
                  value={inputs.noShowRate}
                  onChange={(e) =>
                    handleInputChange(
                      "noShowRate",
                      parseInt(e.target.value) || 0
                    )
                  }
                />
              </div>

              <div>
                <Label htmlFor="cancellationRate">Cancellation rate (%)</Label>
                <Input
                  id="cancellationRate"
                  type="number"
                  value={inputs.cancellationRate}
                  onChange={(e) =>
                    handleInputChange(
                      "cancellationRate",
                      parseInt(e.target.value) || 0
                    )
                  }
                />
              </div>

              <div>
                <Label htmlFor="avgRevenuePerVisit">
                  Average revenue per visit
                </Label>
                <Input
                  id="avgRevenuePerVisit"
                  type="number"
                  value={inputs.avgRevenuePerVisit}
                  onChange={(e) =>
                    handleInputChange(
                      "avgRevenuePerVisit",
                      parseInt(e.target.value) || 0
                    )
                  }
                />
              </div>

              <div>
                <Label htmlFor="monthlySalary">
                  Monthly salary per front office employee
                </Label>
                <Input
                  id="monthlySalary"
                  type="number"
                  value={inputs.monthlySalaryPerFrontOffice}
                  onChange={(e) =>
                    handleInputChange(
                      "monthlySalaryPerFrontOffice",
                      parseInt(e.target.value) || 0
                    )
                  }
                />
              </div>

              <div>
                <Label htmlFor="numEmployees">
                  Number of front office employees
                </Label>
                <Input
                  id="numEmployees"
                  type="number"
                  value={inputs.numberOfFrontOfficeEmployees}
                  onChange={(e) =>
                    handleInputChange(
                      "numberOfFrontOfficeEmployees",
                      parseInt(e.target.value) || 0
                    )
                  }
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-4">
              Penciled features
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="reminders">Automated reminders</Label>
                <Switch
                  id="reminders"
                  checked={inputs.automatedReminders}
                  onCheckedChange={(checked) =>
                    handleInputChange("automatedReminders", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="waitlist">Automated waitlist</Label>
                <Switch
                  id="waitlist"
                  checked={inputs.automatedWaitlist}
                  onCheckedChange={(checked) =>
                    handleInputChange("automatedWaitlist", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="planOfCare">Automated plan of care</Label>
                <Switch
                  id="planOfCare"
                  checked={inputs.automatedPlanOfCare}
                  onCheckedChange={(checked) =>
                    handleInputChange("automatedPlanOfCare", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="rescheduling">Automated rescheduling</Label>
                <Switch
                  id="rescheduling"
                  checked={inputs.automatedRescheduling}
                  onCheckedChange={(checked) =>
                    handleInputChange("automatedRescheduling", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="cancellationFees">
                  Automated cancellation fees
                </Label>
                <Switch
                  id="cancellationFees"
                  checked={inputs.automatedCancellationFeeCollection}
                  onCheckedChange={(checked) =>
                    handleInputChange(
                      "automatedCancellationFeeCollection",
                      checked
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Results Section */}
      <Card className="lg:col-span-2 p-6 bg-card/50 backdrop-blur space-y-6">
        <h3 className="text-lg font-semibold">Results comparison</h3>

        {results && (
          <>
            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-4">
                  Without Penciled
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Visits scheduled</span>
                    <span className="font-medium">
                      {results.withoutPenciled.visitsScheduled}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Visits occurred</span>
                    <span className="font-medium">
                      {results.withoutPenciled.visitsOccurred}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Cancellation rate</span>
                    <span className="font-medium">
                      {inputs.cancellationRate}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">No-show rate</span>
                    <span className="font-medium">{inputs.noShowRate}%</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-4">
                  With Penciled
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Visits scheduled</span>
                    <span className="font-medium text-primary">
                      {results.withPenciled.visitsScheduled}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Visits occurred</span>
                    <span className="font-medium text-primary">
                      {results.withPenciled.visitsOccurred}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Cancellation rate</span>
                    <span className="font-medium text-primary">
                      {results.withPenciled.cancellationRate}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">No-show rate</span>
                    <span className="font-medium text-primary">
                      {results.withPenciled.noShowRate}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Breakdown */}
            <div className="border-t pt-6">
              <h4 className="text-sm font-medium text-muted-foreground mb-4">
                Financial impact
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Revenue from visits</span>
                    <span className="font-medium">
                      {formatCurrency(results.withoutPenciled.revenue)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Cancellation fees</span>
                    <span className="font-medium">
                      {formatCurrency(
                        results.withoutPenciled.cancellationFeesCollected
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">No-show fees</span>
                    <span className="font-medium">
                      {formatCurrency(
                        results.withoutPenciled.noShowFeesCollected
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-2">
                    <span className="text-sm">Total revenue</span>
                    <span>
                      {formatCurrency(results.withoutPenciled.totalRevenue)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Revenue from visits</span>
                    <span className="font-medium text-primary">
                      {formatCurrency(results.withPenciled.revenue)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Cancellation fees</span>
                    <span className="font-medium text-primary">
                      {formatCurrency(
                        results.withPenciled.cancellationFeesCollected
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">No-show fees</span>
                    <span className="font-medium text-primary">
                      {formatCurrency(results.withPenciled.noShowFeesCollected)}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-2">
                    <span className="text-sm">Total revenue</span>
                    <span className="text-primary">
                      {formatCurrency(results.withPenciled.totalRevenue)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Savings Summary */}
            <div className="bg-primary/10 rounded-lg p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Savings per month
              </p>
              <p className="text-4xl font-bold text-primary">
                {formatCurrency(results.savingsPerMonth)}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {Math.round((results.savingsPerMonth * 12) / 1000)}K+ annual
                savings
              </p>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

document.addEventListener("DOMContentLoaded", function () {
  const rentalYieldForm = document.getElementById("rental-yield-form");
  const includeMortgageCheckbox = document.getElementById("include-mortgage");
  const mortgageDetails = document.getElementById("mortgage-details");
  const includeRoiCheckbox = document.getElementById("include-roi");
  const roiDetails = document.getElementById("roi-details");

  includeMortgageCheckbox.addEventListener("change", function () {
    mortgageDetails.classList.toggle("hidden");
  });

  includeRoiCheckbox.addEventListener("change", function () {
    roiDetails.classList.toggle("hidden");
  });

  rentalYieldForm.addEventListener("submit", function (event) {
    event.preventDefault();

  
      const propertyPrice = parseFloat(event.target.propertyPrice.value);
      const rentalIncome = parseFloat(event.target.rentalIncome.value);
      const includeMortgage = event.target.includeMortgage.checked;
      const downPayment = parseFloat(event.target.downPayment.value) || 0;
      const closingCosts = parseFloat(event.target.closingCosts.value) || 0;
      const mortgageRate = parseFloat(event.target.mortgageRate.value) || 0;
      const mortgageTerm = parseFloat(event.target.mortgageTerm.value) || 360;
      const propertyTax = parseFloat(event.target.propertyTax.value) || 0;
      const maintenanceCosts = parseFloat(event.target.maintenanceCosts.value) || 0;
      const insuranceCosts = parseFloat(event.target.insuranceCosts.value) || 0;
      const managementFees = parseFloat(event.target.managementFees.value) || 0;
      const includeRoi = event.target.includeRoi.checked;
      const holdingPeriod = parseFloat(event.target.holdingPeriod.value) || 0;
      const annualAppreciation = parseFloat(event.target.annualAppreciation.value) || 0;


  
      const annualIncome = rentalIncome * 12;
      const grossYield = (annualIncome / propertyPrice) * 100;
      const monthlyExpenses = (propertyTax + maintenanceCosts + insuranceCosts + managementFees) / 12;
  
      let mortgagePayment = 0;
      let totalInvestment = propertyPrice;
      let cashOnCash;
  
      if (includeMortgage && mortgageRate > 0 && mortgageTerm > 0) {
        const monthlyRate = mortgageRate / 100 / 12;
        const loanAmount = propertyPrice - downPayment;
        const numberOfPayments = mortgageTerm * 12;
        mortgagePayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        totalInvestment = downPayment + closingCosts;
        cashOnCash = ((annualIncome - (monthlyExpenses + mortgagePayment) * 12) / totalInvestment) * 100;
      } else {
        cashOnCash = (annualIncome / totalInvestment) * 100;
      }
  
      const netIncome = annualIncome - (monthlyExpenses + mortgagePayment) * 12;
      const netYield = (netIncome / propertyPrice) * 100;
      const cashFlow = rentalIncome - monthlyExpenses - mortgagePayment;

      let roi = 0;
      if (includeRoi && annualAppreciation > 0 && holdingPeriod > 0) {
        const futureValue = propertyPrice * Math.pow(1 + annualAppreciation / 100, holdingPeriod);
        const totalMortgagePayments = includeMortgage ? mortgagePayment * 12 * holdingPeriod : 0;
        const totalRentalIncome = rentalIncome * 12 * holdingPeriod;
        const profit = futureValue - propertyPrice - totalMortgagePayments + totalRentalIncome;
        roi = (profit / propertyPrice) * 100;
      }
    
      document.getElementById("gross-yield-result").textContent = `Gross Rental Yield: ${grossYield.toFixed(2)}%`;
      document.getElementById("net-yield-result").textContent = `Net Rental Yield: ${netYield.toFixed(2)}%`;
      document.getElementById("cash-on-cash-result").textContent = `Cash-on-Cash Return: ${cashOnCash.toFixed(2)}%`;
      document.getElementById("cash-flow-result").textContent = `Monthly Cash Flow: $${cashFlow.toFixed(2)}`;
      document.getElementById("roi-result").textContent = includeRoi ? `Return on Investment (ROI) after ${holdingPeriod} years: ${roi.toFixed(2)}%` : 'Please enter property and ROI information to calculate the return on investment (ROI).';
  });
});

  
const emptyLeadForm = {
  leadName: "",
  companyName: "",
  email: "",
  phoneNumber: "",
  leadSource: "Website",
  assignedSalesperson: "Maya Thompson",
  status: "New",
  estimatedDealValue: "",
};

const emptyDashboard = {
  totalLeads: 0,
  newLeads: 0,
  qualifiedLeads: 0,
  wonLeads: 0,
  lostLeads: 0,
  totalEstimatedDealValue: 0,
  totalValueOfWonDeals: 0,
};

const statusOptions = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Won",
  "Lost",
];

const sourceOptions = [
  "Website",
  "LinkedIn",
  "Referral",
  "Cold Email",
  "Event",
  "Other",
];

const currencyOptions = [
  { code: "USD", label: "USD ($)" },
  { code: "EUR", label: "EUR (EUR)" },
  { code: "GBP", label: "GBP (GBP)" },
  { code: "LKR", label: "LKR (Rs)" },
  { code: "INR", label: "INR (Rs)" },
];

export {
  currencyOptions,
  emptyDashboard,
  emptyLeadForm,
  sourceOptions,
  statusOptions,
};

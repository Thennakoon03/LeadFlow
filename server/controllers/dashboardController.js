import Lead from "../models/Lead.js";

const getDashboardStats = async (req, res) => {
  try {
    const leads = await Lead.find();

    const stats = leads.reduce(
      (summary, lead) => {
        summary.totalLeads += 1;
        summary.totalEstimatedDealValue += lead.estimatedDealValue;

        if (lead.status === "New") {
          summary.newLeads += 1;
        }

        if (lead.status === "Qualified") {
          summary.qualifiedLeads += 1;
        }

        if (lead.status === "Won") {
          summary.wonLeads += 1;
          summary.totalValueOfWonDeals += lead.estimatedDealValue;
        }

        if (lead.status === "Lost") {
          summary.lostLeads += 1;
        }

        return summary;
      },
      {
        totalLeads: 0,
        newLeads: 0,
        qualifiedLeads: 0,
        wonLeads: 0,
        lostLeads: 0,
        totalEstimatedDealValue: 0,
        totalValueOfWonDeals: 0,
      }
    );

    return res.status(200).json(stats);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch dashboard stats.",
      error: error.message,
    });
  }
};

export { getDashboardStats };

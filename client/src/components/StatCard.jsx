function StatCard({ isDarkMode, label, value }) {
  return (
    <article
      className={`rounded-[24px] border p-5 shadow-[0_18px_40px_rgba(3,70,32,0.08)] backdrop-blur-[14px] ${
        isDarkMode
          ? "border-white/10 bg-[linear-gradient(180deg,rgba(15,27,21,0.98),rgba(11,21,17,0.96))]"
          : "border-[#034620]/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,251,248,0.96))]"
      }`}
    >
      <p className={`mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] ${isDarkMode ? "text-slate-400" : "text-[#034620]/65"}`}>
        {label}
      </p>
      <strong className={`text-[1.75rem] font-semibold ${isDarkMode ? "text-white" : "text-[#111827]"}`}>
        {value}
      </strong>
    </article>
  );
}

export default StatCard;

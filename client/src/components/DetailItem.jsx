function DetailItem({ label, children }) {
  return (
    <div className="rounded-[18px] border border-[#034620]/10 bg-white px-4 py-3.5">
      <span className="block text-sm text-[#034620]/70">{label}</span>
      <strong className="mt-1 block text-[#111827]">{children}</strong>
    </div>
  );
}

export default DetailItem;

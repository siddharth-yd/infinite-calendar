export default function Header({ currentMonth }: { currentMonth: string }) {
  return (
    <div className="sticky top-0 bg-white shadow p-3 text-lg font-bold text-center z-20">
      {currentMonth}
    </div>
  );
}
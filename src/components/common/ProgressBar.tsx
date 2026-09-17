interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({
  current,
  total,
}: ProgressBarProps) {
  return (
    <div className="flex items-center gap-[5px]">
      {Array.from({ length: total }).map((_, index) => {
        const active = index < current;

        return (
          <div
            key={index}
            className={`h-[5px] w-[5px] rounded-full ${
              active ? "bg-[#173F35]" : "bg-[#C9C2B4]"
            }`}
          />
        );
      })}
    </div>
  );
}
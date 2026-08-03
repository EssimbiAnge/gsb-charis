type CharisNameProps = {
  className?: string;
};

export default function CharisName({
  className = "",
}: CharisNameProps) {
  return (
    <span className={`font-bold ${className}`} aria-label="CHARIS">
      <span className="text-blue-600">C</span>
      <span className="text-red-600">H</span>
      <span className="text-green-600">A</span>
      <span className="text-blue-600">R</span>
      <span className="text-yellow-400">I</span>
      <span className="text-red-600">S</span>
    </span>
  );
}
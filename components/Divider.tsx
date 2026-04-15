export default function Divider() {
  return (
    <div className="w-full flex justify-center py-6">
      <svg
        width="150"
        height="20"
        viewBox="0 0 150 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-border"
      >
        <path
          d="M0,10 Q37.5,0 75,10 T150,10"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

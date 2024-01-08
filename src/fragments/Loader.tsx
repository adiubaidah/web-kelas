
function Loader({
  className = "h-screen w-full flex justify-center items-center",
}: {
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="loader"></div>
    </div>
  );
}

export default Loader;

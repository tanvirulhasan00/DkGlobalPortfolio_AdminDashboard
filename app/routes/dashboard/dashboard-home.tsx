const DashboardHome = () => {
  return (
    <div className="w-full h-screen">
      <h1 className="text-lg font-bold">Website preview</h1>
      <iframe
        src="https://dkglobalfashion.com/"
        className="w-full h-full border-none"
        title="DK Global Fashion"
      />
    </div>
  );
};

export default DashboardHome;

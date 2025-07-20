// ==============================|| LOGO SVG ||============================== //

const LogoMain = ({ reverse, ...others }: { reverse?: boolean }) => {
  return (
    <>
      <h1 className="text-red-600 font-bold text-3xl">
        Speed<span className="text-blue-600">Up</span>
      </h1>
    </>
  );
};

export default LogoMain;

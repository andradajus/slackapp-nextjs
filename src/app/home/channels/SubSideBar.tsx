const SubSideBar = () => {
  return (
    <>
      <div className="bg-indigo-500 h-full">
        <div className="bg-indigo-600 text-center block text-2xl font-bold mb-0 text-yellow-400 font-serif pb-5 pt-5">
          <div>Conversa</div>
        </div>
        <div className="gap-4">
          <div className="hover:bg-indigo-700 cursor-pointer">Channels</div>
          <div className="hover:bg-indigo-700 cursor-pointer">Sent Message</div>
        </div>
      </div>
    </>
  );
};

export default SubSideBar;

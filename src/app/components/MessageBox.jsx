const MessageBox = ({ setMessage }) => {
  return (
    <>
      <div className=" bg-green-200 w-full h-80 ">
        <ul className="flex flex-col justify-end">
          <li>
            <div className="bg-blue-400">
              <div className="text-xs">
                <span>Photo? Name</span>
                <span>{setMessage} Dito yung message</span>
              </div>
              <span className="text-xs">React Button?</span>
            </div>
          </li>

          <li>
            <div className="bg-blue-100">
              <div className="text-xs">
                <span>Photo? Name</span>
                <span>{setMessage} Dito yung message</span>
              </div>
              <span className="text-xs">React Button?</span>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MessageBox;

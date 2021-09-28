const RsvpButton = ({
  handleClick,
  disabled,
}: {
  handleClick:any
  disabled: boolean
}) => {
  return (
    <>
      <button
        className={`
        ${disabled? `
          bg-gray-400 
          text-gray-600 
          cursor-not-allowed` :
          `bg-primary
          text-gray-200
          hover:bg-primary-dark
        `}
        font-nato
        py-2
        rounded-lg
        text-lg
      `}
        onClick={handleClick}
        disabled={disabled}
      >
        <div className="flex flex-row items-center justify-center gap-4">
          {disabled ?(<span className="bg-highlight rounded-full h-2 w-2 animate-ping">
          </span>):<></>}
          <div>
            {`RSVP →`}
          </div>
        </div>

      </button>
    </>
  );
};
export default RsvpButton;

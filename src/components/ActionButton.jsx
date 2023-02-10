export const ActionButton = ({ text, action }) => {
  return (
    <>
      <button className="text-center border-2 rounded px-2 py-1" type="button" onClick={action}>
        {text}
      </button>
    </>
  );
};
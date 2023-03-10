export const ActionButton = ({ text, action }) => {
  return (
    <>
      <button className="text-sm font-semibold text-center border-2 rounded-lg hover:shadow px-2 py-1" type="button" onClick={action}>
        {text}
      </button>
    </>
  );
};
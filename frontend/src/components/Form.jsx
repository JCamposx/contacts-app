import Card from "./Card";

export default function Form({ children, onSubmit }) {
  return (
    <Card customClass="mt-3 p-2 pb-2">
      <form onSubmit={onSubmit}>{children}</form>
    </Card>
  );
}

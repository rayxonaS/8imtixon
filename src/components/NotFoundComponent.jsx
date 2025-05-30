import NotFoundImage from "../assets/not-found-page.svg";

export default function NotFoundComponent() {
  return (
    <div className="flex flex-col items-center text-center ">
      <img src={NotFoundImage} alt="" width={241} height={200} />
      <h1 className="mb-10 text-5xl font-medium">There is nothing here</h1>
      <p className="">
        Create an invoice by clicking the New Invoice button and get started
      </p>
    </div>
  );
}

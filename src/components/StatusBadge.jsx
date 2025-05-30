import { buttonVariants } from "./ui/button";

function StatusBadge({ status = "paid" }) {
  const style = {
    draft: {
      dote: "bg-[rgba(55,59,83,1)]",
      bg: "rgba(55,59,83,0.05)",
      text: "text-[#373B53]",
    },
    paid: {
      dote: "bg-[#33D69F]",
      bg: "rgba(51,214,159,0.05)",
      text: "text-[#33D69F]",
    },
    pending: {
      dote: "bg-[#FFBF00]",
      bg: "rgba(255,143,0,0.05)",
      text: "text-[#FFBF00]",
    },
  };

  return (
    <span
      className={`${buttonVariants({ variant: "outline" })} min-w-[104px]`}
      style={{
        backgroundColor: style[status].bg,
      }}
    >
      <span
        className={`w-2 h-2 gap-2 items-center inline-flex rounded-full ${style[status].dote}`}
      ></span>
      <span className={`capitalize ${style[status].text}`}> {status}</span>
    </span>
  );
}

export default StatusBadge;

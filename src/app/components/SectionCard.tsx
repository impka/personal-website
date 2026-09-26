// Shared frame for the home page sections so they line up with each other
export default function SectionCard({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="relative z-3 min-h-screen grid place-items-center bg-transparent"
    >
      <div className="w-[90vw] p-6 sm:p-10 lg:w-[80vw] lg:p-14 bg-[#F9F9F9] dark:bg-[#030303] rounded-[50] shadow-xl transition-colors duration-500 ease-in-out">
        <h2
          id={`${id}-heading`}
          className="text-3xl font-light mb-6 lg:text-[5vh] lg:mb-10"
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

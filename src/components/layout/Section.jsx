export default function Section({ id, children, className = '', containerClassName = '' }) {
  return (
    <section id={id} className={`scroll-mt-16 py-16 md:py-24 border-b border-[#27272A] last:border-b-0 ${className}`}>
      <div className={`portfolio-container ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
}

export default function PageContainer({ children, className = '' }) {
  return (
    <div className={`portfolio-container ${className}`}>
      {children}
    </div>
  );
}

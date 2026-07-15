export default function Card({ title, description, actions, children, className = "" }) {
  return (
    <section className={`surface-card p-5 sm:p-6 ${className}`}>
      {(title || actions) && (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            {title && <h2 className="text-sm font-semibold text-ink-900">{title}</h2>}
            {description && <p className="mt-0.5 text-sm text-slate-500">{description}</p>}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

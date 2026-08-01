interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-10">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-atlas-text-primary mb-3">
        {title}
      </h1>
      {description && (
        <p className="text-base text-atlas-text-secondary leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}

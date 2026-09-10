import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, TriangleAlert, CircleCheck } from "lucide-react";

/** Visual style of a {@link Callout}. */
export type CalloutVariant = "info" | "warning" | "success";

const icons: Record<CalloutVariant, React.ComponentType<{ className?: string }>> = {
  info: Info,
  warning: TriangleAlert,
  success: CircleCheck,
};

/**
 * A highlighted box for drawing attention to a note within an article's
 * MDX body, e.g. `<Callout variant="warning" title="Deadline">...</Callout>`.
 */
export function Callout({
  variant = "info",
  title,
  children,
}: {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
}) {
  const Icon = icons[variant];
  return (
    <Alert className="my-6">
      <Icon className="h-4 w-4" />
      {title ? <AlertTitle>{title}</AlertTitle> : null}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
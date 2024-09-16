import { Button } from '@/components/atoms/Button';
import { cn } from '@/lib/utils';

interface FloatingActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  className,
  ...props
}) => {
  return (
    <Button
      variant="default"
      size="icon"
      className={cn(
        "rounded-full shadow-lg",
        "transition-shadow duration-300 hover:shadow-xl",
        className
      )}
      {...props}
    >
      {icon}
    </Button>
  );
};

interface FloatingActionButtonContainerProps {
  children: React.ReactNode;
}

export const FloatingActionButtonContainer: React.FC<FloatingActionButtonContainerProps> = ({ children }) => {
  return (
    <div className="fixed right-4 bottom-16 flex flex-col-reverse gap-2 sm:flex-row-reverse sm:gap-4">
      {children}
    </div>
  );
};
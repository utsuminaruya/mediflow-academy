import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent' | 'gradient';
  className?: string;
  animated?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage,
  size = 'md',
  color = 'primary',
  className,
  animated = false,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const colorClasses = {
    primary: 'bg-[#0066CC]',
    secondary: 'bg-[#00B894]',
    accent: 'bg-[#FF6B6B]',
    gradient: 'bg-gradient-to-r from-[#0066CC] to-[#00B894]',
  };

  return (
    <div className={cn('w-full', className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showPercentage && (
            <span className="text-sm text-gray-500">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div className={cn('bg-gray-100 rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            colorClasses[color],
            animated && 'animate-pulse'
          )}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
}

// XP Progress with level display
interface XPProgressProps {
  xp: number;
  className?: string;
}

export function XPProgress({ xp, className }: XPProgressProps) {
  const level = Math.floor(xp / 100) + 1;
  const currentLevelXp = xp % 100;

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="w-10 h-10 bg-gradient-to-br from-[#0066CC] to-[#00B894] rounded-full flex items-center justify-center flex-shrink-0">
        <span className="text-white text-xs font-bold">Lv.{level}</span>
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{xp} XP</span>
          <span>{level * 100} XP</span>
        </div>
        <ProgressBar value={currentLevelXp} color="gradient" size="sm" />
      </div>
    </div>
  );
}

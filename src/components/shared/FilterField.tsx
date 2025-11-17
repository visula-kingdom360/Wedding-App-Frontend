import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { LucideIcon } from 'lucide-react';

interface FilterFieldProps {
  type: 'input' | 'select';
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  options?: { value: string; label: string }[];
  icon?: LucideIcon;
  className?: string;
}

export function FilterField({ 
  type, 
  label, 
  placeholder, 
  value, 
  onChange, 
  options, 
  icon: Icon,
  className = '' 
}: FilterFieldProps) {
  if (type === 'select' && options) {
    return (
      <div className={`space-y-2 ${className}`}>
        <Label className="text-sm font-medium flex items-center">
          {Icon && <Icon className="w-4 h-4 mr-2 text-forest-green-500" />}
          {label}
        </Label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="bg-sage-green-50 border-sage-green-200 focus:border-forest-green-500 rounded-lg">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem 
                key={option.value || 'all'} 
                value={option.value || 'all'}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="text-sm font-medium flex items-center">
        {Icon && <Icon className="w-4 h-4 mr-2 text-rose-600" />}
        {label}
      </Label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        )}
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`bg-sage-green-50 border-sage-green-200 focus:border-forest-green-500 rounded-lg ${Icon ? 'pl-9' : ''}`}
        />
      </div>
    </div>
  );
}
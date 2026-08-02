import { RadioPresenter } from '@/types/radio';

interface PresenterCardProps {
  presenter: RadioPresenter;
}

export function PresenterCard({ presenter }: PresenterCardProps) {
  return (
    <div className="border border-border p-6 hover:border-foreground transition-colors group">
      <div className="w-16 h-16 bg-foreground text-background font-heading font-black text-2xl flex items-center justify-center rounded-full mb-4">
        {presenter.name.split(' ').map(n => n[0]).join('')}
      </div>
      <h3 className="font-heading font-bold text-xl group-hover:underline underline-offset-4 mb-2">
        {presenter.name}
      </h3>
      {presenter.bio && (
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 font-medium">
          {presenter.bio}
        </p>
      )}
      <span className="text-[10px] font-bold uppercase tracking-widest text-red-600">
        Broadcaster Senior
      </span>
    </div>
  );
}

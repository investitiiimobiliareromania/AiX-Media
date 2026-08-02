export default function SettingsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-12 border-b border-border pb-6">
        <div>
          <h1 className="text-4xl font-heading font-black tracking-tight mb-2">Setări</h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Configurări sistem de publishing</p>
        </div>
      </div>

      <div className="max-w-2xl">
        <div className="mb-12">
          <h2 className="text-xl font-heading font-bold mb-6 border-b border-border pb-2">Setări Generale</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Numele Site-ului</label>
              <input 
                type="text" 
                defaultValue="AiX Media"
                className="w-full bg-transparent border-b border-border py-3 text-lg focus:outline-none focus:border-foreground transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Email Contact Administrativ</label>
              <input 
                type="email" 
                defaultValue="office@cristianvaduva.com"
                className="w-full bg-transparent border-b border-border py-3 text-lg focus:outline-none focus:border-foreground transition-colors"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-heading font-bold mb-6 border-b border-border pb-2">Integrare Bază de Date (Supabase)</h2>
          <div className="bg-muted/30 p-6 border border-border">
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed font-medium">
              Conexiunea cu Supabase nu este încă inițializată. Datele curente rulează din mock-urile sistemului. Configurați variabilele de mediu pentru a activa persistența.
            </p>
            <button className="bg-foreground text-background px-6 py-3 font-bold text-xs uppercase tracking-widest hover:bg-foreground/90 transition-colors" disabled>
              Conectează Supabase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

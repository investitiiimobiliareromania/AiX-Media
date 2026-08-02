// src/app/radio/page.tsx
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { RadioLivePlayer } from "@/components/radio/RadioLivePlayer";
import { ProgramSchedule } from "@/components/radio/ProgramSchedule";
import { PresenterCard } from "@/components/radio/PresenterCard";
import { radioService } from "@/services/radio.service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AiX Radio Live | Postul de Radio Financiar & Real Estate",
  description: "Transmisiuni radio live, analize financiare, interviuri executive și actualități de business.",
};

export default async function RadioPage() {
  // Fetch data with safe defaults
  const streamConfig = await radioService.getStreamConfig();
  const programs = (await radioService.getPrograms()) ?? [];
  const presenters = (await radioService.getPresenters()) ?? [];
  const schedule = (await radioService.getSchedule()) ?? [];

  const currentProgram = programs[0] ?? null;
  const nextProgram = programs[1] ?? null;

  const recentlyPlayed = [
    { title: "Raport BNR: Prognoza ratei de schimb", time: "14:15", duration: "12 min" },
    { title: "Interviu: Investiții în Parcuri Logistice", time: "13:30", duration: "25 min" },
    { title: "Generali Corporate Risk Briefing", time: "12:00", duration: "45 min" },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-[72px] bg-background text-foreground">
        {/* Header Title */}
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 border-b border-border">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600 mb-2 block">
              Business & Financial Radio
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tight mb-4">
              AiX Financial Radio
            </h1>
            <p className="text-xl text-muted-foreground font-medium text-pretty leading-relaxed">
              Analize financiare în timp real, informații de piață, comentarii macroeconomice și interviuri executive pentru decidenți.
            </p>
          </div>
        </div>

        {/* Live Broadcast Player – render only if we have a program */}
        {streamConfig && currentProgram && (
          <RadioLivePlayer
            streamConfig={streamConfig}
            currentProgram={currentProgram}
            nextProgram={nextProgram ?? undefined}
          />
        )}

        {/* Main Content Grid */}
        <div className="container mx-auto px-4 md:px-6 py-16">
          {/* Recently Played */}
          <section className="mb-16">
            <h2 className="text-2xl font-heading font-bold mb-6 border-b border-border pb-4">Difuzate Recent</h2>
            <div className="divide-y divide-border border border-border">
              {recentlyPlayed.map((track, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between hover:bg-muted/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-muted-foreground">{track.time}</span>
                    <span className="font-bold text-sm text-foreground">{track.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground uppercase font-mono">{track.duration}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Schedule */}
          <ProgramSchedule schedule={schedule} />

          {/* Featured Programs */}
          <section className="py-16 border-b border-border">
            <h2 className="text-3xl font-heading font-black tracking-tight mb-8">Emisiuni Principale</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {programs.map((prog) => (
                <div key={prog.id} className="border border-border p-8 hover:border-foreground transition-colors flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 mb-2 block">
                      {prog.category}
                    </span>
                    <h3 className="font-heading font-bold text-2xl mb-3">{prog.title}</h3>
                    <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-6">
                      {prog.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <span>{prog.presenterName}</span>
                    <span>{prog.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Broadcasters & Presenters */}
          <section className="py-16">
            <h2 className="text-3xl font-heading font-black tracking-tight mb-8">Prezentatori & Analiști</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {presenters.map((pres) => (
                <PresenterCard key={pres.id} presenter={pres} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

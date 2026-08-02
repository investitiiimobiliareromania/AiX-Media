'use client';

import { useEffect, useState } from "react";
import { radioService } from "@/services/radio.service";
import { RadioProgram, RadioScheduleItem, StreamConfig, AudioTrack, StreamProviderType } from "@/types/radio";
import { DataTable } from "@/components/admin/DataTable";
import { Radio, Plus, Settings, Volume2, Calendar, Music } from "lucide-react";

export default function AdminRadioPage() {
  const [activeTab, setActiveTab] = useState<'programs' | 'schedule' | 'audio' | 'stream'>('programs');
  const [programs, setPrograms] = useState<RadioProgram[]>([]);
  const [schedule, setSchedule] = useState<RadioScheduleItem[]>([]);
  const [tracks, setTracks] = useState<AudioTrack[]>([]);
  const [streamConfig, setStreamConfig] = useState<StreamConfig>({
    provider: 'azuracast',
    streamUrl: 'https://stream.aixmedia.ro/radio/8000/live.mp3',
    stationName: 'AiX Financial Radio',
    bitrate: 320,
    isLive: true,
  });

  const [streamUrlInput, setStreamUrlInput] = useState(streamConfig.streamUrl);
  const [providerInput, setProviderInput] = useState<StreamProviderType>(streamConfig.provider);

  useEffect(() => {
    radioService.getPrograms().then(setPrograms);
    radioService.getSchedule().then(setSchedule);
    radioService.getAudioTracks().then(setTracks);
    radioService.getStreamConfig().then(cfg => {
      setStreamConfig(cfg);
      setStreamUrlInput(cfg.streamUrl);
      setProviderInput(cfg.provider);
    });
  }, []);

  const handleSaveStreamConfig = async () => {
    const updated = await radioService.updateStreamConfig({
      provider: providerInput,
      streamUrl: streamUrlInput,
      stationName: streamConfig.stationName,
      bitrate: streamConfig.bitrate,
      isLive: streamConfig.isLive,
    });
    setStreamConfig(updated);
    alert('Configurația de emisie radio a fost salvată!');
  };

  const programColumns = [
    { key: 'title', label: 'Emisiune' },
    { key: 'category', label: 'Categorie', width: '150px' },
    { key: 'presenter', label: 'Moderator', width: '180px' },
    { key: 'duration', label: 'Durată', width: '120px' },
    { key: 'status', label: 'Status', width: '120px' },
  ];

  const renderProgramRow = (prog: RadioProgram) => (
    <tr className="hover:bg-muted/30 transition-colors">
      <td className="p-4 font-bold">{prog.title}</td>
      <td className="p-4 text-muted-foreground">{prog.category}</td>
      <td className="p-4 text-sm">{prog.presenterName}</td>
      <td className="p-4 text-sm font-mono">{prog.duration}</td>
      <td className="p-4">
        <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-foreground text-background">
          {prog.status}
        </span>
      </td>
    </tr>
  );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8 border-b border-border pb-6">
        <div>
          <h1 className="text-4xl font-heading font-black tracking-tight mb-2">Radio CMS & Stream Control</h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Consolă de Grile și Emisie Live</p>
        </div>
        <button className="bg-foreground text-background px-6 py-3 font-bold text-sm uppercase tracking-widest hover:bg-foreground/90 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Emisiune Nouă
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border mb-8 pb-4">
        <button
          onClick={() => setActiveTab('programs')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest ${
            activeTab === 'programs' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Radio className="w-4 h-4" /> Emisiuni
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest ${
            activeTab === 'schedule' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Calendar className="w-4 h-4" /> Grilă Programare
        </button>
        <button
          onClick={() => setActiveTab('audio')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest ${
            activeTab === 'audio' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Music className="w-4 h-4" /> Librărie Audio
        </button>
        <button
          onClick={() => setActiveTab('stream')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest ${
            activeTab === 'stream' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Settings className="w-4 h-4" /> Configurare Stream
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'programs' && (
        <DataTable columns={programColumns} data={programs} renderRow={renderProgramRow} />
      )}

      {activeTab === 'schedule' && (
        <div className="divide-y divide-border border border-border">
          {schedule.map(s => (
            <div key={s.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-bold">{s.programTitle}</p>
                <p className="text-xs text-muted-foreground">Ziua: {s.dayOfWeek} • Moderator: {s.presenterName}</p>
              </div>
              <span className="text-xs font-mono font-bold">{s.startTime} - {s.endTime}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'audio' && (
        <div className="divide-y divide-border border border-border">
          {tracks.map(t => (
            <div key={t.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-bold font-mono text-sm">{t.fileName}</p>
                <p className="text-xs text-muted-foreground">{t.bitrate} kbps • {(t.fileSize / 1000000).toFixed(1)} MB</p>
              </div>
              <span className="text-xs font-mono">{t.duration}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'stream' && (
        <div className="max-w-2xl border border-border p-8 bg-muted/20">
          <h2 className="text-xl font-heading font-bold mb-6 border-b border-border pb-4 flex items-center gap-2">
            <Volume2 className="w-5 h-5" /> Configurare Furnizor Stream Live
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                Tip Provider Emisie
              </label>
              <select
                value={providerInput}
                onChange={(e) => setProviderInput(e.target.value as StreamProviderType)}
                className="w-full bg-transparent border-b border-border py-3 text-lg focus:outline-none focus:border-foreground transition-colors"
              >
                <option value="azuracast">AzuraCast Server</option>
                <option value="icecast">Icecast Server</option>
                <option value="hls">HLS Stream (.m3u8)</option>
                <option value="mp3">Direct MP3 Audio Stream</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                URL Stream Audio Live
              </label>
              <input
                type="url"
                value={streamUrlInput}
                onChange={(e) => setStreamUrlInput(e.target.value)}
                placeholder="https://stream.server.com/live.mp3"
                className="w-full bg-transparent border-b border-border py-3 text-lg focus:outline-none focus:border-foreground transition-colors font-mono"
              />
            </div>

            <button
              onClick={handleSaveStreamConfig}
              className="bg-foreground text-background px-6 py-3 font-bold text-xs uppercase tracking-widest hover:bg-foreground/90 transition-colors"
            >
              Salvează Configurația
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

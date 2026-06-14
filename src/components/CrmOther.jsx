import React, { useState } from 'react';
import { MOCK } from '../data/mockData';
import { Logo, Icon, Avatar, Pill, Button, Card } from './Shared';
import { KpiCard, Mini } from './CrmDashboard';
import { FilterChip } from './CrmExpediente';

// ---------- Calendario ----------
export function Calendario({ openPaciente }) {
  const [view, setView] = useState('semana');

  return (
    <div className="p-8 max-w-[1500px] mx-auto text-left">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-xl bg-white hover:bg-morado-50 border border-crema-200 flex items-center justify-center text-tinta-600 cursor-pointer">
            <Icon name="chevronLeft" size={16}/>
          </button>
          <button className="w-9 h-9 rounded-xl bg-white hover:bg-morado-50 border border-crema-200 flex items-center justify-center text-tinta-600 cursor-pointer">
            <Icon name="chevronRight" size={16}/>
          </button>
          <h2 className="font-serif text-2xl font-semibold text-tinta ml-2">Mayo 2026 · Semana 22</h2>
          <Button variant="ghost" size="sm">Hoy</Button>
        </div>
        <div className="flex items-center gap-2">
          <div className="inline-flex bg-crema-100 rounded-xl p-1">
            {['día','semana','mes'].map(v => (
              <button key={v} onClick={() => setView(v==='día'?'dia':v==='mes'?'mes':'semana')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer
                        ${(view==='dia'&&v==='día') || (view==='semana'&&v==='semana') || (view==='mes'&&v==='mes') ? 'bg-white shadow-soft text-morado-600' : 'text-tinta-600'}`}>
                {v}
              </button>
            ))}
          </div>
          <Button variant="soft" size="sm" icon="external">Google Calendar</Button>
          <Button variant="primary" size="sm" icon="plus">Nueva cita</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-5">
        <Card padding="p-0" className="overflow-hidden">
          {view === 'semana' ? <WeekView openPaciente={openPaciente}/> : view === 'mes' ? <MonthView/> : <DayView openPaciente={openPaciente}/>}
        </Card>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <h4 className="font-bold mb-3 text-sm flex items-center gap-2"><Icon name="filter" size={14} className="text-morado-600"/> Tipos de cita</h4>
            <div className="space-y-1.5">
              {Object.entries(MOCK.TIPOS_CITA).map(([k,t]) => (
                <label key={k} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-crema-100 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-morado w-4 h-4"/>
                  <span className="w-3 h-3 rounded-full" style={{ background: t.bg }}/>
                  <span className="text-sm font-bold flex-1">{t.label}</span>
                  <span className="text-xs text-tinta-400">{[3,18,2,1][Object.keys(MOCK.TIPOS_CITA).indexOf(k)]}</span>
                </label>
              ))}
            </div>
          </Card>

          <Card>
            <h4 className="font-bold mb-3 text-sm flex items-center gap-2"><Icon name="external" size={14} className="text-morado-600"/> Calendarios sync</h4>
            <div className="space-y-2">
              {[
                { n:'Google · Personal',     c:'#F39200', on:true },
                { n:'Google · Consultorio',  c:'#7B2D8E', on:true },
                { n:'iCloud · Familia',      c:'#2E86AB', on:false }
              ].map((g,i) => (
                <div key={i} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-crema-100">
                  <span className="w-3 h-3 rounded-full" style={{ background: g.c }}/>
                  <span className="text-sm flex-1">{g.n}</span>
                  <span className={`w-8 h-4 rounded-full relative ${g.on?'bg-morado':'bg-crema-200'}`}>
                    <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-all ${g.on?'right-0.5':'left-0.5'}`}/>
                  </span>
                </div>
              ))}
            </div>
            <Button variant="soft" size="sm" className="w-full mt-3" icon="plus">Conectar otro</Button>
          </Card>

          <Card>
            <h4 className="font-bold mb-3 text-sm flex items-center gap-2"><Icon name="bell" size={14} className="text-morado-600"/> Recordatorios automáticos</h4>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center justify-between"><span>WhatsApp 24 hrs antes</span><span className="w-8 h-4 rounded-full bg-morado relative"><span className="absolute right-0.5 top-0.5 w-3 h-3 rounded-full bg-white shadow"/></span></div>
              <div className="flex items-center justify-between"><span>Mail 2 hrs antes</span><span className="w-8 h-4 rounded-full bg-morado relative"><span className="absolute right-0.5 top-0.5 w-3 h-3 rounded-full bg-white shadow"/></span></div>
              <div className="flex items-center justify-between"><span>Encuesta post-sesión</span><span className="w-8 h-4 rounded-full bg-crema-200 relative"><span className="absolute left-0.5 top-0.5 w-3 h-3 rounded-full bg-white shadow"/></span></div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function WeekView({ openPaciente }) {
  const dias = [
    { d:25, m:'Lun', citas:[ {h:'09:00', dur:50, n:'Carlos R.', t:'seguimiento'}, {h:'11:00', dur:50, n:'Patricia D.', t:'seguimiento'}, {h:'16:00', dur:50, n:'Sandra V.', t:'primera'} ] },
    { d:26, m:'Mar', citas:[ {h:'10:00', dur:60, n:'Eduardo M.', t:'familia'}, {h:'13:00', dur:50, n:'Adriana F.', t:'seguimiento'}, {h:'17:00', dur:50, n:'Iván M.', t:'seguimiento'} ] },
    { d:27, m:'Mié', citas:[ {h:'09:00', dur:50, n:'Roberto C.', t:'seguimiento'}, {h:'14:00', dur:80, n:'Lucía H.', t:'urgencia'} ] },
    { d:28, m:'Jue', today:true, citas:[ {h:'09:00', dur:50, n:'María Elena S.', t:'seguimiento'}, {h:'10:00', dur:50, n:'Jorge B.', t:'seguimiento'}, {h:'11:30', dur:50, n:'Lucía H.', t:'urgencia'}, {h:'13:00', dur:60, n:'Familia Ortega', t:'familia'}, {h:'16:00', dur:50, n:'Roberto C.', t:'primera'}, {h:'17:30', dur:50, n:'Adriana F.', t:'seguimiento'} ] },
    { d:29, m:'Vie', citas:[ {h:'09:00', dur:80, n:'Patricia D.', t:'primera'}, {h:'11:00', dur:50, n:'María Elena S.', t:'seguimiento'}, {h:'15:00', dur:50, n:'Sandra V.', t:'seguimiento'} ] },
    { d:30, m:'Sáb', citas:[ {h:'10:00', dur:50, n:'Carlos R.', t:'seguimiento'} ] },
    { d:31, m:'Dom', citas:[] }
  ];
  const horas = ['08','09','10','11','12','13','14','15','16','17','18','19'];

  return (
    <div className="overflow-auto scrollbar-thin">
      <div className="min-w-[860px]">
        {/* Day headers */}
        <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-crema-200 sticky top-0 bg-white z-10">
          <div/>
          {dias.map((d,i) => (
            <div key={i} className={`text-center py-3 ${d.today?'bg-morado-50':''}`}>
              <div className="text-[11px] uppercase tracking-wide font-bold text-tinta-400">{d.m}</div>
              <div className={`font-serif text-2xl font-semibold mt-0.5 ${d.today?'text-morado':'text-tinta'}`}>
                {d.today ? <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-morado text-white">{d.d}</span> : d.d}
              </div>
            </div>
          ))}
        </div>
        {/* Grid */}
        <div className="grid grid-cols-[60px_repeat(7,1fr)] relative" style={{ minHeight: '660px' }}>
          {/* hour rail */}
          <div className="border-r border-crema-200">
            {horas.map(h => (
              <div key={h} className="h-14 border-b border-crema-200 px-2 py-1 text-[10px] font-bold text-tinta-400">{h}:00</div>
            ))}
          </div>
          {/* day columns */}
          {dias.map((d,di) => (
            <div key={di} className="relative border-r border-crema-200 last:border-r-0">
              {horas.map((_,hi) => <div key={hi} className="h-14 border-b border-crema-200"/>)}
              {/* citas */}
              {d.citas.map((c,ci) => {
                const t = MOCK.TIPOS_CITA[c.t];
                const [hh,mm] = c.h.split(':').map(Number);
                const top = (hh - 8) * 56 + (mm/60)*56;
                const height = c.dur/60*56;
                return (
                  <button key={ci} onClick={() => openPaciente(MOCK.PACIENTES[ci % MOCK.PACIENTES.length].id)}
                          className="absolute left-1 right-1 rounded-lg p-2 text-left hover:scale-[1.02] hover:shadow-pop transition-all overflow-hidden group cursor-pointer"
                          style={{ top: top+2, height: height-2, background: t.soft, borderLeft: `3px solid ${t.bg}` }}>
                    <div className="text-[10px] font-mono font-bold" style={{color: t.ring}}>{c.h}</div>
                    <div className="text-xs font-bold mt-0.5 leading-tight text-tinta line-clamp-2">{c.n}</div>
                    {height > 40 && <div className="text-[10px] mt-1" style={{color: t.ring}}>{t.label}</div>}
                  </button>
                );
              })}
              {/* Now line for today */}
              {d.today && (
                <div className="absolute left-0 right-0 z-20" style={{ top: 56*1.7 }}>
                  <div className="flex items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-naranja -ml-1"/>
                    <div className="flex-1 h-0.5 bg-naranja"/>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MonthView() {
  const dias = Array.from({length: 35}, (_,i) => i - 3);
  return (
    <div className="p-5">
      <div className="grid grid-cols-7 gap-1 text-[11px] uppercase tracking-wide font-bold text-tinta-400 mb-2 px-1">
        {['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'].map(d => <div key={d} className="text-center">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {dias.map((d,i) => {
          const inMonth = d >= 1 && d <= 31;
          const today = d === 28;
          const citas = inMonth ? Math.floor(Math.random()*5) : 0;
          return (
            <div key={i} className={`aspect-square p-2 rounded-xl border ${today?'border-morado bg-morado-50':'border-crema-200 bg-white'} ${inMonth?'':'opacity-30'} hover:shadow-soft cursor-pointer transition-shadow`}>
              <div className={`font-bold text-sm ${today?'text-morado':'text-tinta'}`}>{inMonth ? d : ''}</div>
              <div className="flex gap-0.5 mt-1 flex-wrap">
                {Array.from({length: Math.min(citas,4)}, (_,k) => {
                  const colors = ['#F39200','#7B2D8E','#2E86AB','#C0392B'];
                  return <span key={k} className="w-1.5 h-1.5 rounded-full" style={{ background: colors[k%4] }}/>;
                })}
              </div>
              {citas > 0 && inMonth && <div className="text-[10px] text-tinta-400 mt-1 font-medium">{citas} citas</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function DayView({ openPaciente }) {
  return (
    <div className="p-5 text-left">
      <h3 className="font-serif text-xl font-semibold mb-4">Jueves 28 de mayo</h3>
      <div className="space-y-2">
        {MOCK.CITAS_HOY.map((c,i) => {
          const t = MOCK.TIPOS_CITA[c.tipo];
          return (
            <button key={i} onClick={() => openPaciente(c.pid)}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-crema-100 hover:bg-white hover:shadow-soft transition-all text-left border border-transparent hover:border-crema-200 cursor-pointer">
              <div className="font-mono text-sm font-bold text-tinta-600 w-14">{c.hora}</div>
              <div className="w-1.5 h-12 rounded-full" style={{ background: t.bg }}/>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-tinta">{c.paciente}</div>
                <div className="text-xs text-tinta-400 flex items-center gap-2">
                  <span>{c.dur} min</span><span>·</span><span>{c.modo}</span><span>·</span>
                  <span style={{color: t.ring}}>{t.label}</span>
                </div>
              </div>
              <Pill tone={c.estado==='en curso'?'rojo':'verde'} size="sm" dot>{c.estado}</Pill>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------- Bandeja unificada ----------
export function Bandeja({ openPaciente }) {
  const [canal, setCanal] = useState('todos');
  const [selId, setSelId] = useState(MOCK.MENSAJES[0].id);
  const [showTemplates, setShowTemplates] = useState(false);
  const filtered = MOCK.MENSAJES.filter(m => canal==='todos' || m.canal===canal);
  const sel = MOCK.MENSAJES.find(m => m.id === selId) || filtered[0];
  const paciente = sel?.pid ? MOCK.PACIENTES.find(p => p.id === sel.pid) : null;

  return (
    <div className="flex-1 flex min-h-0 bg-crema-100 text-left">
      {/* Lista */}
      <div className="w-[360px] bg-white border-r border-crema-200 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-crema-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-serif text-xl font-semibold">Bandeja</h2>
            <button className="text-tinta-400 hover:text-morado-600 cursor-pointer"><Icon name="refresh" size={16}/></button>
          </div>
          <div className="flex items-center gap-2 bg-crema-100 rounded-xl px-3 py-2 mb-3">
            <Icon name="search" size={14} className="text-tinta-400"/>
            <input placeholder="Buscar mensajes…" className="bg-transparent text-sm font-medium outline-none flex-1 placeholder-tinta-400"/>
          </div>
          <div className="flex gap-1 bg-crema-100 p-1 rounded-xl">
            {[
              { id:'todos',    label:'Todos',    icon:'inbox' },
              { id:'whatsapp', label:'WhatsApp', icon:'whatsapp' },
              { id:'mail',     label:'Mail',     icon:'mail' }
            ].map(o => (
              <button key={o.id} onClick={() => setCanal(o.id)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer
                        ${canal===o.id ? 'bg-white shadow-soft text-morado-600' : 'text-tinta-400'}`}>
                <Icon name={o.icon} size={12}/>
                {o.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-auto scrollbar-thin">
          {filtered.map(m => (
            <button key={m.id} onClick={() => setSelId(m.id)}
                    className={`w-full flex items-start gap-3 p-4 text-left border-b border-crema-200 hover:bg-crema-100 transition-colors cursor-pointer
                      ${selId===m.id ? 'bg-morado-50 border-l-4 border-l-morado' : m.sinleer ? 'bg-white' : 'bg-crema-100/40'}`}>
              <div className="relative flex-shrink-0">
                <Avatar initials={m.autor.split(' ').map(w=>w[0]).slice(0,2).join('')} tone={m.canal==='whatsapp'?'verde':'naranja'} size={40}/>
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white ${m.canal==='whatsapp'?'bg-[#25D366]':'bg-morado'} text-white`}>
                  <Icon name={m.canal} size={9}/>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className={`text-sm truncate ${m.sinleer?'font-extrabold text-tinta':'font-bold text-tinta-600'}`}>{m.autor}</div>
                  <div className="text-[10px] text-tinta-400 flex-shrink-0">{m.hora}</div>
                </div>
                <p className={`text-xs truncate mt-0.5 ${m.sinleer?'text-tinta-600 font-medium':'text-tinta-400'}`}>{m.preview}</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  {m.pid && <Pill tone="crema" size="sm" icon="link">Expediente</Pill>}
                  {m.adjunto && <Pill tone="crema" size="sm" icon="paperclip">PDF</Pill>}
                </div>
              </div>
              {m.sinleer && <span className="w-2 h-2 rounded-full bg-naranja mt-2 flex-shrink-0"/>}
            </button>
          ))}
        </div>
      </div>

      {/* Conversación */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {sel && (
          <>
            <div className="bg-white border-b border-crema-200 px-6 py-4 flex items-center justify-between gap-3 flex-shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <Avatar initials={sel.autor.split(' ').map(w=>w[0]).slice(0,2).join('')} tone={sel.canal==='whatsapp'?'verde':'naranja'} size={42}/>
                <div className="min-w-0">
                  <div className="font-bold text-tinta truncate">{sel.autor}</div>
                  <div className="flex items-center gap-2 text-xs text-tinta-400">
                    <span className={`w-1.5 h-1.5 rounded-full ${sel.canal==='whatsapp'?'bg-[#25D366]':'bg-morado'}`}/>
                    <span className="capitalize">{sel.canal}</span>
                    {paciente && (
                      <>
                        <span>·</span>
                        <button onClick={() => openPaciente(paciente.id)} className="font-bold text-morado-600 hover:underline cursor-pointer">
                          Ver expediente ↗
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="soft" size="sm" icon="calendar">Agendar</Button>
                <Button variant="soft" size="sm" icon="fileText">Nota</Button>
                <button className="w-9 h-9 rounded-xl bg-crema-100 hover:bg-morado-50 text-tinta-600 flex items-center justify-center cursor-pointer"><Icon name="more" size={16}/></button>
              </div>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-auto scrollbar-thin p-6 space-y-3" style={{
              backgroundImage: 'radial-gradient(rgba(123,45,142,.04) 1px, transparent 1.5px)',
              backgroundSize: '22px 22px'
            }}>
              <div className="text-center text-[11px] font-bold text-tinta-400 uppercase tracking-wider mb-4">Hoy</div>
              <ChatBubble from="them" text={sel.preview} hora={sel.hora}/>
              <ChatBubble from="them" text="Sentí que el donante me decía algo, pero no recuerdo qué. Me dejó muy intranquila al despertar." hora={sel.hora}/>
              <ChatBubble from="me" text="Te leo, María. Es muy frecuente que después del trasplante aparezcan sueños vívidos. ¿Cómo está tu sueño en general estos días?" hora="08:44"/>
              <ChatBubble from="them" text="Mal. Llevo durmiendo 5 hrs por noche desde hace una semana." hora="08:46"/>
              <ChatBubble from="me" text="Hagámoslo el jueves en sesión. Por ahora aplica respiración 4-7-8 antes de dormir + deja papel y pluma al lado de la cama para escribir los sueños al despertar — los traemos a sesión." hora="08:48"/>
              <ChatBubble from="them" text="Gracias doctora 🙏" hora="08:50"/>
            </div>

            {/* Compositor */}
            <div className="bg-white border-t border-crema-200 p-4 flex-shrink-0 relative">
              {showTemplates && (
                <div className="absolute bottom-full left-4 right-4 mb-2 bg-white border border-crema-200 rounded-2xl shadow-pop p-3 max-h-72 overflow-auto scrollbar-thin z-30">
                  <div className="text-[11px] font-bold uppercase tracking-wide text-tinta-400 px-2 mb-2">Plantillas rápidas</div>
                  {MOCK.PLANTILLAS.map(p => (
                    <button key={p.id} onClick={() => setShowTemplates(false)}
                            className="w-full text-left p-2.5 rounded-xl hover:bg-crema-100 transition-colors cursor-pointer">
                      <div className="font-bold text-sm">{p.titulo}</div>
                      <div className="text-xs text-tinta-400 line-clamp-1 mt-0.5">{p.texto}</div>
                    </button>
                  ))}
                </div>
              )}
              <div className="flex items-end gap-2 bg-crema-100 rounded-2xl p-2">
                <button onClick={() => setShowTemplates(s=>!s)} title="Plantillas"
                        className="w-9 h-9 rounded-xl hover:bg-white text-morado-600 flex items-center justify-center flex-shrink-0 cursor-pointer">
                  <Icon name="template" size={16}/>
                </button>
                <button className="w-9 h-9 rounded-xl hover:bg-white text-tinta-600 flex items-center justify-center flex-shrink-0 cursor-pointer">
                  <Icon name="paperclip" size={16}/>
                </button>
                <textarea rows={1} placeholder={`Responder por ${sel.canal}…`}
                          className="flex-1 bg-transparent text-sm font-medium outline-none resize-none py-2 placeholder-tinta-400 max-h-32"/>
                <Button variant="primary" size="sm" icon="send">Enviar</Button>
              </div>
              <div className="flex items-center gap-3 mt-2 px-2 text-xs text-tinta-400">
                <button className="hover:text-morado-600 font-bold flex items-center gap-1 cursor-pointer"><Icon name="link" size={12}/> Vincular a expediente</button>
                <button className="hover:text-morado-600 font-bold flex items-center gap-1 cursor-pointer"><Icon name="graduation" size={12}/> Asignar cápsula</button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Panel paciente */}
      {paciente && (
        <div className="w-[280px] bg-white border-l border-crema-200 flex-shrink-0 overflow-auto scrollbar-thin hidden xl:block">
          <div className="p-5">
            <Avatar initials={paciente.avatar} tone="morado" size={64}/>
            <h3 className="font-bold text-tinta mt-3 leading-tight">{paciente.nombre}</h3>
            <div className="text-xs text-tinta-400 mt-0.5">{paciente.edad} años · {paciente.ciudad}</div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              <span className="px-2 py-1 rounded-full text-[10px] font-bold" style={{ background: MOCK.TRASPLANTES[paciente.tipo].soft, color: MOCK.TRASPLANTES[paciente.tipo].color }}>
                {MOCK.TRASPLANTES[paciente.tipo].label}
              </span>
              <Pill tone="crema" size="sm">{MOCK.ETAPAS[paciente.etapa].label}</Pill>
            </div>
            <div className="mt-5 space-y-3 text-xs">
              <div>
                <div className="text-[10px] uppercase tracking-wide text-tinta-400 font-bold mb-1">Próxima cita</div>
                <div className="text-sm font-bold">{paciente.proximaCita.replace('2026-','').slice(0,11)}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wide text-tinta-400 font-bold mb-1">Última nota</div>
                <div className="text-sm font-bold leading-snug">14 may · Trabajo sobre culpa hacia donante</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wide text-tinta-400 font-bold mb-1">Adherencia</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-crema-200 overflow-hidden">
                    <div className="h-full rounded-full bg-[#6B9C2F]" style={{ width: paciente.adherencia+'%' }}/>
                  </div>
                  <span className="font-bold">{paciente.adherencia}%</span>
                </div>
              </div>
            </div>
            <Button variant="soft" size="sm" className="w-full mt-5" icon="arrowRight" onClick={() => openPaciente(paciente.id)}>Abrir expediente</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export function ChatBubble({ from, text, hora }) {
  const me = from === 'me';
  return (
    <div className={`flex ${me?'justify-end':'justify-start'}`}>
      <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl ${me ? 'bg-morado text-white rounded-br-md text-left' : 'bg-white text-tinta rounded-bl-md shadow-soft'}`}>
        <p className="text-sm leading-relaxed">{text}</p>
        <div className={`text-[10px] mt-1 flex items-center justify-end gap-1 ${me?'text-white/70':'text-tinta-400'}`}>
          {hora}
          {me && <Icon name="check" size={11}/>}
        </div>
      </div>
    </div>
  );
}

// ---------- Mini Escuelita (admin) ----------
export function EscuelitaAdmin({ openPaciente }) {
  const [view, setView] = useState('biblioteca');
  return (
    <div className="p-8 max-w-[1400px] space-y-5 mx-auto text-left">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="inline-flex bg-crema-100 rounded-xl p-1">
          {[
            { id:'biblioteca', label:'Biblioteca',  icon:'layers' },
            { id:'asignar',    label:'Asignaciones', icon:'send' },
            { id:'reportes',   label:'Reportes',    icon:'trending' }
          ].map(v => (
            <button key={v.id} onClick={() => setView(v.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer
                      ${view===v.id ? 'bg-white shadow-soft text-morado-600' : 'text-tinta-400'}`}>
              <Icon name={v.icon} size={14}/>
              {v.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="soft" size="sm" icon="upload">Subir contenido</Button>
          <Button variant="primary" size="sm" icon="plus">Nueva cápsula</Button>
        </div>
      </div>

      {view === 'biblioteca' && <BibliotecaView/>}
      {view === 'asignar'    && <AsignarView openPaciente={openPaciente}/>}
      {view === 'reportes'   && <ReportesEscuelita/>}
    </div>
  );
}

export function BibliotecaView() {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { l:'Cápsulas totales', v:'23', i:'layers',     t:'morado' },
          { l:'Asignadas activas', v:'182', i:'send',     t:'naranja' },
          { l:'Vistas este mes',  v:'143', i:'eye',       t:'verde' },
          { l:'Tasa de visualización', v:'78%', i:'trending', t:'azul' }
        ].map((k,i) => <KpiCard key={i} label={k.l} value={k.v} delta="" icon={k.i} tone={k.t}/>)}
      </div>
      <Card padding="p-0" className="overflow-hidden">
        <div className="p-5 border-b border-crema-200 flex items-center justify-between flex-wrap gap-3">
          <h3 className="font-serif text-xl font-semibold">Biblioteca</h3>
          <div className="flex items-center gap-2 text-sm">
            <FilterChip label="Categoría" value="todos" onChange={()=>{}} options={[{id:'todos',label:'Todas'},{id:'pre',label:'Pre-trasplante'},{id:'post',label:'Post-trasplante'},{id:'fam',label:'Familia'},{id:'herr',label:'Herramientas'}]}/>
            <FilterChip label="Tipo" value="todos" onChange={()=>{}} options={[{id:'todos',label:'Todos'},{id:'video',label:'Video'},{id:'lectura',label:'Lectura'},{id:'pdf',label:'PDF'}]}/>
          </div>
        </div>
        <div className="divide-y divide-crema-200">
          {MOCK.ESCUELITA.map((e,i) => {
            const pct = Math.round(e.vistos/e.asignados*100);
            return (
              <div key={e.id} className="flex items-center gap-4 px-5 py-4 hover:bg-crema-100 transition-colors group">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-white ${e.tipo==='video'?'bg-morado':e.tipo==='pdf'?'bg-naranja':'bg-[#2E86AB]'}`}>
                  <Icon name={e.tipo==='video'?'play':e.tipo==='pdf'?'fileText':'book'} size={22}/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <Pill tone="crema" size="sm">{e.cat}</Pill>
                    <Pill tone={e.tipo==='video'?'morado':e.tipo==='pdf'?'naranja':'azul'} size="sm" className="capitalize">{e.tipo}</Pill>
                    <span className="text-xs text-tinta-400">{e.dur}</span>
                  </div>
                  <h4 className="font-bold text-tinta leading-tight" style={{textWrap:'pretty'}}>{e.titulo}</h4>
                </div>
                <div className="hidden md:flex items-center gap-6 flex-shrink-0">
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-wide text-tinta-400 font-bold">Asignadas</div>
                    <div className="font-bold text-sm">{e.asignados}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-wide text-tinta-400 font-bold">Vistas</div>
                    <div className="font-bold text-sm">{e.vistos}/{e.asignados}</div>
                  </div>
                  <div className="w-20">
                    <div className="text-[10px] uppercase tracking-wide text-tinta-400 font-bold text-right mb-1">{pct}%</div>
                    <div className="h-1.5 rounded-full bg-crema-200 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: pct+'%', background: pct>85?'#6B9C2F':pct>60?'#F39200':'#C0392B' }}/>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <Button variant="soft" size="sm" icon="send">Asignar</Button>
                  <button className="w-9 h-9 rounded-xl bg-crema-100 hover:bg-morado-50 text-tinta-600 flex items-center justify-center cursor-pointer"><Icon name="more" size={14}/></button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
}

export function AsignarView({ openPaciente }) {
  return (
    <Card padding="p-0" className="overflow-hidden">
      <div className="p-5 border-b border-crema-200 text-left">
        <h3 className="font-serif text-xl font-semibold">Asignaciones por paciente</h3>
        <p className="text-xs text-tinta-400 mt-0.5">Quién tiene qué cápsulas activas y su progreso</p>
      </div>
      <div className="divide-y divide-crema-200">
        {MOCK.PACIENTES.slice(0,8).map((p,i) => {
          const t = MOCK.TRASPLANTES[p.tipo];
          const asig = 2 + (i % 4);
          const vistos = Math.max(1, asig - (i % 3));
          const pct = Math.round(vistos/asig*100);
          return (
            <div key={p.id} className="flex items-center gap-4 px-5 py-4 hover:bg-crema-100 text-left">
              <Avatar initials={p.avatar} tone="morado" size={40}/>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm truncate">{p.nombre}</div>
                <div className="text-xs text-tinta-400 flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold" style={{ background: t.soft, color: t.color }}>{t.label}</span>
                  <span>{MOCK.ETAPAS[p.etapa].label}</span>
                </div>
              </div>
              <div className="hidden md:flex flex-1 gap-1.5">
                {Array.from({length: asig}, (_,k) => (
                  <div key={k} className={`flex-1 h-8 rounded-lg flex items-center justify-center text-white ${k < vistos ? 'bg-[#6B9C2F]' : 'bg-crema-200 text-tinta-400'}`}>
                    <Icon name={k < vistos ? 'check' : 'clock'} size={14}/>
                  </div>
                ))}
              </div>
              <div className="text-right w-20">
                <div className="font-bold text-sm">{vistos}/{asig}</div>
                <div className="text-[10px] text-tinta-400">{pct}% vistos</div>
              </div>
              <Button variant="soft" size="sm" icon="plus">Asignar</Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export function ReportesEscuelita() {
  return (
    <div className="grid lg:grid-cols-2 gap-5 text-left">
      <Card>
        <h3 className="font-serif text-xl font-semibold mb-1">Cápsulas más vistas</h3>
        <p className="text-xs text-tinta-400 mb-5">Últimos 30 días</p>
        <div className="space-y-3">
          {[...MOCK.ESCUELITA].sort((a,b) => b.vistos - a.vistos).slice(0,5).map((e,i) => (
            <div key={e.id} className="flex items-center gap-3">
              <div className="font-serif text-2xl font-semibold text-morado-200 w-8">{i+1}</div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm truncate">{e.titulo}</div>
                <div className="text-xs text-tinta-400">{e.cat} · {e.tipo}</div>
              </div>
              <div className="flex items-center gap-2 w-32">
                <div className="flex-1 h-2 rounded-full bg-crema-200 overflow-hidden">
                  <div className="h-full rounded-full bg-naranja" style={{ width: e.vistos/30*100+'%' }}/>
                </div>
                <span className="font-bold text-sm w-8 text-right">{e.vistos}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <h3 className="font-serif text-xl font-semibold mb-1">Tiempo promedio de consumo</h3>
        <p className="text-xs text-tinta-400 mb-5">Por categoría</p>
        <div className="space-y-3">
          {[
            { c:'Post-trasplante', t:'8 min 42s', v: 92 },
            { c:'Adherencia',      t:'6 min 18s', v: 78 },
            { c:'Familia',         t:'10 min 04s', v: 84 },
            { c:'Herramientas',    t:'5 min 22s', v: 68 },
            { c:'Pre-trasplante',  t:'7 min 51s', v: 81 }
          ].map((r,i) => (
            <div key={i}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-bold">{r.c}</span>
                <span className="font-mono text-tinta-600">{r.t}</span>
              </div>
              <div className="h-2 rounded-full bg-crema-200 overflow-hidden">
                <div className="h-full rounded-full bg-morado" style={{ width: r.v+'%' }}/>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ---------- Notas standalone (lista de todas las notas) ----------
export function NotasStandalone() {
  return (
    <div className="p-8 max-w-[1400px] space-y-5 mx-auto text-left">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-serif text-2xl font-semibold">Todas las notas</h2>
          <p className="text-xs text-tinta-400 mt-0.5">Editor estilo Notion · autoguardado · plantillas SOAP/DAP</p>
        </div>
        <div className="flex gap-2">
          <Button variant="soft" size="sm" icon="search">Buscar</Button>
          <Button variant="soft" size="sm" icon="template">Plantillas</Button>
          <Button variant="primary" size="sm" icon="plus">Nueva nota</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK.HISTORIAL_P01.concat(MOCK.HISTORIAL_P01.slice(0,2)).map((n, i) => {
          const p = MOCK.PACIENTES[i % MOCK.PACIENTES.length];
          return (
            <Card key={i} padding="p-0" interactive className="overflow-hidden cursor-pointer flex flex-col">
              <div className="h-1.5" style={{ background: MOCK.TRASPLANTES[p.tipo].color }}/>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3 text-xs text-tinta-400">
                  <Pill tone={n.tipo==='Primera vez'?'morado':n.tipo==='Familia'?'azul':'naranja'} size="sm">{n.tipo}</Pill>
                  <span>·</span>
                  <span>{n.fecha}</span>
                </div>
                <h4 className="font-bold text-tinta leading-snug mb-2" style={{textWrap:'pretty'}}>Sesión {n.fecha.slice(-2)} · {n.tipo}</h4>
                <p className="text-sm text-tinta-600 leading-relaxed line-clamp-3 flex-1">{n.resumen}</p>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-crema-200">
                  <Avatar initials={p.avatar} tone="morado" size={28}/>
                  <div className="text-xs">
                    <div className="font-bold truncate">{p.nombre}</div>
                    <div className="text-tinta-400">{MOCK.TRASPLANTES[p.tipo].label}</div>
                  </div>
                  <div className="ml-auto flex items-center gap-1 text-xs text-tinta-400">
                    <Icon name="paperclip" size={11}/> {1 + (i%3)}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

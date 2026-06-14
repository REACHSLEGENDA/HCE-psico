import React, { useState } from 'react';
import { MOCK } from '../data/mockData';
import { Logo, Icon, Avatar, Pill, Button, Card } from './Shared';

// ---------- Lista de pacientes ----------
export function Pacientes({ openPaciente }) {
  const [q, setQ] = useState('');
  const [tipo, setTipo] = useState('todos');
  const [etapa, setEtapa] = useState('todos');
  const [view, setView] = useState('grid');

  const filtered = MOCK.PACIENTES.filter(p =>
    (tipo==='todos' || p.tipo===tipo) &&
    (etapa==='todos' || p.etapa===etapa) &&
    (q==='' || p.nombre.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="p-8 space-y-6 max-w-[1400px] mx-auto text-left">
      {/* Filters bar */}
      <Card padding="p-5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[220px] flex items-center gap-2 bg-crema-100 rounded-xl px-3 py-2.5">
            <Icon name="search" size={16} className="text-tinta-400"/>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar por nombre, teléfono o correo…"
                   className="bg-transparent text-sm font-medium outline-none flex-1 placeholder-tinta-400"/>
          </div>

          <FilterChip label="Tipo" value={tipo} onChange={setTipo}
            options={[{id:'todos',label:'Todos'}, ...Object.entries(MOCK.TRASPLANTES).map(([k,v]) => ({id:k,label:v.label,color:v.color}))]}/>
          <FilterChip label="Etapa" value={etapa} onChange={setEtapa}
            options={[{id:'todos',label:'Todas'}, ...Object.entries(MOCK.ETAPAS).map(([k,v]) => ({id:k,label:v.label}))]}/>

          <div className="flex bg-crema-100 rounded-xl p-1">
            <button onClick={() => setView('grid')} className={`px-2.5 py-1.5 rounded-lg cursor-pointer ${view==='grid'?'bg-white shadow-soft text-morado-600':'text-tinta-400'}`}>
              <Icon name="layers" size={14}/>
            </button>
            <button onClick={() => setView('list')} className={`px-2.5 py-1.5 rounded-lg cursor-pointer ${view==='list'?'bg-white shadow-soft text-morado-600':'text-tinta-400'}`}>
              <Icon name="list" size={14}/>
            </button>
          </div>

          <Button variant="primary" icon="plus">Nuevo paciente</Button>
        </div>

        <div className="flex items-center gap-2 mt-4 text-sm text-tinta-400">
          <span><strong className="text-tinta">{filtered.length}</strong> pacientes</span>
          <span>·</span>
          <span>Ordenados por última consulta</span>
        </div>
      </Card>

      {/* Grid view */}
      {view === 'grid' ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(p => (
            <PacienteCard key={p.id} p={p} onClick={() => openPaciente(p.id)}/>
          ))}
        </div>
      ) : (
        <Card padding="p-0" className="overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-crema-100 text-tinta-400 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left font-bold px-5 py-3">Paciente</th>
                <th className="text-left font-bold px-3 py-3">Tipo</th>
                <th className="text-left font-bold px-3 py-3">Etapa</th>
                <th className="text-left font-bold px-3 py-3">Próxima cita</th>
                <th className="text-left font-bold px-3 py-3">Adherencia</th>
                <th className="text-left font-bold px-3 py-3">Riesgo</th>
                <th className="w-12 px-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => {
                const t = MOCK.TRASPLANTES[p.tipo];
                const e = MOCK.ETAPAS[p.etapa];
                return (
                  <tr key={p.id} className="border-t border-crema-200 hover:bg-crema-100 cursor-pointer transition-colors" onClick={() => openPaciente(p.id)}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar initials={p.avatar} tone="morado" size={36}/>
                        <div>
                          <div className="font-bold truncate">{p.nombre}</div>
                          <div className="text-xs text-tinta-400">{p.edad} años · {p.ciudad}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3"><span className="px-2 py-1 rounded-full text-[11px] font-bold" style={{ background: t.soft, color: t.color }}>{t.label}</span></td>
                    <td className="px-3 py-3"><Pill tone="crema" size="sm" dot>{e.label}</Pill></td>
                    <td className="px-3 py-3 font-medium text-tinta-600">{p.proximaCita.replace('2026-','').slice(0,11)}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-crema-200 overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: p.adherencia+'%', background: p.adherencia>85?'#6B9C2F':p.adherencia>70?'#F39200':'#C0392B' }}/>
                        </div>
                        <span className="text-xs font-bold text-tinta-600">{p.adherencia}%</span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <Pill tone={p.riesgo==='alto'?'rojo':p.riesgo==='medio'?'naranja':'verde'} size="sm" dot>{p.riesgo}</Pill>
                    </td>
                    <td className="px-3"><Icon name="chevronRight" size={16} className="text-tinta-400"/></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}

export function FilterChip({ label, value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const current = options.find(o => o.id === value);
  return (
    <div className="relative">
      <button onClick={() => setOpen(o=>!o)}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-crema-100 hover:bg-morado-50 text-sm font-bold transition-colors cursor-pointer">
        <Icon name="filter" size={13} className="text-tinta-400"/>
        <span className="text-tinta-400">{label}:</span>
        <span className="text-tinta">{current?.label}</span>
        <Icon name="chevronDown" size={13} className="text-tinta-400"/>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)}/>
          <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-pop border border-crema-200 py-2 min-w-[180px] z-20">
            {options.map(o => (
              <button key={o.id} onClick={() => { onChange(o.id); setOpen(false); }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm font-bold hover:bg-crema-100 text-left cursor-pointer">
                {o.color && <span className="w-2 h-2 rounded-full" style={{ background: o.color }}/>}
                <span className="flex-1">{o.label}</span>
                {value===o.id && <Icon name="check" size={14} className="text-morado-600"/>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function PacienteCard({ p, onClick }) {
  const t = MOCK.TRASPLANTES[p.tipo];
  const e = MOCK.ETAPAS[p.etapa];
  return (
    <Card padding="p-0" interactive className="cursor-pointer overflow-hidden group text-left" onClick={onClick}>
      <div className="h-16 relative" style={{ background: `linear-gradient(135deg, ${t.color} 0%, ${t.color}cc 100%)` }}>
        <svg viewBox="0 0 300 80" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
          <circle cx="40"  cy="30" r="22" fill="white" opacity=".18"/>
          <circle cx="260" cy="60" r="34" fill="white" opacity=".12"/>
          <circle cx="180" cy="20" r="12" fill="white" opacity=".22"/>
        </svg>
        <span className="absolute top-3 right-3 px-2 py-1 rounded-full text-[10px] font-bold bg-white/95" style={{ color: t.color }}>{t.label}</span>
      </div>
      <div className="px-5 pb-5 -mt-7">
        <Avatar initials={p.avatar} tone="morado" size={52} ring/>
        <h3 className="font-bold text-tinta mt-3 leading-tight" style={{textWrap:'pretty'}}>{p.nombre}</h3>
        <div className="text-xs text-tinta-400 mt-1">{p.edad} años · {p.sexo} · {p.ciudad}</div>
        <div className="flex flex-wrap gap-1.5 mt-3">
          <Pill tone="crema" size="sm" dot>{e.label}</Pill>
          <Pill tone={p.riesgo==='alto'?'rojo':p.riesgo==='medio'?'naranja':'verde'} size="sm">riesgo {p.riesgo}</Pill>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-crema-200">
          <div>
            <div className="text-[10px] uppercase tracking-wide text-tinta-400 font-bold">Notas</div>
            <div className="text-base font-bold text-tinta">{p.notes || p.notas}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wide text-tinta-400 font-bold">Adherencia</div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-12 h-1.5 rounded-full bg-crema-200 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: p.adherencia+'%', background: p.adherencia>85?'#6B9C2F':p.adherencia>70?'#F39200':'#C0392B' }}/>
              </div>
              <span className="text-xs font-bold">{p.adherencia}%</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-tinta-400">
          <Icon name="calendar" size={13}/> Próxima: {p.proximaCita.replace('2026-','').slice(0,11)}
        </div>
      </div>
    </Card>
  );
}

// ---------- Detalle Expediente ----------
export function ExpedienteDetalle({ pid, back, openCrm }) {
  const p = MOCK.PACIENTES.find(x => x.id === pid) || MOCK.PACIENTES[0];
  const [tab, setTab] = useState('generales');
  const t = MOCK.TRASPLANTES[p.tipo];
  const e = MOCK.ETAPAS[p.etapa];

  const tabs = [
    { id: 'generales',   label: 'Datos generales',   icon: 'user' },
    { id: 'historial',   label: 'Historial',         icon: 'clock', count: MOCK.HISTORIAL_P01.length },
    { id: 'notas',       label: 'Notas clínicas',    icon: 'fileText', count: p.notes || p.notas },
    { id: 'examenes',    label: 'Exámenes',          icon: 'fileImage', count: 8 },
    { id: 'tratamiento', label: 'Tratamiento',       icon: 'pill' },
    { id: 'plan',        label: 'Plan terapéutico',  icon: 'clipboard' },
    { id: 'escuelita',   label: 'Mini Escuelita',    icon: 'graduation', count: 4 }
  ];

  return (
    <div className="flex-1 flex flex-col min-h-0 text-left">
      {/* Header del paciente */}
      <div className="bg-white border-b border-crema-200 px-8 py-5 flex-shrink-0">
        <button onClick={back} className="flex items-center gap-1.5 text-xs font-bold text-tinta-400 hover:text-morado-600 mb-3 cursor-pointer">
          <Icon name="arrowLeft" size={14}/> Volver a expedientes
        </button>
        <div className="flex items-start gap-5">
          <Avatar initials={p.avatar} tone="morado" size={64}/>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="font-serif text-2xl font-semibold text-tinta">{p.nombre}</h1>
              <span className="px-2 py-1 rounded-full text-[11px] font-bold" style={{ background: t.soft, color: t.color }}>{t.label}</span>
              <Pill tone="crema" size="sm" dot>{e.label}</Pill>
              <Pill tone={p.riesgo==='alto'?'rojo':p.riesgo==='medio'?'naranja':'verde'} size="sm">riesgo {p.riesgo}</Pill>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-tinta-400">
              <span><strong className="text-tinta-600">{p.edad}</strong> años · {p.sexo}</span>
              <span className="flex items-center gap-1"><Icon name="pin" size={13}/> {p.ciudad}</span>
              <span className="flex items-center gap-1"><Icon name="phone" size={13}/> {p.tel}</span>
              <span className="flex items-center gap-1"><Icon name="mail" size={13}/> {p.email}</span>
              <span className="flex items-center gap-1"><Icon name="clock" size={13}/> En consulta desde {p.desde}</span>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button variant="soft" size="sm" icon="whatsapp">WhatsApp</Button>
            <Button variant="soft" size="sm" icon="mail">Correo</Button>
            <Button variant="primary" size="sm" icon="calendar">Nueva cita</Button>
            <button className="w-9 h-9 rounded-xl bg-crema-100 hover:bg-morado-50 text-tinta-600 flex items-center justify-center cursor-pointer"><Icon name="more" size={16}/></button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-5 overflow-x-auto no-scrollbar -mb-5">
          {tabs.map(tb => (
            <button key={tb.id} onClick={() => setTab(tb.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-sm font-bold transition-all flex-shrink-0 -mb-px cursor-pointer
                      ${tab===tb.id ? 'bg-crema-100 text-morado-600 border-b-2 border-morado' : 'text-tinta-400 hover:text-morado-600'}`}>
              <Icon name={tb.icon} size={14}/>
              {tb.label}
              {tb.count !== undefined && <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${tab===tb.id?'bg-morado text-white':'bg-crema-200 text-tinta-600'}`}>{tb.count}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-auto scrollbar-thin bg-crema-100">
        {tab === 'generales'   && <TabGenerales p={p}/>}
        {tab === 'historial'   && <TabHistorial p={p}/>}
        {tab === 'notas'       && <TabNotas p={p} openCrm={openCrm}/>}
        {tab === 'examenes'    && <TabExamenes/>}
        {tab === 'tratamiento' && <TabTratamiento/>}
        {tab === 'plan'        && <TabPlan/>}
        {tab === 'escuelita'   && <TabEscuelitaAsignada/>}
      </div>
    </div>
  );
}

// ---------- TAB: Generales ----------
export function TabGenerales({ p }) {
  return (
    <div className="p-8 grid lg:grid-cols-[1.4fr_1fr] gap-5 max-w-[1400px] mx-auto">
      <div className="space-y-5">
        <Card>
          <h3 className="font-bold text-tinta mb-4 flex items-center gap-2"><Icon name="user" size={16} className="text-morado-600"/> Antecedentes</h3>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
            <Field2 label="Padecimiento principal" value={p.tipo === 'renal' ? 'Insuficiencia renal crónica (estadio 5)' : 'Cirrosis hepática descompensada'}/>
            <Field2 label="Inicio del padecimiento" value="2019 · Diagnóstico inicial"/>
            <Field2 label="Hospital de referencia" value="Hospital General de México"/>
            <Field2 label="Médico tratante" value="Dr. Ernesto Salinas (Nefrología)"/>
            <Field2 label="Antecedentes psiquiátricos" value="Episodio depresivo mayor (2020) · resuelto"/>
            <Field2 label="Antecedentes familiares" value="Madre — HTA · Padre — DM2"/>
            <Field2 label="Estado civil" value="Casada · 2 hijos adultos"/>
            <Field2 label="Ocupación" value="Maestra de primaria (en reposo)"/>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-tinta flex items-center gap-2"><Icon name="users" size={16} className="text-morado-600"/> Red de apoyo</h3>
            <Button variant="ghost" size="sm" icon="plus">Agregar</Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { n:'Carlos Mendoza',  r:'Esposo · cuidador principal', t:'55 8821 0011', av:'CM', tone:'naranja' },
              { n:'Daniela Sandoval', r:'Hija · 28 años',              t:'55 4433 9911', av:'DS', tone:'morado' },
              { n:'Eduardo Sandoval', r:'Hijo · 25 años · vive en GDL', t:'33 2018 4422', av:'ES', tone:'azul' },
              { n:'Margarita Ruiz',  r:'Hermana · apoyo emocional',   t:'55 6611 2299', av:'MR', tone:'verde' }
            ].map((c,i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-crema-100">
                <Avatar initials={c.av} tone={c.tone} size={40}/>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm truncate">{c.n}</div>
                  <div className="text-xs text-tinta-400 truncate">{c.r}</div>
                  <div className="text-xs text-tinta-400 font-mono mt-0.5">{c.t}</div>
                </div>
                <button className="text-[#25D366] hover:bg-white p-1.5 rounded-lg cursor-pointer"><Icon name="whatsapp" size={14}/></button>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-tinta flex items-center gap-2"><Icon name="alert" size={16} className="text-morado-600"/> Alertas clínicas</h3>
            <Button variant="ghost" size="sm" icon="plus">Agregar</Button>
          </div>
          <div className="space-y-2">
            {[
              { t:'alta', txt:'Episodio reciente de ansiedad post-revisión médica (16 abr)' },
              { t:'media', txt:'Adherencia a inmunosupresores en revisión — Tacrolimus' },
              { t:'info',  txt:'Trabajo activo sobre culpa del receptor'}
            ].map((a,i) => (
              <div key={i} className={`flex gap-3 p-3 rounded-xl border-l-4 ${a.t==='alta'?'bg-[#F8D6D2]/50 border-[#C0392B]':a.t==='media'?'bg-naranja-50 border-naranja':'bg-morado-50 border-morado'}`}>
                <Icon name={a.t==='alta'?'alert':'info'} size={16} className={a.t==='alta'?'text-[#C0392B]':a.t==='media'?'text-naranja-700':'text-morado-600'}/>
                <p className="text-sm font-medium text-tinta">{a.txt}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="space-y-5">
        <Card>
          <h3 className="font-bold text-tinta mb-4 flex items-center gap-2"><Icon name="activity" size={16} className="text-morado-600"/> Estado emocional</h3>
          <div className="text-center py-3">
            <div className="text-5xl mb-2">😌</div>
            <div className="font-serif text-xl font-semibold text-tinta">Estable</div>
            <div className="text-xs text-tinta-400 mt-1">Reportado el 14 may en consulta</div>
          </div>
          <div className="mt-4 pt-4 border-t border-crema-200">
            <div className="text-xs font-bold text-tinta-400 uppercase tracking-wide mb-3">Últimas 6 sesiones</div>
            <div className="flex items-end justify-between gap-1.5 h-16">
              {[4,3,5,6,5,7].map((v,i) => (
                <div key={i} className="flex-1 rounded-t bg-morado" style={{ height: v/10*100+'%', opacity: 0.4 + i*0.1 }}/>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-tinta-400 mt-1 font-medium">
              <span>Feb</span><span>Mar</span><span>Abr</span><span>Abr</span><span>May</span><span>May</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="font-bold text-tinta mb-4 flex items-center gap-2"><Icon name="calendar" size={16} className="text-morado-600"/> Próximas citas</h3>
          <div className="space-y-2">
            {[
              { f:'Hoy 09:00', t:'Seguimiento · 50 min', m:'Consultorio' },
              { f:'5 jun 10:00', t:'Seguimiento · 50 min', m:'Videollamada' },
              { f:'19 jun 10:00', t:'Familia · 60 min', m:'Consultorio' }
            ].map((c,i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-crema-100">
                <div className="text-center w-12">
                  <div className="font-mono text-xs font-bold text-morado">{c.f.split(' ')[0]==='Hoy'?'HOY':c.f.split(' ')[0]}</div>
                  <div className="text-[11px] text-tinta-400">{c.f.split(' ')[1]||c.f.split(' ')[2]}</div>
                </div>
                <div className="flex-1 min-w-0 border-l-2 border-crema-200 pl-3">
                  <div className="font-bold text-sm truncate">{c.t}</div>
                  <div className="text-xs text-tinta-400 truncate">{c.m}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-bold text-tinta mb-3 flex items-center gap-2"><Icon name="dollar" size={16} className="text-morado-600"/> Pagos</h3>
          <div className="flex items-baseline justify-between mb-3">
            <div className="font-serif text-3xl font-semibold text-tinta">$0</div>
            <Pill tone="verde">al corriente</Pill>
          </div>
          <div className="text-xs text-tinta-400">12 consultas pagadas · última 14 may</div>
          <Button variant="soft" size="sm" className="w-full mt-4">Ver historial de pagos</Button>
        </Card>
      </div>
    </div>
  );
}

export function Field2({ label, value }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wide text-tinta-400 font-bold">{label}</div>
      <div className="font-medium text-tinta mt-0.5">{value}</div>
    </div>
  );
}

// ---------- TAB: Historial ----------
export function TabHistorial() {
  return (
    <div className="p-8 max-w-4xl">
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-serif text-2xl font-semibold text-tinta">Historial de consultas</h3>
            <p className="text-xs text-tinta-400 mt-1">7 sesiones · desde 19 feb 2026</p>
          </div>
          <div className="flex gap-2">
            <Button variant="soft" size="sm" icon="download">Exportar</Button>
            <Button variant="primary" size="sm" icon="plus">Registrar consulta</Button>
          </div>
        </div>

        <div className="relative pl-7">
          <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-crema-200"/>
          {MOCK.HISTORIAL_P01.map((h, i) => (
            <div key={i} className="relative pb-6 last:pb-0">
              <div className={`absolute -left-7 top-2 w-4 h-4 rounded-full ring-4 ring-white ${i===0?'bg-naranja':'bg-morado'}`}/>
              <div className="bg-crema-100 rounded-2xl p-5 hover:bg-white hover:shadow-soft transition-all border border-transparent hover:border-crema-200 cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-tinta-400">{h.fecha}</span>
                  <span className="text-tinta-400">·</span>
                  <Pill tone={h.tipo==='Primera vez'?'morado':h.tipo==='Familia'?'azul':'naranja'} size="sm">{h.tipo}</Pill>
                  <span className="text-tinta-400">·</span>
                  <span className="text-xs text-tinta-400">{h.dur}</span>
                  {i===0 && <Pill tone="naranja" size="sm" className="ml-auto">Más reciente</Pill>}
                </div>
                <p className="text-sm text-tinta-600 leading-relaxed mb-3">{h.resumen}</p>
                <div className="flex items-center gap-3 text-xs">
                  <button className="font-bold text-morado-600 hover:underline flex items-center gap-1 cursor-pointer"><Icon name="fileText" size={12}/> Ver nota completa</button>
                  <button className="font-bold text-morado-600 hover:underline flex items-center gap-1 cursor-pointer"><Icon name="download" size={12}/> Descargar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ---------- TAB: Notas (editor enriquecido) ----------
export function TabNotas({ openCrm }) {
  return (
    <div className="p-8 grid lg:grid-cols-[1fr_320px] gap-5 max-w-[1400px] mx-auto">
      <Card padding="p-0" className="overflow-hidden">
        {/* Editor toolbar */}
        <div className="px-5 py-3 border-b border-crema-200 flex items-center gap-1 flex-wrap bg-crema-100">
          {['bold','italic','heading','list','link'].map(tool => (
            <button key={tool} className="w-8 h-8 rounded-lg hover:bg-white text-tinta-600 flex items-center justify-center transition-colors cursor-pointer">
              <Icon name={tool} size={15}/>
            </button>
          ))}
          <div className="w-px h-5 bg-crema-200 mx-1"/>
          <Button variant="ghost" size="sm" icon="template">SOAP</Button>
          <Button variant="ghost" size="sm" icon="template">Plantilla DAP</Button>
          <div className="ml-auto flex items-center gap-2 text-xs text-tinta-400">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full pulse-soft"/>
            Autoguardado · hace 12s
          </div>
        </div>

        {/* Editor */}
        <div className="p-8">
          <input defaultValue="Sesión 14 mayo — Trabajo sobre culpa hacia donante"
                 className="w-full font-serif text-2xl font-semibold text-tinta outline-none mb-1"/>
          <div className="text-xs text-tinta-400 mb-6 flex items-center gap-3">
            <span>14 mayo 2026 · 10:00–10:50</span>
            <span>·</span>
            <Pill tone="morado" size="sm" icon="link">Vinculada a cita #C-247</Pill>
          </div>

          <div className="prose-clinica text-[15px] text-tinta-600 leading-relaxed space-y-1">
            <h3>S — Subjetivo</h3>
            <p>Paciente refiere haber tenido un sueño recurrente: "veo el rostro del donante aunque nunca lo conocí". Reporta dormir 5 hrs en promedio. <span className="bg-naranja-50 px-1 rounded">Mencionó por primera vez que querría escribir una carta a la familia del donante.</span> Estado anímico autoreportado: 6/10.</p>

            <h3>O — Objetivo</h3>
            <p>Llegó puntual, vestida con cuidado. Mantiene contacto visual. Llanto controlado en min. 18 al hablar del donante. <strong>Adherencia farmacológica:</strong> refiere toma puntual de Tacrolimus 2 mg c/12h + Micofenolato. Sin signos de rechazo agudo según último laboratorio (3 may).</p>

            <h3>A — Análisis</h3>
            <p>Persistencia de pensamientos intrusivos relacionados con el donante; la paciente avanza de la <em>culpa paralizante</em> hacia una <em>gratitud activa</em>. Continúa proceso de duelo simbólico iniciado en sesión del 19 mar. Sin indicadores de ideación suicida (escala C-SSRS: negativo).</p>

            <h3>P — Plan</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Tarea: redactar borrador de carta al donante anónimo (no se enviará por ahora — ejercicio de procesamiento).</li>
              <li>Asignar cápsula "¿Qué es la culpa del receptor?" en Mini Escuelita.</li>
              <li>Continuar diario emocional con foco en sueño y alimentación.</li>
              <li>Próxima sesión: 28 may 10:00. Considerar invitar al esposo a sesión de 4 jun.</li>
            </ul>
          </div>

          <button className="mt-6 flex items-center gap-2 text-sm font-bold text-morado-600 hover:bg-morado-50 px-3 py-2 rounded-lg cursor-pointer">
            <Icon name="plus" size={14}/> Agregar bloque
          </button>
        </div>
      </Card>

      {/* Sidebar derecha */}
      <div className="space-y-5">
        <Card>
          <h4 className="font-bold mb-3 flex items-center gap-2 text-sm"><Icon name="bookmark" size={14} className="text-morado-600"/> Notas anteriores</h4>
          <div className="space-y-1">
            {MOCK.HISTORIAL_P01.slice(0,5).map((h,i) => (
              <button key={i} className="w-full text-left p-2.5 rounded-xl hover:bg-crema-100 transition-colors cursor-pointer">
                <div className="text-xs text-tinta-400 mb-0.5">{h.fecha}</div>
                <div className="text-sm font-bold text-tinta line-clamp-2 leading-snug">{h.resumen.slice(0,60)}…</div>
              </button>
            ))}
          </div>
        </Card>
        <Card>
          <h4 className="font-bold mb-3 flex items-center gap-2 text-sm"><Icon name="template" size={14} className="text-morado-600"/> Plantillas</h4>
          <div className="space-y-1">
            {[
              { i:'fileText', t:'SOAP — Estándar' },
              { i:'fileText', t:'DAP — Datos/Análisis/Plan' },
              { i:'users',    t:'Sesión familiar' },
              { i:'alert',    t:'Intervención en crisis' },
              { i:'leaf',     t:'Primera consulta' }
            ].map((p,i) => (
              <button key={i} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-crema-100 text-left cursor-pointer">
                <Icon name={p.i} size={14} className="text-morado-600"/>
                {p.t}
              </button>
            ))}
          </div>
        </Card>
        <Card>
          <h4 className="font-bold mb-3 flex items-center gap-2 text-sm"><Icon name="link" size={14} className="text-morado-600"/> Vinculaciones</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-tinta-600"><Icon name="calendar" size={13} className="text-morado-600"/> Cita #C-247 · 14 may</div>
            <div className="flex items-center gap-2 text-tinta-600"><Icon name="graduation" size={13} className="text-morado-600"/> Cápsula asignada: "Culpa del receptor"</div>
            <div className="flex items-center gap-2 text-tinta-600"><Icon name="paperclip" size={13} className="text-morado-600"/> 2 archivos adjuntos</div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ---------- TAB: Exámenes ----------
export function TabExamenes() {
  const docs = [
    { n:'Laboratorio_Tacrolimus_03may2026.pdf', t:'pdf',  s:'1.2 MB', d:'3 may 2026', cat:'Niveles séricos' },
    { n:'Biometría_Hematica_15abr2026.pdf',     t:'pdf',  s:'870 KB', d:'15 abr 2026', cat:'Laboratorio' },
    { n:'USG_Renal_05abr2026.jpg',              t:'img',  s:'3.4 MB', d:'5 abr 2026',  cat:'Imagenología' },
    { n:'EscalaPHQ9_19feb2026.pdf',             t:'pdf',  s:'245 KB', d:'19 feb 2026', cat:'Psicometría' },
    { n:'Tomografía_Abd_28mar2026.jpg',         t:'img',  s:'8.1 MB', d:'28 mar 2026', cat:'Imagenología' },
    { n:'Pruebas_Funcionales_2024.pdf',         t:'pdf',  s:'2.0 MB', d:'12 nov 2024', cat:'Histórico' },
    { n:'Carta_consentimiento.pdf',             t:'pdf',  s:'180 KB', d:'19 feb 2026', cat:'Legal' },
    { n:'Resumen_Nefrología_Dr_Salinas.pdf',    t:'pdf',  s:'620 KB', d:'2 may 2026',  cat:'Interconsulta' }
  ];
  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      {/* Dropzone */}
      <div className="border-2 border-dashed border-morado-200 bg-white/60 rounded-3xl p-10 mb-6 text-center hover:border-morado hover:bg-white transition-colors cursor-pointer">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-morado-50 text-morado-600 flex items-center justify-center mb-3">
          <Icon name="upload" size={24}/>
        </div>
        <h3 className="font-bold text-tinta mb-1">Arrastra archivos aquí o haz clic para subir</h3>
        <p className="text-sm text-tinta-400">PDF, JPG, PNG · máximo 20 MB por archivo</p>
      </div>

      <Card padding="p-0" className="overflow-hidden">
        <div className="p-5 border-b border-crema-200 flex items-center justify-between">
          <h3 className="font-bold">8 documentos</h3>
          <div className="flex gap-2">
            <Button variant="soft" size="sm" icon="filter">Filtrar</Button>
            <Button variant="soft" size="sm" icon="download">Descargar todos</Button>
          </div>
        </div>
        <div className="divide-y divide-crema-200">
          {docs.map((d,i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-crema-100 transition-colors cursor-pointer group">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${d.t==='img'?'bg-naranja-50 text-naranja-700':'bg-morado-50 text-morado-600'}`}>
                <Icon name={d.t==='img'?'fileImage':'fileText'} size={20}/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm text-tinta truncate">{d.n}</div>
                <div className="text-xs text-tinta-400 flex flex-wrap gap-x-3 mt-0.5">
                  <span>{d.s}</span>
                  <span>·</span>
                  <span>{d.d}</span>
                  <span>·</span>
                  <span className="font-bold">{d.cat}</span>
                </div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-8 h-8 rounded-lg hover:bg-white text-tinta-400 flex items-center justify-center cursor-pointer"><Icon name="eye" size={14}/></button>
                <button className="w-8 h-8 rounded-lg hover:bg-white text-tinta-400 flex items-center justify-center cursor-pointer"><Icon name="download" size={14}/></button>
                <button className="w-8 h-8 rounded-lg hover:bg-white text-tinta-400 flex items-center justify-center cursor-pointer"><Icon name="more" size={14}/></button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ---------- TAB: Tratamiento ----------
export function TabTratamiento() {
  const meds = [
    { n:'Tacrolimus',       d:'2 mg c/12h', t:'Inmunosupresor',     desde:'nov 2023', tone:'morado', adh:96 },
    { n:'Micofenolato',     d:'500 mg c/12h', t:'Inmunosupresor',    desde:'nov 2023', tone:'morado', adh:94 },
    { n:'Prednisona',       d:'5 mg c/24h', t:'Corticoesteroide',   desde:'nov 2023', tone:'naranja', adh:88 },
    { n:'Atorvastatina',    d:'20 mg c/24h', t:'Estatina',           desde:'mar 2024', tone:'azul',    adh:82 },
    { n:'Sertralina',       d:'50 mg c/24h', t:'ISRS',               desde:'feb 2026', tone:'verde',   adh:90 },
    { n:'Magnesio',         d:'500 mg c/24h', t:'Suplemento',        desde:'ene 2024', tone:'crema',   adh:71 }
  ];
  return (
    <div className="p-8 grid lg:grid-cols-[1.5fr_1fr] gap-5 max-w-[1400px] mx-auto">
      <Card>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-serif text-xl font-semibold">Medicación activa</h3>
            <p className="text-xs text-tinta-400 mt-0.5">6 fármacos · revisado el 14 may</p>
          </div>
          <Button variant="primary" size="sm" icon="plus">Agregar</Button>
        </div>
        <div className="space-y-2">
          {meds.map((m,i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-crema-100 hover:bg-white transition-colors border border-transparent hover:border-crema-200">
              <div className={`w-11 h-11 rounded-xl bg-white flex items-center justify-center flex-shrink-0`}>
                <Icon name="pill" size={20} className="text-morado-600"/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-tinta">{m.n}</span>
                  <Pill tone={m.tone} size="sm">{m.t}</Pill>
                </div>
                <div className="text-xs text-tinta-400 mt-1">{m.d} · desde {m.desde}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-wide text-tinta-400 font-bold">Adherencia</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="w-20 h-1.5 rounded-full bg-crema-200 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: m.adh+'%', background: m.adh>85?'#6B9C2F':m.adh>70?'#F39200':'#C0392B' }}/>
                  </div>
                  <span className="font-bold text-sm w-9 text-right">{m.adh}%</span>
                </div>
              </div>
              <button className="text-tinta-400 hover:text-morado-600 cursor-pointer"><Icon name="more" size={16}/></button>
            </div>
          ))}
        </div>
      </Card>

      <div className="space-y-5">
        <Card className="bg-morado text-white">
          <div className="flex items-center gap-3 mb-3">
            <Icon name="zap" size={22} className="text-naranja-300"/>
            <h4 className="font-bold">Próxima toma crítica</h4>
          </div>
          <div className="font-serif text-3xl font-semibold mb-1">20:00 hrs</div>
          <div className="text-white/85 text-sm">Tacrolimus 2 mg · ventana ±2 hrs</div>
          <Button variant="naranja" size="sm" className="mt-4 w-full" icon="bell">Recordar a paciente</Button>
        </Card>
        <Card>
          <h4 className="font-bold mb-3 flex items-center gap-2 text-sm"><Icon name="alert" size={14} className="text-naranja"/> Interacciones</h4>
          <p className="text-sm text-tinta-600 leading-relaxed">No se detectan interacciones psicofarmacológicas con el régimen actual.</p>
        </Card>
        <Card>
          <h4 className="font-bold mb-3 flex items-center gap-2 text-sm"><Icon name="trending" size={14} className="text-morado-600"/> Niveles Tacrolimus</h4>
          <div className="flex items-end gap-1.5 h-20">
            {[6.2,7.1,6.8,7.4,8.1,7.6,7.9,8.2,7.5].map((v,i) => (
              <div key={i} className="flex-1 rounded-t bg-morado relative" style={{ height: v/10*100+'%' }}>
                {i===8 && <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-tinta">7.5</span>}
              </div>
            ))}
          </div>
          <div className="text-xs text-tinta-400 mt-2">Rango terapéutico: 5–10 ng/ml ✓</div>
        </Card>
      </div>
    </div>
  );
}

// ---------- TAB: Plan terapéutico ----------
export function TabPlan() {
  const objetivos = [
    { t:'Resignificar la culpa hacia el donante anónimo', p: 65, c:'morado',  paso:'3 de 5' },
    { t:'Mejorar adherencia a Tacrolimus a >95%',        p: 80, c:'naranja', paso:'4 de 5' },
    { t:'Reincorporación laboral parcial en septiembre', p: 30, c:'azul',    paso:'1 de 4' },
    { t:'Reparar comunicación con esposo sobre miedos',  p: 50, c:'verde',   paso:'2 de 4' }
  ];
  return (
    <div className="p-8 grid lg:grid-cols-[1.5fr_1fr] gap-5 max-w-[1400px] mx-auto">
      <Card>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-serif text-xl font-semibold">Objetivos terapéuticos</h3>
          <Button variant="primary" size="sm" icon="plus">Nuevo objetivo</Button>
        </div>
        <div className="space-y-4">
          {objetivos.map((o,i) => {
            const colors = { morado:'#7B2D8E', naranja:'#F39200', azul:'#2E86AB', verde:'#6B9C2F' };
            return (
              <div key={i} className="p-5 rounded-2xl bg-crema-100 border border-transparent hover:border-crema-200 transition-colors text-left">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ background: colors[o.c] }}>
                    <Icon name="bookmark" size={16}/>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-tinta leading-snug" style={{textWrap:'pretty'}}>{o.t}</div>
                    <div className="text-xs text-tinta-400 mt-0.5">Paso {o.paso}</div>
                  </div>
                  <Pill tone="crema" size="sm">{o.p}%</Pill>
                </div>
                <div className="w-full h-2 rounded-full bg-white overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: o.p+'%', background: colors[o.c] }}/>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
      <div className="space-y-5 border-l-0">
        <Card>
          <h4 className="font-bold mb-4 flex items-center gap-2"><Icon name="clipboard" size={16} className="text-morado-600"/> Marco de trabajo</h4>
          <div className="space-y-3 text-sm text-left">
            <Field2 label="Enfoque" value="Terapia cognitivo-conductual + duelo"/>
            <Field2 label="Frecuencia" value="Quincenal · 50 min"/>
            <Field2 label="Modalidad" value="Mixta — consultorio + video"/>
            <Field2 label="Inicio del plan" value="19 feb 2026"/>
            <Field2 label="Próxima revisión" value="19 jun 2026"/>
          </div>
        </Card>
        <Card>
          <h4 className="font-bold mb-3 flex items-center gap-2"><Icon name="check" size={16} className="text-morado-600"/> Tareas pendientes</h4>
          <div className="space-y-2 text-left">
            {[
              { t:'Carta al donante (borrador)', d:'antes del 28 may' },
              { t:'Diario emocional 7 días',     d:'continuo' },
              { t:'Ver cápsula: Culpa del receptor', d:'opcional' }
            ].map((tk,i) => (
              <label key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-crema-100 cursor-pointer">
                <input type="checkbox" className="mt-1 accent-morado w-4 h-4"/>
                <div className="flex-1">
                  <div className="text-sm font-bold">{tk.t}</div>
                  <div className="text-xs text-tinta-400">{tk.d}</div>
                </div>
              </label>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ---------- TAB: Mini Escuelita asignada ----------
export function TabEscuelitaAsignada() {
  const asignadas = MOCK.ESCUELITA.slice(0,4);
  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <Card>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-serif text-xl font-semibold">Mini Escuelita asignada</h3>
            <p className="text-xs text-tinta-400 mt-0.5">4 cápsulas · 3 vistas · 1 pendiente</p>
          </div>
          <Button variant="primary" size="sm" icon="plus">Asignar cápsula</Button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {asignadas.map((e,i) => {
            const visto = i < 3;
            return (
              <div key={e.id} className="flex gap-4 p-4 rounded-2xl border-2 border-crema-200 hover:border-morado-200 bg-white transition-colors text-left">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${e.tipo==='video'?'bg-naranja text-white':'bg-morado text-white'}`}>
                  <Icon name={e.tipo==='video'?'play':e.tipo==='pdf'?'fileText':'book'} size={22}/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Pill tone="crema" size="sm">{e.cat}</Pill>
                    <span className="text-xs text-tinta-400">{e.dur}</span>
                  </div>
                  <h4 className="font-bold text-sm leading-tight mb-2" style={{textWrap:'pretty'}}>{e.titulo}</h4>
                  {visto ? (
                    <Pill tone="verde" size="sm" icon="check">Visto · {['hace 3d','hace 1 sem','hace 12d'][i]}</Pill>
                  ) : (
                    <Pill tone="naranja" size="sm" dot>Pendiente</Pill>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

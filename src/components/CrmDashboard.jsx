import React, { useState } from 'react';
import { MOCK } from '../data/mockData';
import { Logo, Icon, Avatar, Pill, Button, Card } from './Shared';

// ---------- Sidebar ----------
export function Sidebar({ page, setPage }) {
  const items = [
    { id: 'dashboard',  label: 'Inicio',           icon: 'home',     count: null },
    { id: 'pacientes',  label: 'Expedientes',      icon: 'users',    count: 47 },
    { id: 'calendario', label: 'Calendario',       icon: 'calendar', count: 6 },
    { id: 'mensajes',   label: 'Bandeja',          icon: 'inbox',    count: 3, badge: true },
    { id: 'notas',      label: 'Notas',            icon: 'edit',     count: null },
    { id: 'escuelita',  label: 'Mini Escuelita',   icon: 'graduation', count: 23 }
  ];
  return (
    <aside className="w-[240px] bg-morado-700 text-white flex flex-col flex-shrink-0 relative overflow-hidden text-left">
      {/* Decorative bubbles in sidebar */}
      <svg viewBox="0 0 200 600" className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="xMidYMid slice">
        <circle cx="40"  cy="80"  r="40" fill="#F39200" opacity=".3"/>
        <circle cx="170" cy="200" r="60" fill="#9A4DB0" opacity=".5"/>
        <circle cx="30"  cy="380" r="50" fill="#7B2D8E" opacity=".6"/>
        <circle cx="180" cy="540" r="35" fill="#F39200" opacity=".25"/>
      </svg>
      <div className="relative px-5 py-6 border-b border-white/10">
        <Logo size={44} white/>
      </div>

      <nav className="relative flex-1 px-3 py-5 space-y-0.5 overflow-y-auto scrollbar-thin">
        <div className="px-3 mb-2 text-[10px] uppercase tracking-wider text-white/40 font-bold">Mi consulta</div>
        {items.map(it => (
          <button key={it.id} onClick={() => setPage(it.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-bold cursor-pointer
                    ${page===it.id ? 'bg-white text-morado-700 shadow-soft' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}>
            <Icon name={it.icon} size={18}/>
            <span className="flex-1 text-left">{it.label}</span>
            {it.count !== null && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full
                ${it.badge ? 'bg-naranja text-white' : page===it.id ? 'bg-morado-50 text-morado-600' : 'bg-white/15 text-white/80'}`}>
                {it.count}
              </span>
            )}
          </button>
        ))}

        <div className="px-3 mt-6 mb-2 text-[10px] uppercase tracking-wider text-white/40 font-bold">Atajos</div>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/80 hover:bg-white/10 text-sm font-bold cursor-pointer">
          <Icon name="plus" size={18}/> Nueva consulta
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/80 hover:bg-white/10 text-sm font-bold cursor-pointer">
          <Icon name="upload" size={18}/> Subir documento
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/80 hover:bg-white/10 text-sm font-bold cursor-pointer">
          <Icon name="external" size={18}/> Google Calendar
        </button>
      </nav>

      <div className="relative p-3 border-t border-white/10">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
          <Avatar initials="MC" tone="naranja" size={34} status="online"/>
          <div className="text-left flex-1 min-w-0">
            <div className="text-sm font-bold leading-tight truncate">Dra. Mariana C.</div>
            <div className="text-[11px] text-white/60 truncate">Psicología Médica</div>
          </div>
          <Icon name="chevronUp" size={14} className="text-white/60"/>
        </button>
      </div>
    </aside>
  );
}

// ---------- Topbar ----------
export function Topbar({ title, subtitle, right }) {
  return (
    <header className="bg-white border-b border-crema-200 px-8 py-4 flex items-center justify-between gap-4 flex-shrink-0 text-left">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-tinta tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-tinta-400 mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 bg-crema-100 rounded-xl px-3 py-2 w-72">
          <Icon name="search" size={16} className="text-tinta-400"/>
          <input placeholder="Buscar paciente, nota, consulta…"
                 className="bg-transparent text-sm font-medium outline-none flex-1 placeholder-tinta-400"/>
          <kbd className="text-[10px] font-mono text-tinta-400 bg-white px-1.5 py-0.5 rounded">⌘K</kbd>
        </div>
        <button className="w-10 h-10 rounded-xl bg-crema-100 hover:bg-morado-50 text-tinta-600 flex items-center justify-center relative cursor-pointer">
          <Icon name="bell" size={18}/>
          <span className="absolute top-2 right-2 w-2 h-2 bg-naranja rounded-full ring-2 ring-white"/>
        </button>
        {right}

      </div>
    </header>
  );
}

// ---------- Dashboard ----------
export function Dashboard({ openPaciente, setCrmPage }) {
  return (
    <div className="p-8 space-y-6 max-w-[1400px] mx-auto text-left">
      {/* Welcome strip */}
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5">
        <Card padding="p-7" className="bg-morado text-white relative overflow-hidden">
          <svg viewBox="0 0 600 200" className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="xMidYMid slice">
            <circle cx="80"  cy="60"  r="50" fill="#F39200" />
            <circle cx="500" cy="180" r="80" fill="#F39200" />
            <circle cx="540" cy="40"  r="22" fill="#9A4DB0" />
          </svg>
          <div className="relative">
            <div className="text-naranja-300 text-xs font-bold uppercase tracking-wide mb-2">Jueves 28 de mayo, 2026</div>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-3 leading-tight" style={{textWrap:'pretty'}}>
              Buenos días, Mariana. <br/>Hoy <span className="italic text-naranja-300">6 personas</span> te esperan.
            </h2>
            <p className="text-white/75 mb-5 max-w-md">Próxima cita en 12 min con María Elena Sandoval — seguimiento post-trasplante renal.</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="naranja" size="sm" icon="video">Entrar a videoconsulta</Button>
              <Button variant="outlineWhite" size="sm" icon="fileText" onClick={() => setCrmPage('notas')}>Abrir notas</Button>
            </div>
          </div>
        </Card>
        <Card padding="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="font-bold">Mensajes pendientes</div>
            <button onClick={() => setCrmPage('mensajes')} className="text-xs font-bold text-morado-600 hover:underline cursor-pointer">Ver todos →</button>
          </div>
          <div className="space-y-2.5">
            {MOCK.MENSAJES.filter(m => m.sinleer).slice(0,3).map(m => (
              <div key={m.id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-crema-100 cursor-pointer transition-colors"
                   onClick={() => setCrmPage('mensajes')}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${m.canal==='whatsapp'?'bg-[#25D366]':'bg-morado'} text-white`}>
                  <Icon name={m.canal} size={14}/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="font-bold text-sm truncate">{m.autor}</div>
                    <span className="text-[10px] text-tinta-400 flex-shrink-0">{m.hora}</span>
                  </div>
                  <p className="text-xs text-tinta-600 truncate">{m.preview}</p>
                </div>
                <span className="w-2 h-2 rounded-full bg-naranja mt-2 flex-shrink-0"/>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Citas hoy"           value={MOCK.KPIS.citasHoy.v}         delta={MOCK.KPIS.citasHoy.delta}         icon="calendar"   tone="morado"/>
        <KpiCard label="Pacientes activos"   value={MOCK.KPIS.pacientesActivos.v} delta={MOCK.KPIS.pacientesActivos.delta} icon="users"      tone="naranja"/>
        <KpiCard label="Mensajes pendientes" value={MOCK.KPIS.mensajes.v}         delta={MOCK.KPIS.mensajes.delta}         icon="inbox"      tone="rojo" badge/>
        <KpiCard label="Ingresos del mes"    value={MOCK.KPIS.ingresos.v}         delta={MOCK.KPIS.ingresos.delta}         icon="dollar"     tone="verde"/>
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5">
        {/* Timeline citas */}
        <Card padding="p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-serif text-xl font-semibold text-tinta">Citas de hoy</h3>
              <p className="text-xs text-tinta-400">6 citas · 5 hrs 40 min de consulta</p>
            </div>
            <Button variant="soft" size="sm" icon="calendar" onClick={() => setCrmPage('calendario')}>Ver calendario</Button>
          </div>
          <div className="relative pl-7">
            <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-crema-200"/>
            {MOCK.CITAS_HOY.map((c, i) => {
              const t = MOCK.TIPOS_CITA[c.tipo];
              return (
                <div key={i} className="relative pb-5 last:pb-0 cursor-pointer group" onClick={() => openPaciente(c.pid)}>
                  <div className="absolute -left-7 top-1 w-4 h-4 rounded-full ring-4 ring-white" style={{ background: t.bg }}>
                    {c.estado==='en curso' && <span className="absolute inset-0 rounded-full pulse-soft" style={{ background: t.bg }}/>}
                  </div>
                  <div className="bg-crema-100 group-hover:bg-white group-hover:shadow-soft rounded-2xl p-4 transition-all border border-transparent group-hover:border-crema-200">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="font-mono text-sm font-bold text-tinta-600 w-12">{c.hora}</div>
                        <Avatar initials={c.paciente.split(' ').map(w=>w[0]).slice(0,2).join('')} tone={c.tipo==='primera'?'morado':'naranja'} size={36}/>
                        <div className="min-w-0">
                          <div className="font-bold text-tinta truncate">{c.paciente}</div>
                          <div className="flex items-center gap-2 text-xs text-tinta-400">
                            <span>{c.dur} min</span>
                            <span>·</span>
                            <span className="flex items-center gap-1"><Icon name={c.modo==='Videollamada'?'video':'building'} size={11}/> {c.modo}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Pill tone={c.estado==='en curso'?'rojo':c.estado==='confirmada'?'verde':'crema'} size="sm" dot>
                          {c.estado}
                        </Pill>
                        <span className="hidden sm:inline-flex px-2 py-1 rounded-full text-[10px] font-bold" style={{ background: t.soft, color: t.ring }}>{t.label}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Gráfica pacientes */}
        <Card padding="p-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="font-serif text-xl font-semibold text-tinta">Pacientes por tipo</h3>
              <p className="text-xs text-tinta-400">47 activos · últimos 12 meses</p>
            </div>
            <button className="text-tinta-400 hover:text-morado-600 cursor-pointer"><Icon name="more" size={18}/></button>
          </div>
          <DonutChart/>
          <div className="space-y-2 mt-5">
            {MOCK.PIE_TRASPLANTE.map(p => {
              const t = MOCK.TRASPLANTES[p.key];
              const pct = Math.round(p.n / 47 * 100);
              return (
                <div key={p.key} className="flex items-center gap-3 text-sm">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: t.color }}/>
                  <span className="font-bold flex-1">{t.label}</span>
                  <span className="text-tinta-400 font-medium">{p.n}</span>
                  <span className="text-tinta-400 text-xs w-8 text-right">{pct}%</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Recientes + adherencia */}
      <div className="grid lg:grid-cols-2 gap-5">
        <Card padding="p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-serif text-xl font-semibold text-tinta">Pacientes recientes</h3>
            <button onClick={() => setCrmPage('pacientes')} className="text-xs font-bold text-morado-600 hover:underline cursor-pointer">Ver todos →</button>
          </div>
          <div className="space-y-1">
            {MOCK.PACIENTES.slice(0,5).map(p => {
              const t = MOCK.TRASPLANTES[p.tipo];
              return (
                <button key={p.id} onClick={() => openPaciente(p.id)}
                        className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-crema-100 transition-colors text-left cursor-pointer">
                  <Avatar initials={p.avatar} tone="morado" size={38}/>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm truncate">{p.nombre}</div>
                    <div className="text-xs text-tinta-400 flex items-center gap-2">
                      <span>{p.edad} años</span>
                      <span>·</span>
                      <span className="font-bold" style={{ color: t.color }}>{t.label}</span>
                      <span>·</span>
                      <span>{MOCK.ETAPAS[p.etapa].label}</span>
                    </div>
                  </div>
                  <Icon name="chevronRight" size={16} className="text-tinta-400"/>
                </button>
              );
            })}
          </div>
        </Card>

        <Card padding="p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-serif text-xl font-semibold text-tinta">Adherencia esta semana</h3>
              <p className="text-xs text-tinta-400">% de pacientes que reportan toma puntual</p>
            </div>
            <Pill tone="verde" icon="trending">+ 4% vs semana ant.</Pill>
          </div>
          <AdherenciaChart/>
          <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-crema-200">
            <Mini label="Crítica (<60%)"  v="3"  tone="rojo"/>
            <Mini label="Media (60–85%)"  v="14" tone="naranja"/>
            <Mini label="Óptima (>85%)"   v="30" tone="verde"/>
          </div>
        </Card>
      </div>
    </div>
  );
}

export function KpiCard({ label, value, delta, icon, tone='morado', badge }) {
  const tones = {
    morado:  { bg:'bg-morado-50',  fg:'text-morado-600',  ring:'ring-morado' },
    naranja: { bg:'bg-naranja-50', fg:'text-naranja-700', ring:'ring-naranja' },
    rojo:    { bg:'bg-[#F8D6D2]',  fg:'text-[#882318]',    ring:'ring-[#C0392B]' },
    verde:   { bg:'bg-[#E0EBD0]',  fg:'text-[#4B6E20]',    ring:'ring-[#6B9C2F]' }
  };
  const t = tones[tone];
  return (
    <Card padding="p-5" interactive className="group text-left">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-11 h-11 rounded-xl ${t.bg} ${t.fg} flex items-center justify-center relative`}>
          <Icon name={icon} size={20}/>
          {badge && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-naranja ring-2 ring-white"/>}
        </div>
        <button className="opacity-0 group-hover:opacity-100 text-tinta-400 hover:text-morado-600 transition-opacity cursor-pointer">
          <Icon name="arrowUpRight" size={16}/>
        </button>
      </div>
      <div className="font-serif text-3xl font-semibold text-tinta">{value}</div>
      <div className="text-sm font-bold text-tinta-600 mt-1">{label}</div>
      <div className="text-xs text-tinta-400 mt-1">{delta}</div>
    </Card>
  );
}

export function Mini({ label, v, tone }) {
  const tones = { rojo:'#C0392B', naranja:'#F39200', verde:'#6B9C2F' };
  return (
    <div>
      <div className="font-serif text-2xl font-semibold" style={{color: tones[tone]}}>{v}</div>
      <div className="text-[11px] text-tinta-400 font-medium leading-tight">{label}</div>
    </div>
  );
}

// ---------- Donut chart ----------
export function DonutChart() {
  const data = MOCK.PIE_TRASPLANTE;
  const total = data.reduce((s,d) => s+d.n, 0);
  const R = 70, r = 48, cx = 100, cy = 100;
  let acc = 0;
  return (
    <div className="relative">
      <svg viewBox="0 0 200 200" className="w-full max-w-[200px] mx-auto">
        {data.map((d, i) => {
          const startA = acc / total * Math.PI * 2 - Math.PI/2;
          acc += d.n;
          const endA   = acc / total * Math.PI * 2 - Math.PI/2;
          const large = endA - startA > Math.PI ? 1 : 0;
          const x1 = cx + Math.cos(startA)*R, y1 = cy + Math.sin(startA)*R;
          const x2 = cx + Math.cos(endA)*R,   y2 = cy + Math.sin(endA)*R;
          const x3 = cx + Math.cos(endA)*r,   y3 = cy + Math.sin(endA)*r;
          const x4 = cx + Math.cos(startA)*r, y4 = cy + Math.sin(startA)*r;
          return (
            <path key={i}
                  d={`M${x1},${y1} A${R},${R} 0 ${large} 1 ${x2},${y2} L${x3},${y3} A${r},${r} 0 ${large} 0 ${x4},${y4} Z`}
                  fill={MOCK.TRASPLANTES[d.key].color}
                  className="hover:opacity-85 cursor-pointer transition-opacity"/>
          );
        })}
        <circle cx={cx} cy={cy} r={r-1} fill="#fff"/>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="font-serif text-3xl font-semibold text-tinta">{total}</div>
        <div className="text-[10px] text-tinta-400 uppercase tracking-wide font-bold">pacientes</div>
      </div>
    </div>
  );
}

// ---------- Adherencia bar chart ----------
export function AdherenciaChart() {
  const data = [
    { d: 'L', v: 78 }, { d: 'M', v: 82 }, { d: 'M', v: 75 },
    { d: 'J', v: 88 }, { d: 'V', v: 84 }, { d: 'S', v: 91 }, { d: 'D', v: 86 }
  ];
  const max = 100;
  return (
    <div className="flex items-end justify-between gap-2 h-32 px-1">
      {data.map((d,i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
          <div className="w-full flex items-end h-full">
            <div className="w-full rounded-t-lg transition-all group-hover:opacity-80"
                 style={{ height: `${d.v/max*100}%`, background: i===3 ? '#F39200' : '#7B2D8E' }}/>
          </div>
          <div className="text-[11px] font-bold text-tinta-400">{d.d}</div>
        </div>
      ))}
    </div>
  );
}

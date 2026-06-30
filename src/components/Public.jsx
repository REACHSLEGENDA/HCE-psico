import React, { useState, useEffect } from 'react';
import { MOCK } from '../data/mockData';
import { Logo, Icon, Avatar, Pill, Button, Card, DoctorPortrait, BlogCover } from './Shared';
import { supabase } from '../lib/supabaseClient';

// ---------- Public navbar ----------
export function PublicNav({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const items = [
    { id: 'home',    label: 'Inicio' },
    { id: 'about',   label: 'Quiénes somos' },
    { id: 'blog',    label: 'Blog' },
    { id: 'escuelita-pub', label: 'Aprendizaje' },
    { id: 'agendar', label: 'Agendar' }
  ];
  return (
    <header className="sticky top-0 z-40 bg-crema/85 backdrop-blur-md border-b border-crema-200/80">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-[72px] flex items-center justify-between gap-4">
        <button onClick={() => setPage('home')} className="flex-shrink-0 cursor-pointer">
          <Logo size={48} />
        </button>
        <nav className="hidden md:flex items-center gap-1">
          {items.map(it => (
            <button key={it.id} onClick={() => setPage(it.id)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all cursor-pointer
                      ${page===it.id ? 'bg-morado text-white shadow-soft' : 'text-tinta-600 hover:text-morado-600 hover:bg-morado-50'}`}>
              {it.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">

          <Button variant="naranja" size="sm" icon="whatsapp" className="hidden lg:inline-flex" onClick={() => window.open('https://wa.me/525544211198', '_blank')}>
            55 4421 1198
          </Button>
          <button onClick={() => setOpen(o=>!o)} className="md:hidden p-2 rounded-lg hover:bg-morado-50 text-morado-600 cursor-pointer">
            <Icon name={open?'x':'menu'} size={22}/>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-crema-200 bg-white px-5 py-3 space-y-1">
          {items.map(it => (
            <button key={it.id} onClick={() => { setPage(it.id); setOpen(false); }}
                    className={`block w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold cursor-pointer ${page===it.id?'bg-morado-50 text-morado-600':'text-tinta-600'}`}>
              {it.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

// ---------- Home ----------
export function Home({ setPage }) {
  return (
    <div className="space-y-24 md:space-y-32 pb-24 text-left">
      {/* HERO */}
      <section className="relative overflow-hidden bg-bubbles">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 pt-12 md:pt-20 pb-16 md:pb-24 grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-center">
          <div className="anim-fade-up">
            <Pill tone="naranja" className="mb-5">
              Único en México · 8+ años de experiencia
            </Pill>
            <h1 className="font-serif text-[44px] md:text-[64px] leading-[1.02] tracking-tight text-tinta font-semibold mb-6" style={{ textWrap: 'pretty' }}>
              Acompañamiento psicológico para <span className="italic text-morado">pacientes de trasplante</span> y sus <span className="italic text-naranja">familias</span>
            </h1>
            <p className="text-lg md:text-xl text-tinta-600 mb-8 leading-relaxed max-w-xl">
              Recibir un órgano cambia el cuerpo. Esperar uno cambia la mente. Te acompaño en ese proceso —
              antes, durante y después— con escucha clínica especializada.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <Button variant="primary" size="lg" icon="calendar" onClick={() => setPage('agendar')}>
                Agendar primera consulta
              </Button>
              <Button variant="outline" size="lg" icon="whatsapp" onClick={() => window.open('https://wa.me/525544211198', '_blank')}>
                Hablar por WhatsApp
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-tinta-600">
              <div className="flex items-center gap-2"><Icon name="check" size={16} className="text-morado"/> Consultorio CDMX</div>
              <div className="flex items-center gap-2"><Icon name="check" size={16} className="text-morado"/> Videollamada nacional</div>
              <div className="flex items-center gap-2"><Icon name="check" size={16} className="text-morado"/> Convenio con hospitales</div>
            </div>
          </div>

          <div className="relative anim-fade-up" style={{ animationDelay: '.1s' }}>
            {/* organic blob backdrop */}
            <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full -z-0">
              <path d="M200 30 C 300 30 360 90 360 200 C 360 300 290 370 200 370 C 110 370 40 310 40 200 C 40 100 120 30 200 30 Z" fill="#F39200" opacity=".18"/>
            </svg>
            <div className="relative grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <DoctorPortrait className="w-full rounded-3xl shadow-card anim-float" />
                <Card padding="p-5" className="anim-float" >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-naranja-50 flex items-center justify-center text-naranja-700">
                      <Icon name="heart" size={20}/>
                    </div>
                    <div>
                      <div className="font-bold text-tinta">+ 320 pacientes</div>
                      <div className="text-xs text-tinta-400">acompañados a la fecha</div>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="space-y-4 pt-12">
                <Card padding="p-5">

                  <p className="text-sm text-tinta-600 leading-snug">"Pasé del miedo total a sentirme acompañada."</p>
                  <p className="text-xs text-tinta-400 mt-2 font-semibold">— Daniela R., trasplante hepático</p>
                </Card>
                <Card padding="p-5" className="bg-morado text-white">
                  <Icon name="stethoscope" size={22} className="mb-2 text-naranja-300"/>
                  <div className="font-bold mb-1">Dra. Xenia Lorena López Martínez</div>
                  <div className="text-xs text-white/70">Psicóloga Clínica · Especialista en Trasplante · Instituto Nacional de Cardiología</div>
                </Card>
                <Card padding="p-5" className="bg-naranja text-white shadow-card">
                  <div className="text-2xl font-extrabold font-serif">10+</div>
                  <div className="text-xs text-white/85 leading-tight mt-1">años de experiencia clínica</div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="-mt-12 md:-mt-16">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Card padding="p-6 md:p-8" className="border border-crema-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
              {[
                { n: '320+',  l: 'pacientes acompañados' },
                { n: '6',     l: 'tipos de trasplante' },
                { n: '8 años',l: 'de experiencia clínica' },
                { n: '98%',   l: 'recomendaría la consulta' }
              ].map((s,i) => (
                <div key={i} className="text-center md:border-r last:md:border-r-0 border-crema-200">
                  <div className="font-serif text-3xl md:text-4xl font-semibold text-morado">{s.n}</div>
                  <div className="text-xs md:text-sm text-tinta-400 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="md:flex items-end justify-between gap-8 mb-10">
          <div>
            <Pill tone="morado" className="mb-3">Servicios</Pill>
            <h2 className="font-serif text-4xl md:text-5xl text-tinta tracking-tight font-semibold leading-tight">
              Un acompañamiento que <br/><span className="italic text-morado">se adapta a tu etapa</span>
            </h2>
          </div>
          <p className="text-tinta-600 max-w-md text-lg mt-4 md:mt-0">
            Cada momento del proceso de trasplante tiene su propio peso emocional. No trabajamos igual con quien espera que con quien acaba de recibir.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MOCK.SERVICIOS.map((s, i) => (
            <Card key={i} interactive className="group cursor-pointer relative overflow-hidden">
              <div className={`absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${i%2?'bg-naranja-50':'bg-morado-50'}`}/>
              <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${i%2 ? 'bg-naranja text-white' : 'bg-morado text-white'}`}>
                <Icon name={s.icon} size={22}/>
              </div>
              <h3 className="relative font-bold text-lg text-tinta mb-2">{s.titulo}</h3>
              <p className="relative text-sm text-tinta-600 leading-relaxed">{s.desc}</p>
              <div className="relative mt-4 flex items-center gap-1.5 text-sm font-bold text-morado-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Saber más <Icon name="arrowRight" size={14}/>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* SOBRE LA DOCTORA — compact */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="bg-morado rounded-3xl overflow-hidden relative">
          <svg viewBox="0 0 600 400" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
            <circle cx="80"  cy="60"  r="60" fill="#F39200" opacity=".25"/>
            <circle cx="540" cy="350" r="100" fill="#F39200" opacity=".22"/>
            <circle cx="500" cy="80"  r="40" fill="#9A4DB0" opacity=".4"/>
            <circle cx="120" cy="320" r="34" fill="#9A4DB0" opacity=".5"/>
          </svg>
          <div className="relative grid md:grid-cols-[1fr_1.3fr] gap-8 lg:gap-12 p-8 md:p-12 lg:p-16 items-center">
            <div>
              <DoctorPortrait className="w-full max-w-sm rounded-3xl" />
            </div>
            <div className="text-white">
              <Pill tone="naranja" className="mb-4">Sobre mí</Pill>
              <h2 className="font-serif text-3xl md:text-5xl leading-[1.05] font-semibold mb-5" style={{textWrap:'pretty'}}>
                Soy Xenia. Llevo más de 10 años como psicóloga clínica y año y medio en unidades de <span className="italic text-naranja-300">trasplante de órganos</span>.
              </h2>
              <p className="text-white/85 text-lg leading-relaxed mb-5">
                Psicóloga clínica con más de 10 años de experiencia, enfocada en el tratamiento psicoterapéutico de pacientes adultos y adolescentes, y en el desarrollo de programas psicológicos para pacientes hospitalizados. Actualmente me desempeño como Psicóloga de Trasplante en el Instituto Nacional de Cardiología, brindando atención integral pre y post-trasplante renal y cardíaco desde un enfoque Gestalt-Transpersonal.
              </p>
              <p className="text-white/75 leading-relaxed mb-8">
                Trabajo en Tlalpan, CDMX, y por videollamada a nivel nacional.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="naranja" onClick={() => setPage('about')}>Ver mi historia completa</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 text-center">
        <div className="mb-10">
          <Pill tone="naranja" className="mb-3">Voces</Pill>
          <h2 className="font-serif text-4xl md:text-5xl text-tinta tracking-tight font-semibold">
            Lo que dicen <span className="italic text-morado">quienes ya pasaron por aquí</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5 text-left">
          {MOCK.TESTIMONIOS.map((t, i) => (
            <Card key={t.id} className="relative">
              <div className="absolute -top-3 left-6 w-10 h-10 bg-naranja rounded-full flex items-center justify-center text-white font-serif text-2xl shadow-soft">"</div>

              <p className="text-tinta-600 leading-relaxed mb-5 italic font-serif">"{t.texto}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-crema-200">
                <Avatar initials={t.autor.split(' ').map(w=>w[0]).slice(0,2).join('')} tone={i%2?'naranja':'morado'} />
                <div>
                  <div className="font-bold text-sm">{t.autor}</div>
                  <div className="text-xs text-tinta-400">{t.meta}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* MINI ESCUELITA TEASER */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8">
        <Card padding="p-0" className="overflow-hidden">
          <div className="grid md:grid-cols-[1.1fr_1fr]">
            <div className="p-8 md:p-12 lg:p-16">
              <Pill tone="morado" icon="graduation" className="mb-4">Aprendiendo sobre mi trasplante</Pill>
              <h2 className="font-serif text-3xl md:text-4xl text-tinta font-semibold leading-tight mb-4" style={{textWrap:'pretty'}}>
                Cápsulas educativas <span className="italic text-naranja">hechas para ti</span> y tu proceso
              </h2>
              <p className="text-tinta-600 leading-relaxed mb-6">
                Videos cortos, lecturas y herramientas prácticas que la Lic. Xenia te asigna según tu etapa: pre-trasplante, post-trasplante o familiar.
              </p>
              <div className="space-y-3 mb-7">
                {[
                  { i:'video', t:'Videos breves (5–10 min) que puedes ver en sala de espera' },
                  { i:'fileText', t:'Lecturas en lenguaje claro, sin jerga médica' },
                  { i:'download', t:'Plantillas descargables: diario emocional, agenda de medicamentos' }
                ].map((b,i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-naranja-50 text-naranja-700 flex items-center justify-center flex-shrink-0">
                      <Icon name={b.i} size={16}/>
                    </div>
                    <p className="text-sm text-tinta-600 pt-1.5">{b.t}</p>
                  </div>
                ))}
              </div>
              <Button variant="primary" icon="play" onClick={() => setPage('escuelita-pub')}>Explorar el aprendizaje</Button>
            </div>
            <div className="bg-crema-200 relative overflow-hidden min-h-[320px] p-8">
              <div className="grid grid-cols-2 gap-3 absolute inset-6">
                {MOCK.ESCUELITA.slice(0,4).map((e, i) => (
                  <div key={e.id} className={`bg-white rounded-2xl shadow-soft p-4 flex flex-col justify-between ${i%2?'translate-y-6':''}`}>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${e.tipo==='video'?'bg-naranja text-white':'bg-morado text-white'}`}>
                      <Icon name={e.tipo==='video'?'play':e.tipo==='pdf'?'fileText':'book'} size={16}/>
                    </div>
                    <div>
                      <div className="text-[11px] text-tinta-400 mt-3 font-semibold">{e.cat}</div>
                      <div className="text-sm font-bold text-tinta leading-tight mt-1">{e.titulo}</div>
                      <div className="text-[11px] text-tinta-400 mt-2">{e.dur}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-5 lg:px-8 text-center">
        <div className="bg-naranja rounded-3xl p-10 md:p-16 relative overflow-hidden">
          <svg viewBox="0 0 800 400" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
            <circle cx="80"  cy="80"  r="60" fill="#fff" opacity=".15"/>
            <circle cx="720" cy="320" r="80" fill="#7B2D8E" opacity=".25"/>
            <circle cx="600" cy="60"  r="30" fill="#fff" opacity=".15"/>
            <circle cx="120" cy="340" r="44" fill="#fff" opacity=".12"/>
          </svg>
          <div className="relative">
            <h2 className="font-serif text-3xl md:text-5xl text-white font-semibold leading-tight mb-4" style={{textWrap:'pretty'}}>
              Empieza con una conversación. <br className="hidden md:block"/><span className="italic">El resto se construye desde ahí.</span>
            </h2>
            <p className="text-white/90 text-lg mb-7 max-w-2xl mx-auto">Primera consulta de 80 min para conocernos y trazar el camino — sin compromiso.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button variant="white" size="lg" icon="calendar" onClick={() => setPage('agendar')}>Agendar primera consulta</Button>
              <Button variant="outlineWhite" size="lg" icon="whatsapp" onClick={() => window.open('https://wa.me/525544211198', '_blank')}>55 4421 1198</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ---------- Blog ----------
export function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState('Todos');

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setPosts(data || []);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const cats = ['Todos', ...new Set(posts.map(p => p.categoria))];
  const filtered = cat === 'Todos' ? posts : posts.filter(p => p.categoria === cat);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-12 md:py-20 space-y-12 text-left">
      <div className="text-center max-w-3xl mx-auto">
        <Pill tone="morado" className="mb-4">Blog · Lecturas</Pill>
        <h1 className="font-serif text-5xl md:text-6xl text-tinta tracking-tight font-semibold mb-4" style={{textWrap:'pretty'}}>
          Palabras para el <span className="italic text-morado">trayecto</span>
        </h1>
        <p className="text-tinta-600 text-lg leading-relaxed">
          Reflexiones clínicas y herramientas prácticas para pacientes, familiares y profesionales de la salud que acompañan el trasplante.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block w-8 h-8 border-4 border-morado border-t-transparent rounded-full animate-spin"></div>
          <p className="text-tinta-400 text-sm mt-4 font-bold">Cargando lecturas...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-crema-200 p-16 text-center max-w-xl mx-auto space-y-4">
          <div className="w-14 h-14 bg-morado-50 text-morado-600 rounded-full flex items-center justify-center mx-auto">
            <Icon name="book" size={24} />
          </div>
          <h3 className="font-serif text-xl font-bold text-tinta">Próximamente</h3>
          <p className="text-tinta-600 text-sm">
            Estamos preparando las primeras lecturas, reflexiones clínicas y herramientas prácticas. Vuelve pronto para explorar nuestro contenido.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-2 justify-center">
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)}
                      className={`px-4 py-2 rounded-full text-sm font-bold transition-all cursor-pointer
                        ${cat===c ? 'bg-morado text-white shadow-soft' : 'bg-white text-tinta-600 hover:bg-morado-50 border border-crema-200'}`}>
                {c}
              </button>
            ))}
          </div>

          {/* Featured */}
          {featured && (
            <Card padding="p-0" interactive className="overflow-hidden group cursor-pointer">
              <div className="grid md:grid-cols-[1.1fr_1fr]">
                <div className="aspect-[16/10] md:aspect-auto md:min-h-[420px] relative overflow-hidden">
                  <BlogCover seed={0} />
                  <Pill tone="blanco" className="absolute top-5 left-5">Destacado</Pill>
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <Pill tone={featured.color === '#F39200' ? 'naranja' : 'morado'} size="md">{featured.categoria}</Pill>
                    <span className="text-xs text-tinta-400 flex items-center gap-1"><Icon name="clock" size={12}/> {featured.min} min</span>
                    <span className="text-xs text-tinta-400">·</span>
                    <span className="text-xs text-tinta-400">{featured.fecha || new Date(featured.created_at).toLocaleDateString()}</span>
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl text-tinta font-semibold leading-tight mb-4 group-hover:text-morado-600 transition-colors" style={{textWrap:'pretty'}}>
                    {featured.titulo}
                  </h2>
                  <p className="text-tinta-600 leading-relaxed mb-6">{featured.resumen}</p>
                  <div className="flex items-center gap-3">
                    <Avatar initials="XL" tone="naranja" size={40} />
                    <div>
                      <div className="font-bold text-sm">{featured.autor || 'Dra. Xenia Lorena López Martínez'}</div>
                      <div className="text-xs text-tinta-400">Psicología Trasplante</div>
                    </div>
                    <div className="ml-auto">
                      <div className="w-10 h-10 rounded-full bg-morado-50 text-morado-600 flex items-center justify-center group-hover:bg-morado group-hover:text-white transition-colors">
                        <Icon name="arrowUpRight" size={18}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((p, i) => (
              <Card key={p.id} padding="p-0" interactive className="overflow-hidden group cursor-pointer flex flex-col">
                <div className="aspect-[16/10] relative overflow-hidden">
                  <BlogCover seed={i+1} />
                  <Pill tone="blanco" className="absolute top-4 left-4">{p.categoria}</Pill>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-serif text-xl text-tinta font-semibold leading-snug mb-3 group-hover:text-morado-600 transition-colors" style={{textWrap:'pretty'}}>{p.titulo}</h3>
                  <p className="text-sm text-tinta-600 leading-relaxed mb-5 flex-1 line-clamp-3">{p.resumen}</p>
                  <div className="flex items-center justify-between text-xs text-tinta-400 pt-4 border-t border-crema-200">
                    <span>{p.fecha || new Date(p.created_at).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><Icon name="clock" size={12}/> {p.min} min</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Newsletter */}
      <Card padding="p-8 md:p-12" className="bg-morado text-white text-center relative overflow-hidden">
        <svg viewBox="0 0 600 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
          <circle cx="60" cy="40" r="40" fill="#F39200" opacity=".3"/>
          <circle cx="540" cy="160" r="60" fill="#F39200" opacity=".25"/>
        </svg>
        <div className="relative max-w-xl mx-auto">
          <Icon name="mail" size={28} className="mx-auto mb-3 text-naranja-300"/>
          <h3 className="font-serif text-2xl md:text-3xl font-semibold mb-2" style={{textWrap:'pretty'}}>Recibe un texto al mes</h3>
          <p className="text-white/80 mb-5">Sin spam. Solo una reflexión clínica cada cuatro semanas.</p>
          <form className="flex gap-2 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="tu@correo.mx" className="flex-1 px-4 py-3 rounded-xl bg-white/95 text-tinta placeholder-tinta-400 text-sm font-medium focus:outline-none"/>
            <Button variant="naranja">Suscribirme</Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

// ---------- Agendar ----------
export function Agendar() {
  const [tipo, setTipo] = useState('primera');
  const [modo, setModo] = useState('consultorio');
  const [dia, setDia]   = useState(28);
  const [hora, setHora] = useState('11:00');
  const tipos = [
    { id: 'primera', label: 'Primera vez', dur: '80 min', precio: '$1,400' },
    { id: 'seguim',  label: 'Seguimiento', dur: '50 min', precio: '$1,100' },
    { id: 'familia', label: 'Familia / pareja', dur: '80 min', precio: '$1,600' }
  ];
  const horas = ['09:00','10:00','11:00','13:00','16:00','17:30'];
  const dias = [
    { d: 27, m: 'Mié', ocupados: 4 },
    { d: 28, m: 'Jue', ocupados: 2 },
    { d: 29, m: 'Vie', ocupados: 1 },
    { d: 30, m: 'Sáb', ocupados: 3 },
    { d: 1,  m: 'Lun', ocupados: 0 },
    { d: 2,  m: 'Mar', ocupados: 2 },
    { d: 3,  m: 'Mié', ocupados: 1 }
  ];

  return (
    <div className="max-w-6xl mx-auto px-5 lg:px-8 py-12 md:py-16 text-left">
      <div className="text-center mb-10">
        <Pill tone="naranja" className="mb-4">Agendar cita</Pill>
        <h1 className="font-serif text-4xl md:text-5xl text-tinta font-semibold leading-tight mb-3" style={{textWrap:'pretty'}}>
          Reserva tu espacio en <span className="italic text-morado">3 pasos</span>
        </h1>
        <p className="text-tinta-600 text-lg">Recibirás confirmación por WhatsApp y mail</p>
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
        <Card className="space-y-7">
          {/* Step 1 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 rounded-full bg-morado text-white flex items-center justify-center font-bold text-sm">1</div>
              <h3 className="font-bold text-lg">¿Qué tipo de consulta necesitas?</h3>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {tipos.map(t => (
                <button key={t.id} onClick={() => setTipo(t.id)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer
                          ${tipo===t.id ? 'border-morado bg-morado-50' : 'border-crema-200 bg-white hover:border-morado-200'}`}>
                  <div className="font-bold text-sm mb-1">{t.label}</div>
                  <div className="text-xs text-tinta-400">{t.dur}</div>
                  <div className="text-sm text-naranja-700 font-bold mt-2">{t.precio}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2 — modalidad */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 rounded-full bg-morado text-white flex items-center justify-center font-bold text-sm">2</div>
              <h3 className="font-bold text-lg">Modalidad</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { id: 'consultorio', icon: 'building', label: 'Consultorio', sub: 'Roma Norte, CDMX' },
                { id: 'video',       icon: 'video',    label: 'Videollamada', sub: 'Zoom o Google Meet' }
              ].map(m => (
                <button key={m.id} onClick={() => setModo(m.id)}
                        className={`p-4 rounded-2xl border-2 text-left flex items-center gap-3 transition-all cursor-pointer
                          ${modo===m.id ? 'border-morado bg-morado-50' : 'border-crema-200 bg-white hover:border-morado-200'}`}>
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${modo===m.id?'bg-morado text-white':'bg-crema-200 text-tinta-600'}`}>
                    <Icon name={m.icon} size={20}/>
                  </div>
                  <div>
                    <div className="font-bold text-sm">{m.label}</div>
                    <div className="text-xs text-tinta-400">{m.sub}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3 — calendario */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 rounded-full bg-morado text-white flex items-center justify-center font-bold text-sm">3</div>
              <h3 className="font-bold text-lg">Día y hora</h3>
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-4">
              {dias.map(d => (
                <button key={d.d} onClick={() => setDia(d.d)}
                        className={`flex-shrink-0 w-[68px] py-3 rounded-2xl border-2 text-center transition-all cursor-pointer
                          ${dia===d.d ? 'border-morado bg-morado text-white' : 'border-crema-200 bg-white hover:border-morado-200'}`}>
                  <div className="text-[11px] font-bold opacity-80">{d.m}</div>
                  <div className="text-2xl font-bold font-serif mt-0.5">{d.d}</div>
                  <div className={`text-[10px] mt-1 ${dia===d.d?'text-white/75':'text-tinta-400'}`}>{d.ocupados===0?'libre':d.ocupados+' ocup.'}</div>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {horas.map(h => (
                <button key={h} onClick={() => setHora(h)}
                        className={`py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer
                          ${hora===h ? 'bg-naranja text-white' : 'bg-crema-200 text-tinta-600 hover:bg-naranja-50'}`}>
                  {h}
                </button>
              ))}
            </div>
          </div>

          {/* Step 4 — datos */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 rounded-full bg-morado text-white flex items-center justify-center font-bold text-sm">4</div>
              <h3 className="font-bold text-lg">Tus datos</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Nombre completo" placeholder="María Elena Sandoval"/>
              <Field label="Teléfono / WhatsApp" placeholder="55 0000 0000"/>
              <Field label="Correo" placeholder="tu@correo.mx" type="email"/>
              <Field label="Tipo de trasplante" type="select" options={['Renal','Hepático','Cardíaco','Pulmonar','Médula','Córnea','Familiar de paciente','Aún por definir']}/>
              <div className="sm:col-span-2">
                <label className="text-sm font-bold text-tinta-600 mb-1.5 block">¿Algo que quieras adelantarme?</label>
                <textarea rows={3} placeholder="Brevemente, lo que estás viviendo. Esto es opcional."
                          className="w-full px-4 py-3 rounded-xl bg-crema-100 border-2 border-crema-200 focus:border-morado focus:bg-white outline-none text-sm font-medium resize-none"/>
              </div>
              <label className="sm:col-span-2 flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" defaultChecked className="mt-0.5 accent-morado w-4 h-4"/>
                <span className="text-xs text-tinta-600">Acepto el <a className="text-morado-600 font-bold underline">aviso de privacidad</a> y confirmo que la información compartida será tratada con secreto profesional.</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-crema-200">
            <Button variant="primary" size="lg" icon="calendar" className="flex-1">Confirmar cita</Button>
            <Button variant="outline" size="lg" icon="whatsapp" className="flex-1 !text-[#1da851] !border-[#25D366] hover:!bg-[#E8F8EF]" onClick={() => window.open('https://wa.me/525544211198', '_blank')}>Mejor por WhatsApp</Button>
          </div>
        </Card>

        {/* Resumen */}
        <div className="space-y-5">
          <Card className="bg-crema-100 border border-crema-200">
            <h3 className="font-bold text-sm uppercase tracking-wide text-tinta-400 mb-4">Resumen</h3>
            <div className="space-y-3 text-sm">
              <SummaryRow label="Tipo" value={tipos.find(t=>t.id===tipo)?.label}/>
              <SummaryRow label="Duración" value={tipos.find(t=>t.id===tipo)?.dur}/>
              <SummaryRow label="Modalidad" value={modo==='consultorio'?'Consultorio · Roma Norte':'Videollamada'}/>
              <SummaryRow label="Fecha" value={`Jue ${dia} mayo · ${hora} hrs`}/>
              <div className="border-t border-crema-200 pt-3 flex items-center justify-between">
                <span className="font-bold">Total</span>
                <span className="font-serif text-2xl font-semibold text-morado">{tipos.find(t=>t.id===tipo)?.precio}</span>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Icon name="shield" size={18} className="text-morado"/>
              <h3 className="font-bold text-sm">Qué incluye</h3>
            </div>
            <ul className="space-y-2 text-sm text-tinta-600 text-left">
              {['Sesión con la Lic. Xenia','Acceso a la Unidad de Aprendizaje','Notas clínicas para tu equipo médico (opcional)','Reagendado gratis hasta 24 hrs antes'].map((t,i) => (
                <li key={i} className="flex gap-2"><Icon name="check" size={16} className="text-morado mt-0.5 flex-shrink-0"/>{t}</li>
              ))}
            </ul>
          </Card>
          <Card className="bg-naranja text-white">
            <div className="flex items-start gap-3">
              <Icon name="info" size={22} className="flex-shrink-0 mt-0.5"/>
              <div>
                <div className="font-bold mb-1">¿Es una urgencia?</div>
                <p className="text-sm text-white/90 leading-relaxed mb-3">Si estás en crisis, llámame directo: <strong>55 4421 1198</strong></p>
                <Button variant="white" size="sm" icon="phone">Llamar ahora</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Field({ label, placeholder, type='text', options }) {
  return (
    <div>
      <label className="text-sm font-bold text-tinta-600 mb-1.5 block">{label}</label>
      {type==='select' ? (
        <select className="w-full px-4 py-3 rounded-xl bg-crema-100 border-2 border-crema-200 focus:border-morado focus:bg-white outline-none text-sm font-medium">
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} placeholder={placeholder}
               className="w-full px-4 py-3 rounded-xl bg-crema-100 border-2 border-crema-200 focus:border-morado focus:bg-white outline-none text-sm font-medium"/>
      )}
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-tinta-400">{label}</span>
      <span className="font-bold text-right">{value}</span>
    </div>
  );
}

// ---------- About ----------
export function About() {
  return (
    <div className="max-w-5xl mx-auto px-5 lg:px-8 py-12 md:py-20 space-y-16 text-left">
      <div className="grid md:grid-cols-[1fr_1.3fr] gap-10 items-center">
        <div className="relative">
          <DoctorPortrait className="w-full max-w-sm rounded-3xl shadow-card"/>
          <div className="absolute -bottom-4 -right-4 bg-naranja text-white px-5 py-3 rounded-2xl shadow-card font-bold text-sm">
            10+ años de experiencia
          </div>
        </div>
        <div>
          <Pill tone="morado" className="mb-4">Quién soy</Pill>
          <h1 className="font-serif text-4xl md:text-5xl text-tinta font-semibold leading-tight mb-5" style={{textWrap:'pretty'}}>
            Lic. <span className="italic text-morado">Xenia Lorena López Martínez</span>
          </h1>
          <p className="text-tinta-600 text-lg leading-relaxed mb-4">
            Psicóloga de Trasplante en el Instituto Nacional de Cardiología. Licenciada en Psicología por la UNAM, con Especialidad en Psicoterapia Transpersonal y Diplomado en Psiconefrología. Cédula profesional 12105016. Cuenta con año y medio de experiencia en unidades de trasplante de órganos y más de 10 años de trayectoria como psicóloga clínica.
          </p>
          <p className="text-tinta-600 leading-relaxed">
            "Mi trabajo no es hacer que el trasplante sea fácil. Es hacer que no estés sola mientras lo atraviesas."
          </p>
        </div>
      </div>

      <Card padding="p-8 md:p-12">
        <h2 className="font-serif text-3xl font-semibold text-tinta mb-6">Formación</h2>
        <div className="space-y-5">
          {[
            { y: '2026', t: 'Maestría en Terapia Gestalt (En curso)', i: 'Instituto Humanista de Psicoterapia Gestalt'},
            { y: '2025', t: 'Diplomado en Psiconefrología', i: 'UNAM – Centro de Investigación y Desarrollo de la Psiconefrología'},
            { y: '2025', t: 'Perfeccionamiento en Psiquiatría de Enlace y Medicina Psicosomática', i: 'Hospital Clínic de Barcelona, España'},
            { y: '2019', t: 'Diplomado en Administración Estratégica de Recursos Humanos', i: 'UNAM – FCA'},
            { y: '2015', t: 'Especialidad en Psicoterapia Transpersonal', i: 'AMAPSI-UNAM'},
            { y: '2014', t: 'Licenciatura en Psicología (Cédula 12105016)', i: 'UNAM – Facultad de Psicología'}
          ].map((f, i) => (
            <div key={i} className="flex gap-5 pb-5 border-b last:border-b-0 border-crema-200">
              <div className="w-16 flex-shrink-0">
                <div className="font-serif text-2xl font-semibold text-morado">{f.y}</div>
              </div>
              <div>
                <div className="font-bold text-tinta">{f.t}</div>
                <div className="text-sm text-tinta-400">{f.i}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function EscuelitaPub() {
  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16 md:py-24 text-left">
      <div className="text-center max-w-2xl mx-auto space-y-6">
        <Pill tone="naranja" icon="graduation" className="mb-4">Aprendiendo sobre mi trasplante</Pill>
        <h1 className="font-serif text-4xl md:text-5xl text-tinta font-semibold leading-tight" style={{textWrap:'pretty'}}>
          Unidad de <span className="italic text-morado">aprendizaje</span>
        </h1>
        <p className="text-tinta-600 text-lg leading-relaxed">
          Próximamente. Estamos preparando un espacio educativo con cápsulas informativas en video, lecturas y guías prácticas especialmente diseñadas para acompañarte a ti y a tu familia en cada etapa de tu proceso de trasplante.
        </p>
        <div className="pt-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-crema-200 text-sm font-bold text-tinta-600">
            <Icon name="clock" size={16} className="text-naranja" />
            Disponible muy pronto
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Footer ----------
export function PublicFooter({ setPage }) {
  return (
    <footer className="bg-morado-700 text-white relative overflow-hidden text-left">
      <svg viewBox="0 0 1200 300" className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="xMidYMid slice">
        <circle cx="100" cy="40"  r="50" fill="#F39200" />
        <circle cx="1100" cy="260" r="80" fill="#F39200" />
        <circle cx="1050" cy="60"  r="30" fill="#9A4DB0" />
      </svg>
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-14 grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
        <div>
          <Logo size={54} white/>
          <p className="text-white/75 leading-relaxed mt-5 max-w-xs">
            Acompañamiento psicológico para pacientes de trasplante y sus familias. CDMX · México.
          </p>
          <div className="flex gap-2 mt-5">
            {['whatsapp','mail','phone'].map(i => (
              <button key={i} className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer">
                <Icon name={i} size={16}/>
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="font-bold mb-4 text-sm">Navega</div>
          <ul className="space-y-2 text-sm text-white/75">
            <li><a className="hover:text-naranja-300 cursor-pointer hover:underline" onClick={() => setPage('home')}>Inicio</a></li>
            <li><a className="hover:text-naranja-300 cursor-pointer" onClick={() => setPage('about')}>Quiénes somos</a></li>
            <li><a className="hover:text-naranja-300 cursor-pointer" onClick={() => setPage('blog')}>Blog</a></li>
            <li><a className="hover:text-naranja-300 cursor-pointer" onClick={() => setPage('escuelita-pub')}>Aprendiendo sobre mi trasplante</a></li>
            <li><a className="hover:text-naranja-300 cursor-pointer" onClick={() => setPage('agendar')}>Agendar cita</a></li>
          </ul>
        </div>
        <div>
          <div className="font-bold mb-4 text-sm">Servicios</div>
          <ul className="space-y-2 text-sm text-white/75">
            {MOCK.SERVICIOS.slice(0,5).map((s,i) => <li key={i}>{s.titulo}</li>)}
          </ul>
        </div>
        <div>
          <div className="font-bold mb-4 text-sm">Contacto</div>
          <ul className="space-y-2.5 text-sm text-white/75">
            <li className="flex gap-2"><Icon name="pin" size={16} className="flex-shrink-0 mt-0.5"/> Tlalpan, CDMX</li>
            <li className="flex gap-2"><Icon name="phone" size={16}/> 55 4421 1198</li>
            <li className="flex gap-2"><Icon name="mail" size={16}/> xenialorenalopezmartinez@gmail.com</li>
            <li className="flex gap-2"><Icon name="clock" size={16}/> Lun–Vie 9:00–19:00</li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/15">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-5 flex flex-col md:flex-row gap-2 justify-between items-center text-xs text-white/60">
          <div>© 2026 Psicología Trasplante · Lic. Xenia Lorena López Martínez · Cédula 12105016</div>
          <div className="flex gap-4">
            <a className="hover:text-white cursor-pointer">Aviso de privacidad</a>
            <a className="hover:text-white cursor-pointer">Términos</a>
            <a className="hover:text-white cursor-pointer">psicotrasplante.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

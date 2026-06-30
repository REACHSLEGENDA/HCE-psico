import React, { useState, useEffect } from 'react';
import { MOCK } from './data/mockData';
import { WhatsAppFloat } from './components/Shared';
import { PublicNav, Home, Blog, About, EscuelitaPub, PublicFooter, Agendar } from './components/Public';
import { Sidebar, Topbar, Dashboard } from './components/CrmDashboard';
import { Pacientes, ExpedienteDetalle } from './components/CrmExpediente';
import { Calendario, Bandeja, EscuelitaAdmin, NotasStandalone, BlogAdmin } from './components/CrmOther';

function App() {
  const [mode, setMode] = useState('public'); // public | crm
  const [publicPage, setPublicPage] = useState('home');
  const [crmPage, setCrmPage] = useState('dashboard');
  const [pacienteOpen, setPacienteOpen] = useState(null);

  const openPaciente = (pid) => {
    setMode('crm');
    setCrmPage('expediente');
    setPacienteOpen(pid);
  };

  const switchMode = (m) => {
    setMode(m);
    if (m === 'public') {
      setPacienteOpen(null);
    }
  };



  // Check URL parameters for CRM mode
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true' || params.get('crm') === 'true') {
      setMode('crm');
    }
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [mode, publicPage, crmPage, pacienteOpen]);

  if (mode === 'public') {
    return (
      <div className="bg-crema min-h-screen flex flex-col justify-between">
        <PublicNav page={publicPage} setPage={setPublicPage}/>
        <main className="flex-1">
          {publicPage === 'home'          && <Home setPage={setPublicPage}/>}
          {publicPage === 'blog'          && <Blog/>}
          {publicPage === 'agendar'       && <Agendar/>}
          {publicPage === 'about'         && <About/>}
          {publicPage === 'escuelita-pub' && <EscuelitaPub/>}
        </main>
        <PublicFooter setPage={setPublicPage}/>
        <WhatsAppFloat/>
      </div>
    );
  }

  // CRM
  const titles = {
    dashboard:   { t: 'Inicio',           s: 'Resumen del día — jueves 28 de mayo' },
    pacientes:   { t: 'Expedientes',      s: '47 pacientes activos · 6 en lista de espera' },
    expediente:  { t: 'Expediente clínico', s: pacienteOpen ? (MOCK.PACIENTES.find(p=>p.id===pacienteOpen)?.nombre || '') : '' },
    calendario:  { t: 'Calendario',       s: '6 citas hoy · 32 esta semana' },
    mensajes:    { t: 'Bandeja unificada', s: 'WhatsApp + Mail · 3 sin leer' },
    escuelita:   { t: 'Unidad de aprendizaje',   s: '23 cápsulas · 182 asignaciones activas' },
    notas:       { t: 'Notas clínicas',   s: 'Editor estilo Notion · autoguardado' },
    blog:        { t: 'Gestionar Blog',   s: 'Publicar artículos y novedades en el sitio web' }
  };
  const cur = titles[crmPage] || { t: '', s: '' };

  return (
    <div className="bg-crema flex h-screen overflow-hidden">
      <Sidebar page={crmPage === 'expediente' ? 'pacientes' : crmPage} setPage={(p) => { setCrmPage(p); setPacienteOpen(null); }}/>
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar title={cur.t} subtitle={cur.s}/>
        <div className={`flex-1 overflow-auto scrollbar-thin ${crmPage==='mensajes' || crmPage==='expediente' ? '' : 'bg-crema-100'}`}>
          {crmPage === 'dashboard' && <Dashboard openPaciente={openPaciente} setCrmPage={setCrmPage}/>}
          {crmPage === 'pacientes' && !pacienteOpen && <Pacientes openPaciente={openPaciente}/>}
          {(crmPage === 'expediente' || (crmPage==='pacientes' && pacienteOpen)) && (
            <ExpedienteDetalle pid={pacienteOpen} back={() => { setPacienteOpen(null); setCrmPage('pacientes'); }} openCrm={setCrmPage}/>
          )}
          {crmPage === 'calendario' && <Calendario openPaciente={openPaciente}/>}
          {crmPage === 'mensajes'   && <Bandeja openPaciente={openPaciente}/>}
          {crmPage === 'escuelita'  && <EscuelitaAdmin openPaciente={openPaciente}/>}
          {crmPage === 'blog'       && <BlogAdmin/>}
          {crmPage === 'notas'      && <NotasStandalone/>}
        </div>
      </div>
    </div>
  );
}

export default App;

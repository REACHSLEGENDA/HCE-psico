// ===== Mock data — español, contexto mexicano =====

export const TRASPLANTES = {
  renal:    { label: 'Renal',     color: '#F39200', soft: '#FFE9C2' },
  hepatico: { label: 'Hepático',  color: '#7B2D8E', soft: '#E9D2EE' },
  cardiaco: { label: 'Cardíaco',  color: '#C0392B', soft: '#F8D6D2' },
  pulmonar: { label: 'Pulmonar',  color: '#2E86AB', soft: '#D6E6F0' },
  medula:   { label: 'Médula',    color: '#6B9C2F', soft: '#E0EBD0' },
  cornea:   { label: 'Córnea',    color: '#D17C00', soft: '#FFD382' }
};

export const ETAPAS = {
  pre:     { label: 'Pre-trasplante',     color: '#7B2D8E' },
  espera:  { label: 'En lista de espera', color: '#F39200' },
  post:    { label: 'Post-trasplante',    color: '#6B9C2F' },
  familia: { label: 'Familiar',           color: '#2E86AB' }
};

export const PACIENTES = [
  { id: 'p01', nombre: 'María Elena Sandoval Ruiz', edad: 54, sexo: 'F', tipo: 'renal',    etapa: 'post',    desde: '2023-11-04', tel: '55 4421 1198', email: 'maria.sandoval@correo.mx', ciudad: 'CDMX', proximaCita: '2026-05-28 10:00', riesgo: 'medio', avatar: 'ME', notas: 12, adherencia: 92 },
  { id: 'p02', nombre: 'Jorge Antonio Béjar Mendoza', edad: 62, sexo: 'M', tipo: 'hepatico', etapa: 'espera',  desde: '2024-02-19', tel: '55 8810 7732', email: 'j.bejar@correo.mx', ciudad: 'Toluca', proximaCita: '2026-05-28 11:30', riesgo: 'alto',  avatar: 'JB', notas: 24, adherencia: 78 },
  { id: 'p03', nombre: 'Lucía Hernández Valdez', edad: 39, sexo: 'F', tipo: 'cardiaco', etapa: 'post',    desde: '2024-08-30', tel: '55 2247 9911', email: 'lucia.hv@correo.mx', ciudad: 'Querétaro', proximaCita: '2026-05-28 13:00', riesgo: 'bajo',  avatar: 'LH', notas: 18, adherencia: 96 },
  { id: 'p04', nombre: 'Roberto Cisneros Aguilar', edad: 47, sexo: 'M', tipo: 'renal',    etapa: 'pre',     desde: '2025-03-12', tel: '55 6098 4421', email: 'r.cisneros@correo.mx', ciudad: 'CDMX', proximaCita: '2026-05-29 09:30', riesgo: 'medio', avatar: 'RC', notas: 7,  adherencia: 84 },
  { id: 'p05', nombre: 'Adriana Fuentes López', edad: 33, sexo: 'F', tipo: 'pulmonar', etapa: 'espera',  desde: '2025-01-07', tel: '55 1129 8801', email: 'a.fuentes@correo.mx', ciudad: 'Puebla', proximaCita: '2026-05-29 11:00', riesgo: 'alto',  avatar: 'AF', notas: 15, adherencia: 71 },
  { id: 'p06', nombre: 'Familia Ortega — esposa de J. Ortega', edad: 50, sexo: 'F', tipo: 'medula',   etapa: 'familia', desde: '2025-06-22', tel: '55 9912 7745', email: 'familia.ortega@correo.mx', ciudad: 'CDMX', proximaCita: '2026-05-29 16:00', riesgo: 'medio', avatar: 'FO', notas: 9,  adherencia: 88 },
  { id: 'p07', nombre: 'Carlos Mauricio Reyes Téllez', edad: 28, sexo: 'M', tipo: 'medula',   etapa: 'post',    desde: '2023-04-18', tel: '55 5503 2218', email: 'cm.reyes@correo.mx', ciudad: 'Guadalajara', proximaCita: '2026-05-30 10:00', riesgo: 'bajo',  avatar: 'CR', notas: 31, adherencia: 98 },
  { id: 'p08', nombre: 'Patricia Domínguez Salas', edad: 58, sexo: 'F', tipo: 'cornea',   etapa: 'pre',     desde: '2025-09-02', tel: '55 7720 3318', email: 'p.dominguez@correo.mx', ciudad: 'Mérida', proximaCita: '2026-05-30 12:30', riesgo: 'bajo',  avatar: 'PD', notas: 4,  adherencia: 90 },
  { id: 'p09', nombre: 'Eduardo Marín Quezada', edad: 41, sexo: 'M', tipo: 'hepatico', etapa: 'post',    desde: '2024-12-11', tel: '55 4488 6601', email: 'e.marin@correo.mx', ciudad: 'CDMX', proximaCita: '2026-05-30 15:00', riesgo: 'medio', avatar: 'EM', notas: 22, adherencia: 86 },
  { id: 'p10', nombre: 'Sandra Villalobos Pinto', edad: 36, sexo: 'F', tipo: 'renal',    etapa: 'espera',  desde: '2025-05-29', tel: '55 6612 0099', email: 's.villalobos@correo.mx', ciudad: 'Monterrey', proximaCita: '2026-06-01 09:30', riesgo: 'medio', avatar: 'SV', notas: 11, adherencia: 82 },
  { id: 'p11', nombre: 'Hijo de Sra. Mendoza — Iván', edad: 14, sexo: 'M', tipo: 'cardiaco', etapa: 'familia', desde: '2025-10-14', tel: '55 2280 1146', email: 'mendoza.familia@correo.mx', ciudad: 'CDMX', proximaCita: '2026-06-02 17:00', riesgo: 'medio', avatar: 'IM', notas: 6, adherencia: 79 }
];

export const HISTORIAL_P01 = [
  { fecha: '2026-05-14', tipo: 'Seguimiento', dur: '50 min', resumen: 'Trabajo sobre culpa hacia donante. Estado anímico estable, sueño irregular.' },
  { fecha: '2026-04-30', tipo: 'Seguimiento', dur: '50 min', resumen: 'Revisión de adherencia a inmunosupresores. Refuerzo de red familiar.' },
  { fecha: '2026-04-16', tipo: 'Seguimiento', dur: '50 min', resumen: 'Episodio de ansiedad post-revisión. Aplicación de técnica de respiración 4-7-8.' },
  { fecha: '2026-04-02', tipo: 'Familia',     dur: '60 min', resumen: 'Sesión con esposo. Comunicación sobre miedos de rechazo.' },
  { fecha: '2026-03-19', tipo: 'Seguimiento', dur: '50 min', resumen: 'Cierre de duelo simbólico hacia órgano original. Carta a sí misma.' },
  { fecha: '2026-03-05', tipo: 'Seguimiento', dur: '50 min', resumen: 'Plan de regreso laboral parcial. Diario emocional.' },
  { fecha: '2026-02-19', tipo: 'Primera vez', dur: '80 min', resumen: 'Anamnesis. Antecedentes de IRC desde 2019. Hemodiálisis 4 años.' }
];

export const CITAS_HOY = [
  { hora: '09:00', dur: 50, paciente: 'María Elena Sandoval', pid: 'p01', tipo: 'seguimiento', modo: 'Consultorio',  estado: 'confirmada' },
  { hora: '10:00', dur: 50, paciente: 'Jorge A. Béjar',       pid: 'p02', tipo: 'seguimiento', modo: 'Videollamada', estado: 'confirmada' },
  { hora: '11:30', dur: 50, paciente: 'Lucía Hernández',      pid: 'p03', tipo: 'urgencia',    modo: 'Consultorio',  estado: 'en curso' },
  { hora: '13:00', dur: 60, paciente: 'Familia Ortega',       pid: 'p06', tipo: 'familia',     modo: 'Consultorio',  estado: 'confirmada' },
  { hora: '16:00', dur: 50, paciente: 'Roberto Cisneros',     pid: 'p04', tipo: 'primera',     modo: 'Videollamada', estado: 'pendiente' },
  { hora: '17:30', dur: 50, paciente: 'Adriana Fuentes',      pid: 'p05', tipo: 'seguimiento', modo: 'Consultorio',  estado: 'confirmada' }
];

export const TIPOS_CITA = {
  primera:     { label: 'Primera vez',  bg: '#7B2D8E', soft: '#E9D2EE', ring: '#5A1F6B' },
  seguimiento: { label: 'Seguimiento',  bg: '#F39200', soft: '#FFE9C2', ring: '#D17C00' },
  familia:     { label: 'Familia',      bg: '#2E86AB', soft: '#D6E6F0', ring: '#1F5E7C' },
  urgencia:    { label: 'Urgencia',     bg: '#C0392B', soft: '#F8D6D2', ring: '#882318' }
};

export const KPIS = {
  citasHoy:        { v: 6,   delta: '+2 vs ayer',  trend: 'up' },
  pacientesActivos:{ v: 47,  delta: '+3 este mes', trend: 'up' },
  mensajes:        { v: 8,   delta: '3 sin leer',  trend: 'flat' },
  ingresos:        { v: '$58,400', delta: '+12% vs abril', trend: 'up' }
};

// Pacientes por tipo (para gráfica) — % aproximados
export const PIE_TRASPLANTE = [
  { key: 'renal',    n: 17 },
  { key: 'hepatico', n: 9 },
  { key: 'cardiaco', n: 7 },
  { key: 'pulmonar', n: 5 },
  { key: 'medula',   n: 6 },
  { key: 'cornea',   n: 3 }
];

export const BLOG_POSTS = [
  { id: 'b01', titulo: 'La culpa del superviviente: cuando recibir un órgano duele', categoria: 'Duelo',         min: 7,  fecha: '12 may 2026', resumen: 'Después del trasplante, muchos pacientes experimentan culpa hacia el donante. Hablemos de cómo transitar esa emoción sin que se convierta en obstáculo para sanar.', autor: 'Dra. Xenia Lorena López Martínez', color: '#7B2D8E' },
  { id: 'b02', titulo: 'Adherencia al tratamiento: el reto silencioso del post-trasplante', categoria: 'Adherencia', min: 5, fecha: '03 may 2026', resumen: 'No tomar los inmunosupresores es la causa #1 de rechazo tardío. Estrategias psicológicas reales para no olvidar lo que más importa.', autor: 'Dra. Xenia Lorena López Martínez', color: '#F39200' },
  { id: 'b03', titulo: 'Cuando el cuidador también necesita cuidados',                       categoria: 'Familia',    min: 6, fecha: '21 abr 2026', resumen: 'La pareja, los hijos, los padres. El trasplante es de uno pero impacta a toda la familia. Cómo sostener al que sostiene.', autor: 'Dra. Xenia Lorena López Martínez', color: '#7B2D8E' },
  { id: 'b04', titulo: 'Lista de espera: vivir entre la esperanza y la incertidumbre',       categoria: 'Pre-trasplante', min: 8, fecha: '10 abr 2026', resumen: 'Ser candidato es esperar. Y esperar duele. Cinco herramientas para no perderte mientras llega tu turno.', autor: 'Dra. Xenia Lorena López Martínez', color: '#F39200' },
  { id: 'b05', titulo: 'El cuerpo recuerda: somatización después del trasplante',           categoria: 'Cuerpo y mente', min: 6, fecha: '28 mar 2026', resumen: 'Insomnio, dolores difusos, fatiga. Cuando el cuerpo procesa lo que la mente todavía no nombra.', autor: 'Dra. Xenia Lorena López Martínez', color: '#7B2D8E' },
  { id: 'b06', titulo: 'Pediátrico: explicarle a un niño que necesita un trasplante',       categoria: 'Pediátrico', min: 9, fecha: '14 mar 2026', resumen: 'Un lenguaje que no asuste pero no mienta. Recursos prácticos para padres y para el equipo médico.', autor: 'Dra. Xenia Lorena López Martínez', color: '#F39200' }
];

export const TESTIMONIOS = [
  { id: 't01', autor: 'Daniela R.', meta: 'Trasplante hepático, 2024', texto: 'Pasé del miedo total a sentirme acompañada. La Dra. Xenia no solo escucha — entiende el cuerpo del trasplantado.' },
  { id: 't02', autor: 'Familia Méndez', meta: 'Trasplante de su hijo Iván, 2025', texto: 'Las sesiones de familia nos salvaron. Aprendimos a hablar de lo que ninguno se atrevía a decir.' },
  { id: 't03', autor: 'Sergio L.', meta: 'En lista de espera renal', texto: 'Esperar te rompe. Esta consulta me dio herramientas para sostenerme — no para "estar bien", para estar real.' }
];

export const SERVICIOS = [
  { icon: 'leaf',     titulo: 'Acompañamiento pre-trasplante',  desc: 'Trabajo emocional durante evaluación y lista de espera. Manejo de ansiedad e incertidumbre.' },
  { icon: 'heart',    titulo: 'Post-trasplante temprano',        desc: 'Primeros 12 meses críticos. Adherencia, culpa del receptor, integración corporal.' },
  { icon: 'users',    titulo: 'Terapia con familia y cuidadores',desc: 'El trasplante es sistémico. Acompañamiento a quienes sostienen al paciente.' },
  { icon: 'graduation', titulo: 'Mini Escuelita',                 desc: 'Cápsulas educativas en video y lectura asignadas a tu proceso específico.' },
  { icon: 'message',  titulo: 'Sesiones de duelo simbólico',     desc: 'Para integrar la pérdida del órgano original o del donante anónimo.' },
  { icon: 'shield',   titulo: 'Intervención en crisis',          desc: 'Ventanas de urgencia 24/48 hrs para episodios de ansiedad, rechazo o complicaciones.' }
];

export const ESCUELITA = [
  { id: 'e01', tipo: 'video',    titulo: '¿Qué es la culpa del receptor?',          dur: '6 min', cat: 'Post-trasplante',  asignados: 14, vistos: 11 },
  { id: 'e02', tipo: 'lectura',  titulo: 'Tu sistema inmune: el nuevo equilibrio',  dur: '8 min', cat: 'Educativo',         asignados: 22, vistos: 19 },
  { id: 'e03', tipo: 'video',    titulo: 'Respiración 4-7-8 para crisis',           dur: '4 min', cat: 'Herramientas',      asignados: 31, vistos: 28 },
  { id: 'e04', tipo: 'pdf',      titulo: 'Diario emocional — plantilla 30 días',    dur: 'PDF',   cat: 'Herramientas',      asignados: 18, vistos: 14 },
  { id: 'e05', tipo: 'video',    titulo: 'Hablar con tu pareja sobre el trasplante',dur: '11 min',cat: 'Familia',           asignados: 9,  vistos: 6 },
  { id: 'e06', tipo: 'lectura',  titulo: 'Adherencia: el reto de los inmunosupresores', dur: '7 min', cat: 'Adherencia',    asignados: 26, vistos: 22 },
  { id: 'e07', tipo: 'video',    titulo: 'Niños y trasplante: cómo explicarlo',     dur: '9 min', cat: 'Pediátrico',        asignados: 4,  vistos: 3 },
  { id: 'e08', tipo: 'lectura',  titulo: 'La lista de espera: vivir el "mientras tanto"', dur: '6 min', cat: 'Pre-trasplante', asignados: 12, vistos: 9 }
];

export const MENSAJES = [
  { id: 'm01', canal: 'whatsapp', autor: 'María Elena Sandoval', pid: 'p01', preview: 'Doctora, tuve un sueño raro otra vez. ¿Podemos hablarlo el jueves?', hora: '08:42', sinleer: true,  adjunto: false },
  { id: 'm02', canal: 'mail',     autor: 'Jorge A. Béjar',       pid: 'p02', preview: 'Le envío los resultados del último Tacrolimus en sangre.',           hora: '08:21', sinleer: true,  adjunto: true  },
  { id: 'm03', canal: 'whatsapp', autor: 'Lucía Hernández',      pid: 'p03', preview: 'Confirmado para hoy 11:30 ✨ Gracias',                                hora: '07:55', sinleer: false, adjunto: false },
  { id: 'm04', canal: 'whatsapp', autor: 'Familia Ortega',       pid: 'p06', preview: 'Mi esposo quiere unirse a la sesión, ¿se puede?',                    hora: '07:30', sinleer: true,  adjunto: false },
  { id: 'm05', canal: 'mail',     autor: 'Hospital Ángeles',     pid: null,  preview: 'Referencia: paciente candidata hepático — Sra. Olvera',               hora: 'Ayer',  sinleer: false, adjunto: true  },
  { id: 'm06', canal: 'whatsapp', autor: 'Roberto Cisneros',     pid: 'p04', preview: '¿Cuánto cuesta la sesión de pareja? Mi esposa quiere asistir.',      hora: 'Ayer',  sinleer: false, adjunto: false },
  { id: 'm07', canal: 'whatsapp', autor: 'Adriana Fuentes',      pid: 'p05', preview: 'Tuve crisis anoche. Apliqué la respiración. Funcionó 🫶',           hora: 'Ayer',  sinleer: false, adjunto: false },
  { id: 'm08', canal: 'mail',     autor: 'Dr. Salinas (Nefro)',  pid: 'p01', preview: 'Sandoval María Elena — interconsulta para ajuste de dosis.',         hora: 'Lun',   sinleer: false, adjunto: true  }
];

export const PLANTILLAS = [
  { id: 'pl1', titulo: 'Confirmación de cita',     texto: 'Hola {nombre}, te confirmo nuestra sesión el {fecha} a las {hora}. Te espero. — Dra. Xenia' },
  { id: 'pl2', titulo: 'Recordatorio 24h',         texto: 'Hola {nombre}, te recuerdo nuestra cita mañana a las {hora}. Si necesitas reagendar, avísame con tiempo 🙏' },
  { id: 'pl3', titulo: 'Reposición de cita',       texto: 'Hola {nombre}, lamento que no pudiéramos vernos. Te propongo estas opciones: {opciones}.' },
  { id: 'pl4', titulo: 'Tarea — diario emocional', texto: 'Como hablamos en sesión, te dejo la plantilla de diario emocional. Llévala diaria 5 minutos.' },
  { id: 'pl5', titulo: 'Crisis — primera respuesta', texto: 'Te leo. Vamos a respirar juntas. Aplica 4-7-8: inhala 4, sostén 7, exhala 8. Te llamo en 5 min.' }
];

export const MOCK = { TRASPLANTES, ETAPAS, PACIENTES, HISTORIAL_P01, CITAS_HOY, TIPOS_CITA, KPIS, PIE_TRASPLANTE, BLOG_POSTS, TESTIMONIOS, SERVICIOS, ESCUELITA, MENSAJES, PLANTILLAS };

// Expose MOCK to window just in case, though ES6 imports are preferred.
if (typeof window !== 'undefined') {
  window.MOCK = MOCK;
}

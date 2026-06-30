import React, { useState } from 'react';
import logoImg from '../assets/logo2.png';
import doctorImg from '../assets/doctor.jpg';
import {
  Home,
  Calendar,
  Users,
  User,
  MessageSquare,
  Mail,
  Bell,
  Search,
  Settings,
  LogOut,
  Menu,
  X,
  Plus,
  Check,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  MoreHorizontal,
  Edit,
  Trash2,
  Filter,
  Download,
  Upload,
  Paperclip,
  Send,
  BookOpen,
  FileText,
  Image,
  Clipboard,
  Pill as PillIcon,
  Video,
  Play,
  Heart,
  Brain,
  Leaf,
  Shield,
  GraduationCap,

  Phone,
  ExternalLink,
  AlertTriangle,
  Info,

  Eye,
  Layers,
  Bookmark,
  Inbox,
  Stethoscope,
  Building2,
  Bold,
  Italic,
  List,
  Heading,
  Link,
  Zap,
  RefreshCw,
  Layout,
  Smile
} from 'lucide-react';

// Custom WhatsApp SVG Icon
export function WhatsAppIcon({ size = 18, className = '', strokeWidth = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
         className={className} aria-hidden="true">
      <path d="M3 21l1.65-4A9 9 0 1 1 8 19.5L3 21z"/>
    </svg>
  );
}



const ICONS = {
  home: Home,
  calendar: Calendar,
  users: Users,
  user: User,
  message: MessageSquare,
  whatsapp: WhatsAppIcon,
  mail: Mail,
  bell: Bell,
  search: Search,
  settings: Settings,
  logout: LogOut,
  menu: Menu,
  x: X,
  plus: Plus,
  check: Check,
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
  arrowUpRight: ArrowUpRight,
  more: MoreHorizontal,
  edit: Edit,
  trash: Trash2,
  filter: Filter,
  download: Download,
  upload: Upload,
  paperclip: Paperclip,
  send: Send,
  book: BookOpen,
  fileText: FileText,
  fileImage: Image,
  clipboard: Clipboard,
  pill: PillIcon,
  video: Video,
  play: Play,
  heart: Heart,
  brain: Brain,
  leaf: Leaf,
  shield: Shield,
  graduation: GraduationCap,

  phone: Phone,
  external: ExternalLink,
  alert: AlertTriangle,
  info: Info,

  eye: Eye,
  layers: Layers,
  bookmark: Bookmark,
  inbox: Inbox,
  stethoscope: Stethoscope,
  building: Building2,
  bold: Bold,
  italic: Italic,
  list: List,
  heading: Heading,
  link: Link,
  zap: Zap,
  refresh: RefreshCw,
  template: Layout,
  smile: Smile
};

// ---------- Icon component (maps to Lucide React) ----------
export function Icon({ name, size = 18, className = '', strokeWidth = 2 }) {
  const IconComponent = ICONS[name];
  if (!IconComponent) return <span className={className} style={{ width: size, height: size, display: 'inline-block' }} />;
  return <IconComponent size={size} className={className} strokeWidth={strokeWidth} />;
}

// ---------- Logo ----------
export function LogoMark({ size = 44, className = '' }) {
  return (
    <img src={logoImg} alt="Logo" style={{ height: size }} className={`object-contain ${className}`} />
  );
}

export function Logo({ size = 36, white = false }) {
  return (
    <div className="inline-flex items-center select-none">
      <LogoMark size={size} className={white ? 'brightness-0 invert' : ''} />
    </div>
  );
}

// ---------- Avatar ----------
export function Avatar({ initials, size = 36, tone = 'morado', ring = false, status }) {
  const tones = {
    morado:   { bg: '#E9D2EE', fg: '#5A1F6B' },
    naranja:  { bg: '#FFE9C2', fg: '#A85F00' },
    azul:     { bg: '#D6E6F0', fg: '#1F5E7C' },
    verde:    { bg: '#E0EBD0', fg: '#4B6E20' },
    rojo:     { bg: '#F8D6D2', fg: '#882318' },
    crema:    { bg: '#FFF6E6', fg: '#A85F00' }
  };
  const t = tones[tone] || tones.morado;
  return (
    <div className={`relative inline-flex items-center justify-center rounded-full font-bold flex-shrink-0 ${ring ? 'ring-2 ring-white' : ''}`}
         style={{ width: size, height: size, background: t.bg, color: t.fg, fontSize: size * 0.36 }}>
      <span>{initials}</span>
      {status && (
        <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ring-2 ring-white ${status==='online'?'bg-green-500':status==='busy'?'bg-red-500':'bg-gray-400'}`} />
      )}
    </div>
  );
}

// ---------- Pill ----------
export function Pill({ children, tone = 'morado', size = 'md', icon, dot, className = '' }) {
  const tones = {
    morado:  'bg-morado-50 text-morado-600',
    naranja: 'bg-naranja-50 text-naranja-700',
    verde:   'bg-[#E0EBD0] text-[#4B6E20]',
    rojo:    'bg-[#F8D6D2] text-[#882318]',
    azul:    'bg-[#D6E6F0] text-[#1F5E7C]',
    crema:   'bg-crema-200 text-tinta-600',
    blanco:  'bg-white text-tinta border border-morado-100'
  };
  const sizes = { sm: 'px-2 py-0.5 text-[11px]', md: 'px-2.5 py-1 text-xs', lg: 'px-3 py-1.5 text-sm' };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${tones[tone]} ${sizes[size]} ${className}`}>
      {dot && <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'currentColor' }} />}
      {icon && <Icon name={icon} size={size==='sm'?11:12} />}
      {children}
    </span>
  );
}

// ---------- Button ----------
export function Button({ children, variant='primary', size='md', icon, iconRight, onClick, type='button', className='', as='button', ...rest }) {
  const variants = {
    primary:   'bg-morado text-white hover:bg-morado-600 shadow-soft',
    naranja:   'bg-naranja text-white hover:bg-naranja-600 shadow-soft',
    soft:      'bg-morado-50 text-morado-600 hover:bg-morado-100',
    softWarm:  'bg-naranja-50 text-naranja-700 hover:bg-naranja-100',
    ghost:     'text-morado-600 hover:bg-morado-50',
    outline:   'border-2 border-morado-200 text-morado-600 hover:bg-morado-50 hover:border-morado-300',
    outlineWhite: 'border-2 border-white/40 text-white hover:bg-white/10',
    danger:    'bg-[#C0392B] text-white hover:bg-[#a32d20]',
    white:     'bg-white text-tinta hover:bg-crema border border-crema-200 shadow-soft'
  };
  const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2.5 text-sm', lg: 'px-6 py-3.5 text-base' };
  const Cmp = as === 'a' ? 'a' : 'button';
  return (
    <Cmp type={as==='a'?undefined:type} onClick={onClick}
         className={`inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-200 active:scale-[0.98] whitespace-nowrap ${variants[variant]} ${sizes[size]} ${className}`}
         {...rest}>
      {icon && <Icon name={icon} size={size==='lg'?18:16} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size==='lg'?18:16} />}
    </Cmp>
  );
}

// ---------- Card ----------
export function Card({ children, className = '', interactive = false, padding = 'p-6' }) {
  const hasBg = className.includes('bg-');
  return (
    <div className={`${hasBg ? '' : 'bg-white'} rounded-2xl shadow-soft ${padding} ${interactive ? 'hover:shadow-card transition-shadow duration-200' : ''} ${className}`}>
      {children}
    </div>
  );
}

// ---------- WhatsApp floating ----------
export function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="anim-fade-up bg-white rounded-2xl shadow-pop p-4 mb-3 w-72 border border-crema-200 text-left">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-white">
              <Icon name="whatsapp" size={18} />
            </div>
            <div>
              <div className="font-bold text-sm">Lic. Xenia Lorena López Martínez</div>
              <div className="text-xs text-tinta-400">Responde en ~15 min</div>
            </div>
          </div>
          <p className="text-sm text-tinta-600 mb-3">Hola, soy la Lic. Xenia. ¿En qué puedo acompañarte hoy?</p>
          <Button variant="primary" size="sm" icon="whatsapp" className="w-full !bg-[#25D366] hover:!bg-[#1da851]" onClick={() => window.open('https://wa.me/525544211198', '_blank')}>
            Iniciar conversación
          </Button>
        </div>
      )}
      <button onClick={() => setOpen(o => !o)}
              className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-pop hover:scale-105 transition-transform flex items-center justify-center relative">
        <Icon name={open ? 'x' : 'whatsapp'} size={26} />
        {!open && <span className="absolute -top-1 -right-1 w-4 h-4 bg-naranja text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-crema">1</span>}
      </button>
    </div>
  );
}

export function DoctorPortrait({ className = '' }) {
  return (
    <img src={doctorImg} alt="Dra. Xenia Lorena López Martínez" className={`object-cover object-top rounded-3xl aspect-[3/4] ${className}`} />
  );
}

// ---------- Illustrated blog cover ----------
export function BlogCover({ seed = 0 }) {
  const variants = [
    // 0 — bubble cluster
    <>
      <rect width="400" height="240" fill="#FFE9C2"/>
      <circle cx="80"  cy="80"  r="56" fill="#7B2D8E"/>
      <circle cx="160" cy="140" r="42" fill="#F39200"/>
      <circle cx="240" cy="100" r="48" fill="#9A4DB0"/>
      <circle cx="320" cy="160" r="38" fill="#F39200" opacity=".7"/>
      <circle cx="120" cy="190" r="22" fill="#FFB845"/>
    </>,
    // 1 — wave
    <>
      <rect width="400" height="240" fill="#FFF8F0"/>
      <path d="M0 160 C 80 120 160 200 240 140 S 400 100 400 140 L400 240 L0 240 Z" fill="#F39200"/>
      <path d="M0 180 C 80 140 160 220 240 160 S 400 120 400 160 L400 240 L0 240 Z" fill="#7B2D8E" opacity=".85"/>
      <circle cx="320" cy="70" r="28" fill="#FFB845"/>
    </>,
    // 2 — heart
    <>
      <rect width="400" height="240" fill="#E9D2EE"/>
      <path d="M200 200 C 140 160 100 130 100 100 C 100 70 130 60 150 60 C 175 60 200 90 200 90 C 200 90 225 60 250 60 C 270 60 300 70 300 100 C 300 130 260 160 200 200 Z" fill="#7B2D8E"/>
      <circle cx="340" cy="50" r="20" fill="#F39200"/>
      <circle cx="60" cy="180" r="16" fill="#F39200"/>
    </>,
    // 3 — book/leaves
    <>
      <rect width="400" height="240" fill="#FFF8F0"/>
      <rect x="120" y="60" width="160" height="130" rx="8" fill="#7B2D8E"/>
      <rect x="135" y="70" width="60" height="110" fill="#9A4DB0"/>
      <path d="M70 200 C 60 160 80 130 130 130" stroke="#F39200" strokeWidth="6" fill="none"/>
      <circle cx="70" cy="200" r="10" fill="#F39200"/>
      <path d="M330 200 C 340 160 320 130 270 130" stroke="#F39200" strokeWidth="6" fill="none"/>
      <circle cx="330" cy="200" r="10" fill="#F39200"/>
    </>,
    // 4 — sunrise
    <>
      <rect width="400" height="240" fill="#7B2D8E"/>
      <circle cx="200" cy="240" r="120" fill="#F39200"/>
      <circle cx="200" cy="240" r="80" fill="#FFB845"/>
      <path d="M0 200 L 60 180 L 130 195 L 200 175 L 270 195 L 340 175 L 400 200 L 400 240 L 0 240 Z" fill="#5A1F6B"/>
    </>,
    // 5 — family
    <>
      <rect width="400" height="240" fill="#FFE9C2"/>
      <circle cx="130" cy="110" r="36" fill="#7B2D8E"/>
      <circle cx="200" cy="120" r="44" fill="#F39200"/>
      <circle cx="280" cy="115" r="38" fill="#9A4DB0"/>
      <path d="M70 240 C 80 200 110 180 130 180 C 150 180 180 200 190 240 Z" fill="#7B2D8E"/>
      <path d="M140 240 C 150 200 180 175 200 175 C 220 175 250 200 260 240 Z" fill="#F39200"/>
      <path d="M220 240 C 230 200 260 180 280 180 C 300 180 330 200 340 240 Z" fill="#9A4DB0"/>
    </>
  ];
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" className="w-full h-full block">
      {variants[seed % variants.length]}
    </svg>
  );
}

// ---------- Section divider with bubble ----------
export function BubbleDecor({ className = '', count = 5 }) {
  const bubs = [
    { cx: 30,  cy: 40,  r: 16, c: '#F39200', o: .8 },
    { cx: 90,  cy: 20,  r: 10, c: '#7B2D8E', o: .9 },
    { cx: 150, cy: 50,  r: 22, c: '#9A4DB0', o: .8 },
    { cx: 220, cy: 30,  r: 14, c: '#F39200', o: .7 },
    { cx: 280, cy: 60,  r: 18, c: '#7B2D8E', o: .85 }
  ].slice(0, count);
  return (
    <svg viewBox="0 0 320 80" className={className} aria-hidden="true">
      {bubs.map((b,i) => <circle key={i} cx={b.cx} cy={b.cy} r={b.r} fill={b.c} opacity={b.o}/>)}
    </svg>
  );
}



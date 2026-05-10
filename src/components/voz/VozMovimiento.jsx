import { useState, useEffect, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function VozMovimiento() {

  const [pos, setPos] = useState({ x: 300, y: 300 });
  const [velocidad, setVelocidad] = useState(20);
  const [ultimoComando, setUltimoComando] = useState('—');
  const [direccion, setDireccion] = useState(null);
  const intervalRef = useRef(null);

  const PASO_LENTO = 10;
  const PASO_NORMAL = 20;
  const PASO_RAPIDO = 40;

  const commands = [
    { command: 'arriba',    callback: () => { setUltimoComando('arriba');    setDireccion('arriba'); } },
    { command: 'abajo',     callback: () => { setUltimoComando('abajo');     setDireccion('abajo'); } },
    { command: 'izquierda', callback: () => { setUltimoComando('izquierda'); setDireccion('izquierda'); } },
    { command: 'derecha',   callback: () => { setUltimoComando('derecha');   setDireccion('derecha'); } },
    { command: 'para',     callback: () => { setUltimoComando('parar');     setDireccion(null); } },
    { command: 'rápido',    callback: () => { setUltimoComando('rapido');    setVelocidad(PASO_RAPIDO); } },
    { command: 'lento',     callback: () => { setUltimoComando('lento');     setVelocidad(PASO_LENTO); } },
    { command: 'normal',    callback: () => { setUltimoComando('normal');    setVelocidad(PASO_NORMAL); } },
    { command: 'supercalifragilisticoespialidoso', callback: () => { setUltimoComando('reiniciar'); setDireccion(null); setVelocidad(PASO_NORMAL); setPos({ x: 300, y: 300 }); } },
  ];

  const { transcript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (direccion) {
      intervalRef.current = setInterval(() => {
        setPos(prev => {
          let { x, y } = prev;
          if (direccion === 'arriba')    y = Math.max(0, y - velocidad);
          if (direccion === 'abajo')     y = Math.min(window.innerHeight - 80, y + velocidad);
          if (direccion === 'izquierda') x = Math.max(0, x - velocidad);
          if (direccion === 'derecha')   x = Math.min(window.innerWidth - 80, x + velocidad);
          return { x, y };
        });
      }, 100);
    }
    return () => clearInterval(intervalRef.current);
  }, [direccion, velocidad]);

  if (!browserSupportsSpeechRecognition) {
    return <p>Tu navegador no soporta reconocimiento de voz. Usa Chrome.</p>;
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#0a0a1a' }}>

      <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 10, background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '16px 20px', color: 'white', minWidth: 220 }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 16 }}>Control por voz</h3>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <button onClick={() => SpeechRecognition.startListening({ continuous: true, language: 'es-ES' })}
            style={{ background: '#0a3aa1', color: 'white', border: 'none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer' }}>
            Iniciar
          </button>
          <button onClick={SpeechRecognition.stopListening}
            style={{ background: '#cfc52e', color: 'white', border: 'none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer' }}>
            Parar
          </button>
        </div>
        <p style={{ margin: '4px 0', fontSize: 13, color: listening ? '#22c55e' : '#ef4444' }}>
          {listening ? 'Escuchando...' : 'Microfono apagado'}
        </p>
        <p style={{ margin: '4px 0', fontSize: 13 }}>Ultimo comando: <strong>{ultimoComando}</strong></p>
        <p style={{ margin: '4px 0', fontSize: 12, color: '#aaa' }}>Transcript: {transcript || '...'}</p>
        <p style={{ margin: '4px 0', fontSize: 12, color: '#aaa' }}>
          Velocidad: {velocidad === PASO_LENTO ? 'lenta' : velocidad === PASO_RAPIDO ? 'rapida' : 'normal'}
        </p>
      </div>

      <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 10, background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '16px 20px', color: 'white', fontSize: 13 }}>
        <p style={{ margin: '0 0 8px', fontWeight: 'bold' }}>Comandos:</p>
        {['arriba', 'abajo', 'izquierda', 'derecha', 'parar', 'rapido', 'lento', 'normal', 'supercalifragilisticoespialidoso'].map(cmd => (
          <p key={cmd} style={{ margin: '2px 0', color: '#ccc' }}>• {cmd}</p>
        ))}
      </div>

      <div style={{ position: 'absolute', left: pos.x, top: pos.y, fontSize: 48, transition: 'left 0.1s, top 0.1s', userSelect: 'none' }}>
        :o
      </div>

    </div>
  );
}
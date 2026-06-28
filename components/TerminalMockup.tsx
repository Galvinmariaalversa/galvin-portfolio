'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export const TerminalMockup = () => {
  const [copied, setCopied] = useState(false);

  const codeText = `const developer = {
  name: 'Galvin J',
  role: 'Freelance Developer',
  location: 'Chennai, TN',
  education: {
    degree: 'BSc CS',
    college: 'MCC',
    gradYear: 2026
  },
  stack: ['React.js', 'Next.js', 'TypeScript'],
  focus: ['Responsive UX', 'Clean Code']
};

// Building modern web apps...
console.log(developer.stack);`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="w-full glass-card rounded-2xl overflow-hidden shadow-2xl border border-gray-800 relative group/terminal">
      {/* Terminal Header */}
      <div className="bg-darkGray px-4 py-3 border-b border-gray-800/80 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
          <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
        </div>
        <span className="text-xs text-gray-400 font-mono">galvin-j.js</span>
        
        {/* Clipboard Copy Action Button */}
        <button 
          onClick={handleCopy}
          className="text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none cursor-pointer"
          aria-label="Copy Code to Clipboard"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-400 animate-scale" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Terminal Code Body */}
      <div className="p-6 font-mono text-sm leading-relaxed text-purple-300 flex">
        {/* Gutter Line Numbers */}
        <div className="text-gray-600 select-none text-right pr-4 border-r border-gray-850 flex flex-col gap-0.5 shrink-0" id="terminal-gutter">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
          <span>10</span>
          <span>11</span>
          <span>12</span>
          <span>13</span>
          <span>14</span>
          <span>15</span>
        </div>
        
        {/* Code Lines */}
        <div className="pl-4 flex flex-col gap-0.5 overflow-x-auto no-scrollbar" id="terminal-code-lines">
          <p><span className="text-blue-400">const</span> developer = {"{"}</p>
          <p className="pl-4"><span className="text-gray-400">name:</span> <span className="text-emerald-400">{"'Galvin J'"}</span>,</p>
          <p className="pl-4"><span className="text-gray-400">role:</span> <span className="text-emerald-400">{"'Freelance Developer'"}</span>,</p>
          <p className="pl-4"><span className="text-gray-400">location:</span> <span className="text-emerald-400">{"'Chennai, TN'"}</span>,</p>
          <p className="pl-4"><span className="text-gray-400">education:</span> {"{"}</p>
          <p className="pl-8"><span className="text-gray-400">degree:</span> <span className="text-emerald-400">{"'BSc CS'"}</span>,</p>
          <p className="pl-8"><span className="text-gray-400">college:</span> <span className="text-emerald-400">{"'MCC'"}</span>,</p>
          <p className="pl-8"><span className="text-gray-400">gradYear:</span> <span className="text-amber-400">2026</span></p>
          <p className="pl-4">{"}"},</p>
          <p className="pl-4"><span className="text-gray-400">stack:</span> [<span className="text-emerald-400">{"'React.js'"}</span>, <span className="text-emerald-400">{"'Next.js'"}</span>, <span className="text-emerald-400">{"'TypeScript'"}</span>]</p>
          <p className="pl-4"><span className="text-gray-400">focus:</span> [<span className="text-emerald-400">{"'Responsive UX'"}</span>, <span className="text-emerald-400">{"'Clean Code'"}</span>]</p>
          <p>{"}"};</p>
          <p className="text-gray-400 mt-2">{"// Building modern web apps..."}</p>
          <p><span className="text-purple-400">console</span>.log(developer.stack);</p>
        </div>
      </div>
    </div>
  );
};

export default TerminalMockup;

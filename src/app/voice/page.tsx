'use client';

import { useEffect, useState } from 'react';
import Breadcrumb from '@/components/ui/Breadcrumb';

interface CustomerVoiceData {
  id: string;
  customerName: string;
  location?: string;
  propertyType?: string;
  date?: string;
  content: string;
}

function VoiceItem({ voice }: { voice: CustomerVoiceData }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-lg">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
      >
        <div>
          <h3 className="font-bold text-lg">{voice.customerName}</h3>
          <div className="flex gap-4 text-sm text-gray-500 mt-1">
            {voice.location && <span>{voice.location}</span>}
            {voice.propertyType && <span>{voice.propertyType}</span>}
            {voice.date && <span>{voice.date}</span>}
          </div>
        </div>
        <span className="text-2xl text-gray-400 flex-shrink-0 ml-4">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="px-6 pb-6">
          <div
            className="prose max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: voice.content }}
          />
        </div>
      )}
    </div>
  );
}

export default function VoicePage() {
  const [voices, setVoices] = useState<CustomerVoiceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/voices')
      .then((res) => res.json())
      .then((data) => {
        setVoices(data.contents || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'お客様の声' }]} />
      <h1 className="text-3xl font-bold mb-8">お客様の声</h1>

      {loading ? (
        <p className="text-center text-gray-500 py-12">読み込み中...</p>
      ) : voices.length > 0 ? (
        <div className="max-w-3xl mx-auto space-y-4">
          {voices.map((voice) => (
            <VoiceItem key={voice.id} voice={voice} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-12">
          お客様の声はまだありません
        </p>
      )}
    </div>
  );
}

import CardProperty from '@/components/ui/card/CardProperty';
import CardStory from '@/components/ui/card/CardStory';
import CardVoice from '@/components/ui/card/CardVoice';
import { mockProperties, mockStories, mockCustomerVoices } from '@/lib/mock/data';

export default function ComponentsPreview() {
  const defaultProp = mockProperties[0]; // Available property
  const soldPropBase = mockProperties.find((p) => p.status === 'sold') || mockProperties[4];
  const soldProp = { ...soldPropBase, story: mockStories[0] };
  const story = mockStories[0];
  const voice = mockCustomerVoices[0];

  return (
    <div className="bg-white min-h-screen">
      <div className="px-10 py-20">
        <h1 className="font-mincho text-[3rem] leading-[1.5] mb-4">Components</h1>

        {/* ===== Property Cards ===== */}
        <section className="mt-20">
          <h2 className="font-gothic font-medium text-[1.5rem] mb-8 border-b border-dark-green/20 pb-4">
            card-property
          </h2>
          <div className="flex gap-10 flex-wrap">
            {/* Default */}
            <div>
              <p className="text-sm text-gray-400 mb-4">Property 1=Default</p>
              <CardProperty property={defaultProp} />
            </div>
            {/* Signed */}
            <div>
              <p className="text-sm text-gray-400 mb-4">Property 1=Signed</p>
              <CardProperty property={soldProp} />
            </div>
          </div>
        </section>

        {/* ===== Story Cards ===== */}
        <section className="mt-20">
          <h2 className="font-gothic font-medium text-[1.5rem] mb-8 border-b border-dark-green/20 pb-4">
            card-story
          </h2>
          <div className="flex gap-10 flex-wrap items-start">
            {/* Large */}
            <div>
              <p className="text-sm text-gray-400 mb-4">card-story-l</p>
              <CardStory story={story} size="l" />
            </div>
            {/* Medium */}
            <div>
              <p className="text-sm text-gray-400 mb-4">card-story-m</p>
              <CardStory story={story} size="m" />
            </div>
            {/* Small */}
            <div>
              <p className="text-sm text-gray-400 mb-4">card-story-s</p>
              <CardStory story={story} size="s" />
            </div>
          </div>
        </section>

        {/* ===== Voice Card ===== */}
        <section className="mt-20">
          <h2 className="font-gothic font-medium text-[1.5rem] mb-8 border-b border-dark-green/20 pb-4">
            card-voice
          </h2>
          <div>
            <p className="text-sm text-gray-400 mb-4">card-voice</p>
            <CardVoice voice={voice} />
          </div>
        </section>
      </div>
    </div>
  );
}

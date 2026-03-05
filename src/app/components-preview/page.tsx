import PropertyCard from '@/components/property/PropertyCard';
import StoryCard from '@/components/story/StoryCard';
import VoiceCard from '@/components/voice/VoiceCard';
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
        <h1 className="font-mincho text-[48px] leading-[1.5] mb-4">Components</h1>

        {/* ===== Property Cards ===== */}
        <section className="mt-20">
          <h2 className="font-gothic font-medium text-[24px] mb-8 border-b border-dark-green/20 pb-4">
            card-property
          </h2>
          <div className="flex gap-10 flex-wrap">
            {/* Default */}
            <div>
              <p className="text-sm text-gray-400 mb-4">Property 1=Default</p>
              <PropertyCard property={defaultProp} />
            </div>
            {/* Signed */}
            <div>
              <p className="text-sm text-gray-400 mb-4">Property 1=Signed</p>
              <PropertyCard property={soldProp} />
            </div>
          </div>
        </section>

        {/* ===== Story Cards ===== */}
        <section className="mt-20">
          <h2 className="font-gothic font-medium text-[24px] mb-8 border-b border-dark-green/20 pb-4">
            card-story
          </h2>
          <div className="flex gap-10 flex-wrap items-start">
            {/* Large */}
            <div>
              <p className="text-sm text-gray-400 mb-4">card-story-l</p>
              <StoryCard story={story} size="l" />
            </div>
            {/* Medium */}
            <div>
              <p className="text-sm text-gray-400 mb-4">card-story-m</p>
              <StoryCard story={story} size="m" />
            </div>
            {/* Small */}
            <div>
              <p className="text-sm text-gray-400 mb-4">card-story-s</p>
              <StoryCard story={story} size="s" />
            </div>
          </div>
        </section>

        {/* ===== Voice Card ===== */}
        <section className="mt-20">
          <h2 className="font-gothic font-medium text-[24px] mb-8 border-b border-dark-green/20 pb-4">
            card-voice
          </h2>
          <div>
            <p className="text-sm text-gray-400 mb-4">card-voice</p>
            <VoiceCard voice={voice} />
          </div>
        </section>
      </div>
    </div>
  );
}

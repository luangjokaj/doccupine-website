import { Metadata } from "next";
import { Docs } from "@/components/Docs";
import config from "@/config.json";

const content = `# Images and embeds
Enrich your documentation with visuals, videos, and interactive embeds.

Display images, embed video content, or add interactive frames via iframes to supplement your docs.

![Demo Image](https://doccupine.com/demo.png)

## Images
Images enhance documentation with context, illustration, or decorative visual cues.

### Basic Image Syntax
Include an image in Markdown using the syntax below:

\`\`\`md
![Alt text](https://doccupine.com/demo.png)
\`\`\`

<Callout type="note">
  Use clear, descriptive alt text for accessibility and better SEO. Alt text should describe the image’s appearance or content.
</Callout>

### HTML image embeds
Embed images in your Markdown content using HTML syntax.

\`\`\`md
<img src="https://doccupine.com/demo.png" alt="Alt text">
\`\`\`

## Videos
Videos add a dynamic element to your documentation, engaging your audience and providing a more immersive experience.

### YouTube Embed
To embed a YouTube video, use the following syntax:

\`\`\`html
<iframe
  className="aspect-video"
  src="https://www.youtube.com/embed/ResP_eVPYQo"
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
\`\`\`

<iframe
  className="aspect-video"
  src="https://www.youtube.com/embed/ResP_eVPYQo"
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>

### Self-hosted videos
Serve up your own video content using the \`<video>\` tag:

\`\`\`html
<video
  controls
  className="aspect-video"
  src="https://samplelib.com/lib/preview/mp4/sample-20s.mp4"
></video>
\`\`\`

<video
  controls
  className="aspect-video"
  src="https://samplelib.com/lib/preview/mp4/sample-20s.mp4"
></video>


#### Autoplay and Looping
For demonstration videos that loop or start automatically, add attributes as shown:

\`\`\`html
<video
  controls
  className="aspect-video"
  src="https://samplelib.com/lib/preview/mp4/sample-20s.mp4"
  autoPlay
  muted
  loop
  playsInline
></video>
\`\`\`
`;

export const metadata: Metadata = {
  title: `Images and embeds ${config.name ? "- " + config.name : "- Doccupine"}`,
  description: `Enrich your documentation with visuals, videos, and interactive embeds.`,
  icons: `${config.icon || 'https://doccupine.com/favicon.ico'}`,
  openGraph: {
    title: `Images and embeds ${config.name ? "- " + config.name : "- Doccupine"}`,
    description: `Enrich your documentation with visuals, videos, and interactive embeds.`,
    images: `${config.preview || 'https://doccupine.com/preview.png'}`,
  },
};

export default function Page() {
  return <Docs content={content} />;
}

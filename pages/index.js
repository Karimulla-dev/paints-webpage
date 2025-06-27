import PaintCard from "@/components/PaintCard";
import { createClient } from "contentful";

export async function getStaticProps() {
  console.log("--- Executing getStaticProps for pages/index.js ---");
  console.log("  INDEX PAGE - CONTENTFUL_SPACE_ID:", process.env.CONTENTFUL_SPACE_ID ? "Loaded" : "UNDEFINED/EMPTY");
  console.log("  INDEX PAGE - CONTENTFUL_ACCESS_KEY:", process.env.CONTENTFUL_ACCESS_KEY ? "Loaded" : "UNDEFINED/EMPTY");

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  try {
    const paintRes = await client.getEntries({ content_type: 'paint' });
    const settingsRes = await client.getEntries({ content_type: 'siteSettings', limit: 1 });

    console.log("SUCCESS: Fetched paint and siteSettings entries for index page.");

    return {
      props: {
        paints: paintRes.items,
        siteSettings: settingsRes.items[0] ?? null,
      },
      revalidate: 1,
    };
  } catch (error) {
    console.error("ERROR: Failed to fetch entries for index page.", error);
    return {
      props: {
        paints: [],
        siteSettings: null,
      },
      revalidate: 1,
    };
  }
}

export default function Home({ paints }) {
  return (
    <div className="paint-list">
      <h1>All Dulux Paints</h1>
      {paints.length === 0 ? (
        <p>No paints found. Check Contentful or API keys.</p>
      ) : (
        <div className="paint-grid">
          {paints.map(paint => (
            <PaintCard key={paint.sys.id} paint={paint} />
          ))}
        </div>
      )}

      <style jsx>{`
        .paint-list {
          padding: 40px 20px;
          text-align: center;
          background-color: #fdfdfd;
          min-height: 100vh;
        }

        .paint-list h1 {
          color: #1a1a1a;
          margin-bottom: 40px;
          font-size: 2.8em;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .paint-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
          justify-content: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        .paint-list p {
          font-size: 1.2em;
          color: #666;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}

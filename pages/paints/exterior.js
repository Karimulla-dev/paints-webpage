import PaintCard from "@/components/PaintCard";
import { createClient } from "contentful";

export async function getStaticProps() {
    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_KEY,
    });

    const res = await client.getEntries({
        content_type: 'paint',
        'fields.type': 'Exterior'
    });

    return {
        props: {
            paints: res.items,
        },
        revalidate: 1,
    };
}

export default function ExteriorPaints({ paints }) {
    return (
        <div className="paint-list">
            <h1>Dulux Exterior Paints</h1>
            {paints.length === 0 ? (
                <p>No exterior paints found.</p>
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
                    background-color: #f9f9f9;
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

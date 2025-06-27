import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import { useRouter } from 'next/router';
import PaintCard from '@/components/PaintCard';

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export async function getStaticPaths() {
    const res = await client.getEntries({ content_type: 'paint' });
    const paths = res.items.map(item => ({
        params: { slug: item.fields.slug }
    }));

    return {
        paths,
        fallback: true
    };
}

export async function getStaticProps({ params }) {
    const res = await client.getEntries({
        content_type: 'paint',
        'fields.slug': params.slug
    });

    const relatedRes = await client.getEntries({
        content_type: 'paint',
        limit: 4
    });

    return {
        props: {
            paint: res.items[0],
            relatedPaints: relatedRes.items
        },
        revalidate: 1
    };
}

export default function PaintDetails({ paint, relatedPaints }) {
    const router = useRouter();

    if (router.isFallback) {
        return <div className="loading-message">Loading paint details...</div>;
    }

    if (!paint || !paint.fields) {
        return <div className="not-found-message">Paint data not found.</div>;
    }

    const {
        featuredImage,
        paintName,
        type,
        description,
        colorsAvailable,
        finish,
        coverage,
        dryingTime,
        productBenefits,
        price
    } = paint.fields;

    const imageUrl = featuredImage?.fields?.file?.url ? 'https:' + featuredImage.fields.file.url : null;
    const imageAlt = featuredImage?.fields?.title || paintName;

    return (
        <div className="paint-details-page">
            <div className="layout-grid">
                <div className="left-image">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={imageAlt}
                            width={500}
                            height={500}
                            objectFit="contain"
                            priority
                        />
                    ) : (
                        <div className="no-image">
                            <h2>{paintName}</h2>
                            <p>No image available</p>
                        </div>
                    )}
                </div>

                <div className="right-details">
                    <h1>{paintName}</h1>
                    <p className="price">₹{price?.toFixed(2) ?? 'N/A'}</p>

                    <div className="info">
                        {type && <p><strong>Type:</strong> {type}</p>}
                        {colorsAvailable && <p><strong>Colors Available:</strong> {colorsAvailable}</p>}
                        {finish && <p><strong>Finish:</strong> {finish}</p>}
                        {coverage && <p><strong>Coverage:</strong> {coverage} m²/litre</p>}
                        {dryingTime && <p><strong>Drying Time:</strong> {dryingTime}</p>}
                    </div>

                    {productBenefits?.nodeType === 'document' && (
                        <div className="section">
                            <h3>Product Benefits</h3>
                            <div className="rich-text">
                                {documentToReactComponents(productBenefits)}
                            </div>
                        </div>
                    )}

                    {description?.nodeType === 'document' && (
                        <div className="section">
                            <h3>Description</h3>
                            <div className="rich-text">
                                {documentToReactComponents(description)}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="related-section">
                <h2>Related Products</h2>
                <div className="related-grid">
                    {relatedPaints.map(p => (
                        <PaintCard key={p.sys.id} paint={p} />
                    ))}
                </div>
            </div>

            <style jsx>{`
                .paint-details-page {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 40px 20px;
                    font-family: 'Segoe UI', sans-serif;
                    background-color: #fff;
                }

                .layout-grid {
                    display: flex;
                    gap: 40px;
                    margin-bottom: 60px;
                }

                .left-image {
                    flex: 1;
                    position: sticky;
                    top: 40px;
                    height: fit-content;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #f5f5f5;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                    padding: 20px;
                }

                .right-details {
                    flex: 2;
                    overflow-y: auto;
                }

                h1 {
                    font-size: 2.5em;
                    color: #0056b3;
                    margin-bottom: 10px;
                }

                .price {
                    font-size: 1.5em;
                    color: #007bff;
                    font-weight: 600;
                    margin-bottom: 20px;
                }

                .info p {
                    font-size: 1.1em;
                    margin: 8px 0;
                    color: #333;
                }

                .section {
                    background-color: #f9f9f9;
                    padding: 20px;
                    border-radius: 8px;
                    margin-top: 30px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                }

                .section h3 {
                    font-size: 1.4em;
                    margin-bottom: 10px;
                    color: #333;
                }

                .rich-text {
                    font-size: 1em;
                    line-height: 1.6;
                    color: #444;
                }

                .related-section {
                    margin-top: 60px;
                }

                .related-section h2 {
                    font-size: 2em;
                    margin-bottom: 30px;
                    text-align: center;
                    color: #2c2c2c;
                }

                .related-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 30px;
                }

                .no-image {
                    text-align: center;
                    padding: 40px;
                    background-color: #eee;
                    border-radius: 8px;
                }
            `}</style>
        </div>
    );
}

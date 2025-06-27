import Image from 'next/image';
import Link from 'next/link';

export default function PaintCard({ paint }) {
  if (!paint || !paint.fields) return null;

  const { paintName, slug, featuredImage, price } = paint.fields;
  const imageUrl =
    featuredImage &&
    featuredImage.fields &&
    featuredImage.fields.file &&
    featuredImage.fields.file.url
      ? 'https:' + featuredImage.fields.file.url
      : null;
  const imageAlt =
    featuredImage &&
    featuredImage.fields &&
    featuredImage.fields.title
      ? featuredImage.fields.title
      : paintName;

  return (
    <Link href={`/paints/${slug}`} passHref>
      <div className="paint-card">
        <div className="image-container">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              style={{ objectFit: 'cover' }}
              className="image"
              priority
            />
          ) : (
            <div className="no-image-placeholder">
              <span>No Image</span>
            </div>
          )}
        </div>
        <h3>{paintName}</h3>
        <p className="price">₹{price?.toFixed(2) ?? 'N/A'}</p>

        <style jsx>{`
          .paint-card {
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            overflow: hidden;
            margin: 15px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            background-color: #fff;
            cursor: pointer;
            max-width: 320px;
          }

          .paint-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
          }

          .image-container {
            position: relative;
            width: 100%;
            height: 300px;
            background-color: #f9f9f9;
          }

          .no-image-placeholder {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #ececec;
            color: #999;
            font-size: 1.1em;
            font-weight: 500;
          }

          h3 {
            padding: 12px 12px 4px;
            font-size: 1.3em;
            text-align: center;
            color: #2c2c2c;
            font-weight: 600;
            margin: 0;
          }

          .price {
            font-size: 1.1em;
            color: #007bff;
            font-weight: 500;
            text-align: center;
            margin-bottom: 12px;
          }
        `}</style>
      </div>
    </Link>
  );
}
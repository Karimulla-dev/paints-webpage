import { useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

export default function Custom404() { // Renamed to Custom404
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/')
        }, 4000)
        return () => clearTimeout(timer); // Clear timeout on component unmount
    }, [router])

    return (
        <div className="not-found-container">
            <div className="not-found">
                <h1>404</h1>
                <h2>Oops! That page cannot be found</h2>
                <p>Go back to the <Link href="/">Homepage</Link></p>
                <p>Redirecting you to the homepage in 4 seconds...</p>
            </div>
            <style jsx>{`
                .not-found-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: calc(100vh - 200px); /* Adjust based on header/footer height */
                    padding: 20px;
                }
                .not-found {
                    background: #fff;
                    padding: 50px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1); /* Softer shadow */
                    border-radius: 10px;
                    text-align: center;
                    transform: rotateZ(-1deg); /* Keep the slight rotation */
                }
                h1 {
                    font-size: 5em; /* Larger 404 */
                    margin-bottom: 10px;
                    color: #e74c3c; /* Red for error */
                }
                h2 {
                    font-size: 1.8em;
                    color: #555;
                    margin-bottom: 20px;
                }
                p {
                    font-size: 1.1em;
                    color: #777;
                }
                p a {
                    color: #007bff;
                    text-decoration: underline;
                }
                p a:hover {
                    color: #0056b3;
                }
            `}</style>
        </div>
    )
}
"use client";

/**
 * Keeps the page side-gutters plain white on every page.
 * (The home-only mesh gradient now lives in PageBackground.)
 */
const PageShell = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-white">
            <div className="mx-4 min-h-screen bg-white sm:mx-8 lg:mx-16 xl:mx-24">
                {children}
            </div>
        </div>
    );
};

export default PageShell;
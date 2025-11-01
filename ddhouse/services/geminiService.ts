export const generateDescription = async (keywords: string): Promise<string> => {
    try {
        const response = await fetch('/api/generate-description', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ keywords }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to generate description');
        }

        return data.description;
    } catch (error) {
        console.error("Error calling generation API:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        return `Failed to generate description. Please try again. (${errorMessage})`;
    }
};

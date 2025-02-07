document.addEventListener("DOMContentLoaded", function () {
    // Ensure the button is connected properly
    document.getElementById("generateBtn").addEventListener("click", generateTemplate);
});

async function generateTemplate() {
    const templateType = document.getElementById("templateType").value;
    const goal = document.getElementById("goal").value;
    const tone = document.getElementById("tone").value;

    const apiUrl = 'https://templategeneration.netlify.app/generate'; // Ensure backend is running

    try {
        console.log("Sending request to server:", { templateType, goal, tone });

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ templateType, goal, tone })
        });

        console.log("Response status:", response.status);

        const data = await response.json();
        console.log("Response data:", data);

        if (response.ok) {
            document.getElementById("templateOutput").innerText = data.template;
        } else {
            document.getElementById("templateOutput").innerText = "Error generating template.";
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById("templateOutput").innerText = "Failed to connect to the server. Please try again.";
    }
}

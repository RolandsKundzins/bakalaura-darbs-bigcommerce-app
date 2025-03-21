export default function handler(req, res) {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins (for testing)
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end(); // Handle preflight requests
    } else if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { parcel } = req.body;
    if (!parcel) {
        return res.status(400).json({ error: "Parcel selection is required" });
    }

    // eslint-disable-next-line no-console
    console.log("Selected Parcel:", parcel); // Logs to the server console

    return res.status(200).json({ message: "Parcel saved successfully" });
}

import { onSchedule } from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";
import * as sgMail from "@sendgrid/mail";
import axios from "axios";
import * as functions from "firebase-functions";

admin.initializeApp();
sgMail.setApiKey(functions.config().sendgrid.key); // Set via `firebase functions:config:set`

export const sendDailyEmails = onSchedule({
    schedule: "every 24 hours",
    timeZone: "Etc/UTC"
}, async (event) => {
    const usersSnapshot = await admin.firestore().collection("users").get();

    for (const doc of usersSnapshot.docs) {
        const user = doc.data();
        const email = user.email;
        const preferences = user.preferences.tags || [];

        const matchingArticles = await fetchArticlesForPreferences(preferences);

        if (matchingArticles.length > 0) {
            const htmlContent = generateCardEmailTemplate(matchingArticles);
            await sgMail.send({
                to: email,
                from: "your@email.com",
                subject: "Your Daily News Digest",
                html: htmlContent,
            });
        }
    }
});

const fetchArticlesForPreferences = async (preferences: string[]) => {
    const apiKey = functions.config().newsapi.key;
    const queries = preferences.map((tag) =>
        axios.get(`https://newsapi.org/v2/everything?q=${tag}&apiKey=${apiKey}`)
    );

    const responses = await Promise.all(queries);
    return responses.flatMap((res) => res.data.articles.slice(0, 2)); // limit per tag
};

const generateCardEmailTemplate = (articles: any[]) => {
    return `
    <div style="font-family: sans-serif; padding: 20px;">
      <h2>📰 Your Personalized News</h2>
      ${articles
            .map(
                (article) => `
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 12px; margin-bottom: 20px;">
          <img src="${article.urlToImage}" alt="" style="width: 100%; border-radius: 6px;" />
          <h3 style="margin: 12px 0 6px;">${article.title}</h3>
          <p>${article.description || "No description available."}</p>
          <a href="${article.url}" style="color: #1d4ed8;">Read more →</a>
        </div>
      `
            )
            .join("")}
    </div>
  `;
};

const contentful = require("contentful");

async function main() {
    try {
        const client = contentful.createClient({
            space      : "421w0fsh4dri",
            accessToken: "7HOOTT94pK3MmaosD5X6_ypZiw1tfRIDg1XTmI-BDJY",
        });

        const entry = await client.getEntry("content-7e39HKmHWNxOH8r47UwETh");

        console.log(entry);

        return {
            title      : entry.fields.title,
            description: entry.fields.description,
            thumbnail  : entry.fields.thumbnail.fields.file.url,
        };
    } catch (err) {
        console.log(err);
    }
}

main();
